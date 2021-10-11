import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Breadcrumb, Typography, Input, Row, Col, notification, Button } from 'antd';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import SIDERVIEW from '../layout/siderview';
import HEADERVIEW from '../layout/headerview';
import FOOTERVIEW from '../layout/footerview';

function Index() 
{
    const {Content} = Layout;

    var apiurl = localStorage.getItem('session_apiurl');
    const [url_venid] = React.useState(window.location.href.split('/').reverse()[0]);

    const [venid , setvenid] = React.useState("");
    const [vendorname , setvendorname] = React.useState("");
    const [vendoraddr , setvendoraddr] = React.useState("");
    
    const [isedit , setisedit] = React.useState(false);

    function onChangeName(e) {
      setvendorname(e.target.value);
      setisedit(true);
      }

    function onChangeAddr(e) {
      setvendoraddr(e.target.value);
      setisedit(true);
      }

      async function updateVendor()
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
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"venid" : venid, "vendorname" : vendorname, "vendoraddr" : vendoraddr})
              };

              await fetch(`${apiurl}/admin/updatevendor`,sendOptions)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                        setisedit(false);

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

      React.useEffect(() => {
    
       
        fetch(`${apiurl}/admin/vendordetail/${url_venid}`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
              setvenid(response.dataset[0].disloc_id);
              setvendorname(response.dataset[0].dis_vendor);
              setvendoraddr(response.dataset[0].dis_address);
              
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
    
      }, [apiurl,url_venid]);
 
    return( <Layout style={{ minHeight: '100vh' }}>
    <SIDERVIEW />
    <Layout className="site-layout">
      <HEADERVIEW />
      <Content style={{ margin: '0 16px'}}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item><Link to="/allvendors">All Dispatch Vendors</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Edit Dispatch Vendor Details</Breadcrumb.Item>
          <Breadcrumb.Item>{venid}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={12}>
                <Typography.Title level={5} style={{color:"#004d80"}}>EDIT DISPATCH VENDOR DETAILS</Typography.Title>
                <br />
                <Typography.Text style={{color:"blue"}}>Vendor Name :</Typography.Text>
                <br />
                <Input required={true} size="medium" value={vendorname} onChange={onChangeName}/>
                <br />
                <Typography.Text style={{color:"blue"}}>Vendor Address :</Typography.Text>
                <br />
                <Input required={true} size="medium" value={vendoraddr} onChange={onChangeAddr}/>
                <br />
                <br/>
                {isedit ? (
                    <p style={{color:"red"}}>** Please Save Your Changes</p>
                  ) : (
                    <></>
                  )}
                <Button onClick={updateVendor} type="primary" htmlType="submit" size="large">
                    Update Vendor Details
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

