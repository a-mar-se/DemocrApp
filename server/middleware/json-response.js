const jsonResponseMiddleware = (request, response, next) => {
  response.setHeader('Content-type', 'application/json');
  next();
};

export default jsonResponseMiddleware;
