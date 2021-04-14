/// <reference path="../../generated/typings.ts" />

import { Payment } from "@prisma/client";
import {
  extendType,
  intArg,
  mutationType,
  nonNull,
  objectType,
  queryType,
  stringArg,
  subscriptionType,
} from "nexus";

const getTypes = ({ pubSub }) => [
  queryType({
    definition(t) {
      t.crud.user();
      t.crud.users({ ordering: true, filtering: true });
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
      // t.model.birthDate();
    },
  }),

  objectType({
    name: "Post",
    definition(t) {
      t.model.id();
    },
  }),

  objectType({
    name: "Payment",
    definition(t) {
      t.model.id();
      t.model.account();
      t.model.amount();
    },
  }),
  subscriptionType({
    definition(t) {
      // t.field("paymentsFeed", {
      //   type: "Payment",
      //   subscribe: pubSub.subscribe("NEW_PAYMENT"),
      //   resolve: (rootValue) => {
      //     return rootValue;
      //   },
      // });
      t.field("usersFeed", {
        type: "User",
        subscribe: pubSub.subscribeTo("user_added"),
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
        type: "Payment",
        args: {
          account: nonNull(stringArg()),
          amount: nonNull(intArg()),
        },
        async resolve(_, { account, amount }) {
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

export default getTypes;
