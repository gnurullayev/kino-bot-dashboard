import { Models } from "@rematch/core";
import { auth } from "./auth";
import { userData } from "./userData";
import language from "./language";
import { extra } from "./extra";

export interface RootModel extends Models<RootModel> {
  auth: typeof auth;
  userData: typeof userData;
  language: typeof language;
  extra: typeof extra;
}

export const models: RootModel = { auth, userData, language, extra };
