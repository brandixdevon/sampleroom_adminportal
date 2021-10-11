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

    const [stagename , setstagename] = React.useState("");
    const [stagedesc , setstagedesc] = React.useState("");

 
    function onChangeName(e) {
      setstagename(e.target.value);
      }

    function onChangeDesc(e) {
      setstagedesc(e.target.value);
      }

      async function addStage()
      {
          if(stagename === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Enter Stage Name.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else if(stagedesc === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Enter Stage Description.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else
          {
            const sendOptions = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"samplename" : stagename, "sampledesc" : stagedesc })
              };

              await fetch(`${apiurl}/admin/createstage`,sendOptions)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                        setstagename("");
                        setstagedesc("");
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
          <Breadcrumb.Item><Link to="/allstages">All Sample Stages</Link></Breadcrumb.Item>
          <Breadcrumb.Item>New Sample Stage Create</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={12}>
                <Typography.Title level={5} style={{color:"#004d80"}}>ADD NEW SAMPLE STAGE</Typography.Title>
                <br />
                <Typography.Text style={{color:"blue"}}>Sample Stage Name :</Typography.Text>
                <br />
                <Input required={true} size="medium" value={stagename} onChange={onChangeName}/>
                <br />
                <Typography.Text style={{color:"blue"}}>Sample Stage Description :</Typography.Text>
                <br />
                <Input required={true} size="medium" value={stagedesc} onChange={onChangeDesc}/>
                <br/>
                <br/>
                <Button onClick={addStage} type="primary" htmlType="submit" size="large">
                    Add New Stage
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

