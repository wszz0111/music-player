import React from 'react'
import axios from 'axios'
import { Carousel } from 'antd';
import { Row, Col, Icon } from 'antd';
import { HashRouter as Router, Route, Link } from 'react-router-dom'

import { List, Avatar } from 'antd';
import { get_song_index, display } from '../store/action'

import { connect } from 'react-redux'

class Recent extends React.Component {

    constructor(p) {
        super(p)
    }
    componentDidMount() {
        this.props.dispatch(display())
        return true
    }
    
    render() {
        return (
            <div>
                <Row className='main_ss' style={{ position: 'fixed', left: 0, top: 0, right: 0, zIndex: 55 }}>
                    <Col span={4} className='white'><Icon type="left" onClick={this.goback.bind(this)} /></Col>
                    <Col span={16} className='white fs22'>最近播发的歌曲</Col>
                    <Col span={4}><Icon type="profile" style={{ fontSize: 22 }} className='white' /></Col>
                </Row>
                <Row className='play_all'>
                    <Col span={3}><Icon type="play-circle-o" style={{ fontSize: 22 }} /></Col>
                    <Col span={16}>播放全部</Col>
                    <Col span={2}><Icon type="profile" style={{ fontSize: 22 }} /></Col>
                    <Col span={3}>多选</Col>
                </Row>

                <List
                    itemLayout="horizontal"
                    dataSource={this.props.song_list}
                    renderItem={(item, index) => (
                        <List.Item className='eve_rec' onClick={this.play.bind(this, index)}>
                            <List.Item.Meta
                                avatar={<Avatar src={this.props.ip + item.img_src} />}
                                title={<span style={{ fontSize: 1.1 + 'rem' }}>{item.song_name}</span>}
                                description={item.singer} />
                            <Icon type="youtube" style={{ fontSize: 22, marginRight: 20 }} />
                            <Icon type="ellipsis" style={{ fontSize: 22, marginRight: 20 }} />
                        </List.Item>
                    )}
                />
            </div>
        )
    }
    play(index) {
        this.props.dispatch(get_song_index(index))
        this.props.history.push('/song_list')
    }
    goback() {
        this.props.history.goBack()
    }
}
function filter(data) {
    return {
        song_list: data.song_list,
        ip:data.ip
    }
}

export default connect(filter)(Recent)