import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { PLAYLIST_REDUCER_ACTIONS } from './playlist.constants';

/**
 * @name PlaylistService
 */
@Injectable()
export class PlaylistService {
  store: Store<any>;
  /**
   * Creates an instance of PlaylistService.
   * @constructor
   * @param {Store<any>} store - injects the store.
   * @memberof PlaylistService
   */
  constructor(store: Store<any>) {
  }
  /**
   * @name addFirstName
   * @param {any} firstName
   * @memberof PlaylistService
   */
  getPlaylists(): void {
    this.store.dispatch({ type: PLAYLIST_REDUCER_ACTIONS.SET_CURRENT });
  }
}
