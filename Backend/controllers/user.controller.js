const { User, Token } = require('../models/db')
const JWT = require('jsonwebtoken');

const bcrypt = require('bcryptjs')
const key = "SecrateKay";

class UserController {

    static createToken = async (id) => {
        try {
            const token = await JWT.sign({ id }, key, { expiresIn: '1h' });
            return token;
        } catch (error) {
            return error.message
        }

    }
    static password = async (password) => {
        const hashPassword = await bcrypt.hash(password, 8);
        return hashPassword;
    }

    static singUp = async (req, res) => {
        try {
            const body = req.body;
            const hashPassword = await this.password(body.password);

            const user = new User({
                name: body.name,
                email: body.email,
                mobile: body.mobile,
                is_Active: true,
                gender: body.gender,
                hash: hashPassword

            })
            if (!user) {
                return res.status(409).send({ Message: "Data missing.." });
            }
            const exist_user = await User.findOne({ email: body.email });

            if (exist_user) {
                return res.status(409).send({ Message: "this email already exist..", email: exist_user.email });
            }
            const saveUser = await user.save();

            return res.status(201).send({ Message: "User register successfully ...", user: saveUser });

        } catch (error) {
            return res.status(500).send({ Message: "Unexpected Error" });
        }
    }
    static Login = async (req, res) => {
        try {
            const password = req.body.password;
            const email = req.body.email;
            console.log(password);
            const user = await User.findOne({ email: email });
            if (user) {
                const mathcPassword = await bcrypt.compare(password, user.hash);

                if (mathcPassword) {
                    const generateToken = await this.createToken(user._id)
                    const token = new Token({
                        user_id: user._id,
                        token: generateToken
                    })

                    const tokenResult = await token.save();
                    if (!tokenResult) {
                        return res.send(401).send({ msg: "invalid token" });
                    }


                    const UserResult = {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        password: user.hash,
                        mobile: user.mobile,
                        is_Active: user.is_Active,
                        Token: token
                    }
                    return res.status(200).send({ massege: 'login successfully..', user: UserResult });
                }
                return res.status(401).send({ status: false, massege: 'login details are incorrect..' })

            }
            return res.status(401).send({ status: false, massege: 'login details are incorrect..' })

        } catch (error) {
            return res.send({ error: error.message })
        }

    }

    static logout = async (req, res) => {

        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            console.log(token);
            if (!token) {
                return res.staus(401).send({ message: "Authorization token not provided" })
            }
            const deleteToken = await Token.findOneAndDelete({ token });
            if (!deleteToken) {
                return res.status(401).send({ message: "Authorization token not provided" });
            }
            return res.status(401).send({ message: "logout successfully.." });
        } catch (error) {
            return res.send({ error: error.message })
        }


    }

}

module.exports = { UserController }