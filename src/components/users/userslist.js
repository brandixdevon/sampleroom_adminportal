import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Breadcrumb, Typography, Row, Col, notification, Button, Tooltip, Table, Tag  } from 'antd';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import Moment from 'react-moment';
import { EditOutlined } from '@ant-design/icons';
import SIDERVIEW from '../layout/siderview';
import HEADERVIEW from '../layout/headerview';
import FOOTERVIEW from '../layout/footerview';
import moment from 'moment';

function Index() 
{
    const {Content} = Layout;
    
    var apiurl = localStorage.getItem('session_apiurl');

    const [ds_allusers , setds_allusers] = React.useState([]);
    const [ds_usergroups , setds_usergroups] = React.useState([]);
 
    const tablecolumns = [
        {
          title: 'Action',
          dataIndex: 'id',
          width: '5%',
          key: 'id',
          render: (val) => ActionButtonStrip(val),
        },
        {
          title: 'User Name',
          dataIndex: 'username',
          width: '25%',
          key: 'username',
          sorter: (a, b) => a.username.localeCompare(b.username),
        },
        {
          title: 'User Active',
          dataIndex: 'isavailable',
          width: '10%',
          key: 'isavailable',
          sorter: (a, b) => a.isavailable - b.isavailable,
          render: (val) => YesNo(val),
        },
        {
          title: 'Create Date',
          dataIndex: 'createdate',
          width: '10%',
          key: 'createdate',
          sorter: (a, b) => moment(a.createdate) - moment(b.createdate),
          render: (val) => ConvertToDate(val),
        },
        {
          title: 'Last Log',
          dataIndex: 'lastlog',
          width: '10%',
          key: 'lastlog',
          sorter: (a, b) => moment(a.lastlog) - moment(b.lastlog),
          render: (val) => ConvertToDatetime(val),
        },
        {
          title: 'User Group',
          dataIndex: 'ugname',
          width: '15%',
          key: 'ugname',
          filters: ds_usergroups,
          onFilter: (value, record) => record.ugname.indexOf(value) === 0,
        },
        {
          title: 'Group Active',
          dataIndex: 'ugactive',
          width: '10%',
          key: 'ugactive',
          sorter: (a, b) => a.ugactive - b.ugactive,
          render: (val) => YesNo(val),
        },
        {
          title: 'Admin',
          dataIndex: 'isadmin',
          width: '10%',
          key: 'isadmin',
          sorter: (a, b) => a.isadmin - b.isadmin,
          render: (val) => YesNo(val),
        },
      ];

      function YesNo(value)
      {
        if(value === true)
        {
          return <Tag color={'green'} key={'Active'}>Active</Tag>;
        }
        else
        {
          return <Tag color={'red'} key={'Disable'}>Disable</Tag>;
        }
      }
 
      function ConvertToDate(value)
      {
        if(value !== null)
        {
          return <Moment format="YYYY-MMM-DD">{value}</Moment>;
        }
        else
        {
          return <p>N/A</p>;
        }
        
      }

      function ConvertToDatetime(value)
      {
        if(value !== null)
        {
          return <Moment format="YYYY-MMM-DD h:mm:ss a">{value}</Moment>;
        }
        else
        {
          return null;
        }
        
      }

      function ActionButtonStrip(value)
      {
        return (<Tooltip title="Edit">
        <Link to={"/edituser/"+value}><Button shape="circle" type="primary" icon={<EditOutlined />} /></Link>
      </Tooltip>);
      }
 
    React.useEffect(() => {
    
        fetch(`${apiurl}/admin/allusers`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
                setds_allusers(response.dataset);

            }
            else
            {
                notification['error']({
                    message: 'Data Error',
                    description: 'Data Loading Error.',
                    style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                  });
            }

             
        })
        .catch(error => {

            notification['error']({
                message: 'Data Error',
                description: error,
                style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
              });

        });

        fetch(`${apiurl}/admin/allusergroups_forfilter`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
              setds_usergroups(response.dataset);

            }
            else
            {
                notification['error']({
                    message: 'Data Error',
                    description: 'User Group Data Loading Error.',
                    style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                  });
            }

             
        })
        .catch(error => {

            notification['error']({
                message: 'Data Error',
                description: error,
                style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
              });

        });
 
}, [apiurl]);
      
 
    return( <Layout style={{ minHeight: '100vh' }}>
    <SIDERVIEW />
    <Layout className="site-layout">
      <HEADERVIEW />
      <Content style={{ margin: '0 16px'}}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item><Link to="/allusers">Users</Link></Breadcrumb.Item>
          <Breadcrumb.Item>All Users</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={24}>
                <Typography.Title level={5} style={{color:"#004d80"}}>ALL USERS</Typography.Title>
                <br />
                <Table dataSource={ds_allusers} columns={tablecolumns} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50']}}/>
            </Col>
          </Row>
        </div>
      </Content>
      <FOOTERVIEW/>
    </Layout>
  </Layout>);
}

export default Index;

