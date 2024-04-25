const schema = (joi) =>
    joi.object().keys({
        title: joi.string().min(3).required(),
        content: joi.string().required()
    })



module.exports = schema