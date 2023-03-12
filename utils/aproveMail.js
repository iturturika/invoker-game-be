import nodemailer from 'nodemailer';
const mail = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_EMAIL
    }
});

export const sendMail = ((email, token) => {
    const mailOptions = {
        from: 'invokergameozzy@gmail.com',
        to: email,
        subject: 'Aprove your registration on Invoker-game.com',
        text: `Link: https://invoker-game.com/aprove-registration?token=${token}`
    }

    mail.sendMail(mailOptions, (error) => {
        if(error){
            console.log(error);
        } else {
            console.log('Email sent successfully');
        }
    })
});