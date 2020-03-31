import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
export default class EmailClient {
    private mailTranporter: Mail;
    constructor(transporter: Mail) {
        this.mailTranporter = transporter;
    }
}