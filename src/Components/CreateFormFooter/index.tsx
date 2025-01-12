import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { Button } from "../common/Button";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useTranslation } from "react-i18next";

interface Props {
  cancelPath: string;
  createdPath: string;
  submitLoading: boolean;
  isSuccess: boolean;
}

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const CreateFormFooter: FC<Props> = ({
  isSuccess,
  submitLoading,
  cancelPath,
  createdPath,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const onCancel = () => {
    navigate(cancelPath);
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Ma'lumot saqlandi");
      setTimeout(() => {
        navigate(createdPath);
      }, 1000);
    }
  }, [isSuccess]);

  return (
    <Wrapper>
      <Button
        htmlType="submit"
        type="primary"
        loading={submitLoading}
        label={t("create")}
      />

      <Button
        htmlType="button"
        type="default"
        onClick={onCancel}
        label={t("cancel")}
      />
    </Wrapper>
  );
};

export default CreateFormFooter;
