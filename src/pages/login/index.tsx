import { Button } from "@/Components/common/Button";
import { Form } from "@/Components/common/Form";
import { Input } from "@/Components/common/Input";
import styles from "./login.module.css";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/services/api";
import { message } from "antd";
import { dispatch } from "@/redux";
import { ApiStatus } from "@/enums/api-status";

function Login() {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const { isPending, mutate } = useMutation({
    mutationFn: (data) => API.login(data),
    onSuccess: (response) => {
      if (response.status === ApiStatus.success) {
        dispatch.auth.login({
          token: response.token,
        });
        dispatch.userData.changeUserData(response.user);
        message.success("sucsess");
      }
    },
    onError: (err) => {
      message.error(err.message);
    },
  });

  const onFinish = (data: any) => {
    mutate(data);
  };

  const isloading = isPending;

  return (
    <div className={styles.login}>
      <div className={styles.form_container}>
        <Form onFinish={onFinish}>
          <Input
            type="text"
            name="email"
            placeholder="Email"
            rules={[{ required: true, message: "Email kiriting" }]}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            rules={[{ required: true, message: "Parollni kiriting" }]}
          />
          <Button
            loading={isloading}
            disabled={isloading}
            type="primary"
            label={t("auth.login")}
            htmlType="submit"
            className={styles.form_button}
          />
        </Form>
      </div>
    </div>
  );
}

export default Login;
