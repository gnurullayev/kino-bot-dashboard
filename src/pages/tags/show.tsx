import { PageLoading, ShowFormFooter } from "@/Components";
import { FormMode } from "@/enums/form-mode";
import { route } from "@/utils";
import { routes } from "@/constants/routes";
import { useEffect } from "react";
import { dispatch } from "@/redux";
import CategoryForm from "./components/TagForm";
import { useTagFormState } from "./hooks/use-form-state";

const TagShow = () => {
  const { data, isPending, id } = useTagFormState();

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
          path={route(routes.TAGS_EDIT, { id })}
          cancelRedirectPath={routes.TAGS}
        />
      }
    />
  );
};

export default TagShow;
