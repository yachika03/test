const jwt = require("jsonwebtoken");
const nodemailer=require("nodemailer");
const mailtransporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:secure_configuration.EMAIL_USERNAME,
            password:secure_configuration.PASSWORD,

    }
})
