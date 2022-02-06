import { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from "../graphql/index";

import { AuthContext } from '../context/auth';
import { useForm } from '../utils/hooks';
import Errors from '../components/errors';

const DEFAULT_STATE = {
    username: '',
    password: '',
}

const Login = () => {
  const { login } = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(() => loginUser(), DEFAULT_STATE); 

  const [ loginUser, { loading } ] = useMutation(LOGIN_USER, {
      update: (_, result) => {
        login(result.data.login);
      },
      onError: (err) => {
        setErrors(err.graphQLErrors[0]?.extensions?.errors)
      },
      variables: values
  });

  return(
    <div className="form-container content-container">
      <Form onSubmit={ onSubmit } 
            noValidate 
            className={ loading ? "loading" : '' }>
        <h1> Login </h1>
        <Form.Input label="Username"
                    placeholder="username"
                    name="username"
                    type="text"
                    values={ values.username }
                    error={ errors.username ? true : false }
                    onChange={ onChange }
        />
        <Form.Input label="Password"
                    placeholder="password"
                    name="password"
                    type="password"
                    values={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {
        Object.keys(errors).length > 0 && <Errors errors={errors} />
      }
    </div>
  )
}

export default Login;