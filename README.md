# Graphql Subscriptions on AWS Lambda (with Prisma) 

This is a [graphql-lambda](https://github.com/guerrerocarlos/graphql-lambda) module usage example that shows how to create a GraphQL endpoint with Subscriptions that stores new users using [prisma](https://prisma.io) ORM and shows the newly created users in real-time through a GraphQL subscription query.

# This example includes:

 * Prisma schemas definitions and client 
 * Nexus-prisma generated types and CRUD
 * `Subscription` queries implementation with Prisma module 

# How to

Deploy as usual with [serverless](https://serverles.com/) framework:

`serverless deploy`
