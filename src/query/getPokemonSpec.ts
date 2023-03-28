import { gql } from '@apollo/client';

export const GET_POKEMON = gql`
query getPokemon($id: Int!) {
  pokemon_v2_pokemon_by_pk(id: $id) {
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
      pokemon_v2_evolutionchain {
        pokemon_v2_pokemonspecies(order_by: { id: asc }) {
          id
          name
          pokemon_v2_pokemonspeciesnames(where: {pokemon_v2_language: {name: {_eq: "ko"}}}) {
            id
            name
            pokemon_v2_language {
              name
              id
            }
          }
        }
      }
      pokemon_v2_pokemonspeciesflavortexts(where: {pokemon_v2_language: {name: {_eq: "ko"}}}, distinct_on: language_id) {
        id
        flavor_text
        version_id
        pokemon_v2_language {
          id
          name
        }
      }
    }
  }
}
`;