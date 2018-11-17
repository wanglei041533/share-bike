import React from 'react'
import { Form, Input, Select, Button, Checkbox, Radio } from 'antd'

const FormItem = Form.create;
const Option = Select.Option;

class FilterForm extends React.Component{
    initFormList = ()=>{
        const { getFieldDecorator }  = this.props.from;
    }
    render(){
        return(
            <Form>

            </Form>
        )
    }
}

FilterForm = Form.create()(FilterForm)