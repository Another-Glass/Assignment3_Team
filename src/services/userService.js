const mongoose = require("mongoose");
const userModel = require('../models/userModel');

/**
 * 회원가입 서비스
 * @param {String} username
 * @param {String} encryptPassword
 * @param {String} salt
 * @param {Boolean} isAdmin
 * @returns {Object} 가입한 유저 정보 { username, domain, password, isAdmin, salt, refreshToken, createdAt, updatedAt }
 */
exports.signup = async (
  username,
  encryptPassword,
  salt,
) => {
  try {
    const newUser = await userModel.create({
      username: username,
      password: encryptPassword,
      salt,
    });
    return newUser;
  } catch (err) {
    throw err;
  }
};

/**
 * 이메일 체크 서비스
 * @param {String} username
 * @returns {Object} 이미 존재하는 유저 정보 { username, domain, password, isAdmin, salt, refreshToken, createdAt, updatedAt }
 */
exports.checkUser = async (username) => {
  try {
    const alreadyUser = await userModel.findOne({
      username: username
    });
    return alreadyUser;
  } catch (err) {
    throw err;
  }
};

/**
 * 로그인 서비스
 * @param {String} username 
 * @param {String} password
 * @returns {Object} 로그인한 유저 정보 { username, domain, password, isAdmin, salt, refreshToken, createdAt, updatedAt }
 */
exports.signin = async (username, password) => {
  try {
    const user = await userModel.findOne({
      username: username,
      password: password,
    });
    
    return user
  } catch (err) {
    throw err;
  }
};

// /**
//  * 이메일 체크 서비스
//  * @param {String} emailUsername
//  * @param {String} emailDomain
//  * @returns {Object} 이미 존재하는 유저 정보 { username, domain, password, isAdmin, salt, refreshToken, createdAt, updatedAt }
//  */
// exports.checkEmail = async (emailUsername, emailDomain) => {
//   try {
//     const alreadyUser = await models.user.findOne({
//       where: {
//         [Op.and]: [
//           { username: emailUsername },
//           { domain: emailDomain }
//         ]
//       }
//     });
//     return alreadyUser;
//   } catch (err) {
//     throw err;
//   }
// };

// /**
//  * 로그인 서비스
//  * @param {String} emailUsername
//  * @param {String} emailDomain
//  * @param {String} password
//  * @returns {Object} 로그인한 유저 정보 { username, domain, password, isAdmin, salt, refreshToken, createdAt, updatedAt }
//  */
// exports.signin = async (emailUsername, emailDomain, password) => {
//   try {
//     const user = await models.user.findOne({
//       where: {
//         [Op.and]: [
//           { username: emailUsername },
//           { domain: emailDomain },
//           { password: password }
//         ],
//       },
//     });
//     return user.dataValues;
//   } catch (err) {
//     throw err;
//   }
// };

// // exports.updateRefreshToken = async (emailUsername, emailDomain, refreshToken) => {
// //   try {

// //     return user;
// //   } catch (err) {
// //     throw err;
// //   }
// // }
