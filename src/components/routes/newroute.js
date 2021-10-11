import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Breadcrumb, Typography, Input, Row, Col, notification, Button, Switch  } from 'antd';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import SIDERVIEW from '../layout/siderview';
import HEADERVIEW from '../layout/headerview';
import FOOTERVIEW from '../layout/footerview';

function Index() 
{
    const {Content} = Layout;

    var apiurl = localStorage.getItem('session_apiurl');

    //usergroup attributes
    const [routename, set_routename] = React.useState("");
    const [routecode, set_routecode] = React.useState("");
    const [isdw, set_isdw] = React.useState(false);
    const [isemb, set_isemb] = React.useState(false);
 
    function onChangeName(e) {
      set_routename(e.target.value);
    }

    function onChangeCode(e) {
      set_routecode(e.target.value);
    }

    function onChangeDw(checked) {
      set_isdw(checked);
    }

    function onChangeEmb(checked) {
      set_isemb(checked);
    }
     
      function addRoute()
      {
          if(routename === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Enter Route Name.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else if(routecode === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Enter Route Code.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else
          {
            const sendOptions = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"routename" : routename , "routecode" : routecode, "isdw" : isdw,"isemb": isemb})
              };

              fetch(`${apiurl}/admin/createroute`,sendOptions)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                      set_routename("");
                      set_routecode("");
                      set_isdw(false);
                      set_isemb(false);

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
          <Breadcrumb.Item><Link to="/allroutes">All Routes</Link></Breadcrumb.Item>
          <Breadcrumb.Item>New Route Create</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={12}>
                <Typography.Title level={5} style={{color:"#004d80"}}>ADD NEW ROUTE</Typography.Title>
                <br />
                <Typography.Text style={{color:"blue"}}>Route Name :</Typography.Text>
                <br />
                <Input required={true} size="medium" value={routename} onChange={onChangeName}/>
                <br /><br />
                <Typography.Text style={{color:"blue"}}>Route Code :</Typography.Text>
                <br />
                <Input required={true} size="medium" value={routecode} onChange={onChangeCode}/>
                <br /><br />
                <Typography.Text style={{color:"blue"}}>Is Dye or Wash Route :</Typography.Text>
                <br />
                <Switch size="medium" checked={isdw} onChange={onChangeDw}/>
                <br/><br/>
                <Typography.Text style={{color:"blue"}}>Is Embellishment Route :</Typography.Text>
                <br />
                <Switch size="medium" checked={isemb} onChange={onChangeEmb}/>
                <br/>
                <br/>
                <Button onClick={addRoute} type="primary" htmlType="submit" size="large">
                    Add New Route
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

