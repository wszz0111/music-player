import React from 'react'
import axios from 'axios'
import { Carousel } from 'antd';
import { Row, Col, Icon } from 'antd';
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { get_song_list, display } from '../store/action'

class Mymusic extends React.Component {

    componentDidMount() {
        this.props.dispatch(display())
        return true
    }
    render() {
        return (
            <div>
                <Row className='main_ss' style={{ position: 'fixed', left: 0, top: 0, right: 0, zIndex: 55 }}>
                    <Col span={4} className='white'>更多</Col>
                    <Col span={16} className='white fs22'>我的音乐</Col>
                    <Col span={4}><Icon type="bar-chart" style={{ fontSize: 22 }} className='white' /></Col>
                </Row>
                <Row className='choose' style={{ marginTop: 3 + 'rem' }}>
                    <Col span={6}><Icon type="download" style={{ fontSize: 22 }} /></Col>
                    <Col span={16}>本地音乐</Col>
                    <Col span={2}><Icon type="right" style={{ fontSize: 22 }} /></Col>
                </Row>
                <Row className='choose'><Col span={6}><Icon type="clock-circle-o" style={{ fontSize: 22 }} /></Col>
                    <Col span={16} onClick={this.recent.bind(this)}>最近播放</Col>
                    <Col span={2}><Icon type="right" style={{ fontSize: 22 }} /></Col>
                </Row>
                <Row className='choose'><Col span={6}><Icon type="rocket" style={{ fontSize: 22 }} /></Col>
                    <Col span={16}>我的电台</Col>
                    <Col span={2}><Icon type="right" style={{ fontSize: 22 }} /></Col>
                </Row>
                <Row className='choose'><Col span={6}><Icon type="star-o" style={{ fontSize: 22 }} /></Col>
                    <Col span={16}>我的收藏</Col>
                    <Col span={2}><Icon type="right" style={{ fontSize: 22 }} /></Col>
                </Row>

            </div >
        )
    }
    recent() {
        let data = this.gets('users', []);
        if (data.length != 0) {
            axios.post(this.props.ip + "/get_recent", { _id: data[0]._id }).then((msg) => {
                this.props.dispatch(get_song_list(msg.data.song_list))
                this.props.history.push('/recent')
            })
        }
        else
            this.props.history.push('/login')
    }
    gets(key, type) {
        let data = sessionStorage[key]
        if (data) {
            return JSON.parse(data);
        }
        else {
            return type || "";
        }
    }
}
function filter(data){
    return{
        ip:data.ip
    }
}

export default connect(filter)(Mymusic)