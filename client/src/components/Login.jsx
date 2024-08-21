import { useState } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
useState

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //functions or method to handle our user
    const handleUser = (e) => {
        setUsername(e.target.value)
    }

    //function or method to handle our password
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    //function to handle our submit
    const handleSubmit = () => {
        let userData = {
            username : username,
            password : password
        }
        console.log(userData);
    }

  return (
    <>
      <Container>
        <Row>
          <Col className="form-container d-flex justify-content-center">
            
            <Form>
              <p className="text-center">Login</p>
              <Form.Group className="mb-3" controlId="Username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter Username" onChange={handleUser} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handlePassword}/>
              </Form.Group>
              <Button variant="outline-primary" onClick={handleSubmit}>
                Login
              </Button>
              <p className="mt-3">Don't have an account?</p>
              <Button variant="outline-primary" onClick={handleSubmit}>
                Create Account
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
