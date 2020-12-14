/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGames = /* GraphQL */ `
  subscription OnCreateGames(
    $GameID: ID
    $cluster: String
    $description: String
    $domain: String
    $grade: String
  ) {
    onCreateGames(
      GameID: $GameID
      cluster: $cluster
      description: $description
      domain: $domain
      grade: $grade
    ) {
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
export const onUpdateGames = /* GraphQL */ `
  subscription OnUpdateGames(
    $GameID: ID
    $cluster: String
    $description: String
    $domain: String
    $grade: String
  ) {
    onUpdateGames(
      GameID: $GameID
      cluster: $cluster
      description: $description
      domain: $domain
      grade: $grade
    ) {
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
export const onDeleteGames = /* GraphQL */ `
  subscription OnDeleteGames(
    $GameID: ID
    $cluster: String
    $description: String
    $domain: String
    $grade: String
  ) {
    onDeleteGames(
      GameID: $GameID
      cluster: $cluster
      description: $description
      domain: $domain
      grade: $grade
    ) {
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
