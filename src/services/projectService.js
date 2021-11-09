const logger = require("../utils/logger");
const projectModel = require("../models/projectModel");
const mongoose = require('mongoose');

/**
 * 프로젝트 생성 서비스
 * @param {String} authorId
 * @param {String} projectName
 * @param {String} projectData
 * @returns {Object} 프로젝트 생성 정보 { authorId, projectName, projectData }
 */
exports.createProject = async data => {
  try {
    const project = new projectModel(data);
    const newProject = await project.save();
    return newProject;
  } catch (err) {
    console.log(err);
    //throw err;
  }
};

/**
 * MY 프로젝트 리스트 조회 서비스
 * @param {String} authorId
 * @returns {Array} 나의 프로젝트 리스트 [{authorId1, projectName1, projectData1, releaseId1}, {authorId2, projectName2, projectData2, releaseId2}]
 */
exports.getProjectList = async authorId => {
  try {
    if (mongoose.isValidObjectId(authorId)) {
      const projectList = await projectModel.find({ authorId });
      return projectList;
    }
    else {
      return null
    }
  } catch (err) {
    throw err;
  }
};

/**
 * 프로젝트 조회 서비스
 * @param {String} projectId
 * @returns {Object} 프로젝트 조회 정보 { projectId, authorId, projectName, projectData, releaseId }
 */
exports.getProject = async projectId => {

  try {
    if (mongoose.isValidObjectId(projectId)) {
      const project = await projectModel.findOne({ _id: projectId });
      return project;
    } else {
      return null
    }


  } catch (err) {
    throw err;
  }
};

/**
 * 프로젝트 수정 서비스
 * @param {String} 쿼리 : projectId / 수정할 내용 : projectName, projectData
 * @returns {Object} 

 * 프로젝트 수정 정보 {
      acknowledged: true,
      modifiedCount: 1,
      upsertedId: null,
      upsertedCount: 0,
      matchedCount: 1
    }
 */
exports.updateProject = async (projectId, projectName, projectData) => {
  try {

    if (mongoose.isValidObjectId(projectId)) {
      let project = await projectModel.findOneAndUpdate({
        projectId
      }, {
        projectData,
        projectName
      }, {
        new: true
      })
      const newProject = await projectModel.findOne({ _id: projectId });
      return newProject;
    } else {
      return null
    }
  } catch (err) {
    throw err;
  }
};


/**
 * 프로젝트 삭제 서비스
 * @param {String} projectId
 * @returns {Object} { deletedCount: 1 }

 */
exports.deleteProject = async projectId => {
  try {
    console.log(projectId);

    if (mongoose.isValidObjectId(projectId)) {
      const project = await projectModel.deleteOne({ _id: projectId });
      return project
    } else {
      return null
    }

  } catch (err) {
    throw err;
  }
}
