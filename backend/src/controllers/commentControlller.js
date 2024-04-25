const { PrismaClient } = require('@prisma/client');
const { validate } = require('../models');

const prisma = new PrismaClient()

const createComment = async (req, res) => {
    try {
        const parameters = req.body;
        const validation = await validate(parameters, 'createComment')
        let { comment, blogId } = validation;

        const isPresent = await prisma.blog.count({
            where: {
                id: Number(blogId),
                isDeleted: 0
            }
        })

        const accountId = req.middlewarePayload.id

        const fetchAccountData = await prisma.account.findUnique(
            {
                where: {
                    id: accountId,
                    isDeleted: 0
                }
            }
        )

        const customerName = fetchAccountData.name

        if (isPresent === 0) {
            return res.status(404).send({ status: false, message: 'Data not found' })
        }

        const id = Math.floor(Math.random() * 899999 + 100000)

        const customerId = req.middlewarePayload.id;

        await prisma.comment.create({
            data: {
                id: id,
                customerName: customerName,
                comment: comment,
                blogId: Number(blogId),
                customerId: Number(customerId)
            }
        })


        return res.status(201).send({ status: true, message: 'Comment created successfully!' })


    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message })
    }
}






module.exports = { createComment }