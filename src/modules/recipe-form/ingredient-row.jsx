import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Row } from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import uuidv4 from "uuid";

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
        ...value
      })
    }
  }, [ value ]);

  const updateIngredient = ingredient => {
    onChange({
      ...value,
      ...ingredient
    });
  }

  const handleSelectIngredient = e => {
    const ingredient = ingredients.find(i => i.name === e.target.value);
    updateIngredient({
      ingredient
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

  const currentIngredient = value.ingredient
    && ingredients.find(i => i.id === value.ingredient.id);

  return !value.name ? <></> : (
    <div className={style.formRow}>
      <Row>
        <Col sm={5}>
          <Form.Control
            as="select"
            value={value.name}
            onChange={handleSelectIngredient}
          >
            {ingredients.map((u, i) => 
              <option key={u.id}>{u.name}</option>
            )}
          </Form.Control>
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

        <Col sm={3}>
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