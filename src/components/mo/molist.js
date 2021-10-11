import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Breadcrumb, Typography, Row, Col, notification, Button, Tooltip, Table, Tag  } from 'antd';
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

    const [ds_allmos , setds_allmos] = React.useState([]);
 
    const tablecolumns = [
        {
          title: 'Action',
          dataIndex: 'mo_id',
          width: '10%',
          key: 'mo_id',
          render: (val) => ActionButtonStrip(val),
        },
        {
          title: 'Code Id',
          dataIndex: 'mo_code',
          width: '25%',
          key: 'mo_code',
          sorter: (a, b) => a.mo_code.localeCompare(b.mo_code),
        },
        {
          title: 'Name',
          dataIndex: 'mo_name',
          width: '25%',
          key: 'mo_name',
          sorter: (a, b) => a.mo_name.localeCompare(b.mo_name),
        },
        {
          title: 'Type',
          dataIndex: 'mo_type',
          width: '25%',
          key: 'mo_type',
          sorter: (a, b) => a.mo_type.localeCompare(b.mo_type),
        },
        {
          title: 'Is Active',
          dataIndex: 'mo_active',
          width: '15%',
          key: 'mo_active',
          sorter: (a, b) => a.mo_active - b.mo_active,
          render: (val) => YesNo(val),
        }
      ];

      function YesNo(value)
      {
        if(value === true)
        {
          return <Tag color={'green'} key={'Yes'}>Yes</Tag>;
        }
        else
        {
          return <Tag color={'red'} key={'No'}>No</Tag>;
        }
      }
 
      function ActionButtonStrip(value)
      {
        return (<Tooltip title="Edit">
        <Link to={"/editmo/"+value}><Button shape="circle" type="primary" icon={<EditOutlined />} /></Link>
      </Tooltip>);
      }
 
    React.useEffect(() => {
    
        fetch(`${apiurl}/admin/allmos`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
                setds_allmos(response.dataset);

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
        <Breadcrumb.Item><Link to="/allmos">Sewing MOs/Teams</Link></Breadcrumb.Item>
          <Breadcrumb.Item>All Sewing MOs/Teams</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={24}>
                <Typography.Title level={5} style={{color:"#004d80"}}>ALL SEWING MO/TEAM LIST</Typography.Title>
                <br />
                <Table dataSource={ds_allmos} columns={tablecolumns} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50']}}/>
            </Col>
          </Row>
        </div>
      </Content>
      <FOOTERVIEW/>
    </Layout>
  </Layout>);
}

export default Index;

