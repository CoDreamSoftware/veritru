import nodemailer from 'nodemailer'

export async function sendEmail({ to, subject, html }) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
    })

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to,
        subject,
        html,
    }

    await transporter.sendMail(mailOptions)
}
