import React, { FC } from "react";
import styled from "styled-components";
import { Button } from "../common/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useCustomNavigate } from "@/hooks/use-custom-navigate";

interface Props {
  path: string;
  cancelRedirectPath: string;
}

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const ShowFormFooter: FC<Props> = ({ path, cancelRedirectPath }) => {
  const { customNavigate, search } = useCustomNavigate();
  const { id } = useParams();

  const onChangePage = (search: string) => {
    customNavigate(path, search);
  };

  const onCancelPage = (search: string) => {
    customNavigate(cancelRedirectPath, search);
  };

  return (
    <Wrapper>
      <Button
        htmlType="button"
        type="primary"
        label="Edit"
        onClick={() => onChangePage(search)}
      />

      {!!id && (
        <Button
          htmlType="button"
          type="dashed"
          label="Cancel"
          onClick={() => onCancelPage(search)}
        />
      )}
    </Wrapper>
  );
};

export default ShowFormFooter;
