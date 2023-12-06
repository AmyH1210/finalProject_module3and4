const jwt = require("jsonwebtoken");

// a middleware function to check our JWT is valid

// Jwt verification checks to see if there is an authorization header with a valid jwt in it.
app.use(async function checkJWT(req, res, next) {
    // console.log(req.headers.authorization)
    if (!req.headers.authorization) {
      res.json('Invalid authorization, no authorization headers');
    }
  
    const [scheme, token] = req.headers.authorization.split(' ');
  
    if (scheme !== 'Bearer') {
      res.json('Invalid authorization, invalid authorization scheme');
    }
  
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY);
      req.user = payload;
    } catch (err) {
      console.log(err);
      if (
        err.message && 
        (err.message.toUpperCase() === 'INVALID TOKEN' || 
        err.message.toUpperCase() === 'JWT EXPIRED')
      ) {
  
        req.status = err.status || 500;
        req.body = err.message;
        req.app.emit('jwt-error', err, req);
      } else {
  
        throw((err.status || 500), err.message);
      }
    }
  
    await next();
  });
  