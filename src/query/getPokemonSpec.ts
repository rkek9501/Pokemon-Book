import { gql } from '@apollo/client';

/**
 * 포켓몬 상세 페이지
 * 포콋몬 상세정보(이름, 특징, 진화) 조회 쿼리
 */
export const GET_POKEMON_SPEC = gql`
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
        pokemon_v2_pokemonspecies(order_by: { order: asc }) {
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