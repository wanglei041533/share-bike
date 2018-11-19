import React from 'react'
import { Card, Button, Modal, Form, Radio, DatePicker, Input, Select } from 'antd'
import axios from '../../axios/index'
import Utils from '../../utils/utils'
import ETable from '../../components/ETable/index'
import BaseForm from '../../components/baseForm/index'
import moment from 'moment'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;

export default class User extends React.Component{
    state={
        isvisible:false
    }
    params = {
        page:1
    }
    formList = [
        {
            type:'INPUT',
            label:'用户名',
            field:'user_name',
            placeholder:'请输入用户名',
            width:130
        },
        {
            type: 'INPUT',
            label: '手机号',
            field: 'user_mobile',
            placeholder: '请输入手机号',
            width: 140
        },
        {
            type: 'DATE',
            label: '请选择入职日期',
            field: 'user_date',
            placeholder: '请输入日期',
            width: 120
        }
    ];

    handleFilter = (params)=>{
        this.params = params;
        this.requestList();
    }

    componentDidMount(){
        this.requestList();
    }

    requestList = ()=>{
        axios.requestList(this,'/table/list1',this.params,true)
    }

    handleOperate = (type)=>{
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '提示',
                content: '请选择一个用户'
            })
            return
        }
        if(type == 'create'){
            this.setState({
                type,
                isvisible:true,
                title:'创建员工'
            })
        }else if(type == 'edit'){
            this.setState({
                type,
                isvisible:true,
                title:'编辑员工',
                userInfo:item
            })
        }else if(type == 'detail'){
            this.setState({
                type,
                isvisible: true,
                title: '员工详情',
                userInfo: item
            })
        }else {
            let _this = this;
            Modal.confirm({
                title:'确认删除',
                content:'是否要删除当前选中的员工',
                onOk(){
                    axios.ajax({
                        url:'/user/delete',
                        data:{
                            params:{
                                id:item.id
                            }
                        }
                    }).then((res)=>{
                        if(res.code == 0){
                            _this.setState({
                                isvisible:false
                            })
                            _this.requestList()
                        }
                    })
                }
            })
        }
    }

    // 创建员工提交
    handleSubmit = ()=>{
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        axios.ajax({
            url:'/user/add',
            data:{
                params:data
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    isvisible: false
                })
                this.requestList()
            }
        })
    }

    render(){
        const columns =[
            {
                title:'id',
                dataIndex:'id'
            },
            {
                title: '用户名',
                dataIndex: 'username'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex){
                    return sex==1?'男':'女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state){
                    return {
                        '1':'咸鱼一条',
                        '2':'前端高手',
                        '3':'前端专家',
                        '4':'神',
                        '5':'不知道'
                    }[state]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(interest){
                    return {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '骑行',
                        '6': '爬山',
                        '7': '桌球',
                        '8': '看电影'
                    }[interest]
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '联系地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            },
        ]
        let footer = {};
        if(this.state.type == 'detail'){
            footer = {
                footer:null
            }
        }
        return(
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{ marginTop: 10 }} className='operate-wrap'>
                    <Button type="primary" icon='plus' onClick={()=>this.handleOperate('create')}>创建员工</Button>
                    <Button type="primary" icon='edit' onClick={() => this.handleOperate('edit')}>编辑员工</Button>
                    <Button type="primary" onClick={() => this.handleOperate('detail')}>员工详情</Button>
                    <Button type="primary" icon='delete' onClick={() => this.handleOperate('delete')}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isvisible}
                    onOk={this.handleSubmit}
                    onCancel={()=>{
                        this.userForm.props.form.resetFields()
                        this.setState({
                            isvisible:false
                        })
                    }}
                    width={600}
                    {...footer}
                >
                    <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(inst)=>this.userForm=inst}/>
                </Modal>
            </div>
        )
    }
}

class UserForm extends React.Component{
    getState = (state)=>{
        return {
            '1': '咸鱼一条',
            '2': '前端高手',
            '3': '前端专家',
            '4': '神',
            '5': '不知道'
        }[state]
    }
    render(){
        const type = this.props.type;
        let userInfo = this.props.userInfo || {};
        const { getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }
        return(
            <Form layout='horizontal'>
                <FormItem label='用户名' {...formItemLayout}>
                    {
                        type == 'detail'?userInfo.username:
                        getFieldDecorator('user_name',{
                            initialValue:userInfo.username
                        })(
                            <Input type='text' placeholder='请输入用户名'/>
                        )
                    }
                </FormItem>
                <FormItem label='性别' {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.sex==1?'男':'女' :
                        getFieldDecorator('sex',{
                            initialValue: userInfo.sex
                        })(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label='状态' {...formItemLayout}>
                    {
                        type == 'detail' ? this.getState(userInfo.state) :
                        getFieldDecorator('state',{
                            initialValue: userInfo.state
                        })(
                            <Select>
                                <Option value={1}>咸鱼一条</Option>
                                <Option value={2}>前端高手</Option>
                                <Option value={3}>前端专家</Option>
                                <Option value={4}>神</Option>
                                <Option value={5}>不知道</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label='状生日态' {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.birthday :
                        getFieldDecorator('birthday',{
                            initialValue: moment(userInfo.birthday)
                        })(
                            <DatePicker />
                        )
                    }
                </FormItem>
                <FormItem label='联系地址' {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.address :
                        getFieldDecorator('address',{
                            initialValue: userInfo.address
                        })(
                            <TextArea  rows={3} placeholder='请输入联系地址'/>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
UserForm = Form.create({})(UserForm);