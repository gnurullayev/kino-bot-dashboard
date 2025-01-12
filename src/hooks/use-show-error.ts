import { message } from "antd";
import { useEffect } from "react";

export const useShowError = (error: any, isError: boolean) => {
  useEffect(() => {
    const errorData: any = error;

    if (isError) {
      if (errorData?.response) {
        if (errorData?.response?.status !== 401) {
          if (errorData?.response?.data?.error) {
            message.error(errorData?.response?.data?.error);
          } else {
            message.error(errorData?.response?.data?.message);
          }
        }
      } else {
        message.error(("Error: " + error?.message) as string);
      }
    }
  }, [isError]);
};
