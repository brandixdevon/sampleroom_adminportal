import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Menu, Avatar } from 'antd';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import {
  PieChartOutlined,
  TeamOutlined,
  FontColorsOutlined,
  UserOutlined,
  LockFilled,
  SwapOutlined,
  ApartmentOutlined,
  ContactsOutlined,
  ScissorOutlined,
  ShoppingCartOutlined,
  ExperimentOutlined,
  BankOutlined,
} from '@ant-design/icons';

function Siderview() 
{
    const { Sider } = Layout;
    const { SubMenu } = Menu; 
    const [collapsed, setcollapsed] = React.useState(false);

    const onCollapse = () => {
       
        if(collapsed === true)
        {
            setcollapsed(false);
        }
        else
        {
          setcollapsed(true);
        }
    };


    return(
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} style={{backgroundColor:"#fff"}}>
      <div className="logo"  style={{backgroundColor:"#008ae6"}}>
      <center>
       <Avatar size={80} icon={<FontColorsOutlined />} style={{backgroundColor:"#ccebff",marginTop:"7px",color:"#008ae6"}}/></center>
      </div>
      <Menu theme="light" defaultSelectedKeys={['50']} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <SubMenu key="2" icon={<UserOutlined />} title="Users">
          <Menu.Item key="3"><Link to="/newuser">Add New User</Link></Menu.Item>
          <Menu.Item key="4"><Link to="/allusers">All User List</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="5" icon={<TeamOutlined />} title="User Groups">
          <Menu.Item key="6"><Link to="/newug">Add New Group</Link></Menu.Item>
          <Menu.Item key="7"><Link to="/allugs">All Group List</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="8" icon={<SwapOutlined />} title="Product Routes">
          <Menu.Item key="9"><Link to="/newroute">Add New Route</Link></Menu.Item>
          <Menu.Item key="10"><Link to="/allroutes">All Routes List</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="11" icon={<ApartmentOutlined />} title="Customers">
          <Menu.Item key="12"><Link to="/newcustomer">Add New Customer</Link></Menu.Item>
          <Menu.Item key="13"><Link to="/allcustomers">All Customer List</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="14" icon={<ExperimentOutlined />} title="Sample Stages">
          <Menu.Item key="15"><Link to="/newstage">Add New Stage</Link></Menu.Item>
          <Menu.Item key="16"><Link to="/allstages">All Stages List</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="17" icon={<BankOutlined />} title="Plants">
          <Menu.Item key="18"><Link to="/newplant">Add New Plant</Link></Menu.Item>
          <Menu.Item key="19"><Link to="/allplants">All Plants List</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="20" icon={<ContactsOutlined />} title="Sewing MO/Teams">
          <Menu.Item key="21"><Link to="/newmo">Add New Mo/Team</Link></Menu.Item>
          <Menu.Item key="22"><Link to="/allmos">All Mo/Team List</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="23" icon={<ShoppingCartOutlined />} title="Dispatch Vendors">
          <Menu.Item key="24"><Link to="/newvendor">Add New Vendor</Link></Menu.Item>
          <Menu.Item key="25"><Link to="/allvendors">All Vendor List</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="26" icon={<ScissorOutlined />} title="Cutting">
          <Menu.Item key="27"><Link to="/cutmethods">Cut Handling</Link></Menu.Item>
          <Menu.Item key="28"><Link to="/cutteams">Cutting Teams</Link></Menu.Item>
        </SubMenu>
        <hr/>
        <Menu.Item style={{color:"red"}} key="50" active icon={<LockFilled />}>
          <Link style={{color:"red"}} to="/login">Sign Out</Link>
        </Menu.Item>
      </Menu>
    </Sider>);
}

export default Siderview;