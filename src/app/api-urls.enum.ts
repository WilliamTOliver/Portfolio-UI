export enum APIURLS {
  login = '/auth/login/',
  signup = '/auth/signup/',
  checkAuth = '/auth',
  spotifyToken = 'spotify/token',
  spotifyUser = 'spotify/user',
  userPlaylists = 'spotify/user/playlists',
  playlist = 'spotify/playlist/:id',
  playlistTracks = 'spotify/playlist/:id/tracks',
  playlistRefactor = 'spotify/playlist/:id/refactor',
  playlistUnfollowMulti = 'spotify/playlist/unfollow-multi',
  playlistFollowMulti = 'spotify/playlist/follow-multi'
}
