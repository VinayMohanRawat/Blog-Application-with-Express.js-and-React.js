const { PrismaClient } = require('@prisma/client');
const { validate } = require('../models')
const bcrypt = require('bcrypt');
const salt = 10;

const prisma = new PrismaClient()


const createAccount = async (req, res) => {
    try {
        const parameters = req.body;
        const validation = await validate(parameters, 'createAccount');
        let { name, email, password, confirmPassword, account_type } = validation;

        isEmailExists = await prisma.account.count({
            where: {
                email: email,
                account_type: account_type,
                isDeleted: 0
            }
        });

        if (isEmailExists > 0) {
            return res.status(400).send({ status: false, message: 'Email is already exists' })
        }

        // checking password password is matchng or not
        if (password != confirmPassword) {
            return res.status(422).send({ status: false, message: "Password are not matching" })
        }

        //to hash a password with salt
        password = await bcrypt.hash(password, salt);

        //create random 6 digit number
        const id = Math.floor(Math.random() * 899999 + 100000)

        await prisma.account.create({
            data: {
                id: id,
                account_type: Number(account_type),
                email: email,
                name: name.trim(),
                password: password
            }
        })

        return res.status(201).send({ status: true, message: 'Created successfully!' })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message })
    }
}


const accountDetails = async (req, res) => {
    try {
        const { id, account_type } = req.middlewarePayload

        const data = await prisma.account.findUnique({
            where: {
                id: Number(id),
                account_type: Number(account_type)
            },
            include: {
                blog: true,
                comment: true
            }
        })

        return res.status(200).send({ status: true, data: data })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message })
    }
}



module.exports = {
    createAccount,
    accountDetails
}