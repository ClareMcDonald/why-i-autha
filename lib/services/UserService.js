const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

module.exports = class UserService {
  static async create(code) {
    const token = await exchangeCodeForToken(code);

    const profile = await getGithubProfile(token);

    let user = await GithubUser.findByUsername(profile.username);
    //change login name to usename
    if (!user) {
      user = await GithubUser.insert(profile);
    }
    //return hand made object
    console.log('!!!USER', user);
    return user;
  }
};
