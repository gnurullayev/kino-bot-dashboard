import { API } from "@/services/api";
import { EditFormFooter, PageLoading } from "@/Components";
import { FormMode } from "@/enums/form-mode";
import { useCustomMutation } from "@/hooks/use-mutation";
import { route } from "@/utils";
import { routes } from "@/constants/routes";
import { useShowError } from "@/hooks/use-show-error";
import { useEffect } from "react";
import { dispatch } from "@/redux";
import { useCategoryFormState } from "./hooks/use-form-state";
import CategoryForm from "./components/CategoryForm";

const CategoryEdit = () => {
  const { data, isPending, id } = useCategoryFormState();

  const mutationFn = async (data: any) =>
    await API.updateCategories(data, id as string);
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
    <CategoryForm
      initialData={data}
      mode={FormMode.edit}
      loading={editPending}
      mutate={mutate}
      formFooter={
        <EditFormFooter
          path={route(routes.CATEGORIES)}
          submitLoading={editPending}
          isSuccess={isSuccess}
        />
      }
    />
  );
};

export default CategoryEdit;
