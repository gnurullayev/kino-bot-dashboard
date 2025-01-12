import React, { useState } from "react";
import { Menu, MenuProps } from "antd";
import { menuItems } from "@/constants/menu";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuWrapper, SiderWrapper } from "./style";
import { useTranslation } from "react-i18next";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState(location.pathname);
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation()
  const items: MenuItem[] = menuItems(t).map((item) =>
    getItem(
      item.name,
      item.path
      // <item.icon />
      // <item.icon />
      // item.sub?.map((subItem) =>
      //   getItem(subItem.name, subItem.path, <item.icon />)
      // )
    )
  );

  const onChange = (e: any) => {
    navigate(e.key);
    setActiveKey(e.key);
  };

  return (
    <SiderWrapper
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="inner">
        <MenuWrapper>
          <span className="title">Dashbord</span>

          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={[activeKey]}
            mode="inline"
            items={items}
            // onChange={onChange}
            onClick={onChange}
          />
        </MenuWrapper>
      </div>
    </SiderWrapper>
  );
};

export default Sidebar;
