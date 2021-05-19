import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Snippet } from "../Snippet";

interface SnippetsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Snippet;
  };
}

const initialState: SnippetsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce(
  (state: SnippetsState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.UPDATE_SNIPPET:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return state;

      case ActionType.DELETE_SNIPPET:
        delete state.data[action.payload];
        state.order = state.order.filter((id) => id !== action.payload);
        return state;

      case ActionType.MOVE_SNIPPET:
        const { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }
        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
        return state;

      case ActionType.INSERT_SNIPPET_BEFORE:
        const snippet: Snippet = {
          id: randomId(),
          content: "",
          type: action.payload.type,
        };
        state.data[snippet.id] = snippet;
        const foundIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );
        if (foundIndex < 0) {
          state.order.push(snippet.id);
        } else {
          state.order.splice(foundIndex, 0, snippet.id);
        }
        return state;

      default:
        return state;
    }
  }
);

const randomId = () => {
  return Math.random().toString(36).substring(2, 7);
};

export default reducer;
