// function mockArtist() {
//   return {
//     id: 'ID ARTIST',
//     first_name: 'FIRST NAME ARTIST',
//     last_name: 'LAST NAME ARTIST',
//   };
// }

// function mockSong() {
//   return {
//     id: 'ID SONG',
//     title: 'TITLE SONG',
//     duration: 99,
//   }
// }

// const resolvers = {
//   Query: {
//     artists: () => [mockArtist()],
//     artist: (_, args) => mockArtist(),
//     songs: () => [mockSong()],
//     song: (_, args) => mockSong(),
//   },
//   Mutation: {
//     createArtist: (_, args) => mockArtist(),
//     updateArtist: (_, args) => mockArtist(),
//     deleteArtist: (_, args) => mockArtist(),
//     createSong: (_, args) => mockSong(),
//     updateSong: (_, args) => mockSong(),
//     deleteSong: (_, args) => mockSong(),
//   },
//   Artist: {
//     songs: artist => [mockSong()],
//   },
//   Song: {
//     artist: song => mockArtist(),
//   },
// };

const dbSongs = require('./dynamo/songs');
const dbArtists = require('./dynamo/artists');

const resolvers = {
  Query: {
    artists: () => dbArtists.getArtists(),
    artist: (_, args) => dbArtists.getArtistById(args.id),
    songs: () => dbSongs.getSongs(),
    song: (_, args) => dbSongs.getSongById(args.id),
  },
  Mutation: {
    createArtist: (_, args) => dbArtists.createArtist(args),
    updateArtist: (_, args) => dbArtists.updateArtist(args),
    deleteArtist: (_, args) => dbArtists.deleteArtist(args),
    createSong: (_, args) => dbSongs.createSong(args),
    updateSong: (_, args) => dbSongs.updateSong(args),
    deleteSong: (_, args) => dbSongs.deleteSong(args),
  },
  Artist: {
    songs: artist => dbSongs.getSongsByArtist(artist.id),
  },
  Song: {
    artist: song => dbArtists.getArtistById(song.artist),
  },
};


module.exports = resolvers;