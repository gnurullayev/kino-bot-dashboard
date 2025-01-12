import { Checkbox } from "@/Components/common/Checkbox";
import { Form } from "@/Components/common/Form";
import { Input } from "@/Components/common/Input";
import { Select } from "@/Components/common/Select";
import Upload from "@/Components/common/Upload/Upload";
import { FormMode } from "@/enums/form-mode";
import { ApiEndpoints } from "@/enums/query-keys";
import { retryMutate } from "@/hooks/use-mutation";
import { FormParams } from "@/interfaces";
import { User } from "@/interfaces/user";
import { API } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

interface Params extends FormParams {
  initialData: User;
}

const UserForms = ({ initialData, mode, mutate, formFooter }: Params) => {
  const onFinish = (data: any) => {
    let photoUrl = null;
    if (data.photoUrl) {
      if (typeof data.photoUrl === "string") {
        photoUrl = null;
      } else {
        photoUrl = data.photoUrl.file.originFileObj;
      }
    } else {
      photoUrl = null;
    }

    if (mutate) {
      const mutateData = {
        ...data,
        photoUrl,
      };
      mutate(data, retryMutate(mutate, mutateData));
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

  // const { data: languages, isLoading: isLanguagesLoading } = useQuery({
  //   queryKey: [ApiEndpoints.languageGet],
  //   queryFn: async () =>
  //     await API.getLanguages().then((res) =>
  //       res.list.map((language: Language) => ({
  //         ...language,
  //         value: language.id,
  //         label: language.name,
  //       }))
  //     ),
  // });

  const isView = mode === FormMode.view;
  return (
    <Form initialValues={initialData} onFinish={onFinish}>
      <Input name="firstName" label="First name" mode={mode} />
      <Input name="lastName" label="last name" mode={mode} />
      <Input
        name="phoneNumber"
        label="Phone number"
        mode={mode}
        type="number"
      />
      {isView && (
        <>
          <Input name="age" label="Age" mode={mode} type="number" />
          <Input name="gem" label="Gem" mode={mode} type="number" />
          <Input name="diamond" label="Diamond" mode={mode} type="number" />
          <Input name="role" label="Role" mode={mode} />
        </>
      )}
      {/* <Select
        name="regionId"
        label="Region"
        customMode={mode}
        loading={isLoading}
        list={false}
        dataSource={regions}
      />
      {isView && (
        <Select
          name="languageId"
          label="Language"
          customMode={mode}
          list={false}
          loading={isLanguagesLoading}
          dataSource={languages}
        />
      )} */}

      <Upload
        name="photoUrl"
        label="PhotoUrl"
        list={false}
        mode={mode}
        filePath={initialData.photoUrl}
      />

      {isView && (
        <Checkbox
          name="isActive"
          label="Is active"
          mode={mode}
          checked={initialData.isActive}
        />
      )}

      <Checkbox
        name="isMale"
        label="Is male"
        mode={mode}
        checked={initialData.isMale}
      />

      <Input isHidden={true} name="id" mode={mode} />
      {formFooter}
    </Form>
  );
};

export default UserForms;
