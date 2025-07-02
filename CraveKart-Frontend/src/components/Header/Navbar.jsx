import { Layout, Menu } from 'antd';
import { HomeOutlined, AppstoreOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import './navbar.css';

const { Header } = Layout;

function Navbar(props) {
  return (
    <Layout>
      <Header className="navbar-header">
        <div className="navbar-logo">🍽️ Crave Cart</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          className="navbar-menu"
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <NavLink to="/" className="nav-link">Home</NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<AppstoreOutlined />}>
            <NavLink to="/about" className="nav-link">About</NavLink>
          </Menu.Item>
        </Menu>
        <button
          className="dark-mode-toggle"
          onClick={() => props.setDarkMode(!props.darkMode)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            marginLeft: '16px'
          }}
          aria-label="Toggle dark mode"
        >
          {props.darkMode ? '🌞' : '🌙'}
        </button>
      </Header>
    </Layout>
  );
}

export default Navbar;
