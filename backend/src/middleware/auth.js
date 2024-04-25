require('dotenv').config();
const jwt = require('jsonwebtoken');



const Authorize = (types = []) => {
    try {
        return (req, res, next) => {
            let token = req.headers['x-Auth-token'] || req.headers['x-auth-token'] || req.headers['authorization']

            if (token && token.startsWith('Bearer ')) {
                token = token.slice(7, token.length);
            }

            if (!token) {
                return res.status(401).send({ status: false, message: "Token must be present" })
            }

            let decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            if (!decodedToken) {
                return res.status(401).send({ status: false, message: 'Unauthorized' });
            }

            const payload = { ...decodedToken }

            if (types.length && !types.includes(payload.account_type)) {
                return res.status(401).send({ status: false, message: 'Unauthorized' });
            }

            req.middlewarePayload = payload

            next()
        }


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



module.exports = { Authorize }