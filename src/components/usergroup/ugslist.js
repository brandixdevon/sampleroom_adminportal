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

    const [ds_allugs , setds_allugs] = React.useState([]);
 
    const tablecolumns = [
        {
          title: 'Action',
          dataIndex: 'ugid',
          width: '5%',
          key: 'ugid',
          render: (val) => ActionButtonStrip(val),
        },
        {
          title: 'Group Name',
          dataIndex: 'ugname',
          width: '10%',
          key: 'ugname',
          sorter: (a, b) => a.ugname.localeCompare(b.ugname),
        },
        {
          title: 'Is Active',
          dataIndex: 'ugactive',
          width: '5%',
          key: 'ugactive',
          sorter: (a, b) => a.ugactive - b.ugactive,
          render: (val) => YesNo(val),
        },
        {
          title: 'Admin Access',
          dataIndex: 'isadmin',
          width: '5%',
          key: 'isadmin',
          sorter: (a, b) => a.isadmin - b.isadmin,
          render: (val) => YesNo(val),
        },
        {
          title: 'SRF Access',
          dataIndex: 'srf_access',
          width: '5%',
          key: 'srf_access',
          sorter: (a, b) => a.srf_access - b.srf_access,
          render: (val) => YesNo(val),
        },
        {
          title: 'SRF Create',
          dataIndex: 'srf_create',
          width: '5%',
          key: 'srf_create',
          sorter: (a, b) => a.srf_create - b.srf_create,
          render: (val) => YesNo(val),
        },
        {
          title: 'SRF Edit',
          dataIndex: 'srf_edit',
          width: '5%',
          key: 'srf_edit',
          sorter: (a, b) => a.srf_edit - b.srf_edit,
          render: (val) => YesNo(val),
        },
        {
          title: 'SRF Delete',
          dataIndex: 'srf_delete',
          width: '5%',
          key: 'srf_delete',
          sorter: (a, b) => a.srf_delete - b.srf_delete,
          render: (val) => YesNo(val),
        },
        {
          title: 'PM',
          dataIndex: 'pm_access',
          width: '5%',
          key: 'pm_access',
          sorter: (a, b) => a.pm_access - b.pm_access,
          render: (val) => YesNo(val),
        },
        {
          title: 'MM',
          dataIndex: 'mm_access',
          width: '5%',
          key: 'mm_access',
          sorter: (a, b) => a.mm_access - b.mm_access,
          render: (val) => YesNo(val),
        },
        {
          title: 'SMV',
          dataIndex: 'smv_access',
          width: '5%',
          key: 'smv_access',
          sorter: (a, b) => a.smv_access - b.smv_access,
          render: (val) => YesNo(val),
        },
        {
          title: 'PB',
          dataIndex: 'pb_access',
          width: '5%',
          key: 'pb_access',
          sorter: (a, b) => a.pb_access - b.pb_access,
          render: (val) => YesNo(val),
        },
        {
          title: 'PLN',
          dataIndex: 'pln_access',
          width: '5%',
          key: 'pln_access',
          sorter: (a, b) => a.pln_access - b.pln_access,
          render: (val) => YesNo(val),
        },
        {
          title: 'STR',
          dataIndex: 'str_access',
          width: '5%',
          key: 'str_access',
          sorter: (a, b) => a.str_access - b.str_access,
          render: (val) => YesNo(val),
        },
        {
          title: 'CUT',
          dataIndex: 'cut_access',
          width: '5%',
          key: 'cut_access',
          sorter: (a, b) => a.cut_access - b.cut_access,
          render: (val) => YesNo(val),
        },
        {
          title: 'OHS',
          dataIndex: 'osohs_access',
          width: '5%',
          key: 'osohs_access',
          sorter: (a, b) => a.osohs_access - b.osohs_access,
          render: (val) => YesNo(val),
        },
        {
          title: 'OHR',
          dataIndex: 'osohr_access',
          width: '5%',
          key: 'osohr_access',
          sorter: (a, b) => a.osohr_access - b.osohr_access,
          render: (val) => YesNo(val),
        },
        {
          title: 'SEW',
          dataIndex: 'sew_access',
          width: '5%',
          key: 'sew_access',
          sorter: (a, b) => a.sew_access - b.sew_access,
          render: (val) => YesNo(val),
        },
        {
          title: 'QC',
          dataIndex: 'qc_access',
          width: '5%',
          key: 'qc_access',
          sorter: (a, b) => a.qc_access - b.qc_access,
          render: (val) => YesNo(val),
        },
        {
          title: 'DIS',
          dataIndex: 'dis_access',
          width: '5%',
          key: 'dis_access',
          sorter: (a, b) => a.dis_access - b.dis_access,
          render: (val) => YesNo(val),
        },
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
        <Link to={"/editug/"+value}><Button shape="circle" type="primary" icon={<EditOutlined />} /></Link>
      </Tooltip>);
      }
 
    React.useEffect(() => {
    
        fetch(`${apiurl}/admin/allugs`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
                setds_allugs(response.dataset);

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
          <Breadcrumb.Item><Link to="/allugs">User Groups</Link></Breadcrumb.Item>
          <Breadcrumb.Item>All User Groups</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={24}>
                <Typography.Title level={5} style={{color:"#004d80"}}>ALL USER GROUPS</Typography.Title>
                <br />
                <Table dataSource={ds_allugs} scroll={{ x: 'fit-content'}} columns={tablecolumns} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5','10', '25', '50']}}/>
            </Col>
          </Row>
        </div>
      </Content>
      <FOOTERVIEW/>
    </Layout>
  </Layout>);
}

export default Index;

