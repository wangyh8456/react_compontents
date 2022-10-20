import React,{useState} from 'react';
import './index.scss';

type ItemProps={
    title:string,
    onClick?:(e:any,opens?:Array<number|string|undefined>)=>void,
    icon?:React.ReactNode,
    style?:object,
    children?:React.ReactNode,
    level?:number,
    offsetPX?:number,
    id?:number,
    treeKeys?:Array<number|string|undefined>,
    openKeys?:Array<number|string|undefined>,
    selectKeys?:Array<number|string|undefined>,
    changeOpens?:any,
    changeSelect?:any,
}

const MenuItem:React.FC<ItemProps>=({title,style,onClick,icon,children,level,offsetPX,id,selectKeys,treeKeys,openKeys,changeOpens,changeSelect})=>{
    const templevel=level?level:1;
    const pleft=templevel*(offsetPX?offsetPX:24);
    let selects=selectKeys?selectKeys:[];
    const bool=selects.findIndex(e=>e===id)>-1;
    // if(bool){
    //     let opens=openKeys?openKeys:[];
    //     const tree=treeKeys?Array.from(new Set([...treeKeys,id])):[id];
    //     opens=Array.from(new Set([...opens,...tree]));
    //     changeOpens(opens);
    // }

    const overrideClick=(e:any)=>{
        selects=[id];
        changeSelect(selects);
        if(onClick&&typeof(onClick)=="function"){ 
            onClick(e,selects);
        }
    }
    
    return (
        <div onClick={overrideClick} style={style}>
            <div className={`menu-item ${bool?'menu-item-choose':''}`} style={{paddingLeft:pleft}}>
                {icon?<div className="menu-icon">{icon}</div>:<></>}
                <div className="menu-item-title">{title}</div>
            </div>
            {children}
        </div>
    )
}

type SubmenuProps={
    title:string,
    icon?:React.ReactNode,
    style?:object,
    children?:any,
    level?:number
    offsetPX?:number,
    id?:number,
    treeKeys?:Array<number|string|undefined>,
    openKeys?:Array<number|string|undefined>,
    selectKeys?:Array<number|string|undefined>,
    changeOpens?:any,
    changeSelect?:any
}

const SubMenu:React.FC<SubmenuProps>=({title,style,icon,children,level,offsetPX,id,treeKeys,openKeys,selectKeys,changeOpens,changeSelect})=>{
    const templevel=level?level:1;
    const pleft=templevel*(offsetPX?offsetPX:24);
    const tree=treeKeys?Array.from(new Set([...treeKeys,id])):[id];
    let opens=openKeys?openKeys:[];
    const [visible,setVisible]=useState(opens?.findIndex(e=>e===id)>-1?true:false);

    const getDecoratedChildren = () => {
        return React.Children.map(children, child => {
          return React.cloneElement(child, {
            id:child.key,
            level:templevel+1,
            offsetPX:offsetPX?offsetPX:24,
            treeKeys:tree,
            openKeys:opens,
            selectKeys:selectKeys,
            changeOpens:changeOpens,
            changeSelect:changeSelect
          });
        })
    }

    const onClick=()=>{
        if(visible){
            const index=opens?.findIndex(e=>e===id);
            opens.splice(index,1);
        }else{
            opens=Array.from(new Set([...opens,...tree]));
        }
        changeOpens(opens);
        setVisible(!visible);
    }

    return (
        <div style={style} className="menu-sub">
            <div className={`menu-subitem ${templevel===1?'':'menu-subitem-sub2'}`} style={{paddingLeft:pleft}} onClick={onClick}>
                {icon?<div className="menu-icon">{icon}</div>:<></>}
                <div className="menu-subitem-title">{title}</div>
                <div className={`menu-arrow ${visible?'menu-arrow-trans':''}`}></div>
            </div>
            <div className="menu-subchild">
                {visible?<>{getDecoratedChildren()}</>:<></>}
            </div>
        </div>
    )
}

type MenuProps={
    style?:object,
    children?:any,
    offsetPX?:number,
    setOpens?:any,
    opens?:Array<any>,
    defaultSelectedKeys?:Array<any>,
}

const Menu:React.FC<MenuProps>=({style,children,offsetPX,opens,setOpens,defaultSelectedKeys})=>{
    const [selected,setSelected]=useState(defaultSelectedKeys&&defaultSelectedKeys.length>0?defaultSelectedKeys:[]);
    
    const changeOpens=(val:any)=>{
        console.log(val)
        setOpens(val);
    }
    const changeSelect=(val:any)=>{
        console.log(val)
        setSelected(val);
    }

    const getDecoratedChildren = () => {
        return React.Children.map(children, child => {
          return React.cloneElement(child, {
            id:child.key,
            offsetPX:offsetPX?offsetPX:24,
            openKeys:opens,
            selectKeys:selected,
            changeOpens:changeOpens,
            changeSelect:changeSelect
          });
        })
    }

    return (
        <div style={style} className="menu">
            {getDecoratedChildren()}
        </div>
    )
}

export {Menu,SubMenu,MenuItem};