import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onFieldBlur: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  initialValue: PropTypes.any,
  style: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
};

const defaultProps = {
  id: '',
  placeholder: '',
  name: '',
  title: '',
  required: false,
  initialValue: '',
  style: 'form__input',
  minLength: 3,
  maxLength: 255,
};

export default class TextArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.initialValue ? this.props.initialValue : '',
    };

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChange(evt) {
    this.setState({ value: evt.target.value });

    this.props.onFieldChange({
      value: evt.target.value,
      id: this.props.id,
    });
  }

  onBlur() {
    this.props.onFieldBlur({
      value: this.state.value,
      id: this.props.id,
      required: this.props.required,
    });
  }

  render() {
    const {
      id,
      name,
      title,
      placeholder,
      required,
      style,
      minLength,
      maxLength,
    } = this.props;

    return (
      <textarea
        id={id}
        name={name}
        title={title}
        className={style}
        placeholder={placeholder}
        required={required}
        value={this.state.value}
        onChange={this.onChange}
        onBlur={this.onBlur}
        minLength={minLength}
        maxLength={maxLength}>
        {this.state.value}
      </textarea>
    );
  }
}

TextArea.propTypes = propTypes;
TextArea.defaultProps = defaultProps;
