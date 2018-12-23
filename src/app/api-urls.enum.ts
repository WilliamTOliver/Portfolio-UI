export enum APIURLS {
  login = '/auth/login/',
  signup = '/auth/signup/',
  checkAuth = '/auth',
  spotifyToken = 'spotify/token',
  spotifyUser = 'spotify/user/:token',
  userPlaylists = 'spotify/playlist/:token',
  playlistTracks = 'spotify/playlist/:id/tracks/:token'
}
