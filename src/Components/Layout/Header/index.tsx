import { HeaderWrapper } from "./style";
import { Avatar, Dropdown, Menu, message, theme } from "antd";
import LanguageDropdown from "@/Components/LanguageDropdown";
import { Link } from "react-router-dom";
import { routes } from "@/constants/routes";
import { User } from "@/interfaces/user";
import { useSelector } from "react-redux";
import { dispatch, RootState } from "@/redux";

interface Props { }

function Header() {
  const user: User = useSelector((state: RootState) => state.userData.user);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const Logout = () => {
    dispatch.auth.logoutAsync()
  }

  const transformName = user.name ? user.name[0].toUpperCase() : ""
  const menu = (
    <Menu>
      <Link to={"/"}> <Menu.Item key="1">Profile</Menu.Item></Link>
      {/* <Menu.Item key="2">2nd menu item</Menu.Item> */}
      <Menu.Item key="2" onClick={Logout}>Logout</Menu.Item>
    </Menu>
  );  

  return (
    <HeaderWrapper
      style={{
        background: colorBgContainer,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span></span>
      <div className="header-right">
        <LanguageDropdown />

        <div>
          <Dropdown overlay={menu}>
            <Avatar
              style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
              size="large"
              gap={4}
            >
              {transformName}
            </Avatar>
          </Dropdown>
        </div>
      </div>
    </HeaderWrapper>
  );
}

export default Header;
