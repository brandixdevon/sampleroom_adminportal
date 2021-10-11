import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Breadcrumb, Typography, Input, Row, Col, notification, Button, Table, Tooltip, Popconfirm  } from 'antd';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import SIDERVIEW from '../layout/siderview';
import HEADERVIEW from '../layout/headerview';
import FOOTERVIEW from '../layout/footerview';
import { DeleteOutlined } from '@ant-design/icons';

function Index() 
{
    const {Content} = Layout;

    var apiurl = localStorage.getItem('session_apiurl');

    const [chname, set_chname] = React.useState("");

    const [ds_chlist , setds_chlist] = React.useState([]);


    const tablecolumns = [
      {
        title: 'Action',
        dataIndex: 'cuthn_id',
        width: '20%',
        key: 'cuthn_id',
        render: (val) => DeleteActionButtonStrip(val),
      },
      {
        title: 'Cut Handle Name',
        dataIndex: 'cut_handle',
        width: '80%',
        key: 'cut_handle',
      }
    ];

        function DeleteActionButtonStrip(value)
      {
        return (<Tooltip title="Delete">
        <Popconfirm
          title="Are you sure to delete this cut handling method?"
          onConfirm={() => deleteElement({value})}
          okText="Yes"
          cancelText="No">
          <Button shape="circle" type="primary" icon={<DeleteOutlined />} danger/>
        </Popconfirm>
      </Tooltip>);
      }

    
 
      function onChangeName(e) {
        set_chname(e.target.value);
      }

      const AddTO = async () =>
      {
         if(chname === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Enter Method Name.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else
          {
            const sendOptions = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"cuthandle" : chname})
              };

              await fetch(`${apiurl}/admin/createcuthandling`,sendOptions)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                       set_chname("");
                        
                        notification['success']({
                            message: 'Data Success',
                            description: data.Msg,
                            style:{color: '#000',border: '1px solid #ccffcc',backgroundColor: '#99ff66'},
                          });

                          fetch(`${apiurl}/admin/allcuthandlings`)
                          .then(res => res.json())
                          .then(response => { 

                              if(response.Type === "SUCCESS")
                              {
                                setds_chlist(response.dataset);

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

      const deleteElement = async (val) => {
        if(val.value === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Select Cut Handling Again.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else
          {
            
              await fetch(`${apiurl}/admin/deletecuthandlings/${val.value}`)
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

                          fetch(`${apiurl}/admin/allcuthandlings`)
                          .then(res => res.json())
                          .then(response => { 

                              if(response.Type === "SUCCESS")
                              {
                                setds_chlist(response.dataset);

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
    
        fetch(`${apiurl}/admin/allcuthandlings`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
            setds_chlist(response.dataset);

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
          <Breadcrumb.Item><Link to="/cutmethods">All Cut Handling Methods</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Add/Edit Cut Handling Methods</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={10}>
                <Typography.Title level={5} style={{color:"#004d80"}}>CUT HANDLING METHODS LIST</Typography.Title>
                <br />
                <Typography.Text style={{color:"blue"}}>Cut Handling Name :</Typography.Text>
                <br />
                <Input required={true} size="medium" value={chname} onChange={onChangeName}/>
                <br /><br />
                <Button onClick={AddTO} type="primary" htmlType="submit" size="medium">
                    Add To List
                  </Button>

            </Col>
            <Col span={12} style={{marginLeft:"20px"}}>

            <br/>
            <Table dataSource={ds_chlist} columns={tablecolumns} pagination={{ defaultPageSize: 50, showSizeChanger: true, pageSizeOptions: ['10', '25', '50']}}/>
            
            
            </Col>
          </Row>
         
        </div>
      </Content>
      <FOOTERVIEW/>
    </Layout>
  </Layout>);
}

export default Index;

