import React from 'react';
import Select from './Select';
import Input from './Input';
import TextArea from './TextArea';

export default class Factory {
  static getComponent(field, key) {
    const { type, placeholder, name, value, values } = field;

    if (type === 'select') {
      return (
        <Select
          placeholder={placeholder}
          key={`select-${key}`}
          id={name}
          name={name}
          selected={value}
          values={values} />
      )
    }

    if (type === 'textarea') {
      return (
        <TextArea
          key={`textarea-${key}`}
          id={name}
          name={name}
          placeholder={placeholder} />
      );
    }

    if (type === 'phone' || type === 'email' || type === 'text') {
      return (
        <Input
          type={type}
          key={`input-${key}`}
          id={name}
          name={name}
          placeholder={placeholder} />
      );
    }
  }
}
