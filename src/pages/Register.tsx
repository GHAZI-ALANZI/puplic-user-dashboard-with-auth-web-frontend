import React, { useState } from "react";
import { register } from "../Auth/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterCanvas from "../components/RegisterCanvas";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/style-register.css";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      toast.success("Registration Successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (error) {
      toast.error("Registration Failed! Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center maindiv vh-100 position-relative">
      <RegisterCanvas />
      <ToastContainer />
      <Card className="shadow-lg p-4 card position-relative" style={{ width: "25rem", zIndex: 2 }}>
        <Card.Body>
          <Card.Title className="text-center mb-4 text-white">Create An Account</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 text-white">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 text-white">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>

          <div className="text-center mt-3 text-white">
            <span>Already have an account? </span>
            <Link to="/login" className="text-info">
              Login here
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;
