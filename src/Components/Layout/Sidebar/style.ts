import { Layout } from "antd";
import styled from "styled-components";
const { Sider } = Layout;
export const MenuWrapper = styled.div`
  .title {
    display: block;
    padding: 20px 0;
    text-align: center;
    color: #fff;
  }
`;

export const SiderWrapper = styled(Sider)`
  .inner {
    position: sticky !important;
    top: 0;
  }
`;
