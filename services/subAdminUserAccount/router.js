const express = require("express");
const router = express.Router();

const accountController = require("./userAccount.controller")

/**
 * @swagger
 * components:
 *   schemas:
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
 *     Token:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 *           description: A long string which is required to send with the header of APIs to authorize the user. It needs to be store in the local storage of application.
 *       example:
 *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
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
 */

/**
 * @swagger
 * tags:
 *   name: Sub Admin User Account
 *   description: The sign up, sign in, sign out APIs
 */

/**
 * @swagger
 *   /sub-admin-user-account/signup:
 *   post:
 *     summary: Creates the account of user
 *     tags: [Sub Admin User Account]
 *     parameters:
 *       - in: header
 *         name: x-access-token
 *         description: Authorization header. It is required for creating sub admin user by admin
 *         dataType: String
 *     requestBody:
 *       description: Basic details required for creating an account
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *                 - $ref: '#/components/schemas/SignupUser'
 *                 - $ref: '#/components/schemas/SignupSubAdminUser'
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
 *   /sub-admin-user-account/signin:
 *   post:
 *     summary: Sign in user
 *     tags: [Sub Admin User Account]
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
 *               $ref: '#/components/schemas/Token'
 *       400:
 *         description: Invalid/incomplete data given
 *       500:
 *         description: Some server error
 */

router.post("/signin", (req, res) => {
	res.send("OK");
});

module.exports = router;

