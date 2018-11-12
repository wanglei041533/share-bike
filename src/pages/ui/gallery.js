import React from 'react'
import { Card, Row, Col, Modal } from 'antd'
import './ui.less'

export default class Gallery extends React.Component {
    constructor(){
        super()
        this.state = {
            visible:false
        }
    }
    openGallery = (imgSrc)=>{
        console.log(imgSrc)
        this.setState({
            currentImg: '/gallery/'+imgSrc,
            visible:true
        })
    }

    render(){
        const imgs = [
            ['1.png','2.png','3.png','4.png','5.png'],
            ['6.png','7.png','8.png','9.png','10.png'],
            ['11.png','12.png','13.png','14.png','15.png'],
            ['16.png','17.png','18.png','19.png','20.png'],
            ['21.png','22.png','23.png','24.png','25.png']
        ];
        const imgList = imgs.map((list)=>list.map((item)=>
            <Card
                cover={<img src={'/gallery/'+item}/>}
                key={item}
                style={{marginBottom:10}}
                onClick={()=>this.openGallery(item)}
            >
                <Card.Meta
                    title="react admin"
                    description="i love react"
                />
            </Card>
        ))
        return(
            <div className="card-wrap">
                <Row gutter={10}>
                    <Col md={5}>
                        {imgList[0]}
                    </Col>
                    <Col md={5}>
                        {imgList[1]}
                    </Col>
                    <Col md={5}>
                        {imgList[2]}
                    </Col>
                    <Col md={5}>
                        {imgList[3]}
                    </Col>
                    <Col md={4}>
                        {imgList[4]}
                    </Col>
                </Row>
                <Modal
                    width={300}
                    height={300}
                    title="图片画廊"
                    visible={this.state.visible}
                    onCancel={()=>{
                        this.setState({
                            visible:false
                        })
                    }}
                    footer={null}
                >
                    <img style={{width:'100%'}} src={this.state.currentImg} alt=""/>
                </Modal>
            </div>
        )
    }
}