import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import {
  Action,
  DeleteSnippetAction,
  Direction,
  InsertSnippetBeforeAction,
  MoveSnippetAction,
  UpdateSnippetAction,
} from "../actions";
import { SnippetTypes } from "../Snippet";
import bundle from "../../bundler";

export const updateSnippet = (
  id: string,
  content: string
): UpdateSnippetAction => {
  return {
    type: ActionType.UPDATE_SNIPPET,
    payload: {
      id,
      content,
    },
  };
};

export const deleteSnippet = (id: string): DeleteSnippetAction => {
  return {
    type: ActionType.DELETE_SNIPPET,
    payload: id,
  };
};

export const moveSnippet = (
  id: string,
  direction: Direction
): MoveSnippetAction => {
  return {
    type: ActionType.MOVE_SNIPPET,
    payload: {
      id,
      direction,
    },
  };
};

export const insertSnippetBefore = (
  id: string | null,
  snippetType: SnippetTypes
): InsertSnippetBeforeAction => {
  return {
    type: ActionType.INSERT_SNIPPET_BEFORE,
    payload: {
      id,
      type: snippetType,
    },
  };
};

export const createBundle = (snippetId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        snippetId,
      },
    });

    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        snippetId,
        bundle: result,
      },
    });
  };
};
