import { gql } from "apollo-boost";

export const INGREDIENTS = gql`
  {
    allIngredients {
      nodes {
        id
        name
        measurementUnits
      }
    }
  }
`;

export const CUISINES = gql`
  {
    allCuisines {
      nodes {
        id
        name
      }
    }
  }
`;

export const DIET_TYPES = gql`
  {
    allDietTypes {
      nodes {
        id
        name
      }
    }
  }
`;

export const RECIPES = gql`
  {
    allRecipes {
      nodes {
        id
        name
        description
        cuisineId
        serves
        difficulty
        time
        content
        source
        videoUrl
        recipeIngredientsByRecipeId {
          nodes {
            amount
            unit
            ingredientByIngredientId {
              id
              name
              measurementUnits
            }
          }
        }
        recipeDietTypesByRecipeId {
          nodes {
            dietTypeByDietTypeId {
              id
              name
            }
          }
        }
      }
    }
  }
`;

export const CREATE_RECIPE = gql`
  mutation CreateRecipe($name: String!, $description: String, $cuisineId: Int!, $serves: Int, $difficulty: Int!, $time: Int!, $content: JSON!, $source: String, $videoUrl: String) {
    createRecipe(input: { recipe: { name: $name, description: $description, cuisineId: $cuisineId, serves: $serves, difficulty: $difficulty, time: $time, content: $content, source: $source, videoUrl: $videoUrl }}) {
      clientMutationId
    }
  }
`;

export const UPDATE_RECIPE_BY_ID = gql`
  mutation UpdateRecipeById($id: Int!, $name: String!, $description: String, $cuisineId: Int!, $serves: Int, $difficulty: Int!, $time: Int!, $content: JSON!, $source: String, $videoUrl: String) {
    updateRecipeById(input: { id: $id, recipePatch: { name: $name, description: $description, cuisineId: $cuisineId, serves: $serves, difficulty: $difficulty, time: $time, content: $content, source: $source, videoUrl: $videoUrl }}) {
      clientMutationId
    }
  }
`;