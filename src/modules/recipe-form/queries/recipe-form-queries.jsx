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

export const RECIPE_DIET_TYPES = gql`
  query AllRecipeDietTypes($recipeId: Int!) {
    allRecipeDietTypes(condition: { recipeId: $recipeId }) {
      nodes {
        id
        recipeId
        dietTypeId
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
            id
            ingredientByIngredientId {
              id
              name
              measurementUnits
            }
          }
        }
        recipeDietTypesByRecipeId {
          nodes {
            id
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

export const ADD_DIET_TYPE_TO_RECIPE = gql`
  mutation addDietTypeToRecipe($recipeId: Int!, $dietTypeId: Int!) {
    createRecipeDietType(input: { recipeDietType: { recipeId: $recipeId, dietTypeId: $dietTypeId }}) {
      clientMutationId
    }
  }
`;

export const DELETE_DIET_TYPE_FROM_RECIPE = gql`
  mutation deleteDietTypeFromRecipe($id: Int!) {
    deleteRecipeDietTypeById(input: { id: $id }) {
      clientMutationId
    }
  }
`;

export const ADD_INGREDIENT_TO_RECIPE = gql`
  mutation addIngredientToRecipe($recipeId: Int!, $ingredientId: Int!) {
    createRecipeIngredient(input: { recipeIngredient: { recipeId: $recipeId, ingredientId: $ingredientId }}) {
      clientMutationId
    }
  }
`;

export const DELETE_INGREDIENT_FROM_RECIPE = gql`
  mutation deleteIngredientFromRecipe($id: Int!) {
    deleteRecipeIngredientById(input: { id: $id }) {
      clientMutationId
    }
  }
`;