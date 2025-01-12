export interface IMovie {
  id: string | null;
  title: string;
  release_date: string;
  duration: number;
  region_id: number | string;
  region_name: number;
  short_content: string;
  description: string;
  poster_url: string;
  video_url: string;
  is_active: boolean;
  tags_data?: string[];
  // genre: string;
  tags?: { id: number }[];
}

export interface MovieQuality {
  id: number;
  movie_id: number;
  quality: string;
  video_url: string;
  file_size: string;
  created_at: string;
  updated_at: string;
}
