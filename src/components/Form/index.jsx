import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from '../Step';
import Breadcrumb from '../Breadcrumb';
import { validateField, validateStep } from './validation';
import { AppContext, AppProvider } from './AppProvider';

const propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  action: PropTypes.string.isRequired,
  method: PropTypes.string,
};

const defaultProps = {
  method: 'POST',
};

export default class Form extends Component {
  constructor() {
    super();

    this.state = {
      activeStepIndex: 0,
      stepsCount: 0,
      steps: [],
    };

    this.sectionStyle = "wall--inverted col-normal-8 col-small-12";
    this.formStyle = "form container sh-form-content space-box-small";

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  get currentStep() {
    const { steps, activeStepIndex } = this.state;

    return steps[activeStepIndex];
  }

  componentDidMount() {
    this.setState({
      activeStepIndex: 0,
      stepsCount: this.props.data.steps.length - 1,
      steps: this.props.data.steps,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    this.handleStepChange();
  }

  handleButtonClick(evt) {
    evt.preventDefault();

    this.handleStepChange();
  }

  handleStepChange() {
    const { updatedFields, isValid } = validateStep(this.currentStep.fields);

    this.updateStep(updatedFields);

    if (isValid) {
      this.nextStep(this.state);
    }
  }

  nextStep({ activeStepIndex, stepsCount }) {
    if (activeStepIndex < stepsCount) {
      this.setState({ activeStepIndex: activeStepIndex + 1 });
    }
  }

  onFieldChange({ value, id, required, type, minLength }) {
    const fields = this.currentStep.fields.map((item) => {
      const itemID = `${this.props.name}-${item.id}`;

      if (itemID === id) {
        const errorMessage = validateField({ required, type, value, minLength });

        return Object.assign({}, item, { value, errorMessage });
      }

      return item;
    });

    this.updateStep(fields);
  }

  updateStep(fields) {
    const { steps, activeStepIndex } = this.state;

    let modifiedSteps = [...steps];
    let modifiedStep = Object.assign({}, modifiedSteps[activeStepIndex], { fields });

    modifiedSteps[activeStepIndex] = modifiedStep;

    this.setState({
      steps: modifiedSteps,
    });
  }

  isStepVisible(index) {
    return this.state.activeStepIndex === index;
  }

  isLastStep(index) {
    return index === this.state.stepsCount;
  }

  render() {
    const { action, method, name } = this.props;

    return (
      <section className={this.sectionStyle}>
      <AppProvider>
        <AppContext.Consumer>
          {(state) => <div>{ console.log(state) }</div>}
        </AppContext.Consumer>
      </AppProvider>
        <form noValidate onSubmit={this.handleSubmit} action={action} method={method} name={name} className={this.formStyle}>
          {
            this.state.steps.map((step, index) => {
              const { buttonText, headerMarkup, fields } = step;

              return (
                <Step
                  visible={this.isStepVisible(index)}
                  key={`${name}-step-${index}`}
                  isLast={this.isLastStep(index)}
                  handleButtonClick={this.handleButtonClick}
                  onFieldChange={this.onFieldChange}
                  formName={name}
                  buttonText={buttonText}
                  headerMarkup={headerMarkup}
                  fields={fields} />
              )
            })
          }
        </form>

        <Breadcrumb active={this.state.activeStepIndex} steps={this.state.steps} />
      </section>
    );
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;
