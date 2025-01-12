export enum ApiEndpoints {
  /** Auth endpoints **/
  authLogin = "AUTH_LOGIN",
  authRefreshToken = "AUTH_REFRESH_TOKEN",
  authGetUser = "AUTH_GET_USER",

  /** Gifts endpoints **/
  categoriesGetGift = "CATEGORIES_GET_GIFT",
  categoriesGet = "CATEGORIES_GET",
  categoriesPost = "CATEGORIES_POST",
  categoriesUpdate = "CATEGORIES_UPDATE",
  categoriesDelete = "CATEGORIES_DELETE",
  categoriesGetById = "CATEGORIES_BY_ID",

  /** TAGS endpoints **/
  tagsGetGift = "TAGS_GET_GIFT",
  tagsGet = "TAGS_GET",
  tagsPost = "TAGS_POST",
  tagsUpdate = "TAGS_UPDATE",
  tagsDelete = "TAGS_DELETE",
  tagsGetById = "TAGS_BY_ID",

  /** TAGS endpoints **/
  genresGetGift = "GENRES_GET_GIFT",
  genresGet = "GENRES_GET",
  genresPost = "GENRES_POST",
  genresUpdate = "GENRES_UPDATE",
  genresDelete = "GENRES_DELETE",
  genresGetById = "GENRES_BY_ID",

  /** Gifts endpoints **/
  actorsGetGift = "ACTORS_GET_GIFT",
  actorsGet = "ACTORS_GET",
  actorsPost = "ACTORS_POST",
  actorsUpdate = "ACTORS_UPDATE",
  actorsDelete = "ACTORS_DELETE",
  actorsGetById = "ACTORS_BY_ID",

  /** Gifts endpoints **/
  moviesGetGift = "MOVIES_GET_GIFT",
  moviesGet = "MOVIES_GET",
  moviesPost = "MOVIES_POST",
  moviesUpdate = "MOVIES_UPDATE",
  moviesDelete = "MOVIES_DELETE",
  moviesGetById = "MOVIES_BY_ID",

  /** Gifts endpoints **/
  seriesGetGift = "SERIES_GET_GIFT",
  seriesGet = "SERIES_GET",
  seriesPost = "SERIES_POST",
  seriesUpdate = "SERIES_UPDATE",
  seriesDelete = "SERIES_DELETE",
  seriesGetById = "SERIES_BY_ID",

  /** Users endpoints **/
  usersGet = "USERS_GET_ALL",
  usersGetById = "USERS_BY_ID",
  usersUpdate = "USERS_UPDATE",

  /** Regions endpoints **/
  regionsGet = "REGIONS_GET_ALL",
}
