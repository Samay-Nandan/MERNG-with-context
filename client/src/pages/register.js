import { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import Errors from '../components/errors';

import { AuthContext } from '../context/auth';
import { useForm } from '../utils/hooks';
import { REGISTER_USER } from "../graphql/index";

const DEFAULT_STATE = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Register = () => {
  
  const { login } = useContext(AuthContext);
  const [ errors, setErrors ] = useState({});

  const { onChange, onSubmit, values } = useForm(() => addUser(), DEFAULT_STATE); 

  const [ addUser, { loading } ] = useMutation(REGISTER_USER, {
      update: (_, result) => {
        login(result.data.register);
      },
      onError: (err) => {
        setErrors(err.graphQLErrors[0]?.extensions?.errors)
      },
      variables: values
    });


  return(
    <div className="form-container content-container">
      <Form onSubmit={onSubmit} 
            noValidate 
            className={ loading ? "loading" : '' }>
        <h1> Register </h1>
        <Form.Input label="Username"
                    placeholder="username"
                    name="username"
                    type="text"
                    values={ values.username }
                    error={ errors.username ? true : false }
                    onChange={ onChange }
        />
        <Form.Input label="Email"
                    placeholder="email"
                    name="email"
                    type="email"
                    values={ values.email }
                    error={ errors.email ? true : false }
                    onChange={ onChange }
        />
        <Form.Input label="Password"
                    placeholder="password"
                    name="password"
                    type="password"
                    values={ values.password }
                    error={ errors.password ? true : false }
                    onChange={ onChange }
        />
        <Form.Input label="Confirm Password"
                    placeholder="password"
                    name="confirmPassword"
                    type="password"
                    values={ values.confirmPassword }
                    error={ errors.confirmPassword ? true : false }
                    onChange={ onChange }
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {
        Object.keys(errors).length > 0 && <Errors errors={errors} />
      }
    </div>
  )
}

export default Register;