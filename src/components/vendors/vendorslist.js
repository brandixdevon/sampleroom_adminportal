import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Breadcrumb, Typography, Row, Col, notification, Button, Tooltip, Table  } from 'antd';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import { EditOutlined } from '@ant-design/icons';
import SIDERVIEW from '../layout/siderview';
import HEADERVIEW from '../layout/headerview';
import FOOTERVIEW from '../layout/footerview';

function Index() 
{
    const {Content} = Layout;
    
    var apiurl = localStorage.getItem('session_apiurl');

    const [ds_allvendors , setds_allvendors] = React.useState([]);
 
    const tablecolumns = [
        {
          title: 'Action',
          dataIndex: 'disloc_id',
          width: '10%',
          key: 'disloc_id',
          render: (val) => ActionButtonStrip(val),
        },
        {
          title: 'Vendor Name',
          dataIndex: 'dis_vendor',
          width: '40%',
          key: 'dis_vendor',
          sorter: (a, b) => a.dis_vendor.localeCompare(b.dis_vendor),
        },
        {
          title: 'Vendor Address',
          dataIndex: 'dis_address',
          width: '50%',
          key: 'dis_address',
          sorter: (a, b) => a.dis_address.localeCompare(b.dis_address),
        }
      ];

      function ActionButtonStrip(value)
      {
        return (<Tooltip title="Edit">
        <Link to={"/editvendor/"+value}><Button shape="circle" type="primary" icon={<EditOutlined />} /></Link>
      </Tooltip>);
      }
 
    React.useEffect(() => {
    
        fetch(`${apiurl}/admin/allvendors`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
                setds_allvendors(response.dataset);

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
        <Breadcrumb.Item><Link to="/allvendors">Dispatch Vendors</Link></Breadcrumb.Item>
          <Breadcrumb.Item>All Dispatch Vendors</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={24}>
                <Typography.Title level={5} style={{color:"#004d80"}}>ALL DISPATCH VENDORS</Typography.Title>
                <br />
                <Table dataSource={ds_allvendors} columns={tablecolumns} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50']}}/>
            </Col>
          </Row>
        </div>
      </Content>
      <FOOTERVIEW/>
    </Layout>
  </Layout>);
}

export default Index;

