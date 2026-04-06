import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
const items = [
  { key: '1', label: 'Preferences', icon: <SettingOutlined /> },
  { key: '2', label: 'Profile', icon: <UserOutlined /> },
  { key: '3', label: 'Images', icon: <AppstoreOutlined /> },
  { key: '4', label: 'Chats', icon: <MailOutlined /> },
  { key: '5', label: 'Swipes', icon: <HomeOutlined/>}
]
const SideMenu = () => {
  const navigate = useNavigate();
  const onClick = e => {
    if(e.key === '1') navigate('/preferences');
    if(e.key === '2') navigate('/profile');
    //if(e.key === '3') navigate('/images');
    //if(e.key === '4') navigate('/chats');
    if(e.key === '5') navigate('/swipes');
  };
  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};
export default SideMenu;