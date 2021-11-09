const { statusCode, responseMessage } = require('../globals');
const encryption = require('../libs/encryption.js');
//const jwt = require('../libs/jwt.js');
const { resFormatter } = require('../utils');
const { ValidationError} = require('../utils/errors/userError');

//const userService = require('../services/userService.js');
//const logger = require('../utils/logger');


exports.createProject = async (req, res, next) => {
    try {
        const { username, projectName } = req.body
        const verified = req.decoded.username   //jwt로 인증받은 username

        //email, projectName이 누락되었거나 email과 jwt의 mismatch
        if (username === undefined || projectName === undefined || username != verified) {
            throw new ValidationError();
        }

        // TODO projectService를 이용하여 새로 생성 및 responseData에 삽입
        const responseData = {
            projectId: null
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
        const noParameter = req.body
        const verified = req.decoded.username

        // TODO projectService를 이용하여 새로 생성 및 responseData에 삽입
        const responseData = [
            {
                projectId: null,
                projectName: null,
                projectData: null,
                release: {
                    isReleased: null,
                    releaseId: null
                }
            }

        ]

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
        const verified = req.decoded.username

        if (isNaN(projectId)) {
            throw new ValidationError();
        }

        // TODO projectService를 이용하여 렌더링에 포함할 정보 입력
        const responseData = {
            projectId: null,
            projectName: null,
            projectData: null,
        }

        // CHECK TODO 다른 추가적인 메세지는 html에서 처리?
        res.status(statusCode.OK).render(FILE_PATH, responseData)

    } catch (err) {
        next(err)
    }

}

exports.deleteMyProject = async (req, res, next) => {
    try {
        const { projectId } = req.params
        const username = req.decoded.username
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


//  회원가입
// exports.postUser = async (req, res, next) => {
//   try {
//     const { email, password, isAdmin } = req.body;

//     //입력값 확인
//     if (email === undefined || password === undefined) {
//       throw new ValidationError();
//     }
//     const emailUsername = email.split('@')[0];
//     const emailDomain = email.split('@')[1];

//     //이메일 양식 일치/불일치 여부 : isMatch가 0이면 일치, -1이면 불일치
//     const regExp = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
//     const isMatch = email.search(regExp);
//     if (isMatch === -1) throw new ValidationError();

//     //이메일 중복 여부
//     const isEmail = await userService.checkEmail(emailUsername, emailDomain);
//     if (isEmail) throw new DuplicatedError()

//     //암호화
//     const salt = encryption.makeSalt();
//     const encryptPassword = encryption.encrypt(password, salt);

//     //쿼리실행
//     await userService.signup(emailUsername, emailDomain, encryptPassword, salt, isAdmin);

//     return res.status(statusCode.CREATED)
//       .send(resFormatter.success(responseMessage.CREATED_USER));
//   } catch (err) {
//     next(err);
//   }
// }


// //토큰 생성(로그인)
// exports.postToken = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     //입력값 확인
//     if (email === undefined || password === undefined) throw new ValidationError();

//     const emailUsername = email.split('@')[0];
//     const emailDomain = email.split('@')[1];

//     //이메일 존재 여부
//     const isEmail = await userService.checkEmail(emailUsername, emailDomain);
//     if (!isEmail) throw new NotMatchedUserError();

//     //확인용 암호화
//     const { salt, password: realPassword } = isEmail;
//     const inputPassword = encryption.encrypt(password, salt);

//     //패스워드 불일치
//     if (inputPassword !== realPassword) throw new PasswordMissMatchError();

//     //쿼리 실행
//     const user = await userService.signin(emailUsername, emailDomain, inputPassword);

//     //토큰 반환
//     const { accessToken } = await jwt.sign(user);

//     return res.status(statusCode.OK)
//       .send(resFormatter.success(responseMessage.LOGIN_SUCCESS, { accessToken }))
//   } catch (err) {
//     next(err);
//   }
// }