import { createModel } from "@rematch/core";
import { RootModel } from ".";

export interface ExtraData {
  pathIdName: string;
}

const initialState: ExtraData = {
  pathIdName: "",
};

export const extra = createModel<RootModel>()({
  state: initialState, // typed complex state
  reducers: {
    // handle state changes with pure functions
    changeExtraData(state, payload: any) {
      return { ...state, ...payload };
    },
  },
});
