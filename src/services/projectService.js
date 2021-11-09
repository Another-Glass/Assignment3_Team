const logger = require("../utils/logger");

const projectModel = require("../models/projectModel");

module.exports.updateProject = async (data) => {
  try {
    let project = await projectModel.findOneAndUpdate({
      projectId: data.projectId
    }, {
      projectData: data.content,
      projectName: data.title
    }, {
      new: true
    })

    return project;
  } catch (err) {
    throw err;
  }
}