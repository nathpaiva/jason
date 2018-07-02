import React from 'react';
import renderer from 'react-test-renderer';
import Input from '../../src/components/Input';
import { enzymeConfig, shallow, mount } from '../enzymeConfig';

enzymeConfig();

function createNodeMock(element) {
  if (element.type === 'input') {
    return {
      addEventListener() {},
      value: '',
    };
  }

  return null;
}

describe('Input', () => {
  const commonProps = {
    id: 'idTest',
    name: 'nameTest',
    onFieldChange: () => {},
    onFieldBlur: () => {},
    placeholder: 'placeholderTest',
    required: false,
  };

  it('renders defaultProps', () => {
    const options = { createNodeMock };
    const component = renderer.create(
      <Input
        {...commonProps}
        value={'ola test value'}
      />, options,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('changes input value .onChage event', () => {
    const component = shallow(
      <Input
        {...commonProps}
        value={'ola test value'}
      />,
    );

    component.simulate('change', { target: { value: 'Bora pra action' } });

    expect(component.instance().state.value).toEqual('Bora pra action');
  });

  it('retrains input text to maxLenght', () => {
    const component = mount(
      <Input
        {...commonProps}
        value={''}
        maxLength={5}
      />,
    );

    component.simulate('change', { target: { value: 'Bora pra action' } });

    expect(component.instance().state.value).toHaveLength(5);
  });

  describe('with type', () => {
    it('renders type text', () => {
      const component = shallow(<Input id={'id_input'} name={'input_name'} onFieldChange={() => {}} onFieldBlur={() => {}} />);

      expect(component.prop('type')).toBe('text');
    });

    it('renders type email', () => {
      const component = shallow(<Input id={'id_input'} name={'input_name'} onFieldChange={() => {}} onFieldBlur={() => {}} type={'email'}/>);

      expect(component.prop('type')).toBe('email');
    });

    it('renders type tel when type equal phone', () => {
      const component = mount(<Input id={'id_input'} name={'input_name'} onFieldChange={() => {}} onFieldBlur={() => {}} type={'phone'}/>);

      const inputType = component.getDOMNode().attributes.type.value;

      expect(inputType).toBe('tel');
    });
  });

  describe('.onBlur', () => {
    it('calls onFieldBlur', () => {
      const onFieldBlur = jest.fn();

      const component = shallow(
        <Input
          id={'idTest'}
          name={'nameTest'}
          onFieldBlur={onFieldBlur}
          onFieldChange={() => {}}
          placeholder={'placeholderTest'}
          required={false}
          value={''}
          maxLength={5}
        />,
      );

      component.simulate('blur', { target: { value: '(11) 99999-8888' } });

      expect(component.instance().props.onFieldBlur).toBeCalled();
    });

    describe('when input is type phone', () => {
      it('keeps state updated on blur event', () => {
        const onFieldChange = jest.fn();

        const component = mount(
          <Input
            id='phone'
            name='phone'
            type='phone'
            onFieldChange={onFieldChange}
            onFieldBlur={() => {}}
            placeholder='(__) _____-____'
            required={false}
            value=''
          />,
        );

        component.simulate('change', { target: { value: '(11) 99999-8888' } });
        component.simulate('blur', { target: { value: '(11) 99999-8888' } });

        expect(component.state().value).toBe('(11) 99999-8888');
      });
    });
  });
});