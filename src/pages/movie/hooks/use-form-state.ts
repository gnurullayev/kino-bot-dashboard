import { useDetailData } from "@/hooks/use-detail-query";
import { IMovie } from "@/interfaces/movie";
import { API } from "@/services/api";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

const initialData: IMovie = {
  id: "",
  title: "",
  release_date: "",
  duration: 0,
  region_id: "",
  region_name: 0,
  description: "",
  poster_url: "",
  video_url: "",
  short_content: "",
  is_active: false,
};

export const useMovieFormState = () => {
  const { id: movieId } = useParams();

  const mutationFn = async (movieId: any) => await API.getMoviesById(movieId);
  const { isPending, submitData } = useDetailData({ mutationFn });

  const defaultData: any = useMemo(() => {
    if (movieId && submitData) {
      return {
        ...submitData,
        duration: String(submitData.duration),
        region_id: String(submitData.region_id),
        category_id: String(submitData.category_id),
        release_date: dayjs(submitData.release_date),
        tags: submitData.tags
          ? submitData.tags.map((tag: { id: number }) => String(tag.id))
          : [],
        genres: submitData.genres
          ? submitData.genres.map((genre: { id: number }) => String(genre.id))
          : [],
        id: String(submitData.id),
      };
    } else return initialData;
  }, [movieId, submitData]);

  const isLoading = movieId ? isPending : false;

  return { data: defaultData, isPending: isLoading, id: movieId };
};
