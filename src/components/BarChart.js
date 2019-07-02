import React from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries
} from "react-vis";

import { WebSocket } from "../service/WebSocket";

const CATEGORY_STEP = 10;

export class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [...Array(20).keys()].map(item => ({
        x: `${(item - 10) * CATEGORY_STEP}, ${(item - 9) * CATEGORY_STEP}`,
        y: 0
      }))
    };
    this.updateChart = this.updateChart.bind(this);
    this.getUpdatedData = this.getUpdatedData.bind(this);
  }

  componentDidMount() {
    this.initialTime = Date.now();

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
    const categoryIndex = Math.ceil(updatedData.value / CATEGORY_STEP) + 9;
    data[categoryIndex].y += 1;

    return data;
  }

  render() {
    const { data } = this.state;
    return (
      <XYPlot
        xType="ordinal"
        animation
        width={400}
        height={400}
        animation
        style={{ marginLeft: "24px" }}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis tickLabelAngle={-45} />
        <YAxis />
        <VerticalBarSeries data={data} />
      </XYPlot>
    );
  }
}
