require('dotenv').config();
const { S3 } = require('@aws-sdk/client-s3');


const s3 = new S3({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    }
});

// console.log(s3)





const uploadFile = async (file) => {

    // return new Promise((resolve, reject) => {

    const extension = file.originalname.split('.').pop();
    let currentDate = new Date();
    const fieldId = 'IMG' + currentDate.getUTCFullYear() + "" + currentDate.getUTCMonth() + "" + currentDate.getUTCDate() + "" + currentDate.getUTCHours() + "" + currentDate.getUTCMinutes() + "" + currentDate.getUTCSeconds() + "" + currentDate.getUTCMilliseconds();
    const fileName = `${fieldId}.${extension}`;

     const data =   await  s3.putObject({
            Bucket: process.env.BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        });

        return fileName

        // let s3 = new aws.S3({ apiVersion: "2006-03-01" })
        // const uploadParams = {
        //     ACL: "public-read",
        //     Bucket: BUCKET_NAME,
        //     Key: file.originalname,
        //     Body: file.buffer
        // }

        // s3.upload(uploadParams, (err, data) => {
        //     if (err) {
        //         return reject({ "error": err })
        //     }
        //     return resolve(data.Location)
        // })


    // })

}


module.exports.uploadFile = uploadFile