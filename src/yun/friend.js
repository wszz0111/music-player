import React from 'react'
import axios from 'axios'
import { Carousel } from 'antd';
import { Row, Col, Icon, } from 'antd';

class Friend extends React.Component {

    render() {
        return (
            <div>
                <Row className='main_ss' style={{position:'fixed',left: 0,top: 0,right: 0,zIndex: 55}}>
                    <Col span={4} className='white'>更多</Col>
                    <Col span={16} className='white fs22'>朋友</Col>
                    <Col span={4}><Icon type="bar-chart" style={{ fontSize: 22 }} className='white' /></Col>
                </Row>
            </div>
        )
    }
}

export default Friend