import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Breadcrumb, Typography, Input, Row, Col, Switch, notification, Button, Tag} from 'antd';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import SIDERVIEW from '../layout/siderview';
import HEADERVIEW from '../layout/headerview';
import FOOTERVIEW from '../layout/footerview';

function Index() 
{
    const {Content} = Layout;

    var apiurl = localStorage.getItem('session_apiurl');
    const [url_ugid] = React.useState(window.location.href.split('/').reverse()[0]);

    const [ugid , setugid] = React.useState("");
    const [groupname , setgroupname] = React.useState("");
    const [isedit , setisedit] = React.useState(false);

    //usergroup attributes
    const [ugactive, set_ugactive] = React.useState("");
    const [isadmin, set_isadmin] = React.useState("");
    const [srf_access, set_srf_access] = React.useState("");
    const [srf_create, set_srf_create] = React.useState("");
    const [srf_edit, set_srf_edit] = React.useState("");
    const [srf_delete, set_srf_delete] = React.useState("");
    const [pm_access, set_pm_access] = React.useState("");
    const [mm_access, set_mm_access] = React.useState("");
    const [smv_access, set_smv_access] = React.useState("");
    const [pb_access, set_pb_access] = React.useState("");
    const [pln_access, set_pln_access] = React.useState("");
    const [str_access, set_str_access] = React.useState("");
    const [cut_access, set_cut_access] = React.useState("");
    const [osohs_access, set_osohs_access] = React.useState("");
    const [osohr_access, set_osohr_access] = React.useState("");
    const [sew_access, set_sew_access] = React.useState("");
    const [qc_access, set_qc_access] = React.useState("");
    const [dis_access, set_dis_access] = React.useState("");

    
 
    function onChangeGroup(e) {
        setgroupname(e.target.value);
        setisedit(true);
      }

      function onChange_ugactive(checked) {
        set_ugactive(checked);
        setisedit(true);
      }

      function onChange_isadmin(checked) {
        set_isadmin(checked);
        setisedit(true);
      }

      function onChange_srf_access(checked) {
        set_srf_access(checked);
        setisedit(true);
      }

      function onChange_srf_create(checked) {
        set_srf_create(checked);
        setisedit(true);
      }

      function onChange_srf_edit(checked) {
        set_srf_edit(checked);
        setisedit(true);
      }

      function onChange_srf_delete(checked) {
        set_srf_delete(checked);
        setisedit(true);
      }

      function onChange_pm_access(checked) {
        set_pm_access(checked);
        setisedit(true);
      }

      function onChange_mm_access(checked) {
        set_mm_access(checked);
        setisedit(true);
      }

      function onChange_smv_access(checked) {
        set_smv_access(checked);
        setisedit(true);
      }

      function onChange_pb_access(checked) {
        set_pb_access(checked);
        setisedit(true);
      }

      function onChange_pln_access(checked) {
        set_pln_access(checked);
        setisedit(true);
      }

      function onChange_str_access(checked) {
        set_str_access(checked);
        setisedit(true);
      }

      function onChange_cut_access(checked) {
        set_cut_access(checked);
        setisedit(true);
      }

      function onChange_osohs_access(checked) {
        set_osohs_access(checked);
        setisedit(true);
      }

      function onChange_osohr_access(checked) {
        set_osohr_access(checked);
        setisedit(true);
      }

      function onChange_sew_access(checked) {
        set_sew_access(checked);
        setisedit(true);
      }

      function onChange_qc_access(checked) {
        set_qc_access(checked);
        setisedit(true);
      }

      function onChange_dis_access(checked) {
        set_dis_access(checked);
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

      async function updateGroup()
      {
          if(groupname === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Enter User Group Name.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else
          {
            const sendOptions = {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"ugid" : ugid,
                 "groupname" : groupname,
                 "ugactive" : ugactive,
                 "isadmin" : isadmin,
                 "srf_access" : srf_access,
                "srf_create":srf_create,
                "srf_edit":srf_edit,
                "srf_delete":srf_delete,
                "pm_access":pm_access,
                "mm_access":mm_access,
                "smv_access":smv_access,
                "pb_access":pb_access,
                "pln_access":pln_access,
                "str_access":str_access,
                "cut_access":cut_access,
                "osohs_access":osohs_access,
                "osohr_access":osohr_access,
                "sew_access":sew_access,
                "qc_access":qc_access,
                "dis_access":dis_access})
              };

              await fetch(`${apiurl}/admin/updateug`,sendOptions)
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
    
        fetch(`${apiurl}/admin/ugdetail/${url_ugid}`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
              setugid(response.dataset[0].ugid);
              setgroupname(response.dataset[0].ugname);
              set_ugactive(response.dataset[0].ugactive);
              set_isadmin(response.dataset[0].isadmin);
              set_srf_access(response.dataset[0].srf_access);
              set_srf_create(response.dataset[0].srf_create);
              set_srf_edit(response.dataset[0].srf_edit);
              set_srf_delete(response.dataset[0].srf_delete);
              set_pm_access(response.dataset[0].pm_access);
              set_mm_access(response.dataset[0].mm_access);
              set_smv_access(response.dataset[0].smv_access);
              set_pb_access(response.dataset[0].pb_access);
              set_pln_access(response.dataset[0].pln_access);
              set_str_access(response.dataset[0].str_access);
              set_cut_access(response.dataset[0].cut_access);
              set_osohs_access(response.dataset[0].osohs_access);
              set_osohr_access(response.dataset[0].osohr_access);
              set_sew_access(response.dataset[0].sew_access);
              set_qc_access(response.dataset[0].qc_access);
              set_dis_access(response.dataset[0].dis_access);
              
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

      }, [apiurl,url_ugid]);
 
    return( <Layout style={{ minHeight: '100vh' }}>
    <SIDERVIEW />
    <Layout className="site-layout">
      <HEADERVIEW />
      <Content style={{ margin: '0 16px'}}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item><Link to="/allugs">All User Groups</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Edit User Group Details</Breadcrumb.Item>
          <Breadcrumb.Item>{ugid}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={12}>
                <Typography.Title level={5} style={{color:"#004d80"}}>EDIT USER GROUP DETAILS</Typography.Title>
                <Typography.Text style={{color:"blue"}}>User Group Name :</Typography.Text>
                <br />
                <Input required={true} size="medium" value={groupname} onChange={onChangeGroup}/>
                <br />
                <Typography.Text style={{color:"blue"}}>Is Active : {YesNo(ugactive)}</Typography.Text>
                <br />
                <Switch size="medium" checked={ugactive} onChange={onChange_ugactive}/>
                <br />
                <Typography.Text style={{color:"blue"}}>Admin Access : {YesNo(isadmin)}</Typography.Text>
                <br />
                <Switch size="medium" checked={isadmin} onChange={onChange_isadmin}/>
                <br />
                <Typography.Text style={{color:"blue"}}>SRF Access : {YesNo(srf_access)}</Typography.Text>
                <br />
                <Switch size="medium" checked={srf_access} onChange={onChange_srf_access}/>
                <br />
                <Typography.Text style={{color:"blue"}}>SRF Create : {YesNo(srf_create)}</Typography.Text>
                <br />
                <Switch size="medium" checked={srf_create} onChange={onChange_srf_create}/>
                <br />
                <Typography.Text style={{color:"blue"}}>SRF Edit : {YesNo(srf_edit)}</Typography.Text>
                <br />
                <Switch size="medium" checked={srf_edit} onChange={onChange_srf_edit}/>
                <br />
                <Typography.Text style={{color:"blue"}}>SRF Delete : {YesNo(srf_delete)}</Typography.Text>
                <br />
                <Switch size="medium" checked={srf_delete} onChange={onChange_srf_delete}/>
                <br />
                <Typography.Text style={{color:"blue"}}>Pattern Maker Access : {YesNo(pm_access)}</Typography.Text>
                <br />
                <Switch size="medium" checked={pm_access} onChange={onChange_pm_access}/>
                <br />
                <Typography.Text style={{color:"blue"}}>Marker Maker Access : {YesNo(mm_access)}</Typography.Text>
                <br />
                <Switch size="medium" checked={mm_access} onChange={onChange_mm_access}/>
            </Col>
            <Col span={12} style={{paddingLeft:'20px'}}>
                <br />
                <Typography.Text style={{color:"blue"}}>SMV Access : {YesNo(smv_access)}</Typography.Text>
                <br />
                <Switch size="medium" checked={smv_access} onChange={onChange_smv_access}/>
                <br />
                <Typography.Text style={{color:"blue"}}>Placement Board Access : {YesNo(pb_access)}</Typography.Text>
                <br />
                <Switch size="medium" checked={pb_access} onChange={onChange_pb_access}/>
                <br />
                <Typography.Text style={{color:"blue"}}>Planning Access : {YesNo(pln_access)}</Typography.Text>
                <br />
                <Switch size="medium" checked={pln_access} onChange={onChange_pln_access}/>
                <br />
                <Typography.Text style={{color:"blue"}}>Stores Access : {YesNo(str_access)}</Typography.Text>
                <br />
                <Switch size="medium" checked={str_access} onChange={onChange_str_access}/>
                <br />
                <Typography.Text style={{color:"blue"}}>Cutting Access : {YesNo(cut_access)}</Typography.Text>
                <br />
                <Switch size="medium" checked={cut_access} onChange={onChange_cut_access}/>
                <br />
                <Typography.Text style={{color:"blue"}}>OSOH Send Access : {YesNo(osohs_access)}</Typography.Text>
                <br />
                <Switch size="medium" checked={osohs_access} onChange={onChange_osohs_access}/>
                <br />
                <Typography.Text style={{color:"blue"}}>OSOH Received Access : {YesNo(osohr_access)}</Typography.Text>
                <br />
                <Switch size="medium" checked={osohr_access} onChange={onChange_osohr_access}/>
                <br />
                <Typography.Text style={{color:"blue"}}>Sewing Access : {YesNo(sew_access)}</Typography.Text>
                <br />
                <Switch size="medium" checked={sew_access} onChange={onChange_sew_access}/>
                <br />
                <Typography.Text style={{color:"blue"}}>Quality Access : {YesNo(qc_access)}</Typography.Text>
                <br />
                <Switch size="medium" checked={qc_access} onChange={onChange_qc_access}/>
                <br />
                <Typography.Text style={{color:"blue"}}>Dispatch Access : {YesNo(dis_access)}</Typography.Text>
                <br />
                <Switch size="medium" checked={dis_access} onChange={onChange_dis_access}/>
                <br/>
                <br/>
                {isedit ? (
                    <p style={{color:"red"}}>** Please Save Your Changes</p>
                  ) : (
                    <></>
                  )}
                <Button onClick={updateGroup} type="primary" htmlType="submit" size="large">
                    Update User Group Details
                </Button>
            </Col>
          </Row>
          
        </div>
      </Content>
      <FOOTERVIEW/>
    </Layout>
  </Layout>);
}

export default Index;

