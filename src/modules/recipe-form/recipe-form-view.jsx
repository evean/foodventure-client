import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RecipeForm } from './recipe-form';
import { Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';

const style = require('./styles/recipe-form.module.scss');

export const RecipeFormView = props => {
  const [ selectedRecipe, setSelectedRecipe ] = useState();

  useEffect(() => {
    if (selectedRecipe) {
      setSelectedRecipe(props.recipes.find(r => r.id === selectedRecipe.id));
    }
  }, [ props.recipes ]);
  
  const createRecipeList = recipe => {
    return (
      <button
        key={recipe.id}
        type="button"
        className={style.recipeListItem}
        onClick={() => {}}
        //onClick={() => setSelectedRecipe(recipe)}
      >
        {recipe.name}
      </button>
    );
  }

  return (
    <Row>
      <Col sm={4}>
        <h5>Recipes</h5>

        {props.recipes.length
          ? props.recipes.map(createRecipeList)
          : 'No recipes'
        }
      </Col>

      <Col sm={8}>
        <RecipeForm
          value={selectedRecipe}
          {...props}
        />
      </Col>
    </Row>
  )
};

RecipeFormView.propTypes = {
  recipes: PropTypes.array
};