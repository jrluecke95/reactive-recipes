import React, { useState } from "react";
import { Form, Button, Container, Jumbotron } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import { setUser } from "../redux/actions";

const Login = () => {
  const [ form, setForm ] = useState({
    username: '',
    password: ''
  })

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: form.username,
        password: form.password,
      }),
    })
    .then((res) => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error)
      } else {
        alert('user logged in!');
        dispatch(setUser(data))
        history.push('/')
      }
    })
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Container>
      <Jumbotron fluid>
        <Container>
          <h1>Login</h1>
          <p>
            If you're an existing user please log in here - if not please click below to create an account!
          </p>
          <LinkContainer to="/register">
            <Button>Register</Button>
          </LinkContainer>
        </Container>
      </Jumbotron>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" name='username' onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name='password' onChange={handleChange}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
