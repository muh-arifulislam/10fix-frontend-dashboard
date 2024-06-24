import { Grid } from "antd";

const { useBreakpoint } = Grid;

export const useScreens = () => {
  return useBreakpoint();
};
