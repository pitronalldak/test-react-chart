import React from "react";
import { ToastProvider } from "react-toast-notifications";

import { LineChart } from "./LineChart";
import { BarChart } from "./BarChart";
import { AlertInput } from "./AlertInput";
import { WebSocket } from "../service/WebSocket";

export class Layout extends React.Component {
  componentDidMount() {
    WebSocket.init();
  }

  componentWillUnmount() {
    WebSocket.disconnect();
  }

  render() {
    return (
      <ToastProvider>
        <div style={{ display: "flex" }}>
          <LineChart />
          <BarChart />
          <AlertInput />
        </div>
      </ToastProvider>
    );
  }
}
