import { API } from "@/services/api";
import { CreateFormFooter, PageLoading } from "@/Components";
import { FormMode } from "@/enums/form-mode";
import { useCustomMutation } from "@/hooks/use-mutation";
import { route } from "@/utils";
import { routes } from "@/constants/routes";
import { useMovieFormState } from "./hooks/use-form-state";
import { useShowError } from "@/hooks/use-show-error";
import MovieForm from "./components/MovieForm";

const MovieCreate = () => {
  const { data, isPending } = useMovieFormState();

  const mutationFn = async (data: any) => await API.postMovies(data);
  const {
    mutate,
    isPending: editPending,
    error,
    isError,
    isSuccess,
  } = useCustomMutation({ mutationFn });

  if (isPending) return <PageLoading />;

  return (
    <MovieForm
      initialData={data}
      mode={FormMode.create}
      loading={editPending}
      mutate={mutate}
      formFooter={
        <CreateFormFooter
          isSuccess={isSuccess}
          cancelPath={route(routes.MOVIES)}
          createdPath={route(routes.MOVIES)}
          submitLoading={editPending}
        />
      }
    />
  );
};

export default MovieCreate;
