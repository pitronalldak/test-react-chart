import React from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries
} from "react-vis";

import { WebSocket } from "../service/WebSocket";

const MIN_RANDOM_NUMBER = -100;
const MAX_RANDOM_NUMBER = 100;

export class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };

    this.updateChart = this.updateChart.bind(this);
    this.getUpdatedData = this.getUpdatedData.bind(this);
  }

  componentDidMount() {
    this.initialTime = Date.now();
    this.setState({ data: [{ x: 0, y: 0 }] });

    WebSocket.subscribeSignal("data", this.updateChart);
  }

  updateChart(updatedData) {
    if (updatedData) {
      this.setState(({ data }) => ({
        data: this.getUpdatedData(data, updatedData)
      }));
    }
  }

  getUpdatedData(data, updatedData) {
    return [
      ...data,
      {
        y: updatedData.value,
        x: (updatedData.timestamp - this.initialTime) / 1000
      }
    ];
  }

  render() {
    const { data } = this.state;
    return (
      <XYPlot
        animation
        width={400}
        height={400}
        yDomain={[MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER]}
      >
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis title="timestamp" on0 />
        <YAxis title="value" />
        <LineSeries data={data} />
      </XYPlot>
    );
  }
}
