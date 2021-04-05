/// <reference path="../../generated/typings.ts" />

import { Payment } from "@prisma/client";
import {
  mutationType,
  objectType,
  queryType,
  extendType,
  intArg,
  nonNull,
  stringArg,
  subscriptionType,
} from "nexus";

import { pubSub } from "../lambda";

let PaymentType = objectType({
  name: "Payment",
  definition(t) {
    t.model.id();
    t.model.account();
    t.model.amount();
  },
})

export const types = [
  queryType({
    definition(t) {
      t.crud.user();
      t.crud.users({ ordering: true });
      t.crud.post();
      t.crud.posts({ filtering: true });
    },
  }),
  mutationType({
    definition(t: any) {
      t.crud.createOneUser({
        async resolve(root, args, ctx, info, originalResolve) {
          const data = await originalResolve(root, args, ctx, info);
          await pubSub.publish("user_added", data);
          return data;
        },
      });
      t.crud.createOnePost();
      t.crud.deleteOneUser();
      t.crud.deleteOnePost();
    },
  }),
  objectType({
    name: "User",
    definition(t) {
      t.model.id();
      t.model.email();
      t.model.birthDate();
    },
  }),
  PaymentType,
  objectType({
    name: "Post",
    definition(t) {
      t.model.id();
    },
  }),
  subscriptionType({
    definition(t) {
      t.field("paymentsFeed", {
        type: "Payment",
        subscribe: pubSub.subscribe("NEW_PAYMENT"),
        resolve: (rootValue) => {
          return rootValue;
        },
      });
      t.field("usersFeed", {
        type: "User",
        subscribe: pubSub.subscribe("user_added"),
        resolve: (rootValue) => {
          return rootValue;
        },
      });
    },
  }),
  extendType({
    type: "Mutation",
    definition(t) {
      t.nonNull.field("sendPayment", {
        type: PaymentType,
        args: {
          account: nonNull(stringArg()),
          amount: nonNull(intArg()),
        },
        async resolve(_, { account, amount }, ctx) {
          const payload = {
            account: account,
            amount: amount,
          };
          await pubSub.publish("NEW_PAYMENT", payload);
          return payload as Payment;
        },
      });
    },
  }),
];
