import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {

        const hashedToken = await bcrypt.hash(userId.toString(), 10);
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            })
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD
            }
        });

        const actionURL = emailType === "VERIFY"
            ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
            : `${process.env.DOMAIN}/resetpassword?token=${hashedToken}`;

        const mailOptions = {
            from: `"Next Auth" <no-reply@yourdomain.com>`, // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password', // Subject line
            text: `Click the link below to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}.`, // plain text body
            html: `<p>Click <a href="${actionURL}">here</a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}, or copy and paste the link below:</p>
                   <p>${actionURL}</p>`, // html body
        }

        const mailInfo = await transport.sendMail(mailOptions);
        return mailInfo;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred while sending email.");
    }
}