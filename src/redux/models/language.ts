import { createModel } from "@rematch/core";
import { RootModel } from ".";

const initialState = {
  lng: "uz",
};

const language = createModel<RootModel>()({
  state: initialState, // initial state
  reducers: {
    // handle state changes with pure functions
    changeLanguage(state, payload) {
      // const userRole = getUserRole(payload?.id_token);
      return {
        ...state,
        lng: payload,
      };
    },
  },
  effects: (_dispatch) => ({}),
});

export default language;
