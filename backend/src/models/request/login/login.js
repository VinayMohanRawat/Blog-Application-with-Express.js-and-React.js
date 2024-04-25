const schema = (joi) =>
    joi.object().keys({
        email: joi
            .string()
            .email({ minDomainSegments: 2 })
            .required(),
        password: joi.string().min(4).required(),
        account_type: joi.required()
    });


module.exports = schema;