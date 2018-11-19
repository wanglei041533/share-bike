import React from 'react'
import { Form, Input, Select, Button, Checkbox, Radio, DatePicker } from 'antd'
import utils from '../../utils/utils';

const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends React.Component{
    handleFilterSubmit = ()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }

    reset = ()=>{
        this.props.form.resetFields();
    }

    initFormList = ()=>{
        const { getFieldDecorator }  = this.props.form;
        const formList = this.props.formList;
        const formItemList = [];
        if(formList && formList.length>0){
            formList.forEach((item,i)=>{
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let placeHolder = item.placeholder;
                let width = item.width;
                if (item.type == '城市') {
                    const city = <FormItem label="城市" key={field}>
                        {
                            getFieldDecorator('city',{
                                initialValue:'0'
                            })(
                                <Select
                                    style={{width:80}} 
                                    placeholder={placeHolder}
                                >
                                    {utils.getOptionList([{ id: '0', name: '北京' }, { id: '1', name: '上海' }, { id: '2', name: '天津' }, { id: '4', name: '杭州' }])}
                                </Select>
                            )
                        }
                    </FormItem>;
                    formItemList.push(city);
                }else if(item.type == '时间查询'){
                    const begin_time = <FormItem label="订单时间">
                        {
                            getFieldDecorator('begin_time')(
                                <DatePicker showTime={true} placeholder={placeHolder} format="YYYY-MM-DD HH:mm:ss"/>
                            )
                        }
                    </FormItem>;
                    formItemList.push(begin_time);
                    const end_time = <FormItem label="~" colon={false}>
                        {
                            getFieldDecorator('end_time')(
                                <DatePicker showTime={true} placeholder={placeHolder} format="YYYY-MM-DD HH:mm:ss" />
                            )
                        }
                    </FormItem>;
                    formItemList.push(end_time);
                }else if(item.type == 'SELECT'){
                    const SELECT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field,{
                                initialValue: initialValue
                            })(
                                <Select
                                    style={{width:width}}
                                    placeholder={placeHolder}
                                >
                                {utils.getOptionList(item.list)}
                                </Select>
                            )
                        }
                    </FormItem>;
                    formItemList.push(SELECT);
                } else if (item.type == 'INPUT'){
                    const INPUT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field, {
                                initialValue: initialValue
                            })(
                                <Input style={{width:width}} type="text" placeholder={placeHolder}/>
                            )
                        }
                    </FormItem>;
                    formItemList.push(INPUT);
                } else if (item.type == 'CHECKBOX') {
                    const CHECKBOX = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field, {
                                valuePropName:'checked',
                                initialValue: initialValue //true |false
                            })(
                                <Checkbox>
                                    {label}
                                </Checkbox>
                            )
                        }
                    </FormItem>;
                    formItemList.push(CHECKBOX);
                } else if (item.type == 'DATE') {
                    const DATE = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field)(
                                <DatePicker style={{width:width}} showTime={true} placeholder={placeHolder} format="YYYY-MM-DD HH:mm:ss" />
                            )
                        }
                    </FormItem>;
                    formItemList.push(DATE);
                }
            })
        };
        return formItemList;
    }
    render(){
        return(
            <Form layout="inline">
                {this.initFormList()}
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(FilterForm)