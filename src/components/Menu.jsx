import { useNavigate, useLocation } from 'react-router-dom';
import { SettingOutlined, UserOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons';

const items = [
  { key: '/swipes', label: 'Swipes', icon: <HomeOutlined /> },
  { key: '/preferences', label: 'Preferences', icon: <SettingOutlined /> },
  { key: '/profile', label: 'Profile', icon: <UserOutlined /> },
  { key: '/chats', label: 'Chats', icon: <MailOutlined /> },
]

const SideMenu = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="w-56 min-h-screen border-r border-gray-200 pt-8 px-3">
      <nav className="flex flex-col gap-1">
        {items.map(item => (
          <button
            key={item.key}
            onClick={() => navigate(item.key)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors w-full text-left
              ${location.pathname === item.key
                ? 'bg-gray-300 text-gray-700 font-medium'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default SideMenu;