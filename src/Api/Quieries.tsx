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
    query login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            username
            email
            token
        }
    }`;

export const IDENTITIES  = gql`
    query identities($username: String!, $email: String!){
        identities(username: $username, email: $email) {
            username
            email
        }
    }`;

export const USER = gql`
    query user($username: String!, $email: String!) {
        user(username: $username, email: $email) {
            username
            easyGames {
                games
                wins
                loses
            }
            mediumGames {
                games
                wins
                loses
            }
            hardGames {
                games
                wins
                loses
            }
        }
    }`;
