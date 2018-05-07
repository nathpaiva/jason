import React from 'react';
import renderer from 'react-test-renderer';
import Form from '../../src/components/Form';
import { form } from '../../src/form.json';
import { enzymeConfig, shallow } from '../enzymeConfig';

enzymeConfig();

function createNodeMock(element) {
  if (element.type === 'input') {
    return {
      addEventListener() { },
      value: '',
    };
  }

  return null;
}

function fillFormFields(steps) {
  return steps.map((step) => {
    step.fields = step.fields.map((field) => {
      const updatedField = Object.assign({}, field);
      updatedField.value = '1111111';

      return updatedField;
    });

    return step;
  });
}

describe('Form', () => {
  it('renders defaultProps', () => {
    const options = { createNodeMock };
    const component = renderer.create(
      <Form name={'form'} action={'/'} data={form} />, options
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('.handleButtonClick', () => {
    it('does not display next step', () => {
      const component = shallow(
        <Form name={'form'} action={'/'} data={form} />,
      );

      const evt = { preventDefault() { } };
      component.instance().handleButtonClick(evt);

      const { activeStepIndex } = component.state();

      expect(activeStepIndex).toEqual(0);
    });

    it('goes to next step', () => {
      form.steps = fillFormFields(form.steps);

      const component = shallow(
        <Form name={'form'} action={'/'} data={form} />,
      );

      const initialStep = component.state().activeStepIndex;

      const evt = { preventDefault() { } };
      component.instance().handleButtonClick(evt);

      const { activeStepIndex } = component.state();

      expect(initialStep).toEqual(0);
      expect(activeStepIndex).toEqual(initialStep + 1);
    });
  });

  describe('.isStepVisible', () => {
    const component = shallow(
      <Form name={'form'} action={'/'} data={form} />,
    );

    it('returns true for activeStepIndex', () => {
      const stepOneIsVisible = component.instance().isStepVisible(component.state().activeStepIndex);

      expect(stepOneIsVisible).toBe(true);
    });

    it('returns false for secondStep', () => {
      const stepTwoIsVisible = component.instance().isStepVisible(component.state().activeStepIndex + 1);

      expect(stepTwoIsVisible).toBe(false);
    });
  });


  describe('.isLastStep', () => {
    it('returns false for firstStep ', () => {
      const component = shallow(
        <Form name={'form'} action={'/'} data={form} />,
      );

      const stepOne = component.state().activeStepIndex;
      const stepOneIsLast = component.instance().isLastStep(stepOne);

      expect(stepOneIsLast).toBe(false);
    });

    it('returns true for secondStep ', () => {
      const component = shallow(
        <Form name={'form'} action={'/'} data={form} />,
      );

      const stepTwo = component.state().activeStepIndex + 1;
      const stepTwoIsLast = component.instance().isLastStep(stepTwo);

      expect(stepTwoIsLast).toBe(true);
    });
  });
});
