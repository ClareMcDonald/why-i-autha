const { Router } = require('express');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const GithubUser = require('../models/GithubUser');
const UserService =  require('../services/UserService');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', async (req, res) => {
    // TODO: Kick-off the github oauth flow
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=http://localhost:7890/api/v1/github/login/callback`);
  })

  .get('/login/callback', async (req, res, next) => {
    try {
      // TODO:
      // get code
    //  const code = req.query.code
      // exchange code for token
      // get info from github about user with token
      // get existing user if there is one
      // if not, create one
      // create jwt
      // set cookie and redirect
      
      const user = await UserService.create(req.query.code);

      res
        .cookie(process.env.COOKIE_NAME, sign(user), {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS
        })
        .redirect('/');
    } catch (error) {
      next(error);
    }
  })
  .get('/dashboard', authenticate, async (req, res) => {
    // require req.user
    // get data about user and send it as json
    res.json(req.user);
  })
  .delete('/sessions', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: 'Signed out successfully!' });
  });
