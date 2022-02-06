import dotenv from "dotenv";
import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';

dotenv.config();

const { SECRET_KEY } = process.env

const Authentication = ( context ) => {
  const { authorization } = context.req.headers; 
  if( !authorization ) throw new Error('Authorization header must be provided');

  const token = authorization.split('Bearer ')[1];
  if( !token ) throw new Error('Authenication token must be \'Bearer [token]');

  try {
    return jwt.verify( token, SECRET_KEY );
  } catch(err){
    throw new AuthenticationError('Invalid/Expired token');
  }

};

export default Authentication