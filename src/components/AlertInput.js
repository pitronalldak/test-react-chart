import React from "react";
import { withToastManager } from "react-toast-notifications";

import { WebSocket } from "../service/WebSocket";

class AlertInputCmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { thresholdValue: undefined };

    this.handleValue = this.handleValue.bind(this);
    this.handleThresholdValue = this.handleThresholdValue.bind(this);
  }

  componentDidMount() {
    WebSocket.subscribeSignal("data", this.handleValue);
  }

  handleValue(updatedData) {
    const { thresholdValue } = this.state;
    const { toastManager } = this.props;

    if (updatedData && thresholdValue && updatedData.value > thresholdValue) {
      toastManager.add(`Value: ${updatedData.value}`, {
        appearance: "error",
        autoDismiss: true,
        pauseOnHover: false
      });
    }
  }

  handleThresholdValue(event) {
    this.setState({ thresholdValue: event.target.value });
  }

  render() {
    return (
      <div style={{ marginTop: "24px", marginLeft: "48px" }}>
        <label style={{ display: "block" }}>Alert threshold</label>
        <input onChange={this.handleThresholdValue} />
      </div>
    );
  }
}

export const AlertInput = withToastManager(AlertInputCmp);
