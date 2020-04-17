import { gql } from "apollo-boost";

export const GET_ARTISTS = gql`
  {
    artists {
      id
      firstName
      lastName
    }
  }
`;

export const ADD_ARTIST = gql`
  mutation AddArtist($id: String!, $firstName: String!, $lastName: String!) {
    addArtist(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const UPDATE_ARTIST = gql`
  mutation UpdateArtist($id: String!, $firstName: String!, $lastName: String!) {
    updateArtist(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const REMOVE_ARTIST = gql`
  mutation RemoveArtist($id: String!) {
    removeArtist(id: $id) {
      id
      firstName
      lastName
    }
  }
`;

// Instruments

export const ADD_INSTRUMENT = gql`
  mutation AddInstrument(
    $id: String!
    $year: String!
    $brand: String!
    $type: String!
    $price: Number!
    $artistID: String!
  ) {
    addInstrument(
      id: $id
      year: $year
      brand: $brand
      type: $type
      price: $price
      artistID: $artistID
    ) {
      id
      year
      brand
      type
      price
      artistID
    }
  }
`;

export const GET_INSTRUMENTS = gql`
  {
    artists {
      id
      firstName
      lastName
    }
  }
`;
