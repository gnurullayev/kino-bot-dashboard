import { createModel } from "@rematch/core";
import { RootModel } from ".";
import { AuthState } from "../../interfaces";

const initialState: AuthState = {
  isLogged: false,
  token: "",
  user_role: null,
};

export const auth = createModel<RootModel>()({
  state: initialState, // typed complex state
  reducers: {
    // handle state changes with pure functions
    login(state, { token }: { token: string }) {
      return { ...state, token, isLogged: true };
    },
  },

  effects: (dispatch) => ({
    // use async/await for async actions
    async logoutAsync() {
      dispatch({ type: "RESET_APP" });
      localStorage.removeItem("token");
    },
  }),
});
