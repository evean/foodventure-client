import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { RecipeSection } from './recipe-section';
import uuidv4 from 'uuid';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

const style = require('./styles/recipe-form.module.scss');

const DIFFICULTY_LEVELS = [ "Beginner", "Easy", "Intermediate", "Hard", "Professional" ];

const getDefaultSection = () => {
  return {
    id: uuidv4(),
    ingredients: [],
    steps: [ ...Array(5) ]
  } 
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
    difficulty: 1,
    dietTypes: []
  };

  const [ recipe, setRecipe ] = useState(value || defaultValue);
  const [ sections, setSections ] = useState([ getDefaultSection() ]);

  useEffect(() => {
    if (!_isEmpty(value)) {
      setRecipe({
        ...value,
        dietTypes: _get(value, "recipeDietTypesByRecipeId.nodes", [])
          .map(t => t.dietTypeByDietTypeId.id)
      });
      setSections(JSON.parse(value.content).sections || []);
    }
  }, [ value ]);

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
      content: JSON.stringify({
        sections: sections.map(s => ({
          id: s.id,
          steps: s.steps.filter(s => s && !!s.length),
          ingredients: s.ingredients,
          label: s.label
        }))
      }),
      id: Number(recipe.id)
    }

    const action = recipe.id ? onUpdate : onSave;
    action(variables);
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

  const handleAddSection = () => {
    setSections([
      ...sections,
      getDefaultSection()
    ]);
  }

  const handleDeleteSection = id => {
    setSections(sections.filter(s => s.id !== id));
  }

  const handleUpdateSection = (id, value) => {
    setSections(sections.map(s => s.id !== id ? s : { ...s, ...value }));
  }

  const renderSections = () => {
    return (
      <>
        <h5>Recipe parts</h5>
        <div className={style.sectionsWrapper}>
          {sections.map(s => (
            <RecipeSection
              key={s.id}
              ingredients={ingredients}
              onChange={(v) => handleUpdateSection(s.id, v)}
              onDelete={() => handleDeleteSection(s.id)}
              value={s}
            />
          ))}
        </div>

        {renderAddButton("Add recipe part", handleAddSection)}
      </>
    );
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

        {renderSections()}

        <h5 className={style.recipeViewSubTitle}>Dietary type</h5>
        
        <div className={style.checkboxWrapper}>
          {dietTypes.map(d =>
            <Form.Group
              key={`dt_${d.id}`}
              controlId="formBasicCheckbox"
            >
              <Form.Check
                type="checkbox"
                label={d.name}
                checked={recipe.dietTypes.includes(d.id)}
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
