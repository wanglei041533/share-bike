import React from 'react'
import { Card, Table, Modal, Button, message, Badge } from 'antd'
import Utils from '../../utils/utils'
import axios from '../../axios/index'

export default class HighTable extends React.Component{
    state = {

    }

    params = {
        page:1
    }

    componentDidMount(){
        this.request();
    }

    request = () => {
        let _this = this;
        axios.ajax({
            url: '/table/high/list',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                // res.result.list.map((item, index) => item.key = index);
                res.result.page = this.params.page;
                this.setState({
                    dataSource: res.result.list,
                })
            }
        })
    }

    handleChange = (pagination, filters, sorter)=>{
        this.setState({
            sortOrder:sorter.order
        })
    }

    // 删除操作
    handleDelete = (item) => {
        let id = item.id;
        Modal.confirm({
            title:'确认',
            content:'您确认删除这条数据吗',
            onOk:()=>{
                message.success('删除成功');
                this.request();
            }
        })
    }

    render(){
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                width:80
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                width: 80
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 80,
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                width: 80,
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '前端高手',
                        '3': '前端大牛',
                        '4': '前端专家',
                        '5': '神一样的存在',
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                width: 80,
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
                title: '生日',
                dataIndex: 'birthday',
                width: 80
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 120
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                width: 80
            }
        ];
        const columns2 = [
            {
                title: 'id',
                dataIndex: 'id',
                fixed:'left',
                width: 80
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                fixed: 'left',
                width: 80
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 80,
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                width: 80,
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '前端高手',
                        '3': '前端大牛',
                        '4': '前端专家',
                        '5': '神一样的存在',
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                width: 80,
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
                title: '生日',
                dataIndex: 'birthday',
                width: 80
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 80
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 80
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 80
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 80
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 80
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 120
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                fixed: 'right',
                width: 80
            }
        ]
        const columns3 = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                width: 80
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 80,
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: 80,
                sorter:(a,b)=>{
                    return a.age - b.age;
                },
                sortOrder:this.state.sortOrder
            },
            {
                title: '状态',
                dataIndex: 'state',
                width: 80,
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '前端高手',
                        '3': '前端大牛',
                        '4': '前端专家',
                        '5': '神一样的存在',
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                width: 80,
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
                title: '生日',
                dataIndex: 'birthday',
                width: 80
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 120
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                width: 80
            }
        ];
        const columns4 = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                width: 80
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 80,
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: 80,
                sorter: (a, b) => {
                    return a.age - b.age;
                },
                sortOrder: this.state.sortOrder
            },
            {
                title: '状态',
                dataIndex: 'state',
                width: 80,
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '前端高手',
                        '3': '前端大牛',
                        '4': '前端专家',
                        '5': '神一样的存在',
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                width: 80,
                render(interest) {
                    let config = {
                        '1': <Badge status="success" text="成功"/>,
                        '2': <Badge status="error" text="报错" />,
                        '3': <Badge status="default" text="正常" />,
                        '4': <Badge status="processing" text="进行中" />,
                        '5': <Badge status="warning" text="警告" />
                    }
                    return config[interest];
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 80
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 120
            },
            {
                title: '操作',
                render:(text,item)=>{
                    return <Button size="small" onClick={(item) => this.handleDelete(item)}>删除</Button>
                }
            }
        ];
        return (
            <div>
                <Card title="头部固定">
                    <Table
                        bordered
                        scroll={{y:240}}
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
                <Card title="左侧固定" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns2}
                        scroll={{x:1080}}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
                <Card title="表格排序" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns3}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        onChange={this.handleChange}
                    />
                </Card>
                <Card title="操作按钮" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns4}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}