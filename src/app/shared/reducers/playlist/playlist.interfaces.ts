import { Action } from '@ngrx/store';

/**
 *
 * @name Playlist
 * @description Properties: name, author, last modified, songs
 */
export interface Playlist {
  name: string;
  author: string;
  lastModified: string;
  songs: Array<any>;
}

/**
 *
 * @name ActionWithPayload
 * @description Properties: payload
 * @extends {Action}
 */
export interface ActionWithPayload<String> extends Action {
  payload: string;
}

/**
 *
 * @name PlaylistPayload
 * @description [index], [done], [value], [newValue]
 */
export interface PlaylistPayload {
  index?: number;
  done?: boolean;
  value?: string;
  newValue?: string;
}
