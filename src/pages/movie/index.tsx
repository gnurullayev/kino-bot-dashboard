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
import { IMovie } from "@/interfaces/movie";
import { useTableSearch } from "@/hooks/use-table-search";
import { Tag } from "antd";

const deletePromiseFn = (id: string, setDeleteData: any) =>
  API.deleteMovies(id).then((res) => {
    setDeleteData(id);
    return res;
  });

interface MyDataType {
  id: string;
  s: string;
}

const Movies = () => {
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
      title: "poster",
      key: "poster_url",
      render: (_: any, record: IMovie) => (
        <img
          src={record.poster_url}
          width={60}
          height={60}
          style={{ objectFit: "contain" }}
          alt="poster url"
        />
      ),
    },
    {
      title: "Sarlovha",
      dataIndex: "title",
      sorter: true,
      key: "title",
      ...getColumnSearchProps("s", "input"),
    },
    {
      title: "Chiqarilgan yili",
      dataIndex: "release_date",
      key: "release_date",
    },
    // {
    //   title: "Video tekshiruv",
    //   key: "qualities",
    //   render: (_: any, { qualities }: IMovie) => (
    //     <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
    //       <Tag color={qualities.length > 0 ? "success" : "warning"}>
    //         {qualities.length > 0 ? "Kino joylangan" : "Kino joylanmagan"}
    //       </Tag>
    //     </div>
    //   ),
    // },
    {
      title: "Holati",
      key: "is_active",
      render: (_: any, record: IMovie) => (
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
      render: (_: any, record: IMovie) => (
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Button
            type="primary"
            onClick={() =>
              customNavigate(
                route(routes.MOVIES_EDIT, { id: record.id as string }),
                search
              )
            }
            label={t("edit")}
          />
          <Button
            type="primary"
            onClick={() =>
              customNavigate(
                route(routes.VIDEO_UPLOAD, { id: record.id as string }),
                search
              )
            }
            label={t("upload")}
          />

          <Button
            type="link"
            onClick={() =>
              customNavigate(
                route(routes.MOVIES_SHOW, { id: record.id as string }),
                search
              )
            }
            label={t("read")}
          />

          <DeleteConfirmationModal
            id={record.id as string}
            deletePromiseFn={(id) => deletePromiseFn(id, setDeleteData)}
            title="Kino"
          />
        </div>
      ),
    },
  ];

  const request = useMemo(() => {
    return {
      queryKey: ApiEndpoints.moviesGet,
      queryFn: (params: any) => API.getMovies({ ...params, ig: false }),
    };
  }, []);

  return (
    <Table
      columns={columns}
      rowKey="id"
      request={request}
      createUrl={routes.MOVIES_CREATE}
      refetchData={deleteData}
      customParams={customParams}
    />
  );
};

export default Movies;
