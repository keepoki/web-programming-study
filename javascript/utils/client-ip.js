{
  /** 클라이언트의 IP 값을 추출하기 위한 함수 */
  function getClientIP(req) {
    return req.headers['x-forwarded-for']?.split(',').shift() || req.headers['x-real-ip'] || req.connection.remoteAddress;
  }
}