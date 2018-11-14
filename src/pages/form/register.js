import React from 'react'
import { Card, Form, Input, Checkbox, Radio, Select, Switch, DatePicker, TimePicker, Upload, Icon, InputNumber, Button, message } from 'antd'
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;

class FormRegister extends React.Component{
	state = {
		loading: false,
	}

	handleSubmit = ()=>{
		let userInfo = this.props.form.getFieldsValue();
		message.success(`${userInfo.username} 恭喜你，您通过本次表单组件学习，当前密码为：${userInfo.password}`)
	}

	getBase64 = (img, callback) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	}

	beforeUpload = (file) => {
		const isJPG = file.type === 'image/jpeg';
		if (!isJPG) {
			message.error('You can only upload JPG file!');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!');
		}
		return isJPG && isLt2M;
	}

	handleChange = (info) => {
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			this.getBase64(info.file.originFileObj, imageUrl => this.setState({
				userImg:imageUrl,
				loading: false,
			}));
		}
	}

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
		};
		const offsetLayout = {
			wrapperCol:{
				xs:24,
				sm:{
					span:12,
					offset:4
				}
			}
		}
		
		const uploadButton = (
			<div>
				<Icon type={this.state.loading ? 'loading' : 'plus'} />
				<div className="ant-upload-text">Upload</div>
			</div>
		);

        return(
            <div>
                <Card title="注册表单">
                    <Form layout="horizontal">
                        <FormItem label="用户名" {...formItemLayout}>
                            {
                                getFieldDecorator('username',{
                                    rules:[
                                        {
                                            required:true,
                                            message:'用户名不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入用户名"/>
                                )
                            }
                        </FormItem>
                        <FormItem label="密码" {...formItemLayout}>
                            {
                                getFieldDecorator('password',{

                                })(
                                    <Input type="password" placeholder="请输入密码"/>
                                )
                            }
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator('sex', {
                                    initialValue: ''
                                })(
                                    <RadioGroup>
										<Radio value="1">男</Radio>
										<Radio value="2">女</Radio>
									</RadioGroup>
                                )
                            }
                        </FormItem>
						<FormItem label="年龄" {...formItemLayout}>
							{
								getFieldDecorator('age', {
									initialValue: '18'
								})(
									<InputNumber />
								)
							}
						</FormItem>
						<FormItem label="当前状态" {...formItemLayout}>
							{
								getFieldDecorator('state', {
									initialValue: '3'
								})(
									<Select>
										<Option value="1">咸鱼一条</Option>
										<Option value="2">react高手</Option>
										<Option value="3">前端大牛</Option>
										<Option value="4">web精英</Option>
									</Select>
								)
							}
						</FormItem>
						<FormItem label="爱好" {...formItemLayout}>
							{
								getFieldDecorator('state', {
									initialValue:['1','5']
								})(
									<Select mode="multiple">
										<Option value="1">唱歌</Option>
										<Option value="2">跳舞</Option>
										<Option value="3">游泳</Option>
										<Option value="4">旅行</Option>
										<Option value="5">爬山</Option>
										<Option value="6">看电影</Option>
										<Option value="7">交友</Option>
										<Option value="8">敲代码</Option>
									</Select>
								)
							}
						</FormItem>
						<FormItem label="是否已婚" {...formItemLayout}>
							{
								getFieldDecorator('isMarried', {
									valuePropName:'checked',
									initialValue: true
								})(
									<Switch />
								)
							}
						</FormItem>
						<FormItem label="生日" {...formItemLayout}>
							{
								getFieldDecorator('birthday', {
									initialValue: moment('2018-08-30 16:15:59')
								})(
									<DatePicker 
										showTime
										format="YYYY-MM-DD HH:mm:ss"
									/>
								)
							}
						</FormItem>
						<FormItem label="联系地址" {...formItemLayout}>
							{
								getFieldDecorator('address',{
									initialValue:'北京市朝阳区'
								})(
									<TextArea 
										autosize={
											{
												minRows:4,
												maxRows:6
											}
										}
									/>
								)
							}
						</FormItem>
						<FormItem label="早起事件" {...formItemLayout}>
							{
								getFieldDecorator('time')(
									<TimePicker />
								)
							}
						</FormItem>
						<FormItem label="头像" {...formItemLayout}>
							{
								getFieldDecorator('userImg')(
									<Upload
										listType="picture-card"
										showUploadList={false}
										action="//jsonplaceholder.typicode.com/posts/"
										onChange={this.handleChange}
										beforeUpload={this.beforeUpload}
									>
										{this.state.userImg ? <img src={this.state.userImg} alt="" /> : uploadButton}
									</Upload>
								)
							}
						</FormItem>
						<FormItem {...offsetLayout}>
							{
								getFieldDecorator('userImg')(
									<Checkbox>
										我已经阅读过<a href="www.baidu.com">协议</a>
									</Checkbox>
								)
							}
						</FormItem>
						<FormItem {...offsetLayout}>
							{
								getFieldDecorator('userRegister')(
									<Button type="primary" onClick={this.handleSubmit}>注册</Button>
								)
							}
						</FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(FormRegister)