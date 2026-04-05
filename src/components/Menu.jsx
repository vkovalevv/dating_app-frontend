import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
  { key: '1', label: 'Preferences', icon: <SettingOutlined /> },
  { key: '2', label: 'Profile', icon: <UserOutlined /> },
  { key: '3', label: 'Photos', icon: <AppstoreOutlined /> },
  { key: '4', label: 'Chats', icon: <MailOutlined /> },
  { key: '5', label: 'Swipes', icon: <HomeOutlined/>}
]
const SideMenu = () => {
  const onClick = e => {
    console.log('click ', e);
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