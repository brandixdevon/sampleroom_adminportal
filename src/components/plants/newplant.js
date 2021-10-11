import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Breadcrumb, Typography, Input, Row, Col, Switch, notification, Button,  } from 'antd';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import SIDERVIEW from '../layout/siderview';
import HEADERVIEW from '../layout/headerview';
import FOOTERVIEW from '../layout/footerview';

function Index() 
{
    const {Content} = Layout;

    var apiurl = localStorage.getItem('session_apiurl');

    const [plantname , setplantname] = React.useState("");
    const [plantcode , setplantcode] = React.useState("");
    const [issew , setissew] = React.useState(false);
    const [isemb , setisemb] = React.useState(false);
    const [isdow , setisdow] = React.useState(false);

 
    function onChangeName(e) {
      setplantname(e.target.value);
      }

    function onChangeCode(e) {
      setplantcode(e.target.value);
      }

      function onChangeSew(checked) {
        setissew(checked);
      }

      function onChangeEmb(checked) {
        setisemb(checked);
      }

      function onChangeDow(checked) {
        setisdow(checked);
      }

      async function addPlant()
      {
          if(plantname === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Enter Plant Name.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else if(plantcode === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Enter Plant Code.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else
          {
            const sendOptions = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"plantname" : plantname, "plantcode" : plantcode, "issew" : issew, "isemb" : isemb, "isdw" : isdow})
              };

              await fetch(`${apiurl}/admin/createplant`,sendOptions)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                        setplantname("");
                        setplantcode("");
                        setissew(false);
                        setisemb(false);
                        setisdow(false);

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
          <Breadcrumb.Item><Link to="/allplants">All Plants</Link></Breadcrumb.Item>
          <Breadcrumb.Item>New Plant Create</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={12}>
                <Typography.Title level={5} style={{color:"#004d80"}}>ADD NEW PLANT</Typography.Title>
                <br />
                <Typography.Text style={{color:"blue"}}>Plant Name :</Typography.Text>
                <br />
                <Input required={true} size="medium" value={plantname} onChange={onChangeName}/>
                <br />
                <Typography.Text style={{color:"blue"}}>Plant Code :</Typography.Text>
                <br />
                <Input required={true} size="medium" value={plantcode} onChange={onChangeCode}/>
                <br />
                <Typography.Text style={{color:"blue"}}>Is Sewing Plant :</Typography.Text>
                <br />
                <Switch size="medium" checked={issew} onChange={onChangeSew}/>
                <br />
                <Typography.Text style={{color:"blue"}}>Is Embellishment Plant :</Typography.Text>
                <br />
                <Switch size="medium" checked={isemb} onChange={onChangeEmb}/>
                <br />
                <Typography.Text style={{color:"blue"}}>Is Dye/Wash Plant :</Typography.Text>
                <br />
                <Switch size="medium" checked={isdow} onChange={onChangeDow}/>
                <br/>
                <br/>
                <Button onClick={addPlant} type="primary" htmlType="submit" size="large">
                    Add New Plant
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

