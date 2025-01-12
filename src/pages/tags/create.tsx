import { API } from "@/services/api";
import { CreateFormFooter, PageLoading } from "@/Components";
import { FormMode } from "@/enums/form-mode";
import { useCustomMutation } from "@/hooks/use-mutation";
import { route } from "@/utils";
import { routes } from "@/constants/routes";
import { useShowError } from "@/hooks/use-show-error";
import { useTagFormState } from "./hooks/use-form-state";
import TagForm from "./components/TagForm";

const TagCreate = () => {
  const { data, isPending } = useTagFormState();

  const mutationFn = async (data: any) => await API.postTags(data);
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
    <TagForm
      initialData={data}
      mode={FormMode.create}
      loading={editPending}
      mutate={mutate}
      formFooter={
        <CreateFormFooter
          isSuccess={isSuccess}
          cancelPath={route(routes.TAGS)}
          createdPath={route(routes.TAGS)}
          submitLoading={editPending}
        />
      }
    />
  );
};

export default TagCreate;
