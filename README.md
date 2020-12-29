# [SpaceAPI.dev](https://spaceapi.dev)

This project is a reference implementation for the SpaceAPI GraphQL schema as made available at https://graph.spaceapi.dev.

This was inspired by the http://swapi.dev except with data about NASA's Apollo space program, as a hat-tip to the [Apollo GraphQL](http://www.apollographql.com) project.

## Running Locally

```shell
yarn install
yarn start
```

## Deployments

This project is configured for deployment through [Vercel](https://vercel.com).

## Associated Projects

This project leverages a small constellation of federated GraphQL services that are made available through an Apollo Gateway (https://graph.spaceapi.dev).

- [spaceapi-gateway-graphql](https://github.com/sjungling/spaceapi-gateway-graphql)
- [spaceapi-missions-graphql](https://github.com/sjungling/spaceapi-missions-graphql)
- [spaceapi-media-graphql](https://github.com/sjungling/spaceapi-media-graphql)
