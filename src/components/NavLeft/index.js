import React from 'react'
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom'
import menuConfig from '../../config/menuConfig'
import './index.less'

const SubMenu = Menu.SubMenu;

export default class NavLeft extends React.Component{
    constructor(props){
        super(props);

        this.renderMenu =  this.renderMenu.bind(this)
    }

    componentWillMount(){
        const menuTreeNode = this.renderMenu(menuConfig)
        this.setState({
            menuTreeNode
        })
    }

    // 菜单渲染
    renderMenu(data){
        return data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu title={item.title} key={item.key}>
                        { this.renderMenu(item.children) }
                    </SubMenu>
                )
            }
            return <Menu.Item key={item.key}>
            <NavLink to={item.key}>{ item.title }</NavLink></Menu.Item>

        })
    }

    render(){
        return(
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <h1>wl ms</h1>
                </div>
                <div>
                    <Menu
                        theme="dark"
                    >
                        { this.state.menuTreeNode }
                    </Menu>
                </div>
            </div>
        )
    }
}