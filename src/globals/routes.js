//경로 변수들 모음

// Root
const ROOT = '/';

// User
const USER_SIGNUP = '/user';
const USER_SIGNIN = '/token';

//Project
const PROJECT_MY = '/projects/my'
const PROJECT_MY_DETAIL ='/:projectId'

const routes = {
  root: ROOT,
  user: USER_SIGNUP,
  token: USER_SIGNIN,
  project : PROJECT_MY,
  projectMyDeatail : PROJECT_MY_DETAIL,
}

module.exports = routes;



