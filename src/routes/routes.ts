import { routes } from "@/constants/routes";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Categories from "@/pages/category";
import CategoryCreate from "@/pages/category/create";
import CategoryEdit from "@/pages/category/edit";
import CategoryShow from "@/pages/category/show";
import Movies from "@/pages/movie";
import MovieCreate from "@/pages/movie/create";
import MoviesShow from "@/pages/movie/show";
import MoviesEdit from "@/pages/movie/edit";
import MyDropzone from "@/pages/movie/upload";
import Tags from "@/pages/tags";
import TagCreate from "@/pages/tags/create";
import TagEdit from "@/pages/tags/edit";
import TagShow from "@/pages/tags/show";
import Genres from "@/pages/genres";
import GenreCreate from "@/pages/genres/create";
import GenreEdit from "@/pages/genres/edit";
import GenreShow from "@/pages/genres/show";

export const publicRoutes = [
  {
    path: routes.LOGIN,
    element: Login,
  },
];

export const privateRoutes = [
  {
    path: routes.HOME,
    element: Home,
  },

  // // /USERS
  // {
  //   path: routes.USERS,
  //   element: Users,
  // },
  // {
  //   path: routes.USERS_SHOW,
  //   element: UsersShow,
  // },
  // {
  //   path: routes.USERS_EDIT,
  //   element: UsersEdit,
  // },

  //CATEGORIES
  {
    path: routes.CATEGORIES,
    element: Categories,
  },
  {
    path: routes.CATEGORIES_CREATE,
    element: CategoryCreate,
  },
  {
    path: routes.CATEGORIES_EDIT,
    element: CategoryEdit,
  },
  {
    path: routes.CATEGORIES_SHOW,
    element: CategoryShow,
  },

  //MOVIES
  {
    path: routes.MOVIES,
    element: Movies,
  },
  {
    path: routes.MOVIES_CREATE,
    element: MovieCreate,
  },
  {
    path: routes.MOVIES_EDIT,
    element: MoviesEdit,
  },
  {
    path: routes.MOVIES_SHOW,
    element: MoviesShow,
  },

  //ACTORS
  {
    path: routes.TAGS,
    element: Tags,
  },
  {
    path: routes.TAGS_CREATE,
    element: TagCreate,
  },
  {
    path: routes.TAGS_EDIT,
    element: TagEdit,
  },
  {
    path: routes.TAGS_SHOW,
    element: TagShow,
  },

  //SERIALS
  {
    path: routes.GENRES,
    element: Genres,
  },
  {
    path: routes.GENRES_CREATE,
    element: GenreCreate,
  },
  {
    path: routes.GENRES_EDIT,
    element: GenreEdit,
  },
  {
    path: routes.GENRES_SHOW,
    element: GenreShow,
  },

  // {
  //   path: routes.GENRESUPLOAD,
  //   element: MyDropzone,
  // },
];
