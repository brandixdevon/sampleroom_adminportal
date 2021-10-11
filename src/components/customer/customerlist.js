import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Breadcrumb, Typography, Row, Col, notification, Button, Tooltip, Table, Tag  } from 'antd';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import { EditOutlined,StrikethroughOutlined, ExperimentOutlined } from '@ant-design/icons';
import SIDERVIEW from '../layout/siderview';
import HEADERVIEW from '../layout/headerview';
import FOOTERVIEW from '../layout/footerview';

function Index() 
{
    const {Content} = Layout;
    
    var apiurl = localStorage.getItem('session_apiurl');

    const [ds_allcustomers , setds_allcustomers] = React.useState([]);
 
    const tablecolumns = [
        {
          title: 'Action',
          dataIndex: 'cus_id',
          width: '20%',
          key: 'cus_id',
          render: (val) => ActionButtonStrip(val),
        },
        {
          title: 'Customer Category Name',
          dataIndex: 'cus_name',
          width: '60%',
          key: 'cus_name',
          sorter: (a, b) => a.cus_name.localeCompare(b.cus_name),
        },
        {
          title: 'Is Active',
          dataIndex: 'cus_active',
          width: '20%',
          key: 'cus_active',
          sorter: (a, b) => a.cus_active - b.cus_active,
          render: (val) => YesNo(val),
        }
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
 
      function ActionButtonStrip(value)
      {
        return (<><Tooltip title="Edit">
        <Link to={"/editcustomer/"+value}><Button shape="circle" type="primary" icon={<EditOutlined />} /></Link>
      </Tooltip>
      <Tooltip title="Sizes">
        <Link to={"/editsizes/"+value}><Button shape="circle" type="primary" style={{color:"white",backgroundColor:"orangered",borderColor:"orangered"}} icon={<StrikethroughOutlined />} /></Link>
      </Tooltip>
      <Tooltip title="Sample Types">
        <Link to={"/editsamples/"+value}><Button shape="circle" type="primary" style={{color:"white",backgroundColor:"purple",borderColor:"purple"}} icon={<ExperimentOutlined />} /></Link>
      </Tooltip></>);
      }
 
    React.useEffect(() => {
    
        fetch(`${apiurl}/admin/allcustomers`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
                setds_allcustomers(response.dataset);

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
          <Breadcrumb.Item><Link to="/allcustomers">Customers</Link></Breadcrumb.Item>
          <Breadcrumb.Item>All Customers</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={24}>
                <Typography.Title level={5} style={{color:"#004d80"}}>ALL CUSTOMERS</Typography.Title>
                <br />
                <Table dataSource={ds_allcustomers} columns={tablecolumns} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50']}}/>
            </Col>
          </Row>
        </div>
      </Content>
      <FOOTERVIEW/>
    </Layout>
  </Layout>);
}

export default Index;

