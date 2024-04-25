const schema = (joi) =>
    joi.object().keys({
        comment: joi.string().required(),
        blogId: joi.required(),
    })



module.exports = schema;