import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../Auth/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MedicalCanvas from "../components/LoginCanvas";
import { Container, Form, Button, Card } from "react-bootstrap";
import "../styles/style-login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ Use React Router navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Login Successful! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard"); // ✅ Now using useNavigate() instead of window.location.href
      }, 1500);
    } catch (error) {
      toast.error("Login Failed! Please check your credentials.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 position-relative magic-bg">
      <MedicalCanvas />
      <ToastContainer />
      <Card className="p-4 position-relative custom-card" style={{ width: "25rem", zIndex: 2 }}>
        <Card.Body>
          <Card.Title className="text-center mb-4 text-white">Login</Card.Title>
          <Form onSubmit={handleSubmit}>
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

            <Form.Group className="mb-3 text-white">
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
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
