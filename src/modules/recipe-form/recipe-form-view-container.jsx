import React, { useState } from 'react';
import { RecipeFormView } from './recipe-form-view';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Modal } from 'react-bootstrap';
import {
  CUISINES, DIET_TYPES, INGREDIENTS, RECIPES, CREATE_RECIPE, UPDATE_RECIPE_BY_ID
} from './queries/recipe-form-queries';

export const RecipeFormViewContainer = () => {
  const [ modalProps, setModalProps ] = useState();

  const { loading: cuisinesLoading, data: cuisines } = useQuery(CUISINES);
  const { loading: dietTypesLoading, data: dietTypes } = useQuery(DIET_TYPES);
  const { loading: ingredientsLoading, data: ingredients } = useQuery(INGREDIENTS);
  const { loading: recipesLoading, data: recipes, refetch: refetchRecipes } = useQuery(RECIPES);

  const [ addRecipe ] = useMutation(CREATE_RECIPE);
  const [ updateRecipeById ] = useMutation(UPDATE_RECIPE_BY_ID);

  const loading = cuisinesLoading || dietTypesLoading || ingredientsLoading || recipesLoading;

  const handleUpdateRecipe = variables => {
    updateRecipeById(variables)
      .then(() => {
        refetchRecipes();
        setModalProps({ text: "Recipe updated successfully" });
      });
  }

  const handleSaveRecipe = variables => {
    addRecipe(variables)
      .then(() => {
        refetchRecipes();
        setModalProps({ text: "Recipe saved successfully" });
      });
  }

  return loading
    ? <>Loading...</>
    : <>
        <RecipeFormView
          cuisines={cuisines.allCuisines.nodes}
          dietTypes={dietTypes.allDietTypes.nodes}
          ingredients={ingredients.allIngredients.nodes}
          recipes={recipes.allRecipes.nodes}
          onSave={handleSaveRecipe}
          onUpdate={handleUpdateRecipe}
        />

        {!!modalProps &&
          <Modal show={true}>
            <Modal.Header>
              {modalProps.text}
            </Modal.Header>

            <Modal.Footer>
              <Button onClick={() => setModalProps()}>
                Ok
              </Button>
            </Modal.Footer>
          </Modal>
        }
      </>
};
