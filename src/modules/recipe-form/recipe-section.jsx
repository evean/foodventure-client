import React from 'react';
import { Form } from 'react-bootstrap';
import { IngredientRow } from './ingredient-row';
import { StepRow } from './step-row';
import DeleteIcon from '@material-ui/icons/Delete';
import uuidv4 from 'uuid';

const style = require('./styles/recipe-form.module.scss');

const getDefault = (num = 1) => {
  return [ ...Array(num) ]
    .map(i => ({
      id: uuidv4()
    }));
}

export const RecipeSection = ({
  ingredients,
  onChange,
  onDelete,
  value
}) => {
  const handleAddIngredient = () => {
    onChange({ ingredients: [ ...value.ingredients || [], getDefault()[0] ] });
  }

  const handleDeleteIngredient = id => {
    onChange({ ingredients: value.ingredients.filter(i => i.id !== id) });
  }

  const handleAddStep = () => {
    onChange({ steps: [ ...value.steps, "" ] });
  }

  const handleDeleteStep = i => {
    const newSteps = [ ...value.steps ];
    newSteps.splice(i, 1);
    onChange({ steps: newSteps });
  }

  const handleUpdateStep = (v, index) => {
    onChange({ steps: value.steps
      .map((s, i) => i === index ? v : s) });
  }

  const handleUpdateIngredient = v => {
    onChange({ ingredients: (value.ingredients || [])
      .map(i => i.id === v.id ? v : i) });
  }

  const renderIngredients = () => {
    return (
      <>
        {(value.ingredients || []).map(i => 
          <IngredientRow
            key={`ing_${i.id}`}
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
        {value.steps.map((s, i) => (
          <div key={`step_${i}`} className={style.rowWrapper}>
            <div className={style.rowIcon}>
              {(i + 1)}.
            </div>
            
            <StepRow
              value={s}
              onChange={(v) => handleUpdateStep(v, i)}
              onDelete={() => handleDeleteStep(i)}
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

  return (
    <div className={style.recipeSection}>
      <div>
        <Form.Group controlId="recipeName">
          <Form.Label>Label</Form.Label>
          <Form.Control
            type="name"
            required
            placeholder="Enter label (Base, Dough, Sauce...)"
            value={value.label}
            onChange={e => onChange({ label: e.target.value })}
          />
        </Form.Group>

        <h5 className={style.recipeViewSubTitle}>Ingredients</h5>
        {renderIngredients()}

        <h5 className={style.recipeViewSubTitle}>Steps</h5>
        {renderSteps()}
      </div>

      <button
        type="button"
        className={style.deleteSectionBtn}
        onClick={onDelete}
      >
        <DeleteIcon />
      </button>
    </div>
  );
};
