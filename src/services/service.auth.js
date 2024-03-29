const User = require('../models/model.User')
const jwt = require('jsonwebtoken')
const { authErrorHandler } = require('../errors/errors')

let authService = {
    signup: function (req) {
        return new Promise(async (resolve, reject) => {
            let newUser = new User(req) //novo usuario
            await newUser.encryptPassword() //encriptar a password
            newUser.save((err, result) => {
                if (err) {
                    return reject(authErrorHandler(err))
                }
                let token = jwt.sign({ user: result }, process.env.SECRET_KEY)
                return resolve(token)
            })
        })
    },

    signin: function (req) {
        return new Promise(async (resolve, reject) => {
            User.find({ email: req.email }, async (err, result) => {
                if (err) reject(err)

                if (result.length == 0) {
                    return reject('Email não registado')
                }

                let user = result[0]

                if (user.state != true) {
                    return reject(
                        'A conta não está ativa, entre em contato com a Hydraca'
                    )
                }

                if (!(await new User().comparePassword(req, user))) {
                    reject('Senha incorreta')
                }

                let token = jwt.sign({ user: user }, process.env.SECRET_KEY)
                return resolve(token)
            })
        })
    }
}

module.exports = authService
