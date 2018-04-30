import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(evt) {
    this.setState({ value: evt.target.value });
  }

  componentWillMount() {
    this.setState({ value: this.props.value });
  }

  render() {
    return (
      <input
        id={this.props.id}
        name={this.props.name}
        title={this.props.title}
        className="form__input"
        placeholder={this.props.placeholder}
        required={this.props.required}
        value={this.state.value}
        onChange={this.onChange} />
    );
  }
}

Input.defaultProps = {
  id: '',
  placeholder: '',
  required: false,
  name: '',
  title: '',
  value: '',
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.any,
}
