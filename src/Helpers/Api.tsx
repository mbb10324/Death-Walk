import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
    query {
        books {
            id
            name
        }
    }`;