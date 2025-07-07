import { useGetStatisticsQuery } from "../../../redux/features/stats/statsApi";
import { Button, Card, Col, Flex, Grid, Row, Skeleton, Space } from "antd";
import StatsCard from "../../../component/ui/StatsCard";
import {
  CheckCircleOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import LineChart from "../../../component/chart/LineChart";

const Statistics = () => {
  const { data, isLoading } = useGetStatisticsQuery(undefined);

  const screens = Grid.useBreakpoint();

  if (isLoading) {
    return (
      <>
        <div>
          <Row
            gutter={[20, 20]}
            style={{
              marginBottom: "20px",
            }}
          >
            <Col xs={{ span: 24 }} sm={{ span: 6 }}>
              <Skeleton.Button
                active={true}
                block={true}
                style={{
                  height: "120px",
                }}
              />
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 6 }}>
              <Skeleton.Button
                active={true}
                block={true}
                style={{
                  height: "120px",
                }}
              />
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 6 }}>
              <Skeleton.Button
                active={true}
                block={true}
                style={{
                  height: "120px",
                }}
              />
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 6 }}>
              <Skeleton.Button
                active={true}
                block={true}
                style={{
                  height: "120px",
                }}
              />
            </Col>
          </Row>
          <div>
            <Skeleton.Button
              active={true}
              block={true}
              style={{
                height: "150px",
                marginBottom: "20px",
              }}
            />
            <Skeleton.Button
              active={true}
              block={true}
              style={{
                height: "150px",
              }}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <Row gutter={[20, 20]}>
        <Col xs={{ span: 24 }} sm={{ span: 6 }}>
          <StatsCard
            title="Total Customers"
            value={data?.data?.customer?.totalCustomers ?? "N/A"}
            icon={
              <UsergroupAddOutlined
                style={{
                  fontSize: "18px",
                }}
              />
            }
          />
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 6 }}>
          <StatsCard
            title="Total Orders"
            value={data?.data?.order?.totalOrders ?? "N/A"}
            icon={
              <ShoppingCartOutlined
                style={{
                  fontSize: "18px",
                }}
              />
            }
          />
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 6 }}>
          <StatsCard
            title="Completed Orders"
            value={data?.data?.order?.ordersByStatus?.completed ?? "N/A"}
            icon={
              <CheckCircleOutlined
                style={{
                  fontSize: "18px",
                }}
              />
            }
          />
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 6 }}>
          <StatsCard
            title="Average Ratings"
            value={Number(data?.data?.review).toFixed(2) ?? "N/A"}
            icon={
              <StarOutlined
                style={{
                  fontSize: "18px",
                }}
              />
            }
          />
        </Col>
      </Row>
      <Card
        style={{
          margin: "20px 0",
        }}
      >
        <Flex
          vertical={screens.xs}
          justify="space-between"
          align="center"
          gap={20}
          style={{
            marginBottom: "20px",
          }}
        >
          <h2>Monthly Order Trends</h2>
          <Space>
            <Button>Last 6 Months</Button>
          </Space>
        </Flex>
        <div
          style={{
            width: "100%",
            height: screens.xs ? "340px" : "500px",
          }}
        >
          {data?.success && (
            <LineChart
              id="ordersLineChart"
              data={data?.data?.order?.ordersOverTime}
            />
          )}
        </div>
      </Card>
      <Card
        style={{
          margin: "20px 0",
        }}
      >
        <Flex
          vertical={screens.xs}
          justify="space-between"
          align="center"
          gap={20}
          style={{
            marginBottom: "20px",
          }}
        >
          <h2>Monthly Customer Trends</h2>
          <Space>
            <Button>Last 6 Months</Button>
          </Space>
        </Flex>
        <div
          style={{
            width: "100%",
            height: screens.xs ? "340px" : "500px",
          }}
        >
          {data?.success && (
            <LineChart
              id="customerOverTime"
              data={data?.data?.customer?.customersOverTime}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default Statistics;
