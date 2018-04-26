import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.Component {
  render() {
    return (
      <input
        id={this.props.id}
        name={this.props.id}
        title={this.props.id}
        className="form__input"
        placeholder={this.props.placeholder}
        required={this.props.required}
        value={this.props.value} />
    );
  }
}

Input.propTypes = {
  id: PropTypes.string.required,
  placeholder: PropTypes.string,
  required: PropTypes.boolean,
  value: PropTypes.any,
}
