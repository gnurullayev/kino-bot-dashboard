import { useDetailData } from "@/hooks/use-detail-query";
import { ICategory } from "@/interfaces/category";
import { API } from "@/services/api";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

const initialData: ICategory = {
  id: null,
  name: "",
  is_active: false,
};

export const useTagFormState = () => {
  const { id: categoryId } = useParams();

  const mutationFn = async (categoryId: any) =>
    await API.getTagsById(categoryId);
  const { isPending, submitData } = useDetailData({ mutationFn });

  const defaultData: any = useMemo(() => {
    if (categoryId && submitData) {
      return {
        ...submitData,
        id: String(submitData.id),
      };
    } else return initialData;
  }, [categoryId, submitData]);

  const isLoading = categoryId ? isPending : false;

  return { data: defaultData, isPending: isLoading, id: categoryId };
};
