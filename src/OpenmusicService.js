const { Pool } = require('pg');

class OpenmusicService {
   constructor() {
      this._pool = new Pool();
   }

   async getPlaylist(playlistId) {
      const query = {
         text: `
            SELECT
               playlists.id AS playlist_id,
               playlists.name AS playlist_name,
               songs.id AS song_id,
               songs.title,
               songs.performer
            FROM
               playlists
            JOIN
               playlist_songs ON playlists.id = playlist_songs.playlist_id
            JOIN
               songs ON playlist_songs.song_id = songs.id
            WHERE
               playlists.id = $1
         `,
         values: [playlistId],
      };

      const result = await this._pool.query(query);
      return result.rows;
   }
}

module.exports = OpenmusicService;
