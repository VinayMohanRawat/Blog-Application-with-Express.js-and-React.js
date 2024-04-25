require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { validate } = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient()



const login = async (req, res) => {
    try {
        const parameters = req.body
        const validation = await validate(parameters, 'login');

        let { email, password, account_type } = validation;

        if (!email || !password || !account_type) {
            return res.status(200).send({ status: false, message: 'Please fill out the required fields' })
        }

        const fetchData = await prisma.account.findUnique({
            where: {
                email: email,
                account_type: Number(account_type),
                isDeleted: 0
            }
        })

        if (!fetchData) {
            return res.status(200).send({ status: false, message: 'Account does not exists' })
        }

        const isPasswordCorrect = await bcrypt.compare(password, fetchData.password)

        if (!isPasswordCorrect || !fetchData) {
            return res.status(422).send({ status: false, message: 'Email and password is not correct' })
        }

        const token = jwt.sign(
            {
                id: fetchData.id,
                account_type: fetchData.account_type,
            },
            process.env.JWT_SECRET,
            { expiresIn: '24hr' }

        )

        const updatedData = await prisma.account.update({
            where: {
                id: fetchData.id,
            },
            data: {
                token: token,
                isLogin: 1
            }
        })

        return res.status(200).send({ status: true, message: 'Login successfully!', token: token, account_type: account_type })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message })
    }
}



module.exports = {
    login
}



/*
{
  id: 638986,
  account_type: 1,
  email: 'vinay@gmail.com',
  name: 'vinay',
  password: '$2b$10$DUfb5yv2EITRbD/RtEufRu3BJo.XoS8WvIpn5Ynbpwj1FHHn71yVi',
  token: null,
  isLogin: 0,
  isDeleted: 0
}
*/