import React, { useState } from 'react';
import { Form, Input, Button, Typography, Space } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import "../App.css";

const { Title } = Typography;

const ControlledForm: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', comment: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
  };

  return (
    <div className="form-wrapper controlled-form">
      <Form layout="vertical" onFinish={handleSubmit} className="ant-form-custom">
        <Form.Item label={t("contact.name")} required>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("contact.enterName")}
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
        </Form.Item>
        <Form.Item label={t("contact.email")} required>
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("contact.enterEmail")}
            prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
        </Form.Item>
        <Form.Item label={t("contact.comment")}>
          <Input.TextArea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder={t("contact.enterComment")}
            rows={4}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t("contact.submit")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const ContactPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="contact-page-layout">
      <Title level={1} style={{ textAlign: 'center', color: '#bc6789', marginBottom: 40, marginTop: 20 }}>
        {t("contact.contactUs")}
      </Title>
      <Space direction="vertical" size="large" style={{ display: 'flex' }}>
        <ControlledForm />
      </Space>
    </div>
  );
};

export default ContactPage;
