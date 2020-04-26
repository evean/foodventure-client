import { gql } from "apollo-boost";

export const ALL_RECIPES = gql`
  {
    allRecipes {
      nodes {
        name
        description
        imageUrl
        difficulty
        time
        cuisineByCuisineId {
          name
        }
      }
    }
  }
`;
