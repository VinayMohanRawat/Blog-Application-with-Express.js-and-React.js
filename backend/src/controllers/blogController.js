require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { validate } = require('../models');
const aws = require('../utils/aws/s3Helper');

const prisma = new PrismaClient()

const createBlog = async (req, res) => {
    try {
        const parameters = req.body;
        const validation = await validate(parameters, 'createBlog')
        let { title, content } = validation;

        let files = req.files;
        console.log(files)

        let uploadedFileUrl = '';

        if (files && files.length > 0) {
            let fileName = await aws.uploadFile(files[0])
            uploadedFileUrl = process.env.IMAGE_URL + fileName
        }

        //create random 6 digit number
        const id = Math.floor(Math.random() * 899999 + 100000)

        const adminId = req.middlewarePayload.id;

        const data = await prisma.blog.create({
            data: {
                id: id,
                title: title,
                content: content,
                image: uploadedFileUrl,
                adminId: adminId
            }
        })

        console.log('data', data)


        return res.status(201).send({ status: true, message: 'Blog created successfully!', accountId: data.id })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message })
    }
}

const uploadImage = async (req, res) => {
    try {
        let files = req.files;
        if (!files) {
            return
        }
        const id = req.body.uploadId
        let uploadedFileUrl = '';

        if (files && files.length > 0) {
            let fileName = await aws.uploadFile(files[0])
            uploadedFileUrl = process.env.IMAGE_URL + fileName
        }

        await prisma.blog.update(
            {
                where: {
                    id: Number(id),
                    isDeleted: 0
                },
                data: {
                    image: uploadedFileUrl
                }
            }
        )

        return res.status(200).send({ stauts: true, message: 'Uploaded successfully!' })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message })
    }
}

const blogList = async (req, res) => {
    try {
        const { id } = req.middlewarePayload

        const list = await prisma.blog.findMany({
            where: {
                adminId: Number(id),
                isDeleted: 0
            },
            include: {
                comment: true
            }
        })

        return res.status(200).send({ status: true, data: list })


    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message })
    }
}

const allBlogs = async (req, res) => {
    try {
        const list = await prisma.blog.findMany({
            where: {
                isDeleted: 0,
                isPublished: 0
            },
            include: {
                comment: true
            }
        })

        return res.status(200).send({ status: true, data: list })


    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message })
    }
}


const blogDetails = async (req, res) => {
    try {

        const { blogId } = req.params

        if (!blogId) {
            return res.status(400).send({ status: false, message: "blogId is required" })
        }

        const data = await prisma.blog.findUnique({
            where: {
                id: Number(blogId),
                isDeleted: 0
            },
            include: {
                comment: true
            }
        })

        return res.status(200).send({ status: true, data: data })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message })
    }
}


const editBlog = async (req, res) => {
    try {
        const parameters = req.body;
        const validation = await validate(parameters, 'editBlog');
        let { blogId, title, content, image } = validation;

        let isPresent = await prisma.blog.count({
            where: {
                id: Number(blogId),
                isDeleted: 0
            }
        })
        if (isPresent === 0) {
            return res.status(404).send({ status: false, message: 'Data not found' })
        }

        let files = req.files;

        let uploadedFileUrl = image;


        if (files && files.length > 0) {
            let fileName = await aws.uploadFile(files[0])
            uploadedFileUrl = process.env.IMAGE_URL + fileName
        }


        const currentDate = new Date().toISOString()

        await prisma.blog.update({
            where: {
                id: Number(blogId)
            },
            data: {
                title: title,
                content: content,
                image: uploadedFileUrl,
                updatedAt: currentDate,
            }
        })

        return res.status(200).send({ status: true, message: 'Updated successfully!' })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message })
    }
}

const deleteBlog = async (req, res) => {
    try {
        const { blogId } = req.params;

        await prisma.blog.update({
            where: {
                id: Number(blogId)
            },
            data: {
                isDeleted: 1
            }
        })

        return res.status(200).send({ status: true, message: 'Deleted successfully!' })


    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message })
    }
}



module.exports = {
    createBlog,
    uploadImage,
    blogList,
    allBlogs,
    blogDetails,
    editBlog,
    deleteBlog
}