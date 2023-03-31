import nodemailer from 'nodemailer'

const email = process.env.GOOGLE_EMAIL_ADDRESS
const appPassword = process.env.GOOGLE_APP_PASSWORD

export async function sendEmail({ to, subject, html }) {
    console.log("email: ", email)
    console.log("appPassword: ", appPassword)

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            type: 'login',
            user: email,
            pass: appPassword
        },
    })

    const mailOptions = {
        from: email,
        to,
        subject,
        html,
    }

    await transporter.sendMail(mailOptions)
}