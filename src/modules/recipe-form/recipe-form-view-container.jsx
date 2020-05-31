import React, { useState } from 'react';
import { RecipeFormView } from './recipe-form-view';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Modal } from 'react-bootstrap';
import {
  CUISINES,
  DIET_TYPES,
  INGREDIENTS,
  RECIPES,
  CREATE_RECIPE,
  UPDATE_RECIPE_BY_ID,
  ADD_DIET_TYPE_TO_RECIPE,
  DELETE_DIET_TYPE_FROM_RECIPE,
  ADD_INGREDIENT_TO_RECIPE,
  DELETE_INGREDIENT_FROM_RECIPE
} from './queries/recipe-form-queries';
import _flatten from 'lodash/flatten';

export const RecipeFormViewContainer = () => {
  const [ modalProps, setModalProps ] = useState();

  const { loading: cuisinesLoading, data: cuisines } = useQuery(CUISINES);
  const { loading: dietTypesLoading, data: dietTypes } = useQuery(DIET_TYPES);
  const { loading: ingredientsLoading, data: ingredients } = useQuery(INGREDIENTS);
  const { loading: recipesLoading, data: recipes, refetch: refetchRecipes } = useQuery(RECIPES);

  const [ addRecipe ] = useMutation(CREATE_RECIPE);
  const [ updateRecipeById ] = useMutation(UPDATE_RECIPE_BY_ID);
  const [ addDietTypeToRecipe ] = useMutation(ADD_DIET_TYPE_TO_RECIPE);
  const [ deleteDietTypeFromRecipe ] = useMutation(DELETE_DIET_TYPE_FROM_RECIPE);
  const [ addIngredientToRecipe ] = useMutation(ADD_INGREDIENT_TO_RECIPE);
  const [ deleteIngredientFromRecipe ] = useMutation(DELETE_INGREDIENT_FROM_RECIPE);

  const loading = cuisinesLoading || dietTypesLoading || ingredientsLoading || recipesLoading;

  const handleUpdateRecipe = variables => {
    saveAdditionalFields(variables);

    updateRecipeById({ variables })
      .then(() => {
        refetchRecipes();
        setModalProps({ text: "Recipe updated successfully" });
      });
  }

  const handleSaveRecipe = variables => {
    saveAdditionalFields(variables);

    addRecipe({ variables })
      .then(() => {
        refetchRecipes();
        setModalProps({ text: "Recipe saved successfully" });
      });
  }

  const saveAdditionalFields = variables => {
    saveDietTypes(
      variables.id,
      variables.recipeDietTypesByRecipeId.nodes
        .map(t => ({ id: t.id, dietTypeId: t.dietTypeByDietTypeId.id })),
      variables.dietTypes
    );

    saveIngredients(
      variables.id,
      variables.recipeIngredientsByRecipeId.nodes
        .map(i => ({ id: i.id, ingredientId: i.ingredientByIngredientId.id })),
      variables.content
    );
  }

  const saveDietTypes = (
    recipeId, oldTypes = [], newTypes = []
  ) => {
    const typesToDelete = !newTypes.length
      ? []
      : oldTypes.filter(t => !newTypes.includes(t.dietTypeId));
    const typesToAdd = newTypes.filter(n => !oldTypes.find(o => n === o.dietTypeId));

    typesToAdd.forEach(t => {
      addDietTypeToRecipe({ variables: { recipeId, dietTypeId: t }});
    });

    typesToDelete.forEach(t => {
      deleteDietTypeFromRecipe({ variables: { id: t.id }})
    });
  }

  const saveIngredients = (
    recipeId, oldIngredients = [], content
  ) => {
    const newIngredients = _flatten(
      JSON.parse(content).sections.map(s => s.ingredients))
        .map(i => ({ id: i.id, ingredientId: i.ingredientId }));

    const ingredientsToDelete = !newIngredients.length
      ? []
      : oldIngredients.filter(o => !newIngredients
          .find(n => n.ingredientId === o.ingredientId));
    const ingredientsToAdd = newIngredients
      .filter(n => !oldIngredients.find(o => o.ingredientId === n.ingredientId));

    ingredientsToAdd.forEach(t => {
      addIngredientToRecipe({ variables: { recipeId, ingredientId: t.ingredientId }});
    });

    ingredientsToDelete.forEach(t => {
      deleteIngredientFromRecipe({ variables: { id: t.id }})
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
