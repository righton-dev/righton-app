/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGames = /* GraphQL */ `
  query GetGames($GameID: ID!) {
    getGames(GameID: $GameID) {
      GameID
      cluster
      description
      domain
      grade
      q1
      q2
      q3
      q4
      q5
      standard
      title
      updated
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: TableGamesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        GameID
        cluster
        description
        domain
        grade
        q1
        q2
        q3
        q4
        q5
        standard
        title
        updated
      }
      nextToken
    }
  }
`;
