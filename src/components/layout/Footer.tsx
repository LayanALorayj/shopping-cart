import { Layout, Row, Col, Typography, Space } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const { Footer } = Layout;
const { Text, Title, Link } = Typography;

const AppFooter = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <Footer className="footer-container">
      <Row justify="space-between" align="top" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12}>
          <Title
            level={5}
            className="footer-title footer-link"
            onClick={handleContactClick}
          >
            {t("footer.contactUs")}
          </Title>

          <Space direction="vertical" size="small">
            <Space>
              <PhoneOutlined style={{ color: "#ffffff" }} />
              <Link
                href="tel:+966533530734"
                className="footer-link"
                style={{ color: "#ffffff" }}
              >
                +966 5x xxx xxxx
              </Link>
            </Space>

            <Space>
              <MailOutlined style={{ color: "#ffffff" }} />
              <Link
                href="mailto:LayanAlorayj@Outlook.com"
                target="_blank"
                className="footer-link"
                style={{ color: "#ffffff" }}
              >
                LayanAlorayj@Outlook.com
              </Link>
            </Space>

            <Space>
              <EnvironmentOutlined style={{ color: "#ffffff" }} />
              <Text className="footer-text" style={{ color: "#ffffff" }}>
                {t("footer.location")}
              </Text>
            </Space>
          </Space>
        </Col>

        <Col xs={24} sm={24} md={12} className="footer-right">
          <div className="footer-social">
            <Link
              href="https://github.com/LayanALorayj/shopping-cart"
              target="_blank"
              aria-label="GitHub"
              className="github-icon"
            >
              <GithubOutlined style={{ fontSize: 28}} />
            </Link>
          </div>
        </Col>
      </Row>

      <div className="footer-copy-center">
        <Text className="footer-copy" style={{ color: "#ffffff" }}>
          © {new Date().getFullYear()} {t("footer.siteName")}.{" "}
          {t("footer.rightsReserved")}
        </Text>
      </div>
    </Footer>
  );
};

export default AppFooter;