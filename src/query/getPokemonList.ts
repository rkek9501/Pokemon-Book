import { gql } from '@apollo/client';

import { POKEMONS_OFFSET } from 'src/const';

export const GET_LIST = gql`
query getList($offset: Int!) {
  pokemon_v2_pokemon(offset: $offset, limit: ${POKEMONS_OFFSET}, order_by: { id: asc }) {
    name
    id
    pokemon_v2_pokemonspecy {
      id
      name
      pokemon_v2_pokemonspeciesnames(where: {pokemon_v2_language: {name: {_eq: "ko"}}}) {
        id
        name
        pokemon_v2_language {
          name
        }
      }
    }
  }
}
`;