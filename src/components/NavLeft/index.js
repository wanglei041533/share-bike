import React from 'react'
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { switchMenu } from '../../redux/action/index'
import menuConfig from '../../config/menuConfig'
import './index.less'

const SubMenu = Menu.SubMenu;

class NavLeft extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentKey:''
        }
        this.renderMenu =  this.renderMenu.bind(this)
    }

    handleClick = ({item,key})=>{
        const { dispatch } = this.props;
        console.log(item)
        dispatch(switchMenu(item.props.title));
        this.setState({
            currentKey:key
        })
    }

    componentWillMount(){
        const menuTreeNode = this.renderMenu(menuConfig)
        let currentKey = window.location.hash.replace(/#|\?.*$/g,'')
        this.setState({
            currentKey,
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
            return <Menu.Item title={item.title} key={item.key}>
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
                        onClick={this.handleClick}
                        selectedKeys={this.state.currentKey}
                        theme="dark"
                    >
                        { this.state.menuTreeNode }
                    </Menu>
                </div>
            </div>
        )
    }
}

export default connect()(NavLeft);