import { API } from "@/services/api";
import { EditFormFooter, PageLoading } from "@/Components";
import { FormMode } from "@/enums/form-mode";
import { useCustomMutation } from "@/hooks/use-mutation";
import { route } from "@/utils";
import { routes } from "@/constants/routes";
import { useEffect } from "react";
import { dispatch } from "@/redux";
import MovieForm from "./components/MovieForm";
import { useMovieFormState } from "./hooks/use-form-state";
import { useShowError } from "@/hooks/use-show-error";

const MoviesEdit = () => {
  const { data, isPending } = useMovieFormState();

  const mutationFn = async (data: any) => await API.updateMovies(data);
  const {
    mutate,
    isPending: editPending,
    error,
    isError,
    isSuccess,
  } = useCustomMutation({ mutationFn });

  useShowError(error, isError);

  useEffect(() => {
    if (data) {
      dispatch.extra.changeExtraData({ pathIdName: data.name });
    }
  }, [data]);
  if (isPending) return <PageLoading />;
  return (
    <MovieForm
      initialData={data}
      mode={FormMode.edit}
      loading={editPending}
      mutate={mutate}
      formFooter={
        <EditFormFooter
          path={route(routes.MOVIES)}
          submitLoading={editPending}
          isSuccess={isSuccess}
        />
      }
    />
  );
};

export default MoviesEdit;
