import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_POSTS = gql`
  query {
    getPosts {
      username
      body
      createdAt
      id
      comments {
        id
        body
        username
      }
    }
  }
`;

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error :(</p>;

  return <div>{JSON.stringify(data.getPosts)}</div>;
};

export default HomePage;
