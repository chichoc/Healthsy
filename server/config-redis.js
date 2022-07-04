const redis = require('redis');
const redisClient = redis.createClient();

redisClient.on('error', (error) => {
  if (error) console.log(`redisClient on error! ${error}`);
});

redisClient
  .connect()
  .then((res) => {
    console.log(`redisClient connected`);
  })
  .catch((error) => console.log(`redisClient connect error! ${error}`));

module.exports = redisClient;
