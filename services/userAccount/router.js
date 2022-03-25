const express = require("express");
const router = express.Router();

const accountController = require("./userAccount.controller")

/**
 * @swagger
 * components:
 *   schemas:
 * 
 *     SignupUser:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - password
 *       properties:
 *         fullName:
 *           type: string
 *           description: The name of user
 *         email:
 *           type: string
 *           description: The email id of user
 *         password:
 *           type: string
 *           description: Secret string required to signin
 *       example:
 *         fullName: Nakul Mehra
 *         email: nakulmehra677@gmail.com
 *         password: nakul@1234
 * 
 *     SignupSubAdminUser:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *       properties:
 *         fullName:
 *           type: string
 *           description: The name of user
 *         email:
 *           type: string
 *           description: The email id of user
 *       example:
 *         fullName: Nakul Mehra
 *         email: nakulmehra677@gmail.com
 *
 *     Signin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email id of user
 *         password:
 *           type: string
 *           description: Secret string required to sign in
 *       example:
 *         email: nakulmehra677@gmail.com
 *         password: nakul@1234  
 *    
 *     SiginResponse:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         fullName:
 *           type: string
 *           description: The name of user
 *         email:
 *           type: string
 *           description: The email id of user
 *         password:
 *           type: string
 *           description: Secret string required to signin
 *         token:
 *           type: string
 *           description: A long string which is required to send with the header of APIs to authorize the user. It needs to be store in the local storage of application.
 *       example:
 *         fullName: Nakul Mehra
 *         email: nakulmehra677@gmail.com
 *         _id: 61952320897419ae49f71d82
 *
 *     UpdatePassword:
 *       type: object
 *       required:
 *         - currentPassword
 *         - newPassword
 *       properties:
 *         currentPassword:
 *           type: string
 *           description: Current password of the user
 *         newPassword:
 *           type: string
 *           description: New password the user wants to set
 *       example:
 *         currentPassword: nakul@1234
 *         newPassword: mehra@4321  
 *    
 *     Email:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: Email id of the user
 *       example:
 *         email: nakulmehra677@gmail.com
 * 
 *   headers:
 *     XAuthToken:
 *       type: string
 *       description: It is a token
 */

/**
 * @swagger
 * tags:
 *   name: User Account
 *   description: The sign up, sign in, sign out APIs
 */

/**
 * @swagger
 *   /user-account/signup:
 *   post:
 *     summary: Creates the account of user
 *     tags: [User Account]
 *     requestBody:
 *       description: Basic details required for creating an account
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupUser'
 *     responses:
 *       200:
 *         description: The data is successfully collected and an email is sent to the user's email id for verification. User will have to click button given in the mail to verify. It should be done within 10 minutes.
 *       400:
 *         description: Invalid/incomplete data given
 *       500:
 *         description: Some server error
 */

router.post("/signup", (req, res) => {
	accountController.signup(req, res);
});

/**
 * @swagger
 *   /user-account/verify-email/{_id}:
 *   get:
 *     summary: Verify user's email. User will receive this api in his/her email after signup. User will have to click on this link for verification.
 *     tags: [User Account]
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *     responses:
 *       200:
 *         description: The data is successfully collected and an email is sent to the user's email id for verification. User will have to click button given in the mail to verify. It should be done within 10 minutes.
 *       400:
 *         description: Invalid/incomplete data given
 *       500:
 *         description: Some server error
 */

router.get("/verify-email/:_id", (req, res) => {
	accountController.verifyEmail(req, res);
});

/**
 * @swagger
 *   /user-account/signin:
 *   post:
 *     summary: Sign in user
 *     tags: [User Account]
 *     requestBody:
 *       description: Basic details required for signing in
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Signin'
 *     responses:
 *       200:
 *         description: The user is authenticated and a token is provided.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SiginResponse'
 *         headers:
 *           x-auth-token:
 *             $ref: '#/components/headers/XAuthToken'
 *       400:
 *         description: Invalid/incomplete data given
 *       500:
 *         description: Some server error
 */

router.post("/signin", (req, res) => {
	accountController.signin(req, res);
});

/**
 * @swagger
 *   /user-account/update-password:
 *   post:
 *     summary: Update the password of user / sub admin user
 *     tags: [User Account]
 *     requestBody:
 *       description: Basic details required to update the password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePassword'
 *     responses:
 *       200:
 *         description: The password has been changed successfully and the current tokens got invalid. The user has to sign in again.
 *       400:
 *         description: Invalid/incomplete data given
 *       500:
 *         description: Some server error
 */

router.post("/update-password", (req, res) => {
	res.send("OK");
});

/**
 * @swagger
 *   /user-account/forgot-password:
 *   post:
 *     summary: Reset the password of user / sub admin user
 *     tags: [User Account]
 *     requestBody:
 *       description: Basic details required to reset the password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Email'
 *     responses:
 *       200:
 *         description: The an email is sent to user's email id. User will have to click button to reset the password. It should be done within 10 minutes.
 *       400:
 *         description: Invalid/incomplete data given
 *       500:
 *         description: Some server error
 */

router.post("/forgot-password", (req, res) => {
	res.send("OK");
});

module.exports = router;