import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { IngredientRow } from './ingredient-row';
import { StepRow } from './step-row';
import uuidv4 from 'uuid';
import _isEmpty from "lodash/isEmpty";
import _pick from "lodash/pick";

const style = require('./styles/recipe-form.module.scss');

const DIFFICULTY_LEVELS = [ "Beginner", "Easy", "Intermediate", "Hard", "Professional" ];

const getDefault = (num = 1) => {
  return [ ...Array(num) ]
    .map(i => ({
      id: uuidv4()
    }));
}

export const RecipeForm = ({
  cuisines = [],
  dietTypes = [],
  ingredients = [],
  onSave,
  onUpdate,
  value
}) => {
  const defaultValue = {
    cuisineId: 1,
    difficulty: 1
  };

  const [ recipe, setRecipe ] = useState(value || defaultValue);
  const [ steps, setSteps ] = useState(getDefault(5));
  const [ selectedIngredients, setSelectedIngredients ] = useState([]);

  useEffect(() => {
    if (!_isEmpty(value)) {
      setRecipe(value);
      setSteps(parseStringToContent(value.content));
      setSelectedIngredients(value.recipeIngredientsByRecipeId.nodes
        .map(i => ({
          amount: i.amount,
          unit: i.unit,
          ...i.ingredientByIngredientId
        })));
    }
  }, [ value ]);

  const handleAddIngredient = () => {
    setSelectedIngredients([ ...selectedIngredients, getDefault()[0] ]);
  }

  const handleDeleteIngredient = id => {
    setSelectedIngredients(selectedIngredients.filter(i => i.id !== id));
  }

  const handleAddStep = () => {
    setSteps([ ...steps, getDefault() ]);
  }

  const handleDeleteStep = id => {
    setSteps(steps.filter(s => s.id !== id));
  }

  const handleUpdateStep = v => {
    setSteps(steps.map(i => i.id === v.id ? v : i));
  }

  const handleUpdateIngredient = v => {
    console.log('updating ing', v)
    setSelectedIngredients(
      selectedIngredients.map(i => i.id === v.id ? v : i)
    );
  }

  const handleUpdateRecipeProperty = (id, v) => {
    setRecipe({
      ...recipe,
      [id]: !isNaN(v) ? Number(v) : v
    });
  }

  const handleSave = (e) => {
    e.preventDefault();

    const variables = {
      ...recipe,
      content: {
        steps: JSON.stringify({
          steps: steps.map(s => s.content)
        })
      },
      id: Number(recipe.id)
    }

    const action = recipe.id ? onUpdate : onSave;
    action({ variables });
  }

  const handleUpdateDietType = (e, item) => {
    const types = recipe.dietTypes || [];
    const selectedDietTypes = types.includes(item.id)
      ? types.filter(d => d !== item.id)
      : [ ...types, item.id ];

    setRecipe({
      ...recipe,
      dietTypes: selectedDietTypes
    });
  }

  const parseStringToContent = str => {
    const content = JSON.parse(str);

    return content.steps.map(s => ({
      id: uuidv4(),
      content: s
    }));
  }

  const renderIngredients = () => {
    return (
      <>
        {selectedIngredients.map(i => 
          <IngredientRow
            key={`ingredient_${i.id}`}
            ingredients={ingredients}
            value={i}
            onChange={v => handleUpdateIngredient(v)}
            onDelete={() => handleDeleteIngredient(i.id)}
          />
        )}

        {renderAddButton("Add ingredient", handleAddIngredient)}
      </>
    );
  }

  const renderSteps = () => {
    return (
      <>
        {steps.map((s, i) => (
          <div key={`step_${s.id}`} className={style.rowWrapper}>
            <div className={style.rowIcon}>
              {(i + 1)}.
            </div>
            
            <StepRow
              value={s}
              onChange={v => handleUpdateStep(v)}
              onDelete={() => handleDeleteStep(s.id)}
            />
          </div>
        ))}

        {renderAddButton("Add step", handleAddStep)}
      </>
    );
  }

  const renderAddButton = (label, callback) => {
    return (
      <button
        type="button"
        onClick={callback}
        className={style.addBtn}
      >
        + {label}
      </button>
    );
  }

  const handleUpdateValue = id => e => {
    handleUpdateRecipeProperty(id, e.target.value);
  }

  return (
    <div>
      <h2 className={style.recipeViewTitle}>
        {(value && value.name) || 'New recipe'}
      </h2>

      <Form onSubmit={handleSave}>
        <Form.Group controlId="recipeName">
          <Form.Label>Recipe name</Form.Label>
          <Form.Control
            type="name"
            required
            placeholder="Enter name"
            onChange={handleUpdateValue("name")}
            value={recipe.name}
          />
        </Form.Group>

        <Form.Group controlId="recipeDescription">
          <Form.Label>Recipe description</Form.Label>
          <Form.Control
            type="name"
            required
            placeholder="Enter description"
            onChange={handleUpdateValue("description")}
            value={recipe.description || ""}
          />
        </Form.Group>

        <Form.Group controlId="recipeCuisine">
          <Form.Label>Cuisine</Form.Label>

          <Form.Control
            as="select"
            required
            onChange={handleUpdateValue("cuisineId")}
            value={recipe.cuisineId}
          >
            {cuisines.map(c => 
              <option value={c.id} key={c.name}>{c.name}</option>
            )}
          </Form.Control>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group controlId="recipeServes">
              <Form.Label>Serves</Form.Label>

              <Form.Control
                type="number"
                required
                placeholder="Serves (no. of people)"
                onChange={handleUpdateValue("serves")}
                value={recipe.serves}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="recipeDifficulty">
              <Form.Label>Difficulty</Form.Label>

              <Form.Control
                as="select"
                required
                onChange={handleUpdateValue("difficulty")}
                value={recipe.difficulty}
              >
                {DIFFICULTY_LEVELS.map((c, i) => 
                  <option value={(i + 1)} key={c}>{c}</option>
                )}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="recipeTime">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Duration (in minutes)"
                onChange={handleUpdateValue("time")}
                value={recipe.time}
              />
            </Form.Group>
          </Col>
        </Row>

        <h5 className={style.recipeViewSubTitle}>Ingredients</h5>
        {renderIngredients()}

        <h5 className={style.recipeViewSubTitle}>Steps</h5>
        {renderSteps()}

        <h5 className={style.recipeViewSubTitle}>Dietary type</h5>
        
        <div className={style.checkboxWrapper}>
          {dietTypes.map(d =>
            <Form.Group
              key={d.id}
              controlId="formBasicCheckbox"
            >
              <Form.Check
                type="checkbox"
                label={d.name}
                checked={(recipe.dietTypes || []).includes(d.id)}
                onChange={e => handleUpdateDietType(e, d)}
              />
            </Form.Group>
          )}
        </div>

        <Form.Group controlId="recipeSource">
          <Form.Label>Source</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter source"
            onChange={handleUpdateValue("source")}
            value={recipe.source}
          />
        </Form.Group>

        <Form.Group controlId="recipeVideoUrl">
          <Form.Label>Video URL</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter video URL"
            onChange={handleUpdateValue("videoUrl")}
            value={recipe.videoUrl}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={!selectedIngredients.length || !steps.length}
        >
          {recipe.id ? "Update recipe" : "Save recipe"}
        </Button>
      </Form>
    </div>
  )
};

RecipeForm.propTypes = {
  cuisines: PropTypes.array,
  dietTypes: PropTypes.array,
  ingredients: PropTypes.array,
  onSave: PropTypes.func,
  onUpdate: PropTypes.func,
  value: PropTypes.object
};
