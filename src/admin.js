import React from 'react'
import { Row, Col } from 'antd'
import Header from './components/Header'
import Footer from './components/Footer'
import NavLeft from './components/NavLeft'
import './style/common.less'

export default class Admin extends React.Component{
    render(){
        return (
            <Row>
                <Col span="4">
                    <NavLeft />
                </Col>
                <Col span="20">
                    <Header />
                    <Row>this is content</Row>
                    <Footer />
                </Col>
            </Row>
        )
    }
}