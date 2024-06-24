import { ResponsiveLine } from "@nivo/line";
import { Grid } from "antd";

type PropsType = {
  data: { x: string; y: number }[];
  id: string | number;
};

const LineChart = ({ data, id }: PropsType) => {
  const screens = Grid.useBreakpoint();
  return (
    <ResponsiveLine
      data={[{ id, color: "hsl(111, 70%, 50%)", data: data }]}
      margin={{
        top: 50,
        right: screens.xs ? 20 : 60,
        bottom: 50,
        left: screens.xs ? 30 : 60,
      }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Months",
        legendOffset: 36,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Orders",
        legendOffset: -40,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabel="data.yFormatted"
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      useMesh={true}
    />
  );
};

export default LineChart;
