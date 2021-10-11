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
    const [url_stageid] = React.useState(window.location.href.split('/').reverse()[0]);

    const [stageid , setstageid] = React.useState("");
    const [stagename , setstagename] = React.useState("");
    const [stagedesc , setstagedesc] = React.useState("");
    const [isavailable , setisavailable] = React.useState(false);
    
    const [isedit , setisedit] = React.useState(false);

    function onChangeName(e) {
      setstagename(e.target.value);
      setisedit(true);
      }

    function onChangeDesc(e) {
      setstagedesc(e.target.value);
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

      async function updateStage()
      {
          if(stagename === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Enter Sample Name.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else if(stagedesc === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Enter Sample Name.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else
          {
            const sendOptions = {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"stageid" : stageid, "samplename" : stagename, "sampledesc" : stagedesc, "isavailable" : isavailable})
              };

              await fetch(`${apiurl}/admin/updatestage`,sendOptions)
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
    
       
        fetch(`${apiurl}/admin/stagedetail/${url_stageid}`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
              setstageid(response.dataset[0].sam_stage_id);
              setstagename(response.dataset[0].sam_stage_title);
              setstagedesc(response.dataset[0].sam_stage_desc);
              setisavailable(response.dataset[0].sam_stage_active);
              
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
    
      }, [apiurl,url_stageid]);
 
    return( <Layout style={{ minHeight: '100vh' }}>
    <SIDERVIEW />
    <Layout className="site-layout">
      <HEADERVIEW />
      <Content style={{ margin: '0 16px'}}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item><Link to="/allstages">All Sample Stages</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Edit Sample Stage Details</Breadcrumb.Item>
          <Breadcrumb.Item>{stageid}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={12}>
                <Typography.Title level={5} style={{color:"#004d80"}}>EDIT SAMPLE STAGE DETAILS</Typography.Title>
                <br />
                <Typography.Text style={{color:"blue"}}>Sample Stage Name :</Typography.Text>
                <br />
                <Input required={true} size="medium" value={stagename} onChange={onChangeName}/>
                <br />
                <Typography.Text style={{color:"blue"}}>Sample Stage Description :</Typography.Text>
                <br />
                <Input required={true} size="medium" value={stagedesc} onChange={onChangeDesc}/>
                <br />
                <br />
                <Typography.Text style={{color:"blue"}}>Sample Stage Active : {YesNo(isavailable)}</Typography.Text>
                <br />
                <Switch size="medium" checked={isavailable} onChange={onChangeActive}/>
                <br/>
                <br/>
                {isedit ? (
                    <p style={{color:"red"}}>** Please Save Your Changes</p>
                  ) : (
                    <></>
                  )}
                <Button onClick={updateStage} type="primary" htmlType="submit" size="large">
                    Update Sample Stage Details
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

