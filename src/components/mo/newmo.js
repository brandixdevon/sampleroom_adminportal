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

    const [moname , setmoname] = React.useState("");
    const [mocode , setmocode] = React.useState("");
    const [motype , setmotype] = React.useState("");

 
    function onChangeName(e) {
      setmoname(e.target.value);
      }

    function onChangeCode(e) {
      setmocode(e.target.value);
      }

    function onChangeType(e) {
      setmotype(e.target.value);
      }


      async function addMo()
      {
          if(moname === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Enter MO/Team Name.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else if(mocode === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Enter MO/Team Code.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else if(motype === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Enter MO/Team Type.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else
          {
            const sendOptions = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"mocode" : mocode, "moname" : moname, "motype" : motype})
              };

              await fetch(`${apiurl}/admin/createmo`,sendOptions)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                        setmoname("");
                        setmocode("");
                        setmotype("");

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
          <Breadcrumb.Item><Link to="/allmos">All Sewing MOs/Teams</Link></Breadcrumb.Item>
          <Breadcrumb.Item>New Sewing MO/Team Create</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={12}>
                <Typography.Title level={5} style={{color:"#004d80"}}>ADD NEW MO/TEAM</Typography.Title>
                <br />
                <Typography.Text style={{color:"blue"}}>MO/Team Code :</Typography.Text>
                <br />
                <Input required={true} size="medium" value={mocode} onChange={onChangeCode}/> <br />
                <Typography.Text style={{color:"blue"}}>MO/Team Name :</Typography.Text>
                <br />
                <Input required={true} size="medium" value={moname} onChange={onChangeName}/>
                <br />
                <Typography.Text style={{color:"blue"}}>MO/Team Type : </Typography.Text>
                <br />
                <Input required={true} size="medium" value={motype} onChange={onChangeType}/>
                <br/>
                <p><small>(EX: SEWING TEAM / FINISHING TEAM / PACKING TEAM / GENERAL MO / TEAM LEAD)</small></p>
                <br/>
                <br/>
                <Button onClick={addMo} type="primary" htmlType="submit" size="large">
                    Add MO/Team Plant
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

