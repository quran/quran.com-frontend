import React, { PropTypes } from 'react';

const styles = require('./style.scss');

const Radio = ({ id, name, checked, handleChange, children }) => (
  <label className={styles.radio} htmlFor={id}>
    <input
      id={id}
      className={styles.input}
      type="radio"
      name={name}
      checked={checked}
      onChange={handleChange}
    />
    <span className={styles.outer}>
      <span className={styles.inner} />
    </span>
    {children}
  </label>
);

Radio.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Radio;
