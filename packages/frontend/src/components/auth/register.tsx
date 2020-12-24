import React, { FC, useState, useRef } from 'react';

import { useForm } from 'react-hook-form';
import { Pane, TextInputField, Button, Heading, Alert, Checkbox } from 'evergreen-ui';

const Register: FC = () => {
  const { register, handleSubmit, errors, watch, reset } = useForm();
  const [ loggedIn, setLoggedIn ] = useState<string | null>(null);
  const [ error, setError ] = useState<string | null>(null);
  const [ termsAccepted, setTermsAccepted ] = useState<boolean>(false);

  const handleRegister = async (data: any) => {
    setLoggedIn(null);
    setError(null);

    const res = await fetch('http://localhost/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email: data.email, password: data.password}),
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

  const password = useRef({});
  password.current = watch("password", "");

  return (
    <Pane padding="1em" margin="1em" elevation={2}>
      <Heading size={900} marginY=".5em">Register</Heading>

      { loggedIn &&
        <Alert
          intent="success"
          title={<>
            You are now logged as <a href="./#TODO: link to my profile page">{loggedIn}</a>,
            check your inbox to <a href="./#TODO: link to activate account page">activated your account</a>
          </>}
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

      <form onSubmit={handleSubmit(handleRegister)}>
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
          ref={register({ 
            required: 'You must enter a password',
            minLength: {
              value: 7,
              message: "Password must have at least 7 characters",
            }
          })}
          validationMessage={errors.password && errors.password.message}
          isInvalid={errors.password !== undefined}
        />
        <TextInputField
          name="confirm_password"
          label="Confirm password *"
          placeholder="password"
          type="password"
          ref={register({ 
            required: 'You must enter a password',
            validate: value => 
              value === password.current || "The passwords do not match"
          })}
          validationMessage={ errors.confirm_password && errors.confirm_password.message }
          isInvalid={errors.confirm_passworthd !== undefined}
        />
        { /* TODO: add checkbox in form validation */}
        <Checkbox 
          label={<>I agree to the <a href="/terms-and-condittions">terms and conditions</a></>}/
        >
        <Button name="terms" type="submit" appearance="primary">Register</Button>
      </form>
    </Pane>
  );
}

export default Register;
