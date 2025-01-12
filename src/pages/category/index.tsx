import { Table } from "@/Components/common/Table";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/Components/common/Button";
import { API } from "@/services/api";
import { ApiEndpoints } from "@/enums/query-keys";
import { routes } from "@/constants/routes";
import { route } from "@/utils";
import { DeleteConfirmationModal } from "@/Components";
import { useCustomNavigate } from "@/hooks/use-custom-navigate";
import { useTranslation } from "react-i18next";
import { ICategory } from "@/interfaces/category";
import { useTableSearch } from "@/hooks/use-table-search";
import { Tag } from "antd";

const deletePromiseFn = (id: string, setDeleteData: any) =>
  API.deleteCategories(id).then((res) => {
    setDeleteData(id);
    return res;
  });

interface MyDataType {
  id: string;
  s: string;
}

const Categories = () => {
  const [deleteData, setDeleteData] = useState(null);
  const { customNavigate, search } = useCustomNavigate();
  const { t } = useTranslation();
  const [customParams, setCustomParams] = useState({
    s: "",
  });
  const { getColumnSearchProps, searchText, searchedColumn } =
    useTableSearch<MyDataType>();

  useEffect(() => {
    if (searchedColumn) {
      setCustomParams((prev) => ({
        ...prev,
        [searchedColumn]: searchText ? searchText : "",
      }));
    }
  }, [searchedColumn, searchText]);

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      sorter: true,
      key: "name",
      ...getColumnSearchProps("s", "input"),
    },
    {
      title: "Holati",
      key: "is_active",
      render: (_: any, record: ICategory) => (
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Tag color={record.is_active ? "success" : "warning"}>
            {record.is_active ? "Faol" : "No faol"}
          </Tag>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: ICategory) => (
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Button
            type="primary"
            onClick={() =>
              customNavigate(
                route(routes.CATEGORIES_EDIT, { id: record.id as string }),
                search
              )
            }
            label={t("edit")}
          />

          <Button
            type="link"
            onClick={() =>
              customNavigate(
                route(routes.CATEGORIES_SHOW, { id: record.id as string }),
                search
              )
            }
            label={t("read")}
          />

          <DeleteConfirmationModal
            id={record.id as string}
            deletePromiseFn={(id) => deletePromiseFn(id, setDeleteData)}
            title="Category"
          />
        </div>
      ),
    },
  ];

  const request = useMemo(() => {
    return {
      queryKey: ApiEndpoints.categoriesGet,
      queryFn: (params: any) => API.getCategories({ ...params, ig: false }),
    };
  }, []);

  return (
    <Table
      columns={columns}
      rowKey="id"
      request={request}
      createUrl={routes.CATEGORIES_CREATE}
      refetchData={deleteData}
      customParams={customParams}
    />
  );
};

export default Categories;
