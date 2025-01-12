import { API } from "@/services/api";
import { CreateFormFooter, PageLoading } from "@/Components";
import { FormMode } from "@/enums/form-mode";
import { useCustomMutation } from "@/hooks/use-mutation";
import { route } from "@/utils";
import { routes } from "@/constants/routes";
import { useShowError } from "@/hooks/use-show-error";
import { useGenreFormState } from "./hooks/use-form-state";
import CategoryForm from "./components/GenreForm";

const GenreCreate = () => {
  const { data, isPending } = useGenreFormState();

  const mutationFn = async (data: any) => await API.postGenres(data);
  const {
    submitData,
    mutate,
    isPending: editPending,
    error,
    isError,
    isSuccess,
  } = useCustomMutation({ mutationFn });

  useShowError(error, isError);

  if (isPending) return <PageLoading />;

  return (
    <CategoryForm
      initialData={data}
      mode={FormMode.create}
      loading={editPending}
      mutate={mutate}
      formFooter={
        <CreateFormFooter
          isSuccess={isSuccess}
          cancelPath={route(routes.GENRES)}
          createdPath={route(routes.GENRES)}
          submitLoading={editPending}
        />
      }
    />
  );
};

export default GenreCreate;
