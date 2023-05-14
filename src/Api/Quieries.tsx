import { gql } from "@apollo/client";

export const GET_USERS = gql`
    query {
        users {
            username
            email
            password
        }
    }`;

export const LOGIN = gql`
    query Login($username: String!, $password: String!) {
        user(username: $username, password: $password) {
            token
        }
    }`;
