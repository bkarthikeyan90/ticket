import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function CreateTicket() {
  const [userId, setUserId] = useState(null);
  const [assetId, setAssetId] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchUserInfo(storedUserId);
    }
  }, []);

  const fetchUserInfo = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${userId}`);
      setName(response.data.name);
      setPhone(response.data.phone);
      setEmail(response.data.email);
    } catch (error) {
      alert('Error fetching user information.');
    }
  };

  const handleCreateTicket = async () => {
    const ticketData = { 
      assetId, 
      title,
      name,
      phone,
      email,
      category,
      deviceType, 
      problemDescription, 
      status: "Open", 
      userId
    };

    try {
      const response = await axios.post('http://localhost:5000/create-ticket', ticketData);
      alert('Ticket Created: ' + JSON.stringify(response.data));
    } catch (error) {
      alert('Error creating ticket: ' + error.response.data.error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={8}>
          <h1>Create Ticket</h1>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter department name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Asset ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter asset ID"
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Problem Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe the problem"
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select category</option>
                <option value="CPU">CPU</option>
                <option value="Printer">Printer</option>
                <option value="Scanner">Scanner</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Device Status</Form.Label>
              <Form.Select value={deviceType} onChange={(e) => setDeviceType(e.target.value)}>
                <option value="">Select device status</option>
                <option value="Not Working">Not Working</option>
                <option value="OS Problem">OS Problem</option>
                <option value="Hanging Issue">Hanging Issue</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" onClick={handleCreateTicket}>
              Create Ticket
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateTicket;
