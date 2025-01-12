import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { Button } from "../common/Button";
import { message } from "antd";
import { useCustomNavigate } from "@/hooks/use-custom-navigate";
import { useTranslation } from "react-i18next";

interface Props {
  path: string;
  submitLoading: boolean;
  isSuccess: boolean;
}

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const EditFormFooter: FC<Props> = ({ submitLoading, path, isSuccess }) => {
  const { customNavigate, search } = useCustomNavigate();
  const { t } = useTranslation();
  const onCancel = (search: string) => {
    customNavigate(path, search);
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Ma'lumot saqlandi");
      setTimeout(() => {
        customNavigate(path, search);
      }, 1000);
    }
  }, [isSuccess, search]);

  return (
    <Wrapper>
      <Button
        htmlType="submit"
        type="primary"
        loading={submitLoading}
        label={t("save")}
      />
      <Button
        htmlType="button"
        type="default"
        onClick={() => onCancel(search)}
        label={t("cancel")}
      />
    </Wrapper>
  );
};

export default EditFormFooter;
