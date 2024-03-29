const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');

const getCookie = (cookie, name) => {
  if (cookie) {
    const cookieValue = cookie.split('; ').find((row) => row.startsWith(name));
    // access token인 경우
    if (cookieValue) return cookieValue.split('=')[1];
    // token이 있지만 access token이 아닌 경우
    return cookieValue;
  } // 어떠한 token도 없는 경우
  else return cookie;
};

const verifyToken = async (token) => {
  return await new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
      if (error) return reject(error);
      return resolve(decoded);
    });
  });
};

const getRedisValue = async (key) => {
  return await redisClient
    .get(key)
    .then((value) => {
      return value;
    })
    .catch((error) => {
      console.log(`getRedisValue error!: ${error}`);
    });
};

const auth = async (req, res, next) => {
  try {
    const reqToken = getCookie(req.headers.cookie, 'accessToken');
    // 토큰이 존재하지 않는 경우
    if (!reqToken) return res.json({ token: false });
    req.verifyTokenResult = await verifyToken(reqToken);
    const redisToken = await getRedisValue(req.verifyTokenResult.userId);
    if (redisToken === reqToken) next();
    else {
      // 30분 초과x but 옛날 토큰
      res.clearCookie('accessToken');
      res.json({ token: true, updated: false });
    }
  } catch (error) {
    // 30분 초과 or 애초에 생성되지 않은 토큰
    res.clearCookie('accessToken');
    res.json({ token: true, updated: false, error: error.message });
  }
};

module.exports = auth;
