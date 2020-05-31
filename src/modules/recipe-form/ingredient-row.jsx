import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Row } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import DeleteIcon from '@material-ui/icons/Delete';

import 'react-bootstrap-typeahead/css/Typeahead.css';

const style = require('./styles/recipe-form.module.scss');

export const IngredientRow = ({
  ingredients,
  onChange,
  onDelete,
  value
}) => {
  useEffect(() => {
    if (!value.name) {
      onChange({
        ...ingredients[0],
        ...value,
        ingredientId: ingredients[0].id,
        id: value.id
      })
    }
  }, [ value ]);

  const updateIngredient = ingredient => {
    onChange({
      ...value,
      ...ingredient,
      ingredientId: ingredient.id || value.ingredientId,
      id: value.id
    });
  }

  const handleSelectIngredient = v => {
    const ingredient = ingredients.find(i => i.name === v[0].name);
    updateIngredient({
      ...ingredient
    });
  }
  
  const handleSelectUnit = e => {
    updateIngredient({
      unit: e.target.value
    });
  }

  const handleSelectAmount = e => {
    updateIngredient({
      amount: e.target.value
    });
  }

  const handleSelectNotes = e => {
    updateIngredient({
      notes: e.target.value
    });
  }

  return !value.name ? <></> : (
    <div className={style.formRow}>
      <Row>
        <Col sm={4}>
          <Typeahead
            id="ingredient"
            labelKey="name"
            onChange={handleSelectIngredient}
            options={ingredients.map(u => 
              ({ name: u.name })
            )}
            placeholder="Select"
          />
        </Col>

        <Col sm={3}>
          <Form.Control
            type="number"
            required
            placeholder="Amount"
            onChange={handleSelectAmount}
            value={value.amount}
          />
        </Col>

        <Col sm={2}>
          <Form.Control
            as="select"
            value={value.unit || ""}
            onChange={handleSelectUnit}
          >
            {(value.measurementUnits || [])
              .map(u => 
                <option key={u}>{u}</option>
              )}
          </Form.Control>
        </Col>

        <Col sm={2}>
          <Form.Control
            placeholder="Notes"
            onChange={handleSelectNotes}
            value={value.notes}
          />
        </Col>

        <Col sm={1}>
          <button
            type="button"
            className={style.deleteBtn}
            onClick={onDelete}
          >
            <DeleteIcon />
          </button>
        </Col>
      </Row>
    </div>
  )
};

IngredientRow.propTypes = {
  ingredients: PropTypes.array,
  onDelete: PropTypes.func,
  value: PropTypes.object
};