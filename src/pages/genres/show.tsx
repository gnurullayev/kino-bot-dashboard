import { PageLoading, ShowFormFooter } from "@/Components";
import { FormMode } from "@/enums/form-mode";
import { route } from "@/utils";
import { routes } from "@/constants/routes";
import { useEffect } from "react";
import { dispatch } from "@/redux";
import CategoryForm from "./components/GenreForm";
import { useGenreFormState } from "./hooks/use-form-state";

const GenreShow = () => {
  const { data, isPending, id } = useGenreFormState();

  useEffect(() => {
    if (data) {
      dispatch.extra.changeExtraData({ pathIdName: data.name });
    }
  }, [data]);
  if (isPending) return <PageLoading />;

  return (
    <CategoryForm
      initialData={data}
      mode={FormMode.view}
      formFooter={
        <ShowFormFooter
          path={route(routes.GENRES_EDIT, { id })}
          cancelRedirectPath={routes.GENRES}
        />
      }
    />
  );
};

export default GenreShow;
