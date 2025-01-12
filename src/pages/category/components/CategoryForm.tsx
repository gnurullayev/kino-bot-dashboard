import { Checkbox } from "@/Components/common/Checkbox";
import { Form } from "@/Components/common/Form";
import { Input } from "@/Components/common/Input";
import { retryMutate } from "@/hooks/use-mutation";
import { FormParams } from "@/interfaces";
import { ICategory } from "@/interfaces/category";

interface Params extends FormParams {
  initialData: ICategory;
}

const CategoryForm = ({ initialData, mode, mutate, formFooter }: Params) => {
  const onFinish = (data: any) => {
    if (mutate) {
      mutate(
        data,
        retryMutate(mutate, { ...data, is_active: Number(data.is_active) })
      );
    }
  };

  // const { data: regions, isLoading } = useQuery({
  //   queryKey: [ApiEndpoints.regionsGetAll],
  //   queryFn: async () =>
  //     await API.getRegions().then((res) =>
  //       res.list.map((region: Region) => ({
  //         ...region,
  //         value: region.id,
  //         label: region.name,
  //       }))
  //     ),
  // });

  return (
    <Form initialValues={initialData} onFinish={onFinish}>
      <Input name="name" label="Name" mode={mode} />

      <Checkbox
        name="is_active"
        label="Is active"
        mode={mode}
        checked={initialData.is_active}
      />
      <Input isHidden={true} name="id" mode={mode} />
      {formFooter}
    </Form>
  );
};

export default CategoryForm;
