const db = require('./dynamo');

const TableName = 'crawled';

module.exports.setQueues = function (queues) {
  const params = {
    TableName: TableName,
    Key: {
      id: 'queues',
    },
    ExpressionAttributeValues: {
      ':queues': queues,
    },
    UpdateExpression: 'SET content = :queues',
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(params);
};

module.exports.getQueues = function () {
  const params = {
    TableName: TableName,
    Key: {
      id: 'queues',
    },
  };

  return db.get(params).then(item => item ? item.content : []);
};

module.exports.setShows = function (shows) {
  const params = {
    TableName: TableName,
    Key: {
      id: 'shows',
    },
    ExpressionAttributeValues: {
      ':shows': shows,
    },
    UpdateExpression: 'SET content = :shows',
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(params);
};

module.exports.getShows = function () {
  const params = {
    TableName: TableName,
    Key: {
      id: 'shows',
    },
  };

  return db.get(params).then(item => item ? item.content : []);
};

module.exports.listShows = function (limit, page) {
  return module.exports.getShows()
  .then((shows) => {
    var idxStart = (page - 1) * limit;
    var idxEnd = page * limit;
    return shows.slice(idxStart, idxEnd).map((show, idx) => {
      return {
        id: idx + idxStart,
        title: show.title,
        url: show.url,
        video: show.video,
      };
    });
  });
};