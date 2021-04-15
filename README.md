# Graphql Subscriptions on AWS Lambda (with Prisma) 

This is a [graphql-lambda](https://github.com/guerrerocarlos/graphql-lambda) module usage example that shows how to create a GraphQL endpoint with Subscriptions that stores new users using [prisma](https://prisma.io) ORM and shows the newly created users in real-time through a GraphQL subscription query.

# This example includes:

 * Prisma schemas definitions and client 
 * Nexus-prisma generated types and CRUD
 * `Subscription` queries implementation with Prisma module 

# Run locally

 1. Set the `DATABASE_URL` in a `.env` file in the root folder
 1. Install the dependencies with `npm install`
 1. If it's a new database, run the migrations with `npm run migrations`
 1. Run the service locally `ts-node src/index.ts`

# Deploy to AWS Lambda

Deploy as usual with [serverless](https://serverles.com/) framework:

`serverless deploy`

