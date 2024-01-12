const setJWTCookie = (jwt, response) => {
  response.cookie('jwt', jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60 * 1000,
    sameSite: 'strict',
  });
};

export { setJWTCookie };
