import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, message, Modal } from "antd";
import { title } from "process";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type PromiseFn = (id: string) => Promise<any>;
interface Props {
  id: string;
  deletePromiseFn: PromiseFn;
  title: string;
  content?: string;
  redirectPath?: string;
}

const { confirm } = Modal;

function DeleteConfirmationModal({
  id,
  deletePromiseFn,
  title,
  content,
  redirectPath,
}: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const showPromiseConfirm = ({
    id,
    deletePromiseFn,
    title = "Ma'lumot",
    content,
    redirectPath,
  }: Props) => {
    confirm({
      title: `${title}ni o'chirib tashlamoqchmisiz ?`,
      icon: <ExclamationCircleFilled />,
      content: content
        ? content
        : `Agar siz ha tugmasini tanlasangiz ${title} o'chirib tashlanadi`,
      onOk() {
        return deletePromiseFn(id)
          .then(() => {
            if (redirectPath) {
              navigate(redirectPath);
            }
            message.success("Ma'lumot o'chirildi");
          })
          .catch((error) => {
            message.error("Error: " + error.message);
            console.log("Oops, there was an error!");
          });
      },
      okText: "Ha",
      cancelText: "Yo'q",
      onCancel() {},
    });
  };
  return (
    <Button
      danger
      onClick={() =>
        showPromiseConfirm({
          id,
          deletePromiseFn,
          title,
          content,
          redirectPath,
        })
      }
    >
      {t("Buttons.delete")}
    </Button>
  );
}

export default DeleteConfirmationModal;
