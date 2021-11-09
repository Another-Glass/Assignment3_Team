const express = require("express");
const routes = require('../globals').routes;

const projectController = require('../controllers/projectController');
const auth = require('../middlewares/auth')

const projectRouter = express.Router();


// 프로젝트 생성
projectRouter.post(routes.root, auth.checkToken, projectController.createProject);

// 내 프로젝트 리스트
projectRouter.get(routes.root, auth.checkToken, projectController.getMyProjectList);

// 내 프로젝트 리스트
projectRouter.get(routes.projectMyDeatail, auth.checkToken, projectController.getMyProjectDetail);

// 내 프로젝트 리스트
projectRouter.delete(routes.projectMyDeatail, auth.checkToken, projectController.deleteMyProject);



module.exports = projectRouter;