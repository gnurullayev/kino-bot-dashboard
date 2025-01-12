import React, { useMemo } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb as BreadcrumbComponent } from "antd";
import { Link, useLocation, useParams } from "react-router-dom";
import { FormMode } from "@/enums/form-mode";
import { useSelector } from "react-redux";
import { ExtraData } from "@/redux/models/extra";

const transformPathName = (
  pathName: string,
  id: string | undefined,
  pathIdName: string
) => {
  const path = id
    ? pathName.replace(id, pathIdName ? pathIdName : "")
    : pathName;

  if (path.includes(`/${FormMode.edit}`))
    return path.replace(`/${FormMode.edit}`, "");
  else if (path.includes(`/show`)) return path.replace(`/show`, "");
  return path;
};
const Breadcrumb: React.FC = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { pathIdName }: ExtraData = useSelector((state: any) => state.extra);

  const pathArray = useMemo(() => {
    const paths = [
      ...new Set(transformPathName(pathname, id, pathIdName).split("/")),
    ];

    const breadcrumbItems = paths.map((path, idx) => {
      const link = "/".concat(path);
      if (path === "") {
        return {
          href: link,
          title: <HomeOutlined />,
        };
      } else if (idx === paths.length - 1) {
        return {
          title: path,
        };
      }
      return {
        href: link,
        title: path,
      };
    });

    return breadcrumbItems;
  }, [pathname, pathIdName]);

  return (
    <>
      <BreadcrumbComponent style={{ margin: "16px 0" }}>
        {pathArray.map((el) => (
          <BreadcrumbComponent.Item>
            {el.href ? <Link to={el.href}>{el.title}</Link> : el.title}
          </BreadcrumbComponent.Item>
        ))}
      </BreadcrumbComponent>
      {/* <BreadcrumbComponent items={pathArray} /> */}
    </>
  );
};

export default Breadcrumb;
