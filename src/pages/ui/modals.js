import React from 'react'
import { Card, Button, Modal } from 'antd'
import './ui.less'

export default class Modals extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showmodal1:false,
            showmodal2:false,
            showmodal3:false,
            showmodal4:false
        };

        this.handleOpen = this.handleOpen.bind(this)
        this.handleConfirm = this.handleConfirm.bind(this)
    }

    handleOpen(type){
        this.setState({
            [type]:true
        })
    }

    handleConfirm(type){
        Modal[type]({
            title:'确认',
            content:'你确认学会react了吗',
            onOk(){
                console.log('ok')
            },
            onCancel(){
                console.log('cancel')
            }
        })
    }

    render(){
        return(
            <div>
                <Card title='基础动态框' className='card-wrap'>
                    <Button type='primary' onClick={()=>this.handleOpen('showmodal1')}>open</Button>
                    <Button type='primary' onClick={()=>this.handleOpen('showmodal2')}>自定义页脚</Button>
                    <Button type='primary' onClick={()=>this.handleOpen('showmodal3')}>顶部20px弹框</Button>
                    <Button type='primary' onClick={()=>this.handleOpen('showmodal4')}>水平垂直居中</Button>
                </Card>
                <Card title='信息确认框' className='card-wrap'>
                    <Button type='primary' onClick={()=>this.handleConfirm('confirm')}>Cirfirm</Button>
                    <Button type='primary' onClick={()=>this.handleConfirm('info')}>Info</Button>
                    <Button type='primary' onClick={()=>this.handleConfirm('success')}>Success</Button>
                    <Button type='primary' onClick={()=>this.handleConfirm('warning')}>Warning</Button>
                </Card>
                <Modal
                    title='react'
                    visible={this.state.showmodal1}
                    onCancel={()=>{
                        this.setState({
                            showmodal1:false
                        })
                    }}
                >
                    <p>欢迎学习antd</p>
                </Modal>
                <Modal
                    title='react'
                    visible={this.state.showmodal2}
                    okText='好的'
                    cancelText='算了'
                    onCancel={()=>{
                        this.setState({
                            showmodal2:false
                        })
                    }}
                >
                    <p>欢迎学习antd</p>
                </Modal>
                <Modal
                    title='react'
                    style={{top:20}}
                    visible={this.state.showmodal3}
                    onCancel={()=>{
                        this.setState({
                            showmodal3:false
                        })
                    }}
                >
                    <p>欢迎学习antd</p>
                </Modal>
                <Modal
                    title='react'
                    wrapClassName='vertical-center-modal'
                    visible={this.state.showmodal4}
                    onCancel={()=>{
                        this.setState({
                            showmodal4:false
                        })
                    }}
                >
                    <p>欢迎学习antd</p>
                </Modal>
            </div>
        )

    }
}