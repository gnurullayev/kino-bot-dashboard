import { FC, ReactNode } from "react";

import type { LayoutProps } from "antd";
import { Layout as LayoutComponent, theme } from "antd";
import Breadcrumb from "../Breadcrumb";
import Sidebar from "./Sidebar";
import Header from "./Header";

const { Content, Footer } = LayoutComponent;

interface Props extends LayoutProps {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <LayoutComponent style={{ minHeight: "100vh" }}>
      <Sidebar />

      <LayoutComponent>
        <Header />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb />

          <div>{children}</div>
        </Content>

        {/* <Footer style={{ textAlign: "center" }}>
          Boriga ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </LayoutComponent>
    </LayoutComponent>
  );
};

export default Layout;
