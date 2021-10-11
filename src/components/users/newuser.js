import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Breadcrumb, Typography, Input, Row, Col, Select , notification, Button, Tag  } from 'antd';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import SIDERVIEW from '../layout/siderview';
import HEADERVIEW from '../layout/headerview';
import FOOTERVIEW from '../layout/footerview';

function Index() 
{
    const {Content} = Layout;
    const { Option } = Select;

    var apiurl = localStorage.getItem('session_apiurl');

    const [username , setusername] = React.useState("");
    const [usergroup , setusergroup] = React.useState("");

    const [ds_usergroup , setds_usergroup] = React.useState([]);

    //usergroup attributes
    const [ugname, set_ugname] = React.useState("");
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
 
    function onChangeUser(e) {
        setusername(e.target.value);
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

    function onChangeUG(value) {
        
      setusergroup(value);
        
        fetch(`${apiurl}/admin/usergroupdetail/${value}`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
              set_ugname(response.dataset[0].ugname);
              set_ugactive(YesNo(response.dataset[0].ugactive));
              set_isadmin(YesNo(response.dataset[0].isadmin));
              set_srf_access(YesNo(response.dataset[0].srf_access));
              set_srf_create(YesNo(response.dataset[0].srf_create));
              set_srf_edit(YesNo(response.dataset[0].srf_edit));
              set_srf_delete(YesNo(response.dataset[0].srf_delete));
              set_pm_access(YesNo(response.dataset[0].pm_access));
              set_mm_access(YesNo(response.dataset[0].mm_access));
              set_smv_access(YesNo(response.dataset[0].smv_access));
              set_pb_access(YesNo(response.dataset[0].pb_access));
              set_pln_access(YesNo(response.dataset[0].pln_access));
              set_str_access(YesNo(response.dataset[0].str_access));
              set_cut_access(YesNo(response.dataset[0].cut_access));
              set_osohs_access(YesNo(response.dataset[0].osohs_access));
              set_osohr_access(YesNo(response.dataset[0].osohr_access));
              set_sew_access(YesNo(response.dataset[0].sew_access));
              set_qc_access(YesNo(response.dataset[0].qc_access));
              set_dis_access(YesNo(response.dataset[0].dis_access));
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

      }

      function addUser()
      {
          if(username === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Enter User Name.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else if(usergroup === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Select User Group.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else
          {
            const sendOptions = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"username" : username , "usergroup" : usergroup})
              };

              fetch(`${apiurl}/admin/createusers`,sendOptions)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                        setusername("");
                        setusergroup("");

                        set_ugname("");
                        set_ugactive("");
                        set_isadmin("");
                        set_srf_access("");
                        set_srf_create("");
                        set_srf_edit("");
                        set_srf_delete("");
                        set_pm_access("");
                        set_mm_access("");
                        set_smv_access("");
                        set_pb_access("");
                        set_pln_access("");
                        set_str_access("");
                        set_cut_access("");
                        set_osohs_access("");
                        set_osohr_access("");
                        set_sew_access("");
                        set_qc_access("");
                        set_dis_access("");

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
    
        fetch(`${apiurl}/admin/allusergroups_forselect`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
              setds_usergroup(response.dataset);

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


    
}, [apiurl]);
 
    return( <Layout style={{ minHeight: '100vh' }}>
    <SIDERVIEW />
    <Layout className="site-layout">
      <HEADERVIEW />
      <Content style={{ margin: '0 16px'}}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item><Link to="/allusers">All Users</Link></Breadcrumb.Item>
          <Breadcrumb.Item>New User Create</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={12}>
                <Typography.Title level={5} style={{color:"#004d80"}}>ADD NEW USER</Typography.Title>
                <br />
                <Typography.Text style={{color:"blue"}}>User Name :</Typography.Text>
                <br />
                <Input required={true} size="medium" value={username} onChange={onChangeUser}/>
                <br /><br />
                <Typography.Text style={{color:"blue"}}>User Group :</Typography.Text>
                <br />
                <Select
                  value={usergroup}
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Select a user group"
                  optionFilterProp="children"
                  onChange={onChangeUG}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                {ds_usergroup.map((row) => (
                  <Option value={row.ugid}>{row.ugname}</Option>
                    ))}
                  
                </Select>
                <br/>
                <br/>
                <Button onClick={addUser} type="primary" htmlType="submit" size="large">
                    Add New User
                </Button>
            </Col>
            <Col span={6} style={{marginLeft:"20px"}}>

            <h4><b>SELECTED USER GROUP DETAILS</b></h4>
            <br/>
            <h5><b>NAME : </b>{ugname}</h5>
            <h5><b>IS ACTIVE GROUP : </b>{ugactive}</h5>
            <h5><b>ADMIN ACCESS : </b>{isadmin}</h5>
            <h5><b>SRF VIEW ACCESS : </b>{srf_access}</h5>
            <h5><b>SRF CREATE ACCESS : </b>{srf_create}</h5>
            <h5><b>SRF EDIT ACCESS : </b>{srf_edit}</h5>
            <h5><b>SRF DELETE ACCESS : </b>{srf_delete}</h5>
            <h5><b>PATTERN MAKER ACCESS : </b>{pm_access}</h5>
            <h5><b>SMV ACCESS : </b>{smv_access}</h5>
            <h5><b>MARKER MAKER ACCESS : </b>{mm_access}</h5>
            <h5><b>PLACEMENT BOARD ACCESS : </b>{pb_access}</h5>
            <h5><b>PLANNING ACCESS : </b>{pln_access}</h5>
            <h5><b>STORES ACCESS : </b>{str_access}</h5>
            <h5><b>CUTTING ACCESS : </b>{cut_access}</h5>
            <h5><b>OSOHS ACCESS : </b>{osohs_access}</h5>
            <h5><b>OSOHR ACCESS : </b>{osohr_access}</h5>
            <h5><b>SEWING ACCESS : </b>{sew_access}</h5>
            <h5><b>QC ACCESS : </b>{qc_access}</h5>
            <h5><b>DISPATCH ACCESS : </b>{dis_access}</h5>
            </Col>
          </Row>
        </div>
      </Content>
      <FOOTERVIEW/>
    </Layout>
  </Layout>);
}

export default Index;

