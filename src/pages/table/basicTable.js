import React from 'react'
import { Card, Table, Modal,Button, message } from 'antd'
import Utils from '../../utils/utils'
import axios from '../../axios/index'

export default class BasicTable extends React.Component{
    state = {
        dataSource2:[]
    }

    params = {
        page:1
    }

    componentWillMount(){
        const data = [
            {
                id:'0',
                userName:'jack',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2000-01-01',
                address:'北京市朝阳区',
                time:'09:00',
                key:'1'
            },
            {
                id: '1',
                userName: 'lili',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市朝阳区',
                time: '09:00',
                key:'2'
            },
            {
                id: '2',
                userName: 'tony',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '北京市朝阳区',
                time: '09:00',
                key:'3'
            }
        ]
        data.map((item,index)=>item.key = index);
        this.setState({
            dataSource:data
        })
        this.request()
    }

    request = ()=>{
        console.log(this.params.page)
        let _this = this;
        axios.ajax({
            url:'/table/list',
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then((res)=>{
            if(res.code === 0){
                res.result.list.map((item,index)=>item.key=index);
                res.result.page = this.params.page;
                this.setState({
                    dataSource2:res.result.list,
                    selectedRowKeys:[],
                    selectedRows:null,
                    pagination: Utils.pagination(res,(current)=>{
                        this.params.page = current; 
                        this.request();
                    })
                })
            }
        })
    }

    onRowClick = (record,index)=>{
        let selectKey = [index];
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:record
        });
        Modal.info({
            title:'信息',
            content: `用户名是${record.userName},爱好是${record.interest}`
        })
    }

    // 多选执行删除动作
    handleDelete = ()=>{
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map((item)=>{
            ids.push(item.id)
        })
        Modal.confirm({
            title:'删除提示',
            content:`您确认要删除这些数据吗${ids.join(',')}`,
            onOk:()=>{
                message.success('删除成功')
            }
        })
    }

    render(){
        const columns = [
            {
                title:'id',
                dataIndex:'id',
            },
            {
                title:'用户名',
                dataIndex:'userName'
            },
            {
                title:'性别',
                dataIndex:'sex',
                render(sex){
                    return sex === 1?'男':'女'
                }
            },
            {
                title:'状态',
                dataIndex:'state',
                render(state){
                    let config = {
                        '1':'咸鱼一条',
                        '2':'前端高手',
                        '3':'前端大牛',
                        '4':'前端专家',
                        '5':'神一样的存在',
                    }
                    return config[state];
                }
            },
            {
                title:'爱好',
                dataIndex:'interest',
                render(interest) {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '骑行',
                        '6': '爬山',
                        '7': '桌球',
                        '8': '看电影',
                    }
                    return config[interest];
                }
            },
            {
                title:'生日',
                dataIndex:'birthday'
            },
            {
                title:'地址',
                dataIndex:'address'
            },
            {
                title:'早起时间',
                dataIndex:'time'
            }
        ]
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type:'radio',
            selectedRowKeys
        }
        const rowCheckSelection = {
            type:'checkbox',
            selectedRowKeys:this.state.selectedRowCheckKeys,
            onChange: (selectedRowCheckKeys,selectedRows)=>{
                this.setState({
                    selectedRowCheckKeys,
                    selectedRows
                })
            }
        }
        return(
            <div>
                <Card title="基础表格">
                    <Table
                        bordered 
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
                <Card title="动态数据渲染表格-mock" style={{margin:'10px 0'}}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="mock-单选" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record,index)=>{
                            return {
                                onClick:() => {
                                    this.onRowClick(record,index);
                                }, //点击行
                            }
                        }}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="mock-复选框" style={{ margin: '10px 0' }}>
                    <Button onClick={this.handleDelete}>删除</Button>
                    <Table
                        bordered
                        rowSelection={rowCheckSelection}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="mock-分页" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        )
    }
}