import nodemailer from 'nodemailer'
import dotenv from "dotenv";

dotenv.config()

const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export const mailer = (email, subject, emailBody) => transport.sendMail({
        from: 'Callboard App',
        to: email,
        subject: subject,
        html: emailBody,
    },
    (err) => {
        console.log(err)
    }
)

