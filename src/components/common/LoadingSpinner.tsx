import React from 'react';
import { Spin, Space } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingSpinnerProps {
  size?: 'small' | 'default' | 'large';
  tip?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'default', 
  tip = 'Loading...',
  className 
}) => {
  return (
    <div className={`loading-container ${className || ''}`} style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '200px' 
    }}>
      <Space direction="vertical" align="center">
        <Spin 
          size={size} 
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} 
        />
        {tip && <span style={{ color: '#666' }}>{tip}</span>}
      </Space>
    </div>
  );
};

export default LoadingSpinner;
