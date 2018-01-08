import { ActionReducer, Action } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { PLAYLIST_REDUCER_ACTIONS, INITIAL_STATE } from './playlist.constants';
import { Playlist, ActionWithPayload, PlaylistPayload } from './playlist.interfaces';

/**
 *
 * @name playlistReducer
 * @description Reducer for managing and updating playlist info.
 * @param {Playlist} [state=INITIAL_STATE]
 * @param {ActionWithPayload<PlaylistPayload>} action
 */
export function playlistReducer(state: Playlist = INITIAL_STATE,
                            action: ActionWithPayload<PlaylistPayload>) {
  let newState = cloneDeep(state);
  switch (action.type) {
    case PLAYLIST_REDUCER_ACTIONS.SET_CURRENT:
      newState = action.payload;
      return newState;
    default:
      return newState;
  }
}
