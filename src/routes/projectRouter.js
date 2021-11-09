const express = require("express");
const routes = require('../globals').routes;

const projectController = require('../controllers/projectController');

const projectRouter = express.Router();


// 프로젝트 생성
projectRouter.post(routes.root, projectController.createProject);

// 내 프로젝트 리스트
projectRouter.get(routes.root,projectController.getMyProjectList);

// 내 프로젝트 리스트
projectRouter.get(routes.projectMyDeatail,projectController.getMyProjectDetail);

// 내 프로젝트 리스트
projectRouter.delete(routes.projectMyDeatail,projectController.deleteMyProject);



module.exports = projectRouter;