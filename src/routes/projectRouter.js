const express = require("express");
const routes = require('../globals').routes;
const auth = require('../middlewares/auth')

const projectController = require('../controllers/projectController');

const projectRouter = express.Router();


// 프로젝트 생성
projectRouter.post(routes.root,auth.checkToken,projectController.createProject);

// 내 프로젝트 리스트
projectRouter.get(routes.root,auth.checkToken,projectController.getMyProjectList);

// 내 프로젝트 상세 정보 및 html 렌더
projectRouter.get(routes.projectMyDeatail,auth.checkToken,projectController.getMyProjectDetail);

// 내 프로젝트에서 삭제
projectRouter.delete(routes.projectMyDeatail,auth.checkToken,projectController.deleteMyProject);

projectRouter.put(routes.root,auth.checkToken, (req,res,next) => {
    res.send({
        verified : req.decoded
    })
})


module.exports = projectRouter;