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

    const [ds_allplants , setds_allplants] = React.useState([]);
 
    const tablecolumns = [
        {
          title: 'Action',
          dataIndex: 'plant_id',
          width: '10%',
          key: 'plant_id',
          render: (val) => ActionButtonStrip(val),
        },
        {
          title: 'Plant Name',
          dataIndex: 'plant_name',
          width: '30%',
          key: 'plant_name',
          sorter: (a, b) => a.plant_name.localeCompare(b.plant_name),
        },
        {
          title: 'Plant Code',
          dataIndex: 'plant_code',
          width: '20%',
          key: 'plant_code',
          sorter: (a, b) => a.plant_code.localeCompare(b.plant_code),
        },
        {
          title: 'Sewing',
          dataIndex: 'is_sew',
          width: '10%',
          key: 'is_sew',
          sorter: (a, b) => a.is_sew - b.is_sew,
          render: (val) => YesNo(val),
        },
        {
          title: 'Embellishment',
          dataIndex: 'is_emb',
          width: '10%',
          key: 'is_emb',
          sorter: (a, b) => a.is_emb - b.is_emb,
          render: (val) => YesNo(val),
        },
        {
          title: 'Dye/Wash',
          dataIndex: 'is_wash',
          width: '10%',
          key: 'is_wash',
          sorter: (a, b) => a.is_wash - b.is_wash,
          render: (val) => YesNo(val),
        },
        {
          title: 'Is Active',
          dataIndex: 'is_active',
          width: '10%',
          key: 'is_active',
          sorter: (a, b) => a.is_active - b.is_active,
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
        <Link to={"/editplant/"+value}><Button shape="circle" type="primary" icon={<EditOutlined />} /></Link>
      </Tooltip>);
      }
 
    React.useEffect(() => {
    
        fetch(`${apiurl}/admin/allplants`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
                setds_allplants(response.dataset);

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
        <Breadcrumb.Item><Link to="/allplants">Plants</Link></Breadcrumb.Item>
          <Breadcrumb.Item>All Plants</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={24}>
                <Typography.Title level={5} style={{color:"#004d80"}}>ALL PLANTS</Typography.Title>
                <br />
                <Table dataSource={ds_allplants} columns={tablecolumns} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50']}}/>
            </Col>
          </Row>
        </div>
      </Content>
      <FOOTERVIEW/>
    </Layout>
  </Layout>);
}

export default Index;

