import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Breadcrumb, Typography, Input, Row, Col, notification, Button,  } from 'antd';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import SIDERVIEW from '../layout/siderview';
import HEADERVIEW from '../layout/headerview';
import FOOTERVIEW from '../layout/footerview';

function Index() 
{
    const {Content} = Layout;

    var apiurl = localStorage.getItem('session_apiurl');

    const [vendorname , setvendorname] = React.useState("");
    const [vendoraddr , setvendoraddr] = React.useState("");

 
    function onChangeName(e) {
      setvendorname(e.target.value);
      }

    function onChangeAddr(e) {
      setvendoraddr(e.target.value);
      }

      async function addVendor()
      {
          if(vendorname === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Enter Vendor Name.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else if(vendoraddr === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Enter Vendor Address.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else
          {
            const sendOptions = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"vendorname" : vendorname, "vendoraddr" : vendoraddr })
              };

              await fetch(`${apiurl}/admin/createvendor`,sendOptions)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                        setvendorname("");
                        setvendoraddr("");
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

    return( <Layout style={{ minHeight: '100vh' }}>
    <SIDERVIEW />
    <Layout className="site-layout">
      <HEADERVIEW />
      <Content style={{ margin: '0 16px'}}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item><Link to="/allvendors">All Dispatch Vendors</Link></Breadcrumb.Item>
          <Breadcrumb.Item>New Dispatch Vendor Create</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={12}>
                <Typography.Title level={5} style={{color:"#004d80"}}>ADD NEW DISPATCH VENDOR</Typography.Title>
                <br />
                <Typography.Text style={{color:"blue"}}>Vendor Name :</Typography.Text>
                <br />
                <Input required={true} size="medium" value={vendorname} onChange={onChangeName}/>
                <br />
                <Typography.Text style={{color:"blue"}}>Vendor Address :</Typography.Text>
                <br />
                <Input required={true} size="medium" value={vendoraddr} onChange={onChangeAddr}/>
                <br/>
                <br/>
                <Button onClick={addVendor} type="primary" htmlType="submit" size="large">
                    Add New Vendor
                </Button>
            </Col>
            <Col span={6} style={{marginLeft:"20px"}}>

            
            </Col>
          </Row>
        </div>
      </Content>
      <FOOTERVIEW/>
    </Layout>
  </Layout>);
}

export default Index;

