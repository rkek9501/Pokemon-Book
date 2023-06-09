import { gql } from '@apollo/client';

/**
 * 포켓몬 도감 목록에서 검색 시
 * store에 저장된 아이디의 포켓몬이 없을 경우
 * 하나의 포켓몬 검색을 위해 사용
 */
export const GET_POKEMON = gql`
  query getPokemon($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      name
      id
      pokemon_v2_pokemonspecy {
        id
        name
        pokemon_v2_pokemonspeciesnames(where: { pokemon_v2_language: { name: { _eq: "ko" } } }) {
          id
          name
          pokemon_v2_language {
            name
          }
        }
        pokemon_v2_pokemonspeciesflavortexts(where: { pokemon_v2_language: { name: { _eq: "ko" } } }, distinct_on: language_id) {
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
