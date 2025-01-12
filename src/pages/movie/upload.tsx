import { Button, Progress, Select } from "antd";
import React, { useEffect, useState } from "react";
import Resumable from "resumablejs";
import css from "./upload.module.css";
import { getState } from "@/redux";
import { API, DEV_BASE_URL } from "@/services/api";
import { useParams } from "react-router-dom";
import { useCustomNavigate } from "@/hooks/use-custom-navigate";
import { routes } from "@/constants/routes";

const MyDropzone = () => {
  const [percent, setPercent] = useState(0);
  const { id } = useParams();
  const [quality, setQuality] = useState<string>("");
  const { customNavigate, search } = useCustomNavigate();

  useEffect(() => {
    const token = getState().auth.token;

    const r: any = new Resumable({
      target: DEV_BASE_URL + "upload",
      chunkSize: 10 * 1024 * 1024,
      simultaneousUploads: 2,
      testChunks: true,
      maxChunkRetries: 2,
      chunkRetryInterval: 5000,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    r.assignBrowse(document.getElementById("browseButton"));

    r.on("fileAdded", (file: any) => {
      console.log(`Fayl qo'shildi: ${file.fileName}`);
      r.upload();
    });

    r.on("fileProgress", (file: any) => {
      setPercent(Math.floor(file.progress() * 100));
      console.log(
        `Fayl yuklanmoqda: ${file.fileName} - ${Math.floor(
          file.progress() * 100
        )}%`
      );
    });

    r.on("fileSuccess", async (file: any, message: any) => {
      console.log(file);
      const res = JSON.parse(message);

      await API.postMoviesVideo({
        video_url: res.url,
        movie_id: id,
        file_size: 2000,
        quality: "480p",
      });

      setTimeout(() => {
        customNavigate(routes.MOVIES, search);
      }, 500);
      console.log(`Fayl muvaffaqiyatli yuklandi: ${file.fileName}`);
    });

    r.on("fileError", (file: any, message: any) => {
      console.error(`Fayl yuklashda xato: ${file.fileName} - ${message}`);
    });
  }, [quality]);

  return (
    <div>
      <Select
        options={[
          { value: "480p", label: "480p" },
          { value: "720p", label: "720p" },
        ]}
        style={{
          width: "100%",
          height: "32px",
          display: "block",
          marginBottom: "20px",
        }}
        onChange={(e: any) => setQuality(e)}
      />
      <Progress
        percent={percent}
        percentPosition={{ align: "start", type: "outer" }}
        size={["100%", 30]}
      />

      <>
        <Button
          type="dashed"
          id="browseButton"
          className={css["file-upload"]}
          disabled={percent > 0}
        >
          Faylni tanlash
        </Button>
      </>
    </div>
  );
};

export default MyDropzone;
