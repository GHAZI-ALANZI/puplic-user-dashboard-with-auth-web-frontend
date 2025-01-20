import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile, updateUserPassword, logout } from "../Auth/auth";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import "../styles/services.css"; // Ensuring Service Cube Styles are applied

const services = [
  { name: "Healthcare", icon: "bi bi-heart-pulse", link: "https://www.google.com" },
  { name: "Finance", icon: "bi bi-cash-coin", link: "https://www.google.com" },
  { name: "Education", icon: "bi bi-book", link: "https://www.google.com" },
  { name: "Work", icon: "bi bi-briefcase", link: "https://www.google.com" },
  { name: "Social Welfare", icon: "bi bi-people", link: "https://www.google.com" }
];

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [passwordData, setPasswordData] = useState({ current_password: "", new_password: "", confirm_password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
        setFormData({ name: userData.name, email: userData.email });
      } catch {
        navigate("/login");
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData);
      setUser({ ...user, ...formData });
      alert("Profile updated successfully!");
      setActiveSection("profile");
    } catch (error) {
      alert("Error updating profile.");
      console.error("Error updating profile", error);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (passwordData.new_password !== passwordData.confirm_password) {
        alert("New password and confirmation must match!");
        return;
      }
      await updateUserPassword(passwordData);
      alert("Password updated successfully!");
      setActiveSection("profile");
    } catch (error) {
      alert("Error updating password. Check your current password.");
      console.error("Error updating password", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="vh-100 d-flex p-0">
      <Sidebar setActiveSection={setActiveSection} />

      <Col className="dashboard-content">
        {/* <Row className="topbar">
          <Col>
            <h5>Dashboard</h5>
          </Col>
          <Col className="text-end text-white fw-bold ">
            {user ? <span> Welcome, {user.name}</span> : <span>Loading...</span>}
            <Button variant="danger" className="btn-ubuntu ms-3 fw-bold" onClick={() => { logout(); navigate("/login"); }}>
              Logout
            </Button>
          </Col>
        </Row> */}

        <div className="workspace ">
          {activeSection === "home" && user && (
            <Card className="p-5 shadow-lg text-center custom-card text-white">
              <h2>Welcome, {user.name}!</h2>
            </Card>
          )}


{activeSection === "notifications" && (
            <Card className="p-5 shadow-lg custom-card text-white">
              <h3>Notifications</h3>
              <p>No new notifications.</p>
            </Card>
          )}

          {activeSection === "messages" && (
            <Card className="p-5 shadow-lg custom-card text-white">
              <h3>Messages</h3>
              <p>No new messages.</p>
            </Card>
          )}

          {activeSection === "profile" && user && (
            <Card className="p-5 shadow-lg text-center text-white custom-card">
              <h3>My Profile</h3>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <Button className="btn mt-3 w-100" onClick={() => setActiveSection("editProfile")}>
                Edit My Information
              </Button>
              <Button className="btn mt-3 w-100" onClick={() => setActiveSection("changePassword")}>
                Change Password
              </Button>
            </Card>
          )}

          {activeSection === "editProfile" && (
            <Card className="p-5 shadow-lg text-white custom-card">
              <h3>Edit My Information</h3>
              <Form onSubmit={handleUpdate}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                </Form.Group>

                <Button type="submit" className="btn w-100">Update Profile</Button>
              </Form>
              <Button className="btn btn-warning mt-3 w-100" onClick={() => setActiveSection("profile")}>
                Back to Profile
              </Button>
            </Card>
          )}

          {activeSection === "changePassword" && (
            <Card className="p-5 shadow-lg text-white custom-card">
              <h3>Change Password</h3>
              <Form onSubmit={handlePasswordUpdate}>
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control type="password" value={passwordData.current_password} onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control type="password" value={passwordData.new_password} onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" value={passwordData.confirm_password} onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })} required />
                </Form.Group>

                <Button type="submit" className="btn w-100" disabled={loading}>
                  {loading ? "Updating..." : "Update Password"}
                </Button>
              </Form>
              <Button className="btn btn-warning mt-3 w-100" onClick={() => setActiveSection("profile")}>
                Back to Profile
              </Button>
            </Card>
          )}

{activeSection === "services" && (
  <div className="services-container">
    {services.map((service, index) => (
      <div key={index} className="glass-cube" onClick={() => window.open(service.link, "_blank")}>
        <div className="cube-face front">
          <i className={service.icon}></i>
          <span className="text-dark">{service.name}</span>
        </div>
        <div className="cube-face back">{service.name}</div>
        <div className="cube-face left ">{service.name}</div>
        <div className="cube-face right">{service.name}</div>
        <div className="cube-face top">{service.name}</div>
        <div className="cube-face bottom">{service.name}</div>
      </div>
    ))}
  </div>
)}

        </div>
      </Col>
    </Container>
  );
};

export default Dashboard;
