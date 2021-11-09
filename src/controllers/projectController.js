const { statusCode, responseMessage } = require('../globals');
const encryption = require('../libs/encryption.js');
const jwt = require('../libs/jwt.js');
const { resFormatter } = require('../utils');
const { ValidationError, DuplicatedError, PasswordMissMatchError, NotMatchedUserError } = require('../utils/errors/userError');
const { EntityNotExistError } = require('../utils/errors/commonError');

const userService = require('../services/userService.js');
const logger = require('../utils/logger');
const { updateProject } = require('../services/projectService');

const saveDataBuffer = new Map();
const saveTimerBuffer = new Map();


exports.createProject = async (req, res, next) => {
    try {
        const { username, projectName } = req.body
        const verified = req.decoded.username

        //email, projectName이 누락되었거나 email과 jwt의 mismatch
        if (username === undefined || projectName === undefined || username != verified) {
            throw new ValidationError();
        }

        // TODO projectService를 이용하여 새로 생성 및 responseData에 삽입
        const dbResolve = await createProject({
            authorId: req.decoded._id,
            projectName: projectName,
            projectData: "",
        })
        const responseData = {
            projectId: dbResolve._id
        }

        return res
            .status(statusCode.CREATED)
            .send(resFormatter.success(responseMessage.PROJECT_CREATED, responseData)) // TODO 위에서 생성한뒤 얻은 projectId

    } catch (err) {
        next(err)
    }
}

exports.getMyProjectList = async (req, res, next) => {
    try {
        const { username } = req.query
        const { verified } = req.decoded

        if (username === undefined || username != verified) {
            throw new ValidationError();
        }

        // TODO projectService를 이용하여 새로 생성 및 responseData에 삽입
        const responseData = [{
            projectId: null,
            projectName: null,
            projectData: null,
            release: {
                isReleased: null,
                releaseId: null
            }
        }]

        return res
            .status(statusCode.OK)
            .send(resFormatter.success(responseMessage.PROJECT_MY_LIST, responseData)) // TODO 위에서 생성한뒤 얻은 projectId
    } catch (err) {
        next(err)
    }
}

exports.getMyProjectDetail = async (req, res, next) => {
    try {
        const { projectId } = req.params
        const { username } = req.query
        const verified = req.decoded.username;


        if (username === undefined || username != verified) {
            throw new ValidationError();
        }

        if (projectId === undefined) {
            throw new ValidationError();
        }

        // TODO projectService를 이용하여 렌더링에 포함할 정보 입력
        const responseData = {
            projectId: projectId,
            projectName: null,
            projectData: null,
        }

        // CHECK TODO 다른 추가적인 메세지는 html에서 처리?
        res.status(statusCode.OK).render("gameEditor.html", responseData)

    } catch (err) {
        next(err)
    }

}

exports.deleteMyProject = async (req, res, next) => {
    try {
        const { projectId } = req.params
        const { username } = req.query
        const { verified } = req.decoded

        if (username === undefined || username != verified) {
            throw new ValidationError();
        }

        if (isNaN(projectId)) {
            throw new ValidationError();
        }

        // TODO projectService를 이용하여 프로젝트 정보 삭제


        const responseData = undefined

        return res
            .status(statusCode.OK)
            .send(resFormatter.success(responseMessage.PROJECT_MY_LIST, responseData)) // TODO 위에서 생성한뒤 얻은 projectId

    } catch (err) {
        next(err)
    }

}


//프로젝트 정보를 임시로 버퍼에 저장
exports.saveToBuffer = async (data) => {
    try {
        //입력값 이상 확인
        if (data === undefined || data.projectName === undefined || 
            data.projectData === undefined || data.projectId === undefined) {
            throw new ValidationError();
        }

        //버퍼에 입력
        saveDataBuffer.set(data.projectId, data);

        //일정 시간 뒤 저장함수 실행
        if (!saveTimerBuffer.get(data.projectId)) {
            let timer = setTimeout(this.bufferToDB, 5000, {
                projectId: data.projectId
            });
            saveTimerBuffer.set(data.projectId, timer);
        }
    } catch (err) {
        throw err;
    }
}


//버퍼혹은 받아온 데이터를 DB에 저장
exports.bufferToDB = async (data) => {
    try {
        let lastestData = {};

        //입력값 이상 확인
        if (data === undefined || data.projectId === undefined) {
            throw new ValidationError();
        }

        //console.log(saveDataBuffer.get(data.projectId));
        //버퍼와 받아온 데이터 중 넣을 데이터 선택
        if (data.projectName === undefined || data.projectData === undefined) {
            lastestData = saveDataBuffer.get(data.projectId);
        } else {
            lastestData = data;
        }

        //쿼리 실행
        let project = await updateProject(lastestData.projectId, lastestData.projectName, lastestData.projectData);

        //db에 없을 시
        if (project === undefined) {
            throw new EntityNotExistError();
        }
        //정상 결과 시
        else {
            saveDataBuffer.delete(data.projectId);
            saveTimerBuffer.delete(data.projectId);
        }

    } catch (err) {
        throw err;
    }
}