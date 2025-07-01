import { Layout, Menu } from 'antd';
import { HomeOutlined, AppstoreOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import './navbar.css';

const { Header } = Layout;

function Navbar() {
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
      </Header>
    </Layout>
  );
}

export default Navbar;
