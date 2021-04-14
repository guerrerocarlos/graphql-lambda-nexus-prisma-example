import { join } from "path";
import { makeSchema } from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";
import getTypes from "./nexus-schemas";

const getSchema = (typesTools) => makeSchema({
  types: getTypes(typesTools),
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
      shouldGenerateArtifacts: false,
    }),
  ],
  outputs: {
    typegen: join(__dirname, "..", "generated/typings.ts"),
    schema: join(__dirname, "..", "generated/schema.graphql"),
  },
});

export default getSchema