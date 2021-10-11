import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Breadcrumb, Typography, Input, Row, Col, Switch, notification, Button, Tag  } from 'antd';
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import 'antd/dist/antd.css';
import SIDERVIEW from '../layout/siderview';
import HEADERVIEW from '../layout/headerview';
import FOOTERVIEW from '../layout/footerview';

function Index() 
{
    const {Content} = Layout;

    var apiurl = localStorage.getItem('session_apiurl');
    const [url_moid] = React.useState(window.location.href.split('/').reverse()[0]);

    const [moid , setmoid] = React.useState("");
    const [moname , setmoname] = React.useState("");
    const [mocode , setmocode] = React.useState("");
    const [motype , setmotype] = React.useState("");
    const [isavailable , setisavailable] = React.useState(false);
    
    const [isedit , setisedit] = React.useState(false);

    function onChangeName(e) {
      setmoname(e.target.value);
      }

    function onChangeCode(e) {
      setmocode(e.target.value);
      setisedit(true);
      }

    function onChangeType(e) {
      setmotype(e.target.value);
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

      async function updatePlant()
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
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"moid":moid, "mocode" : mocode, "moname" : moname, "motype" : motype, "isactive" : isavailable})
              };

              await fetch(`${apiurl}/admin/updatemo`,sendOptions)
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
    
       
        fetch(`${apiurl}/admin/modetail/${url_moid}`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
              setmoid(response.dataset[0].mo_id);
              setmoname(response.dataset[0].mo_name);
              setmocode(response.dataset[0].mo_code);
              setmotype(response.dataset[0].mo_type);
              setisavailable(response.dataset[0].mo_active);
              
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
    
      }, [apiurl,url_moid]);
 
    return( <Layout style={{ minHeight: '100vh' }}>
    <SIDERVIEW />
    <Layout className="site-layout">
      <HEADERVIEW />
      <Content style={{ margin: '0 16px'}}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item><Link to="/allmos">All Sewing MOs/Teams</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Edit Sewing MO/Team Details</Breadcrumb.Item>
          <Breadcrumb.Item>{moid}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={12}>
                <Typography.Title level={5} style={{color:"#004d80"}}>EDIT SEWING MO/TEAM DETAILS</Typography.Title>
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
                <br />
                <Typography.Text style={{color:"blue"}}>Is Active : {YesNo(isavailable)}</Typography.Text>
                <br />
                <Switch size="medium" checked={isavailable} onChange={onChangeActive}/>
                <br/>
                <br/>
                {isedit ? (
                    <p style={{color:"red"}}>** Please Save Your Changes</p>
                  ) : (
                    <></>
                  )}
                <Button onClick={updatePlant} type="primary" htmlType="submit" size="large">
                    Update MO/TEAM Details
                </Button>
            </Col>
            <Col span={10} style={{marginLeft:"20px"}}>
            <div style={{height:'380px',width:'380px',border:'3px solid rgb(0, 0, 0)',textAlign:'center',margin:'auto'}}>
                <p><b>SAMPLE ROOM SEWING MO/TEAM</b></p>
                <QRCode value={mocode} level='H' size='280'/>
                <p><b>CODE : {mocode}</b><br/><b>NAME : {moname}</b></p>
            </div>
                
            </Col>
          </Row>
          
        </div>
      </Content>
      <FOOTERVIEW/>
    </Layout>
  </Layout>);
}

export default Index;

