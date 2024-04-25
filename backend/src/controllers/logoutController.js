require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()



const logout = async (req, res) => {
    try {
        let { id, account_type } = req.middlewarePayload

    await prisma.account.update({
        where: {
            id: id,
            account_type: account_type,
            isDeleted: 0
        },
        data: {
            token: null,
            isLogin: 0
        }
    })

    return res.status(200).send({ staus: true, message: "Logout successfully!" })


} catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, message: error.message })
}
}



module.exports = { logout }