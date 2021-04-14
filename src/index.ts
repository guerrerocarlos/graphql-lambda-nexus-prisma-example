import { ApolloServer, PubSub } from "apollo-server";
import getSchema from "./graphql/schema";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const pubSub: any = new PubSub();

pubSub.subscribeTo = (topic) => {
  return () => pubSub.asyncIterator(topic)
}

const schema = getSchema({ pubSub });

const server = new ApolloServer({
  schema,
  context: () => ({ prisma }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
