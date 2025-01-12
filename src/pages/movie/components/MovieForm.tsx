import { Checkbox } from "@/Components/common/Checkbox";
import { DatePicker } from "@/Components/common/DatePicker";
import { Form as FormComponent } from "@/Components/common/Form";
import { Input } from "@/Components/common/Input";
import { Select } from "@/Components/common/Select";
import { Textarea } from "@/Components/common/Textarea";
import Upload from "@/Components/common/Upload/Upload";
import { ApiEndpoints } from "@/enums/query-keys";
import { retryMutate } from "@/hooks/use-mutation";
import { FormParams } from "@/interfaces";
import { IMovie } from "@/interfaces/movie";
import { API } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Form } from "antd";

interface Params extends FormParams {
  initialData: IMovie;
}

const DATE_FORMAT = "YYYY-MM-DD";

const MovieForm = ({ initialData, mode, mutate, formFooter }: Params) => {
  const [form] = Form.useForm();

  const onFinish = (data: any) => {
    console.log(data);

    let poster_url = null;
    if (data.poster_url) {
      if (typeof data.poster_url === "string") {
        poster_url = null;
      } else {
        poster_url = data.poster_url.file.originFileObj;
      }
    } else {
      poster_url = null;
    }

    if (mutate) {
      const mutateData = {
        ...data,
        poster_url,
        release_date: JSON.parse(JSON.stringify(data.release_date)),
        is_active: Number(data.is_active),
      };
      mutate(mutateData, retryMutate(mutate, mutateData));
    }
  };

  const { data: regions, isLoading } = useQuery({
    queryKey: [ApiEndpoints.regionsGet],
    queryFn: async () => await API.getCounties().then((res) => res),
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: [ApiEndpoints.categoriesGet],
    queryFn: async () => await API.getAllCategories().then((res) => res),
  });

  const { data: tags, isLoading: tagsLoading } = useQuery({
    queryKey: [ApiEndpoints.tagsGet],
    queryFn: async () => await API.getAllTags().then((res) => res),
  });

  const { data: genres, isLoading: genresLoading } = useQuery({
    queryKey: [ApiEndpoints.genresGet],
    queryFn: async () => await API.getAllGenres().then((res) => res),
  });

  // const data = initialData.tags.map((tag) => tag.id);

  // console.log(data);

  return (
    <FormComponent initialValues={initialData} onFinish={onFinish} form={form}>
      <Select
        name="category_id"
        label="Category"
        customMode={mode}
        loading={categoriesLoading}
        list={false}
        dataSource={categories}
        rules={[
          {
            required: true,
            message: "Please select a country",
          },
        ]}
      />

      <Select
        name="region_id"
        label="Davlat"
        customMode={mode}
        loading={isLoading}
        list={false}
        dataSource={regions}
        rules={[
          {
            required: true,
            message: "Please select a country",
          },
        ]}
      />

      <Input
        name="title"
        label="Sarlovha"
        mode={mode}
        rules={[
          {
            required: true,
            message: "Please select a date",
          },
        ]}
      />

      <Select
        name="genres"
        label="Janir"
        customMode={mode}
        mode={"multiple"}
        list={false}
        dataSource={genres}
        rules={[
          {
            required: true,
            message: "Please select a country",
          },
        ]}
      />

      <Select
        name="tags"
        label="Tag"
        customMode={mode}
        mode={"multiple"}
        list={false}
        dataSource={tags}
        rules={[
          {
            required: true,
            message: "Please select a tags",
          },
        ]}
      />

      <Input
        name="duration"
        label="Davomiyligi"
        mode={mode}
        type="number"
        rules={[
          {
            required: true,
            message: "Please select a date",
          },
        ]}
      />

      <Input
        name="video_url"
        label="Video url"
        mode={mode}
        rules={[
          {
            required: true,
            message: "Please select a date",
          },
        ]}
      />

      <Input
        name="short_content"
        label="Qisqa kontent"
        mode={mode}
        rules={[
          {
            required: true,
            message: "Iltimos qisqa kontent kiriting",
          },
        ]}
      />

      <Textarea name="description" label="Tarif" mode={mode} list={false} />

      <DatePicker
        name="release_date"
        label="Ishlab chiqarilgan vaqti"
        mode={mode}
        format={DATE_FORMAT}
        rules={[
          {
            required: true,
            message: "Please select a date",
          },
        ]}
      />

      <Checkbox
        name="is_active"
        label="Is active"
        mode={mode}
        checked={initialData.is_active}
      />

      <Upload
        name="poster_url"
        label="Poster"
        list={false}
        mode={mode}
        filePath={initialData.poster_url}
        rules={[
          {
            required: true,
            message: "Please select a date",
          },
        ]}
      />
      <Input isHidden={true} name="id" mode={mode} />
      {formFooter}
    </FormComponent>
  );
};

export default MovieForm;
