import { Layout, Menu } from 'antd';
import { HomeOutlined, AppstoreOutlined, PhoneOutlined } from '@ant-design/icons';
import './navbar.css'; 
const { Header } = Layout;

const Navbar = () => {
  return (
    <Layout>
      <Header className="navbar-header">
        <div className="navbar-logo">🍽️ Crave Kart</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          className="navbar-menu"
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<AppstoreOutlined />}>
            Menu
          </Menu.Item>
          <Menu.Item key="3" icon={<PhoneOutlined />}>
            Contact
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default Navbar;
