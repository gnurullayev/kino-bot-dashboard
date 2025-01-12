import { Form } from "@/Components/common/Form";
import { Input } from "@/Components/common/Input";
import { Button } from "antd";

function Home() {
  const handleSubmit = (_value: any) => {
  };

  return (
    <>
      <Form onFinish={handleSubmit}>
        <Input name="name" />
        <Input name="surname" />
        {/* <Select
          name="type"
          list={false}
          options={[{ label: "fasdfsd", value: "fsadfsda" }]}
        /> */}
        <Button htmlType="submit">Submit</Button>
      </Form>
    </>
  );
}

export default Home;
