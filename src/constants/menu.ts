import { UserOutlined, ProductOutlined } from "@ant-design/icons";
import { routes } from "./routes";

interface Item {
  name: string;
  icon: any;
  path: string;
}

interface MenuItem extends Item {
  sub?: Item[];
}

export const menuItems = (t: any): MenuItem[] => [
  { name: t("Sidebar.users"), icon: UserOutlined, path: "/users" },

  // { name: t("Sidebar.friends"), path: "/friends", icon: UserOutlined }, // Uncomment if needed
  { name: "Category", path: routes.CATEGORIES, icon: ProductOutlined },
  { name: "Kinolar", path: routes.MOVIES, icon: ProductOutlined },
  { name: "Tags", path: routes.TAGS, icon: ProductOutlined },
  { name: "Genres", path: routes.GENRES, icon: ProductOutlined },
];
