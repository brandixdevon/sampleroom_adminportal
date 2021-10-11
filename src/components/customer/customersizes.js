import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Breadcrumb, Typography, Input, Row, Col, notification, Button, Table, Tooltip, Popconfirm  } from 'antd';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import SIDERVIEW from '../layout/siderview';
import HEADERVIEW from '../layout/headerview';
import FOOTERVIEW from '../layout/footerview';
import { DeleteOutlined} from '@ant-design/icons';

function Index() 
{
    const {Content} = Layout;

    var apiurl = localStorage.getItem('session_apiurl');
    const [cusid] = React.useState(window.location.href.split('/').reverse()[0]);
    
    const [customername , setcustomername] = React.useState("");
    const [sizename , setsizename] = React.useState("");
    const [ds_cus_sizeassign , setds_cus_sizeassign] = React.useState([]);

   

    const tablecolumns_assign = [
      {
        title: 'Action',
        dataIndex: 'sizename',
        width: '20%',
        key: 'sizename',
        render: (val) => DeleteActionButtonStrip(val),
      },
      {
        title: 'Size Name',
        dataIndex: 'sizename',
        width: '80%',
        key: 'sizename',
        sorter: (a, b) => a.sizename.localeCompare(b.sizename),
      },
    ];

    function DeleteActionButtonStrip(value)
      {
        return (<Tooltip title="Delete">
        <Popconfirm
          title="Are you sure to delete this size from this customer?"
          onConfirm={() => deleteCustomer({value})}
          okText="Yes"
          cancelText="No">
          <Button shape="circle" type="primary" icon={<DeleteOutlined />} danger/>
        </Popconfirm>
      </Tooltip>);
      }

    function onChangeSize(e) {
      setsizename(e.target.value);
      }

      async function AddSize()
      {
          if(sizename === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Enter Size Name.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else
          {
            const sendOptions = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"cusid" : cusid, "sizename" : sizename})
              };

              await fetch(`${apiurl}/admin/addsizes`,sendOptions)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {

                      setsizename("");

                      fetch(`${apiurl}/admin/customerwisesizes/${cusid}`)
                      .then(res => res.json())
                      .then(response => { 
              
                          if(response.Type === "SUCCESS")
                          {
                            setds_cus_sizeassign(response.dataset);
              
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

                        notification['success']({
                            message: 'Data Success',
                            description: data.Msg,
                            style:{color: '#000',border: '1px solid #ccffcc',backgroundColor: '#99ff66'},
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

      const deleteCustomer = async (val) => {
        if(cusid === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Select User Again.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else if(val.value === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Select Customer Again.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else
          {
            const sendOptions = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"cusid" : cusid, "sizename" : val.value})
              };

              await fetch(`${apiurl}/admin/removesize`,sendOptions)
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

                          fetch(`${apiurl}/admin/customerwisesizes/${cusid}`)
                          .then(res => res.json())
                          .then(response => { 

                              if(response.Type === "SUCCESS")
                              {
                                setds_cus_sizeassign(response.dataset);

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
    
        fetch(`${apiurl}/admin/customerdetail/${cusid}`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
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

        fetch(`${apiurl}/admin/customerwisesizes/${cusid}`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
              setds_cus_sizeassign(response.dataset);

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

    
      }, [apiurl,cusid]);
 
    return( <Layout style={{ minHeight: '100vh' }}>
    <SIDERVIEW />
    <Layout className="site-layout">
      <HEADERVIEW />
      <Content style={{ margin: '0 16px'}}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item><Link to="/allcustomers">All Customers</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Edit Customer Size Details</Breadcrumb.Item>
          <Breadcrumb.Item>{cusid}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={12}>
                <p><b>CUSTOMER NAME :</b> {customername}</p>
                <br /><br />
                <Typography.Title level={5} style={{color:"#004d80"}}>ADD NEW SIZE</Typography.Title>
                <br />
                <Typography.Text style={{color:"blue"}}>Size Name :</Typography.Text>
                <br />
                <Input required={true} size="medium" value={sizename} onChange={onChangeSize}/>
                <br /><br />
                <Button onClick={AddSize} type="primary" htmlType="submit" size="large">
                    Add Size
                </Button>
            </Col>
            <Col span={11} style={{marginLeft:"20px"}}>
                <br/>
                <Typography.Title level={4} style={{color:"#004d80"}}>ALL ASSIGNED SIZES</Typography.Title>
                <br />
                <Table dataSource={ds_cus_sizeassign} columns={tablecolumns_assign} pagination={{ defaultPageSize: 50, showSizeChanger: true, pageSizeOptions: ['10', '25', '50']}}/>
            
            
            </Col>
          </Row>
          
        </div>
      </Content>
      <FOOTERVIEW/>
    </Layout>
  </Layout>);
}

export default Index;

