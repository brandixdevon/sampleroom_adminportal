import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Breadcrumb, Typography, Input, Row, Col, Switch, notification, Button, Tag  } from 'antd';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import SIDERVIEW from '../layout/siderview';
import HEADERVIEW from '../layout/headerview';
import FOOTERVIEW from '../layout/footerview';

function Index() 
{
    const {Content} = Layout;

    var apiurl = localStorage.getItem('session_apiurl');
    const [url_cusid] = React.useState(window.location.href.split('/').reverse()[0]);

    const [cusid , setcusid] = React.useState("");
    const [customername , setcustomername] = React.useState("");
    const [isavailable , setisavailable] = React.useState(false);
    
    const [isedit , setisedit] = React.useState(false);

    function onChangeCustomer(e) {
        setcustomername(e.target.value);
        setisedit(true);
      }

      function onChangeActive(checked) {
        setisavailable(checked);
        setisedit(true);
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

      async function updateCustomer()
      {
          if(customername === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Enter User Name.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else
          {
            const sendOptions = {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"cusid" : cusid, "customername" : customername, "isavailable" : isavailable})
              };

              await fetch(`${apiurl}/admin/updatecustomer`,sendOptions)
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
    
       
        fetch(`${apiurl}/admin/customerdetail/${url_cusid}`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
              setcusid(response.dataset[0].cus_id);
              setcustomername(response.dataset[0].cus_name);
              setisavailable(response.dataset[0].cus_active);
              
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
    
      }, [apiurl,url_cusid]);
 
    return( <Layout style={{ minHeight: '100vh' }}>
    <SIDERVIEW />
    <Layout className="site-layout">
      <HEADERVIEW />
      <Content style={{ margin: '0 16px'}}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item><Link to="/allcustomers">All Customers</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Edit Customer Details</Breadcrumb.Item>
          <Breadcrumb.Item>{cusid}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={12}>
                <Typography.Title level={5} style={{color:"#004d80"}}>EDIT CUSTOMER DETAILS</Typography.Title>
                <br />
                <Typography.Text style={{color:"blue"}}>Customer Name :</Typography.Text>
                <br />
                <Input required={true} size="medium" value={customername} onChange={onChangeCustomer}/>
                <br />
                <br />
                <Typography.Text style={{color:"blue"}}>Customer Active : {YesNo(isavailable)}</Typography.Text>
                <br />
                <Switch size="medium" checked={isavailable} onChange={onChangeActive}/>
                <br/>
                <br/>
                {isedit ? (
                    <p style={{color:"red"}}>** Please Save Your Changes</p>
                  ) : (
                    <></>
                  )}
                <Button onClick={updateCustomer} type="primary" htmlType="submit" size="large">
                    Update Customer Details
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

