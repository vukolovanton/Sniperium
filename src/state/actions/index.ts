import { ActionType } from "../action-types";
import { SnippetTypes } from "../Snippet";

export type Direction = "up" | "down";

export interface MoveSnippetAction {
  type: ActionType.MOVE_SNIPPET;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface DeleteSnippetAction {
  type: ActionType.DELETE_SNIPPET;
  payload: string;
}

export interface InsertSnippetBeforeAction {
  type: ActionType.INSERT_SNIPPET_BEFORE;
  payload: {
    id: string | null;
    type: SnippetTypes;
  };
}

export interface UpdateSnippetAction {
  type: ActionType.UPDATE_SNIPPET;
  payload: {
    id: string;
    content: string;
  };
}

export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    snippetId: string;
  };
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    snippetId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

export type Action =
  | MoveSnippetAction
  | DeleteSnippetAction
  | InsertSnippetBeforeAction
  | UpdateSnippetAction
  | BundleCompleteAction
  | BundleStartAction;
