import React, { FC, useState } from 'react';

import { useForm } from 'react-hook-form';
import { Pane, TextInputField, Button, Heading, Alert } from 'evergreen-ui';

const Login: FC = () => {
  const { register, handleSubmit, errors, reset } = useForm();
  const [ loggedIn, setLoggedIn ] = useState<string | null>(null);
  const [ error, setError ] = useState<string | null>(null);

  const handleLogin = async (data: any) => {
    setError(null);
    setLoggedIn(null);

    const res = await fetch('http://localhost/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'Application/Json',
      },
      mode: 'cors',
    });

    const body = await res.json();

    if(!res.ok) {
      setError(body.error);
      return;
    }

    setLoggedIn(body.email);
    reset({});
  }

  return (
    <Pane padding="1em" margin="1em" elevation={2}>
      <Heading size={900} marginY=".5em">Login</Heading>

      { loggedIn &&
        <Alert
          intent="success"
          title={`You are now logged in as ${loggedIn}, go and explore (;`}
          marginBottom="1em"
        />
      }

      {
        error &&
        <Alert
          intent="danger"
          title="Failed to login"
          marginBottom="1em"
        >
          { error }
        </Alert>
      }

      <form onSubmit={handleSubmit(handleLogin)}>
        <TextInputField
          name="email"
          label="Email *"
          placeholder="email"
          type="text"
          ref={register({
            required: "You must enter an email address", 
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "You must enter a valid email address"
            }
          })}
          validationMessage={ errors.email?.message }
          isInvalid={errors.email !== undefined}
        />
        <TextInputField
          name="password"
          label="Password *"
          placeholder="password"
          type="password"
          ref={register({ required: true })}
          validationMessage={ errors.password && 'You must enter a valid password' }
          isInvalid={errors.password !== undefined}
        />
        <Button type="submit" appearance="primary">Login</Button>
      </form>
    </Pane>
  );
}

export default Login;
