import React from 'react'
import { Card, Button, notification } from 'antd'
import './ui.less'

export default class Notice extends React.Component{
    constructor(props){
        super(props);
        this.openNotification = this.openNotification.bind(this)
    }

    openNotification(type,direction){
        if(direction){
            notification.config({
                placement:direction
            })
        }
        notification[type]({
            message:'发工资了',
            description:'上个月考勤22天，迟到12天，实发工资666，请查收'
        })
    }

    render(){
        return(
            <div>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.openNotification('success')}>success</Button>
                    <Button type="primary" onClick={()=>this.openNotification('info')}>info</Button>
                    <Button type="primary" onClick={()=>this.openNotification('warning')}>warning</Button>
                    <Button type="primary" onClick={()=>this.openNotification('error')}>error</Button>
                </Card>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.openNotification('success','topLeft')}>success</Button>
                    <Button type="primary" onClick={()=>this.openNotification('info','topRight')}>info</Button>
                    <Button type="primary" onClick={()=>this.openNotification('warning','bottomLeft')}>warning</Button>
                    <Button type="primary" onClick={()=>this.openNotification('error','bottomRight')}>error</Button>
                </Card>
            </div>
        )
    }
}