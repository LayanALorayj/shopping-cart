import { Layout, Typography, Space } from "antd";
import {
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
    <Footer className="footer-container" style={{ textAlign: "center" }}>
      <Title
        level={5}
        className="footer-title footer-link"
        onClick={handleContactClick}
        style={{ display: "inline-block" }}
      >
        {t("footer.contactUs")}
      </Title>

      <div className="footer-info-group">
        <Space
          size="large"
          wrap
          align="center"
          className="footer-info-space"
          style={{ justifyContent: "center", marginTop: "8px" }}
        >
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
      </div>

      <div
        className="footer-copy-center"
      >
        <Link
          href="https://github.com/LayanALorayj/shopping-cart"
          target="_blank"
          aria-label="GitHub"
          className="github-icon"
        >
          <GithubOutlined style={{ fontSize: 26, color: "#ffffff" }} />
        </Link>

        <Text className="footer-copy" style={{ color: "#ffffff" }}>
          © {new Date().getFullYear()} {t("footer.siteName")}.{" "}
          {t("footer.rightsReserved")}
        </Text>
      </div>
    </Footer>
  );
};

export default AppFooter;
