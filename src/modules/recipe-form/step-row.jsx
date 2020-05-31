import React from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Row } from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';

const style = require('./styles/recipe-form.module.scss');

export const StepRow = ({
  onChange,
  onDelete,
  value
}) => {
  const handleChange = e => {
    onChange(e.target.value);
  }

  return (
    <div className={style.formRow}>
      <Row>
        <Col sm={11}>
          <Form.Control
            type="name"
            required
            placeholder="Enter instructions"
            onChange={handleChange}
            value={value}
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

StepRow.propTypes = {
  value: PropTypes.string
};