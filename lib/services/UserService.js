const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

module.exports = class UserService {
  static async create(code) {
    const token = await exchangeCodeForToken(code);

    const { login, avatar_url, email } = await getGithubProfile(token);

    let user = await GithubUser.findByUsername(login);
    //change login name to usename
    if (!user) {
      user = await GithubUser.insert({ username: login, avatar: avatar_url, email });
    }
    //return hand made object
   
    return user;
  }
};
