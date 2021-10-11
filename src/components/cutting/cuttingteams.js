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

    const [ctname, set_ctname] = React.useState("");

    const [ds_ctlist , setds_ctlist] = React.useState([]);


    const tablecolumns = [
      {
        title: 'Action',
        dataIndex: 'team_id',
        width: '20%',
        key: 'team_id',
        render: (val) => DeleteActionButtonStrip(val),
      },
      {
        title: 'Cutting Team Name',
        dataIndex: 'team_name',
        width: '80%',
        key: 'team_name',
      }
    ];

        function DeleteActionButtonStrip(value)
      {
        return (<Tooltip title="Delete">
        <Popconfirm
          title="Are you sure to delete this cutting team?"
          onConfirm={() => deleteElement({value})}
          okText="Yes"
          cancelText="No">
          <Button shape="circle" type="primary" icon={<DeleteOutlined />} danger/>
        </Popconfirm>
      </Tooltip>);
      }

    
 
      function onChangeName(e) {
        set_ctname(e.target.value);
      }

      const AddTO = async () =>
      {
         if(ctname === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Enter Team Name.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else
          {
            const sendOptions = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"teamname" : ctname})
              };

              await fetch(`${apiurl}/admin/createcutteam`,sendOptions)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                       set_ctname("");
                        
                        notification['success']({
                            message: 'Data Success',
                            description: data.Msg,
                            style:{color: '#000',border: '1px solid #ccffcc',backgroundColor: '#99ff66'},
                          });

                          fetch(`${apiurl}/admin/allcutteams`)
                          .then(res => res.json())
                          .then(response => { 

                              if(response.Type === "SUCCESS")
                              {
                                setds_ctlist(response.dataset);

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
                  description:'Please Select Cutting Team Again.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else
          {
            
              await fetch(`${apiurl}/admin/deletecutteam/${val.value}`)
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

                          fetch(`${apiurl}/admin/allcutteams`)
                          .then(res => res.json())
                          .then(response => { 

                              if(response.Type === "SUCCESS")
                              {
                                setds_ctlist(response.dataset);

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
    
        fetch(`${apiurl}/admin/allcutteams`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
            setds_ctlist(response.dataset);

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
          <Breadcrumb.Item><Link to="/cutteams">All Cutting Teams</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Add/Edit Cutting Teams</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={10}>
                <Typography.Title level={5} style={{color:"#004d80"}}>CUTTING TEAMS LIST</Typography.Title>
                <br />
                <Typography.Text style={{color:"blue"}}>Cutting Team Name :</Typography.Text>
                <br />
                <Input required={true} size="medium" value={ctname} onChange={onChangeName}/>
                <br /><br />
                <Button onClick={AddTO} type="primary" htmlType="submit" size="medium">
                    Add To List
                  </Button>

            </Col>
            <Col span={12} style={{marginLeft:"20px"}}>

            <br/>
            <Table dataSource={ds_ctlist} columns={tablecolumns} pagination={{ defaultPageSize: 50, showSizeChanger: true, pageSizeOptions: ['10', '25', '50']}}/>
            
            
            </Col>
          </Row>
         
        </div>
      </Content>
      <FOOTERVIEW/>
    </Layout>
  </Layout>);
}

export default Index;

