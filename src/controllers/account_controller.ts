import express from 'express';
import OTPGenerator from '../util/otp_generator';
import NewUserApplicant from '../model/new-user-applicant';
import AppConstants from '../util/app_constants';
import EmailClient from '../util/email_client';
import UserDao from '../dao/user_dao';
import User from '../model/user';
const AccountsController = express.Router();

AccountsController.get('/login', (req, res) => {
    res.render('login', { title: 'Login to Your Account' });
});

AccountsController.get('/register', (req, res) => {
    res.render('register', { title: 'Create Account' });
});

AccountsController.post('/register', (req, res) => {
    let otp = '3233';
    let applicant = new NewUserApplicant(req.body.name, req.body.username, req.body.email, req.body.gender, req.body.password, otp);
    if (req.session) {
        req.session.applicant = applicant;
    }
    let emailClient = <EmailClient>req.app.get(AppConstants.EMAIL_CLIENT);
    // emailClient.sendOTP(applicant.email, applicant.otp);
    res.render('verification', { title: 'OTP Verification' });
});

AccountsController.post('/verifyaccount', (req, res) => {
    let otp = req.body.otp;
    if (req.session && req.session.applicant) {
        if (otp === req.session.applicant.otp) {
            let userDao = <UserDao>req.app.get(AppConstants.USER_DAO);
            (async () => {
                try {
                    let userId = await userDao.createAccount(req.session?.applicant);
                    res.redirect(`/profiles/${req.session?.applicant.username}?action=make_changes`);
                } catch (error) {
                    console.error(error);
                    res.render('error');
                }
            })();
        }
        else {
            // otp not verified
        }
    }
});

AccountsController.get('/profiles/:username', (req, res) => {
    let username = req.params.username;
    let userdao = <UserDao>req.app.get(AppConstants.USER_DAO);
    (async () => {
        let user = await userdao.getUserByUsername(username);
        // this request is for edit profile page
        if (req.query.action == 'make_changes') {
            let avtars = await userdao.getAvtars();
            res.render('editprofile',{user: user, avtars: avtars, title: 'Edit Profile'});
        }
        // this. request is for normal profile view
        else {
            res.render('profile',{user: user, title: user.name});
        }
    })();
});

AccountsController.post('/profiles/:username', (req, res) => {
    let username = req.params.username;
    let userdao = <UserDao>req.app.get(AppConstants.USER_DAO);
    (async () => {
        try {
            let user = await userdao.getUserByUsername(username);
            user.profession = req.body.profession;
            user.bio = req.body.bio;
            if (req.body.birthday)
                user.birthday = new Date(req.body.birthday);
            user.city = req.body.city;
            user.state = req.body.state;
            if (user.avtar) {
                user.avtar.id = req.body.avtar;
            }
            let result = await userdao.updateProfile(user);
            if (result)
                res.redirect(`/profiles/${username}`);
        } catch (error) {
            console.log(error);
        }
        
    })();
})
export default AccountsController;