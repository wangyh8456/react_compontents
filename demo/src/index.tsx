import React, { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Link } from 'react-router-dom';
import { Input, notification,Menu,SubMenu,MenuItem } from '../../src/index';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import router from '../src/router';

// const App = () => {
//     const [val, setVal] = useState(2);
//     const inputRef = useRef(null)
    
//     const changeValue = () => {
//         setVal(val+1);
//     }

//     useEffect(() => {
//         // console.log(notification, 'notification');
//         console.log(inputRef.current, 'inputRef');
//         notification.warning({message:'111'});
//     }, [])
    

//     return (
//         <div>
//             <Input ref={inputRef}  value={val}/>
//             <button onClick={()=>changeValue()}>改变</button>
//         </div>
//     )
// }
let checkSub=[],checkMenu=[],tempMenu=[],checktitle=[],temptitle=[];

function searchMenu(menu = {children:[]},isFirst=false){
  if(isFirst) {
    tempMenu=[];
    temptitle=[];
  }
  let thebool=false;
  for(let i=0;i<menu.children.length;i++){
    let item=menu.children[i]
    if(item.children) {
      let bool=searchMenu(item);
      thebool=bool;
      if(thebool){
        tempMenu=[...tempMenu,item.id];
        temptitle=[...temptitle,item.title];
        checkMenu=tempMenu;
        checktitle=temptitle;
        return thebool
      }
    }else{
      if(item.path===window.location.pathname){
        checkSub=[item.id]
        tempMenu=[...tempMenu,item.id]
        temptitle=[...temptitle,item.title];
        checkMenu=tempMenu;
        checktitle=temptitle;
        return true;
      }
    }
  }
  return thebool;
}


const App=()=>{
    let data = [
        {
            menuId: 1,
            name: '员工管理',
            icon:<AppstoreOutlined/>,
            children: [
                {
                    menuId: 3,
                    name: '添加员工',
                    icon:<SettingOutlined/>,
                    children: []
                },
                {
                    menuId: 4,
                    name: '删除员工',
                    icon:<SettingOutlined/>,
                    children: [
                        {
                            menuId: 6,
                            name: '按姓名删除',
                            icon:<SettingOutlined/>,
                            children: []
                        },
                        {
                            menuId: 7,
                            name: '按工号删除',
                            icon:<SettingOutlined/>,
                            children: []
                        }
                    ]
                }
            ],
        },
        {
            menuId: 2,
            name: '工资管理',
            icon:<MailOutlined/>,
            children: [
                {
                    menuId: 5,
                    name: '修改工资',
                    children: []
                }
            ],
        },
    ];
    const [selected,setSelected]=useState([]);
    useEffect(() => {
        
    }, [])
    const createMenu=(menu = [])=>{
        return menu.map(item => {
            
          if(item.children?.length>0) {
            return <SubMenu key={item.menuId} title={item.name} icon={item.icon}>
                      { createMenu(item.children) }
                   </SubMenu>
          }else {
            return <MenuItem key={item.menuId} title={item.name} icon={item.icon} onClick={(e,opens)=>{console.log(e)}}>
                       {/* <Link to={item.path}>{ item.title }</Link> */}
                    </MenuItem>
          }
        })
    }
    return (
        <Menu defaultSelectedKeys={checkSub} opens={selected} setOpens={setSelected} style={{width:'256px',height:'100vh'}}>
            {createMenu(data)}
        </Menu>
    )
}

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);