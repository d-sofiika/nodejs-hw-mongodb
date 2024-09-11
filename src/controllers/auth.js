import { loginUser, logoutUser, refreshUserSession, registerUser } from "../services/auth.js"


export const registerUserController = async (req, res) => {

      const payload = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

    const user = await registerUser(payload);

    res.status(201).json({
         status: 201,
    message: 'Successfully registered a user!',
    data: user,
    })
}
export const loginUserController = async (req, res) => {

const { email, password } = req.body;
  const session = await loginUser(email, password);
 res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

    res.status(200).json({
         status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
    })
}

export const refreshController = async (req, res) => {

const {  sessionId, refreshToken  } = req.cookies;
  const session = await refreshUserSession(sessionId, refreshToken);
  
 res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

    res.status(200).json({
         status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
    })
}

export const logoutUserController = async (req, res) => {
  const { sessionId } = req.cookies;

  if (typeof sessionId === 'string') {
    await logoutUser(sessionId);
  }

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId')

  res.status(204).end();
  

}