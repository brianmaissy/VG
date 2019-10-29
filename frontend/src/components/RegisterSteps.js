import React from 'react';
import { Steps, Button, message } from 'antd';

const { Step } = Steps;

const steps = [
  {
    title: 'פרטי התחברות',
    content: 'First-content',
  },
  {
    title: 'פרטי בית הכנסת',
    content: 'Second-content',
  },
  {
    title: 'אישור התנאים',
    content: 'Last-content',
  },
  {
    title: 'סיום',
    content: 'Last-content',
  },
];

class RegisterSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default RegisterSteps;
