const joi = require('joi');

const createAccount = require('./request/admin/createAccount')(joi);
const login = require('./request/login/login')(joi);
const createBlog = require('./request/blog/createBlog')(joi);
const editBlog = require('./request/blog/editBlog')(joi);
const createComment = require('./request/comment/createComment')(joi);

const schemas = {
    createAccount,
    login,
    createBlog,
    editBlog,
    createComment
}


const schemaValidator = (object, type) => {
    const Schema = schemas[type];
    return Schema.validateAsync(object);
}


module.exports = Object.create({ validate: schemaValidator, schemas })