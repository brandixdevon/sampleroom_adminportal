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
    const [url_plantid] = React.useState(window.location.href.split('/').reverse()[0]);

    const [plantid , setplantid] = React.useState("");
    const [plantname , setplantname] = React.useState("");
    const [plantcode , setplantcode] = React.useState("");
    const [issew , setissew] = React.useState(false);
    const [isemb , setisemb] = React.useState(false);
    const [isdow , setisdow] = React.useState(false);
    const [isavailable , setisavailable] = React.useState(false);
    
    const [isedit , setisedit] = React.useState(false);

    function onChangeName(e) {
      setplantname(e.target.value);
      setisedit(true);
      }

    function onChangeCode(e) {
      setplantcode(e.target.value);
      setisedit(true);
      }

      function onChangeSew(checked) {
        setissew(checked);
        setisedit(true);
      }

      function onChangeEmb(checked) {
        setisemb(checked);
        setisedit(true);
      }

      function onChangeDow(checked) {
        setisdow(checked);
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
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"plantid" : plantid, "plantname" : plantname, "plantcode" : plantcode, "issew" : issew, "isemb" : isemb, "isdw" : isdow, "isactive" : isavailable})
              };

              await fetch(`${apiurl}/admin/updateplant`,sendOptions)
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
    
       
        fetch(`${apiurl}/admin/plantdetail/${url_plantid}`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
              setplantid(response.dataset[0].plant_id);
              setplantname(response.dataset[0].plant_name);
              setplantcode(response.dataset[0].plant_code);
              setissew(response.dataset[0].is_sew);
              setisemb(response.dataset[0].is_emb);
              setisdow(response.dataset[0].is_wash);
              setisavailable(response.dataset[0].is_active);
              
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
    
      }, [apiurl,url_plantid]);
 
    return( <Layout style={{ minHeight: '100vh' }}>
    <SIDERVIEW />
    <Layout className="site-layout">
      <HEADERVIEW />
      <Content style={{ margin: '0 16px'}}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item><Link to="/allplants">All Plants</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Edit Plant Details</Breadcrumb.Item>
          <Breadcrumb.Item>{plantid}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={12}>
                <Typography.Title level={5} style={{color:"#004d80"}}>EDIT PLANT DETAILS</Typography.Title>
                <br />
                <Typography.Text style={{color:"blue"}}>Plant Name :</Typography.Text>
                <br />
                <Input required={true} size="medium" value={plantname} onChange={onChangeName}/>
                <br />
                <Typography.Text style={{color:"blue"}}>Plant Code :</Typography.Text>
                <br />
                <Input required={true} size="medium" value={plantcode} onChange={onChangeCode}/>
                <br />
                <Typography.Text style={{color:"blue"}}>Is Sewing Plant : {YesNo(issew)}</Typography.Text>
                <br />
                <Switch size="medium" checked={issew} onChange={onChangeSew}/>
                <br />
                <Typography.Text style={{color:"blue"}}>Is Embellishment Plant : {YesNo(isemb)}</Typography.Text>
                <br />
                <Switch size="medium" checked={isemb} onChange={onChangeEmb}/>
                <br />
                <Typography.Text style={{color:"blue"}}>Is Dye/Wash Plant : {YesNo(isdow)}</Typography.Text>
                <br />
                <Switch size="medium" checked={isdow} onChange={onChangeDow}/>
                <br />
                <br />
                <Typography.Text style={{color:"blue"}}>Plant Is Active : {YesNo(isavailable)}</Typography.Text>
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

