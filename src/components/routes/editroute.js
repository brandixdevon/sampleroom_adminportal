import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Breadcrumb, Typography, Input, Row, Col, Select, Switch, notification, Button, Tag, Table, Tooltip, Popconfirm  } from 'antd';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import SIDERVIEW from '../layout/siderview';
import HEADERVIEW from '../layout/headerview';
import FOOTERVIEW from '../layout/footerview';
import { DeleteOutlined } from '@ant-design/icons';

function Index() 
{
    const {Content} = Layout;
    const { Option } = Select;

    var apiurl = localStorage.getItem('session_apiurl');
    const [url_routeid] = React.useState(window.location.href.split('/').reverse()[0]);

    const [routeid , setrouteid] = React.useState("");
    const [routename, set_routename] = React.useState("");
    const [routecode, set_routecode] = React.useState("");
    const [isdw, set_isdw] = React.useState(false);
    const [isemb, set_isemb] = React.useState(false);
    const [isactive, set_isactive] = React.useState(false);

    const [ds_elmlist , setds_elmlist] = React.useState([]);
    const [ds_elm_assign , setds_elm_assign] = React.useState([]);

    const [isedit , setisedit] = React.useState(false);

    const [elmid, set_elmid] = React.useState("");
    const [elmorder, set_elmorder] = React.useState("");
    const [issmv, set_issmv] = React.useState(false);


    const tablecolumns = [
      {
        title: 'Action',
        dataIndex: 'routeelmid',
        width: '10%',
        key: 'routeelmid',
        render: (val) => DeleteActionButtonStrip(val),
      },
      {
        title: 'Element Name',
        dataIndex: 'proelmname',
        width: '50%',
        key: 'proelmname',
      },
      {
        title: 'SMV Point',
        dataIndex: 'issmv',
        width: '20%',
        key: 'issmv',
        render: (val) => YesNo(val),
      },
      {
        title: 'Hierarchy',
        dataIndex: 'hierarchy',
        width: '20%',
        key: 'hierarchy',
      },
    ];

        function DeleteActionButtonStrip(value)
      {
        return (<Tooltip title="Delete">
        <Popconfirm
          title="Are you sure to delete this element from this Route?"
          onConfirm={() => deleteElement({value})}
          okText="Yes"
          cancelText="No">
          <Button shape="circle" type="primary" icon={<DeleteOutlined />} danger/>
        </Popconfirm>
      </Tooltip>);
      }

    
 
      function onChangeName(e) {
        set_routename(e.target.value);
        setisedit(true);
      }
  
      function onChangeCode(e) {
        set_routecode(e.target.value);
        setisedit(true);
      }
  
      function onChangeDw(checked) {
        set_isdw(checked);
        setisedit(true);
      }
  
      function onChangeEmb(checked) {
        set_isemb(checked);
        setisedit(true);
      }


      function onChangeELM(value) {
        
        set_elmid(value);
     
      }

      function onChangeOrder(value) {
        
        set_elmorder(value);
       
      }

      function onChangeSmv(checked) {
        set_issmv(checked);
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

      async function updateRoute()
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
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"routeid": routeid,"routename" : routename , "routecode" : routecode, "isdw" : isdw,"isemb": isemb})
              };

              await fetch(`${apiurl}/admin/updateroute`,sendOptions)
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

      async function updateRouteStatus(value)
      {
        if(routeid === "")
        {
            notification['error']({
                message: 'Data Error',
                description:'Please Select Route.',
                style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
              });
        }
        else if(value === "")
        {
            notification['error']({
                message: 'Data Error',
                description:'Error in Data.',
                style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
              });
        }
          else
          {
            const sendOptions = {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"routeid": routeid,"active": value})
              };

              await fetch(`${apiurl}/admin/changeroutestatus`,sendOptions)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                        
                        notification['success']({
                            message: 'Data Success',
                            description: data.Msg,
                            style:{color: '#000',border: '1px solid #ccffcc',backgroundColor: '#99ff66'},
                          });

                          fetch(`${apiurl}/admin/routedetail/${url_routeid}`)
                          .then(res => res.json())
                          .then(response => { 

                              if(response.Type === "SUCCESS")
                              {
                                setrouteid(response.dataset[0].routemasterid);
                                set_routename(response.dataset[0].routename);
                                set_routecode(response.dataset[0].routeshort);
                                set_isdw(response.dataset[0].dwplant);
                                set_isemb(response.dataset[0].embplant);
                                set_isactive(response.dataset[0].isactive);
                                
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

      const AddTO = async () =>
      {
          if(routeid === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Select User Again.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else if(elmid === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Select Element.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else if(elmorder === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Select Order/Hierarchy.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else
          {
            const sendOptions = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"routeid" : routeid, "elmid" : elmid, "issmv" : issmv, "order" : elmorder,})
              };

              await fetch(`${apiurl}/admin/addelmtoroute`,sendOptions)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {
                       set_elmid("");
                       set_issmv(false);
                       set_elmorder("");
                        
                        notification['success']({
                            message: 'Data Success',
                            description: data.Msg,
                            style:{color: '#000',border: '1px solid #ccffcc',backgroundColor: '#99ff66'},
                          });

                          fetch(`${apiurl}/admin/routemapelm/${url_routeid}`)
                          .then(res => res.json())
                          .then(response => { 

                              if(response.Type === "SUCCESS")
                              {
                                setds_elm_assign(response.dataset);

                              }
                              else
                              {
                                  notification['error']({
                                      message: 'Data Error',
                                      description: 'User Group Data Loading Error.',
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

      const deleteElement = async (val) => {
        if(routeid === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Select User Again.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else if(val.value === "")
          {
              notification['error']({
                  message: 'Data Error',
                  description:'Please Select Customer Again.',
                  style:{color: '#000',border: '1px solid #ffa39e',backgroundColor: '#ff6961'},
                });
          }
          else
          {
            const sendOptions = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"routeid" : routeid, "routeelmid" : val.value})
              };

              await fetch(`${apiurl}/admin/deletemapelm`,sendOptions)
                .then(response => response.json())
                .then(data => 
                {
                    if(data.Type === "SUCCESS")
                    {

                        notification['success']({
                            message: 'Data Success',
                            description: data.Msg,
                            style:{color: '#000',border: '1px solid #ccffcc',backgroundColor: '#99ff66'},
                          });

                          fetch(`${apiurl}/admin/routemapelm/${url_routeid}`)
                          .then(res => res.json())
                          .then(response => { 

                              if(response.Type === "SUCCESS")
                              {
                                setds_elm_assign(response.dataset);

                              }
                              else
                              {
                                  notification['error']({
                                      message: 'Data Error',
                                      description: 'User Group Data Loading Error.',
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
    
        fetch(`${apiurl}/admin/allelements`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
              setds_elmlist(response.dataset);

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

        fetch(`${apiurl}/admin/routedetail/${url_routeid}`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
              setrouteid(response.dataset[0].routemasterid);
              set_routename(response.dataset[0].routename);
              set_routecode(response.dataset[0].routeshort);
              set_isdw(response.dataset[0].dwplant);
              set_isemb(response.dataset[0].embplant);
              set_isactive(response.dataset[0].isactive);
              
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

        fetch(`${apiurl}/admin/routemapelm/${url_routeid}`)
        .then(res => res.json())
        .then(response => { 

            if(response.Type === "SUCCESS")
            {
              setds_elm_assign(response.dataset);

            }
            else
            {
                notification['error']({
                    message: 'Data Error',
                    description: 'User Group Data Loading Error.',
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

    
      }, [apiurl,url_routeid]);
 
    return( <Layout style={{ minHeight: '100vh' }}>
    <SIDERVIEW />
    <Layout className="site-layout">
      <HEADERVIEW />
      <Content style={{ margin: '0 16px'}}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item><Link to="/allroutes">All Routes</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Edit Route Details</Breadcrumb.Item>
          <Breadcrumb.Item>{routeid}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Row>
            <Col span={10}>
                <Typography.Title level={5} style={{color:"#004d80"}}>EDIT USER DETAILS</Typography.Title>
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
                <br />
                <br/>
                {isedit ? (
                    <p style={{color:"red"}}>** Please Save Your Changes</p>
                  ) : (
                    <></>
                  )}
                <Button onClick={updateRoute} type="primary" htmlType="submit" size="large">
                    Update Route Details
                </Button>
                <br/>
                <hr/>
                <br/>
                {isactive ? (
                  <Button onClick={()=>updateRouteStatus(false)} type="danger" htmlType="submit" size="large">
                    Click Here to Disable/Deactivate This Route
                  </Button>
                  ) : (
                    <><p>** This Route is in Deactivate Mode.</p>
                    <Button onClick={()=>updateRouteStatus(true)} type="primary" style={{ background: "green", color: "white" }} htmlType="submit" size="large">
                    Click Here to Enable/Activate This Route
                    </Button></>
                  )}

            </Col>
            <Col span={12} style={{marginLeft:"20px"}}>


            <h4><b>ELEMENT MAPPING</b></h4>
              <Row>
                <Col span={12}>
                  <p style={{color:"blue"}}>Element Name</p>
                  <Select
                  value={elmid}
                  showSearch
                  style={{ width: '90%' }}
                  placeholder="Select a element"
                  optionFilterProp="children"
                  onChange={onChangeELM}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                {ds_elmlist.map((row) => (
                  <Option value={row.proelmid}>{row.proelmname}</Option>
                    ))}
                </Select>
                </Col>
                <Col span={4}>
                  <p style={{color:"blue"}}>Hierarchy</p>

                  <Select
                  value={elmorder}
                  showSearch
                  style={{ width: '80%' }}
                  placeholder="Select a user group"
                  optionFilterProp="children"
                  onChange={onChangeOrder}
                >
                  <Option value={1}>{1}</Option>
                  <Option value={2}>{2}</Option>
                  <Option value={3}>{3}</Option>
                  <Option value={4}>{4}</Option>
                  <Option value={5}>{5}</Option>
                  <Option value={6}>{6}</Option>
                  <Option value={7}>{7}</Option>
                  <Option value={8}>{8}</Option>
                  <Option value={9}>{9}</Option>
                  <Option value={10}>{10}</Option>
                  <Option value={11}>{11}</Option>
                  <Option value={12}>{12}</Option>
                  <Option value={13}>{13}</Option>
                  <Option value={14}>{14}</Option>
                  <Option value={15}>{15}</Option>
                  <Option value={16}>{16}</Option>
                  <Option value={17}>{17}</Option>
                  <Option value={18}>{18}</Option>
                  <Option value={19}>{19}</Option>
                  <Option value={20}>{20}</Option>
                  <Option value={21}>{21}</Option>
                  <Option value={22}>{22}</Option>
                  <Option value={23}>{23}</Option>
                  <Option value={24}>{24}</Option>
                  <Option value={25}>{25}</Option>
                  <Option value={26}>{26}</Option>
                  <Option value={27}>{27}</Option>
                  <Option value={28}>{28}</Option>
                  <Option value={29}>{29}</Option>
                  <Option value={30}>{30}</Option>
                </Select>

                </Col>
                <Col span={4}>
                  <p style={{color:"blue"}}>Is SMV</p>
                  <Switch size="medium" checked={issmv} onChange={onChangeSmv}/>
                </Col>
                <Col span={4}>
                  <p style={{color:"blue"}}>#</p>
                  <Button onClick={AddTO} type="primary" htmlType="submit" size="medium">
                    Add
                  </Button>
                </Col>
              </Row>
            <br/>
            <Table dataSource={ds_elm_assign} columns={tablecolumns} pagination={{ defaultPageSize: 50, showSizeChanger: true, pageSizeOptions: ['10', '25', '50']}}/>
            
            
            </Col>
          </Row>
         
        </div>
      </Content>
      <FOOTERVIEW/>
    </Layout>
  </Layout>);
}

export default Index;

