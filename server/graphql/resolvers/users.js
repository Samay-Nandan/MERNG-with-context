import dotenv from "dotenv";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server';
import User from '../../models/user.js';
import { validateRegisterInput, validateLoginInput } from '../../utils/validators.js'

dotenv.config()

const { SECRET_KEY } = process.env

const generateToken = ({ id, email, username }) => {
  return jwt.sign({
    id,
    email,
    username
  }, SECRET_KEY, { expiresIn: '1h' });
}

const usersResolver = {
  Mutation:{
    async login(_, args) {

      const { username, password } = args
      const { valid, errors } = validateLoginInput(username, password);

      if (!valid) throw new UserInputError('Errors', {errors});

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Incorrect password';
        throw new UserInputError('Wrong credentials', { errors });
      }

      return{
        ...user._doc,
        id: user._id,
        token: generateToken(user)
      };
    },
    async register(_, args ) {
      const { username, email, password, confirmPassword } = args
      const { valid, errors } = validateRegisterInput( username, email, password, confirmPassword );

      if (!valid) throw new UserInputError('Errors', {errors});

      const user = await User.findOne({ email });
      if (user) {
        errors.email = "This email is taken"
        throw new UserInputError('Email is already taken', { errors })
      }

      const newUser = new User({
        email,
        username,
        password: await bcrypt.hash(password, 12),
        createdAt: new Date().toISOString()
      });
      
      const response = await newUser.save()

      return {
        ...response._doc,
        id: response._id,
        token: generateToken( response )
      }
    }
  }
}

export default usersResolver;