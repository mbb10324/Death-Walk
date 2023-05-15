import { gql } from "@apollo/client";

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            username
            email
            password
        }
    }`;

export const ADD_EASY = gql`
    mutation addEasy($user_id: Int!, $games: Int!, $wins: Int!, $loses: Int!) {
        addEasy(user_id: $user_id, games: $games, wins: $wins, loses: $loses) {
            games
            wins
            loses
        }
    }`;

export const ADD_MEDIUM = gql`
    mutation addMedium($user_id: Int!, $games: Int!, $wins: Int!, $loses: Int!) {
        addMedium(user_id: $user_id, games: $games, wins: $wins, loses: $loses) {
            games
            wins
            loses
        }
    }`;

export const ADD_HARD = gql`
    mutation addHard($user_id: Int!, $games: Int!, $wins: Int!, $loses: Int!) {
        addHard(user_id: $user_id, games: $games, wins: $wins, loses: $loses) {
            games
            wins
            loses
        }
    }`;

export const DELETE_TOKEN = gql`
    mutation deleteToken($value: String!) {
        deleteToken(value: $value) {
            id
        }
    }`;

