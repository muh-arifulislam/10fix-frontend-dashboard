import { Card, Flex } from "antd";
import React from "react";

type PropsType = {
  title: string;
  icon?: React.ReactNode;
  value: number | string;
};

const StatsCard = ({ title, icon, value }: PropsType) => {
  return (
    <Card bordered={false}>
      <Flex align="center" justify="space-between">
        <h1 style={{ fontSize: "1rem", fontWeight: "400" }}>{title}</h1>
        {icon}
      </Flex>
      <h2
        style={{
          marginTop: "20px",
        }}
      >
        {value}
      </h2>
    </Card>
  );
};

export default StatsCard;
