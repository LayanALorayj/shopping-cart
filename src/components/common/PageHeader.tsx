import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: Array<{
    title: string;
    path?: string;
  }>;
  extra?: React.ReactNode;
  onBack?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumb,
  extra,
  onBack
}) => {
  const navigate = useNavigate();

  const defaultBreadcrumb = [
    {
      title: 'Home',
      path: '/',
    },
    ...(breadcrumb || [])
  ];

  return (
    <div className="page-header">
      <div className="page-header-content">
        {onBack && (
          <button onClick={onBack} className="back-button">
            ← Back
          </button>
        )}
        <div className="page-header-title">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {extra && <div className="page-header-extra">{extra}</div>}
      </div>
      <Breadcrumb
        items={defaultBreadcrumb.map((item, index) => ({
          title: index === 0 ? <HomeOutlined /> : item.title,
          onClick: item.path ? () => navigate(item.path!) : undefined,
        }))}
      />
    </div>
  );
};

export default PageHeader;
