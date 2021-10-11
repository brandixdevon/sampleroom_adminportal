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

    const [ds_allroutes , setds_allroutes] = React.useState([]);
 
    const tablecolumns = [
        {
          title: 'Action',
          dataIndex: 'routemasterid',
          width: '5%',
          key: 'routemasterid',
          render: (val) => ActionButtonStrip(val),
        },
        {
          title: 'Route Name',
          dataIndex: 'routename',
          width: '25%',
          key: 'routename',
          sorter: (a, b) => a.routename.localeCompare(b.routename),
        },
        {
          title: 'Route Code',
          dataIndex: 'routeshort',
          width: '10%',
          key: 'routeshort',
          sorter: (a, b) => a.routeshort.localeCompare(b.routeshort),
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
          title: 'Change Date',
          dataIndex: 'changedate',
          width: '10%',
          key: 'changedate',
          sorter: (a, b) => moment(a.changedate) - moment(b.changedate),
          render: (val) => ConvertToDate(val),
        },
        {
          title: 'Route Active',
          dataIndex: 'isactive',
          width: '10%',
          key: 'isactive',
          sorter: (a, b) => a.isactive - b.isactive,
          render: (val) => YesNo(val),
        },
        {
          title: 'D/W Available',
          dataIndex: 'dwplant',
          width: '10%',
          key: 'dwplant',
          sorter: (a, b) => a.dwplant - b.dwplant,
          render: (val) => YesNo(val),
        },
        {
          title: 'EMB. Available',
          dataIndex: 'embplant',
          width: '10%',
          key: 'embplant',
          sorter: (a, b) => a.embplant - b.embplant,
          render: (val) => YesNo(val),
        },
        {
          title: 'Element Count',
          dataIndex: 'elmcount',
          width: '10%',
          key: 'elmcount',
          sorter: (a, b) => a.elmcount - b.elmcount,
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

      function ActionButtonStrip(value)
      {
        return (<Tooltip title="Edit">
        <Link to={"/editroute/"+value}><Button shape="circle" type="primary" icon={<EditOutlined />} /></Link>
      </Tooltip>);
      }
 
    React.useEffect(() => {
    
        fetch(`${apiurl}/admin/allroutes`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
                setds_allroutes(response.dataset);

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
 
}, [apiurl]);
      
 
    return( <Layout style={{ minHeight: '100vh' }}>
    <SIDERVIEW />
    <Layout className="site-layout">
      <HEADERVIEW />
      <Content style={{ margin: '0 16px'}}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item><Link to="/allroutes">Routes</Link></Breadcrumb.Item>
          <Breadcrumb.Item>All Routes</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={24}>
                <Typography.Title level={5} style={{color:"#004d80"}}>ALL ROUTES</Typography.Title>
                <br />
                <Table dataSource={ds_allroutes} columns={tablecolumns} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50']}}/>
            </Col>
          </Row>
        </div>
      </Content>
      <FOOTERVIEW/>
    </Layout>
  </Layout>);
}

export default Index;

