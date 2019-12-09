'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Authenticator
  |--------------------------------------------------------------------------
  |
  | Authentication is a combination of serializer and scheme with extra
  | config to define on how to authenticate a user.
  |
  | Available Schemes - basic, session, jwt, api
  | Available Serializers - lucid, database
  |
  */
  authenticator: 'session',

  /*
  |--------------------------------------------------------------------------
  | Session
  |--------------------------------------------------------------------------
  |
  | Session authenticator makes use of sessions to authenticate a user.
  | Session authentication is always persistent.
  |
  */
 session: {
  serializer: 'LucidMongo',
  model: 'App/Models/User',
  scheme: 'session',
  uid: 'email',
  password: 'password'
},

basic: {
  serializer: 'LucidMongo',
  model: 'App/Models/User',
  scheme: 'basic',
  uid: 'email',
  password: 'password'
},

jwt: {
  serializer: 'LucidMongo',
  model: 'App/Models/User',
  token: 'App/Models/Token',
  scheme: 'jwt',
  uid: 'email',
  password: 'password',
  expiry: '20m',
  options: {
    secret: 'self::app.appKey'
  }
},

api: {
  serializer: 'mongoose',
  scheme: 'api',
  model: 'App/Models/Usuario',
  token: 'App/Models/Token',
  uid: 'email', //Correo o id
  password: 'password',
  expiry: '30d',
}
}
