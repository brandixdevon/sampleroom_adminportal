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

    const [ds_allstages , setds_allstages] = React.useState([]);
 
    const tablecolumns = [
        {
          title: 'Action',
          dataIndex: 'sam_stage_id',
          width: '10%',
          key: 'sam_stage_id',
          render: (val) => ActionButtonStrip(val),
        },
        {
          title: 'Sample Stage',
          dataIndex: 'sam_stage_title',
          width: '35%',
          key: 'sam_stage_title',
          sorter: (a, b) => a.sam_stage_title.localeCompare(b.sam_stage_title),
        },
        {
          title: 'Sample Stage Desc',
          dataIndex: 'sam_stage_desc',
          width: '35%',
          key: 'sam_stage_desc',
          sorter: (a, b) => a.sam_stage_desc.localeCompare(b.sam_stage_desc),
        },
        {
          title: 'Is Active',
          dataIndex: 'sam_stage_active',
          width: '20%',
          key: 'sam_stage_active',
          sorter: (a, b) => a.sam_stage_active - b.sam_stage_active,
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
        return (<Tooltip title="Edit">
        <Link to={"/editstage/"+value}><Button shape="circle" type="primary" icon={<EditOutlined />} /></Link>
      </Tooltip>);
      }
 
    React.useEffect(() => {
    
        fetch(`${apiurl}/admin/allstages`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
                setds_allstages(response.dataset);

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
        <Breadcrumb.Item><Link to="/allstages">Sample Stages</Link></Breadcrumb.Item>
          <Breadcrumb.Item>All Sample Stages</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={24}>
                <Typography.Title level={5} style={{color:"#004d80"}}>ALL SAMPLE STAGES</Typography.Title>
                <br />
                <Table dataSource={ds_allstages} columns={tablecolumns} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50']}}/>
            </Col>
          </Row>
        </div>
      </Content>
      <FOOTERVIEW/>
    </Layout>
  </Layout>);
}

export default Index;

