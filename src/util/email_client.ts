import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
export default class EmailClient {
    private mailTranporter: Mail;
    constructor(transporter: Mail) {
        this.mailTranporter = transporter;
    }

    sendOTP(to: string, otp: string) : void  {
        this.mailTranporter.sendMail({
            to: to,
            subject:'OTP for Tech Forum Verification',
            html:`
                <html>

                    <body>
                        <h3>You just used this email to create an tech forum account. Here is a secrete OTP
                        for your Account Verificatoin.</h3>
                        <h1>${otp}</h1>
                    </body>
                <html>
            `
        }, (err, info) => {
            if (err)
                console.error(err);
            console.info(info);
        })
    }
}