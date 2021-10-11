import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Typography} from 'antd';
import 'antd/dist/antd.css';
import { Redirect } from 'react-router-dom';

function Index() 
{
    const { Header} = Layout;

    const loginValidation = () => {
        //Swal.fire({  title: 'Error!',  text: 'Please Log In',  icon: 'error',  confirmButtonText: 'OK'});
        var Var_Isadmin = localStorage.getItem('session_isadmin');
        var Var_UserId = localStorage.getItem('session_userid');
        var Var_UserName = localStorage.getItem('session_username');

        if(Var_Isadmin === null)
        {
            return <Redirect to={"/login/"} />
        }

        if(Var_UserId === "")
        {
            return <Redirect to={"/login/"} />
        }

        if(Var_UserName === "")
        {
            return <Redirect to={"/login/"} />
        }
    
    };
    
    return( <Header className="site-layout-background" style={{ padding: 10 }}>{loginValidation()}<Typography.Title level={4} style={{color:"#007acc"}}>BFF SAMPLE ROOM MANAGEMENT TOOL - ADMIN PORTAL</Typography.Title></Header>);
}

export default Index;

