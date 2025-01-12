import { PageLoading, ShowFormFooter } from "@/Components";
import { FormMode } from "@/enums/form-mode";
import { route } from "@/utils";
import { routes } from "@/constants/routes";
import { useEffect } from "react";
import { dispatch } from "@/redux";
import MovieForm from "./components/MovieForm";
import { useMovieFormState } from "./hooks/use-form-state";

const MoviesShow = () => {
  const { data, isPending, id } = useMovieFormState();

  useEffect(() => {
    if (data) {
      dispatch.extra.changeExtraData({ pathIdName: data.name });
    }
  }, [data]);
  if (isPending) return <PageLoading />;

  return (
    <MovieForm
      initialData={data}
      mode={FormMode.view}
      formFooter={
        <ShowFormFooter
          path={route(routes.MOVIES_EDIT, { id })}
          cancelRedirectPath={routes.MOVIES}
        />
      }
    />
  );
};

export default MoviesShow;
