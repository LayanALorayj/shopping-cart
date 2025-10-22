import React, { useState } from 'react';
import { Form, Input, Button, Typography, Space } from 'antd';
import { UserOutlined, MailOutlined,} from '@ant-design/icons';
import "../App.css";

const { Title } = Typography;

const ControlledForm: React.FC = () => {
 const [formData, setFormData] = useState({
  name: '',
  email: '',
  comment: '',
 });

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setFormData({
   ...formData,
   [e.target.name]: e.target.value,
  });
 };

 const handleSubmit = () => {
  console.log('Controlled Form Data (managed by state):', formData);
 };

 return (
  <div className="form-wrapper controlled-form">
   
   <Form layout="vertical" onFinish={handleSubmit} className="ant-form-custom">
    <Form.Item label="Name" required >
     <Input
      name="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="Enter your name"
      prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
     />
    </Form.Item>
    <Form.Item label="Email" required>
     <Input
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Enter your email"
      prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
     />
    </Form.Item>
    <Form.Item label="Comment">
     <Input.TextArea
      name="comment"
      value={formData.comment}
      onChange={handleChange}
      placeholder="Enter your comment"
      rows={4}
     />
    </Form.Item>
    <Form.Item>
     <Button type="primary" htmlType="submit">
      Submit Controlled
     </Button>
    </Form.Item>
   </Form>
  </div>
 );
};



const ContactPage: React.FC = () => {
 return (
  <div className="contact-page-layout">
   <Title level={1} style={{ textAlign: 'center', color: '#bc6789', marginBottom: 40, marginTop: 20 }}>
    Contact Us
   </Title>
   <Space direction="vertical" size="large" style={{ display: 'flex' }}>
    <ControlledForm />
    
   </Space>
  </div>
 );
};

export default ContactPage;
