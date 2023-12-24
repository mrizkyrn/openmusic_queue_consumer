/* eslint-disable max-len */

class Listener {
   constructor(openmusicService, mailSender) {
      this._openmusicService = openmusicService;
      this._mailSender = mailSender;

      this.listen = this.listen.bind(this);
   }

   async listen(message) {
      try {
         const { playlistId, targetEmail } = JSON.parse(message.content.toString());

         const playlist = await this._openmusicService.getPlaylist(playlistId);

         const playlistMessage = {
            playlist: {
               id: playlist[0].playlist_id,
               name: playlist[0].playlist_name,
               songs: playlist.map((item) => ({
                  id: item.song_id,
                  title: item.title,
                  performer: item.performer,
               })),
            },
         };

         const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlistMessage));
         console.log(result);
      } catch (error) {
         console.error(error);
      }
   }
}

module.exports = Listener;
