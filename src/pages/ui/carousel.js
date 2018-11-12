import React from 'react'
import { Card, Carousel } from 'antd'
import './ui.less'

export default class Carousels extends React.Component {
    render(){
        return(
            <div>
                <Card title="文字背景轮播" className="card-wrap">
                    <Carousel
                        autoplay="true"
                        effect="fade"
                    >
                        <div><h3>ant montion banner - react</h3></div>
                        <div><h3>ant montion banner - vue</h3></div>
                        <div><h3>ant montion banner - angular</h3></div>
                    </Carousel>
                </Card>
                <Card title="图片轮播" className="card-wrap slider-wrap">
                    <Carousel
                        autoplay="true"
                        effect="fade"
                    >
                        <div>
                            <img src="/carousel-img/carousel-1.jpg" alt=""/>
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-2.jpg" alt="" />
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-3.jpg" alt="" />
                        </div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}