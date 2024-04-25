const schema = (joi) =>
    joi.object().keys({
        blogId:joi.required(),
        title:joi.string().required(),
        content:joi.string().required(),
    });


module.exports = schema;