const uuid = require('uuid/v1');
const db = require('./dynamo');

const TableName = 'songs';

module.exports.getSongs = function () {
  const params = {
    TableName,
    AttributesToGet: [
      'id',
      'title',
      'artist',
      'duration',
    ],
  };

  return db.scan(params);
};

module.exports.getSongById = function (id) {
  const params = {
    TableName,
    Key: {
      id,
    },
  };

  return db.get(params);
};

module.exports.getSongsByArtist = function (artistId) {
  const params = {
    TableName,
    FilterExpression: 'artist = :artist_id',
    ExpressionAttributeValues: { ':artist_id': artistId },
  };

  return db.scan(params);
};

module.exports.createSong = function (args) {
  const params = {
    TableName,
    Item: {
      id: uuid(),
      title: args.title,
      artist: args.artist,
      duration: args.duration,
    },
  };

  return db.createItem(params);
};

module.exports.updateSong = function (args) {
  const params = {
    TableName: 'songs',
    Key: {
      id: args.id,
    },
    ExpressionAttributeNames: {
      '#song_duration': 'duration',
    },
    ExpressionAttributeValues: {
      ':title': args.title,
      ':artist': args.artist,
      ':duration': args.duration,
    },
    UpdateExpression: 'SET title = :title, artist = :artist, #song_duration = :duration',
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(params, args);
};

module.exports.deleteSong = function (args) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
  };

  return db.deleteItem(params, args);
};
