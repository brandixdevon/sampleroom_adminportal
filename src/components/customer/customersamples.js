import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Breadcrumb, Typography, Row, Col, notification, Button, Tag, Table, Tooltip, Popconfirm  } from 'antd';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import SIDERVIEW from '../layout/siderview';
import HEADERVIEW from '../layout/headerview';
import FOOTERVIEW from '../layout/footerview';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

function Index() 
{
    const {Content} = Layout;

    var apiurl = localStorage.getItem('session_apiurl');
    const [url_cusid] = React.useState(window.location.href.split('/').reverse()[0]);

    const [cusid , setcusid] = React.useState("");
    const [customername , setcustomername] = React.useState("");

    const [ds_assign , setds_assign] = React.useState([]);
    const [ds_unassign , setds_unassign] = React.useState([]);

   
    const tablecolumns_assign = [
      {
        title: 'Action',
        dataIndex: 'sam_stage_id',
        width: '20%',
        key: 'sam_stage_id',
        render: (val) => DeleteActionButtonStrip(val),
      },
      {
        title: 'Sample Stage Name',
        dataIndex: 'sam_stage_title',
        width: '60%',
        key: 'sam_stage_title',
        sorter: (a, b) => a.sam_stage_title.localeCompare(b.sam_stage_title),
      },
      {
        title: 'Is Active',
        dataIndex: 'sam_stage_active',
        width: '20%',
        key: 'sam_stage_active',
        render: (val) => YesNo(val),
      },
    ];

    const tablecolumns_unassign = [
      {
        title: 'Action',
        dataIndex: 'sam_stage_id',
        width: '20%',
        key: 'sam_stage_id',
        render: (val) => AddActionButtonStrip(val),
      },
      {
        title: 'Sample Stage Type Name',
        dataIndex: 'sam_stage_title',
        width: '80%',
        key: 'sam_stage_title',
        sorter: (a, b) => a.sam_stage_title.localeCompare(b.sam_stage_title),
      },
    ];

    function DeleteActionButtonStrip(value)
      {
        return (<Tooltip title="Delete">
        <Popconfirm
          title="Are you sure to delete this sample type from this customer?"
          onConfirm={() => deleteStage({value})}
          okText="Yes"
          cancelText="No">
          <Button shape="circle" type="primary" icon={<DeleteOutlined />} danger/>
        </Popconfirm>
      </Tooltip>);
      }

    function AddActionButtonStrip(value)
      {
        return (<Tooltip title="Assign">
        <Button onClick={() => addStage({value})} shape="circle" type="primary" icon={<PlusCircleOutlined />} success/>
      </Tooltip>);
      }
 
    
      
      function YesNo(value)
      {
        if(value === true)
        {
          return <Tag color={'green'} key={'Active'}>YES</Tag>;
        }
        else
        {
          return <Tag color={'red'} key={'Disable'}>NO</Tag>;
        }
      }

     
      const addStage = async (val) =>
      {
          if(cusid === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Select Customer Again.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else if(val.value === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Select Sample Stage Again.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else
          {
            const sendOptions = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"cusid" : cusid, "stageid" : val.value,})
              };

              await fetch(`${apiurl}/admin/addstagetocustomer`,sendOptions)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                        
                        notification['success']({
                            message: 'Data Success',
                            description: data.Msg,
                            style:{color: '#000',border: '1px solid #ccffcc',backgroundColor: '#99ff66'},
                          });

                          fetch(`${apiurl}/admin/customervsassignstages/${url_cusid}`)
                          .then(res => res.json())
                          .then(response => { 

                              if(response.Type === "SUCCESS")
                              {
                                setds_assign(response.dataset);

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

                          fetch(`${apiurl}/admin/customervsunassignstages/${url_cusid}`)
                          .then(res => res.json())
                          .then(response => { 

                              if(response.Type === "SUCCESS")
                              {
                                setds_unassign(response.dataset);

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
                                      
                      }
          
                      if(data.Type === "ERROR")
                      {
                          
                          notification['error']({
                              message: 'Data Error',
                              description: data.Msg,
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
            }
      }

      const deleteStage = async (val) => {
        if(cusid === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Select Customer Again.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else if(val.value === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Select Sample Stage Again.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else
          {
            const sendOptions = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"cusid" : cusid, "stageid" : val.value})
              };

              await fetch(`${apiurl}/admin/removestageincustomer`,sendOptions)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {

                        notification['success']({
                            message: 'Data Success',
                            description: data.Msg,
                            style:{color: '#000',border: '1px solid #ccffcc',backgroundColor: '#99ff66'},
                          });

                          fetch(`${apiurl}/admin/customervsassignstages/${url_cusid}`)
                          .then(res => res.json())
                          .then(response => { 

                              if(response.Type === "SUCCESS")
                              {
                                setds_assign(response.dataset);

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

                          fetch(`${apiurl}/admin/customervsunassignstages/${url_cusid}`)
                          .then(res => res.json())
                          .then(response => { 

                              if(response.Type === "SUCCESS")
                              {
                                setds_unassign(response.dataset);

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
                                      
                    }
        
                    if(data.Type === "ERROR")
                    {
                        
                        notification['error']({
                            message: 'Data Error',
                            description: data.Msg,
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
          }
      }


      React.useEffect(() => {
    
        

        fetch(`${apiurl}/admin/customerdetail/${url_cusid}`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
              setcusid(response.dataset[0].cus_id);
              setcustomername(response.dataset[0].cus_name);
              
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

        fetch(`${apiurl}/admin/customervsassignstages/${url_cusid}`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
              setds_assign(response.dataset);

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

        fetch(`${apiurl}/admin/customervsunassignstages/${url_cusid}`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
              setds_unassign(response.dataset);

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


    
      }, [apiurl,url_cusid]);
 
    return( <Layout style={{ minHeight: '100vh' }}>
    <SIDERVIEW />
    <Layout className="site-layout">
      <HEADERVIEW />
      <Content style={{ margin: '0 16px'}}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item><Link to="/allcustomers">All Customers</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Edit Customer VS Sample Stage Details</Breadcrumb.Item>
          <Breadcrumb.Item>{cusid}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={24}>
                <Typography.Text style={{color:"black"}}><b>Customer Name :</b> {customername}</Typography.Text>
                <br />
            </Col>
          </Row>
          <Row>
            <Col span={11}>
                <br/>
                <Typography.Title level={4} style={{color:"#004d80"}}>ALL UN-ASSIGNED SAMPLE STAGES</Typography.Title>
                <br />
                <Table dataSource={ds_unassign} columns={tablecolumns_unassign} pagination={{ defaultPageSize: 50, showSizeChanger: true, pageSizeOptions: ['10', '25', '50']}}/>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
                <br/>
                <Typography.Title level={4} style={{color:"#004d80"}}>ALL ASSIGNED SAMPLE STAGES</Typography.Title>
                <br />
                <Table dataSource={ds_assign} columns={tablecolumns_assign} pagination={{ defaultPageSize: 50, showSizeChanger: true, pageSizeOptions: ['10', '25', '50']}}/>
            </Col>
          </Row>
        </div>
      </Content>
      <FOOTERVIEW/>
    </Layout>
  </Layout>);
}

export default Index;

