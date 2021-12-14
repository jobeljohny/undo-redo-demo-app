import { Action } from "@ngrx/store";


export const UPDATE_CANVAS = "[Canvas] Update Canvas";

export class UpdateCanvas implements Action {
  readonly type = UPDATE_CANVAS;

  constructor(public payload: { canvas: string }) {}
}

export type Actions = UpdateCanvas;
