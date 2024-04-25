const schema = (joi) =>
    joi.object().keys({
        name: joi.string().alphanum().required(),
        email: joi
            .string()
            .email({ minDomainSegments: 2 })
            .required(),
        password: joi.string().min(4).required(),
        confirmPassword: joi.string().min(4).required(),
        account_type:joi.number().required(),
    });


module.exports = schema;