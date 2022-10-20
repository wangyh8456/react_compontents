/* 
    可配置多级路由，添加权限修改Layout中的createMenu方法，
    createMenu方法会将router数组第一个对象渲染到侧边栏，其它路由隐藏，如登录、打印、404页面
*/
import {lazy} from 'react'
import Login from '../Pages/Login'
import AppLayout from '../Pages/Layout'
import {Navigate} from 'react-router-dom'
import {
    TeamOutlined,
    UserOutlined,
    SettingOutlined,
    MenuOutlined
} from '@ant-design/icons';

const User=lazy(()=>{return import('../Pages/shopmanage')});
const Shopset=lazy(()=>{return import('../Pages/ShopSet')});
const Role=lazy(()=>{return import('../Pages/System/Auth')});
const Menu=lazy(()=>{return import('../Pages/System/Test')});

const router=[
    // These are the same as the props you provide to <Route>
    {
      id:'5',
      element: <AppLayout/>,
      children: [
        { id:'15',path: "/shopset",  element: <Shopset />,title:'店铺设置',icon:<UserOutlined/> },
        { id:'16',path: "/user",  element: <User />,title:'订单管理',icon:<UserOutlined/> },
        { 
            id:'17',
            path: "/system", 
            title:'系统管理',
            icon: <SettingOutlined/>,
            children: [
                { id:'21',path: "/system/role",  element: <Role />,title:'角色管理',icon:<TeamOutlined />},
                { id:'23',path: "/system/menu", element: <Menu />,title:'菜单管理',icon:<MenuOutlined /> },
            ]
        }
      ]
    },
    { path: "/login", element: <Login /> },
    { path:"*",element:<Navigate to="/user"/>},
]
export default router