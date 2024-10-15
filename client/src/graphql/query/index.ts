import gql from "graphql-tag";

export const ADD_ITEM = gql`
mutation AddItem($name: String!) {
  addItem(name: $name) {
    id
    name
  }
}
`;

export const GET_ALL_TODOS = gql`
query GetAllTodos {
  getAllTodos {
    title
    completed
    user {
      name
    }
  }
}
`;