import React from 'react'
import axios from 'axios'
import { Carousel } from 'antd';
import { Row, Col, Icon } from 'antd';

import { save_songform } from '../store/action'
import {now_form} from '../store/action'
import { connect } from 'react-redux'

class Music extends React.Component {

    constructor(p) {
        super(p)
        this.state = {
            bg_list: []
        }
    }
    componentWillMount() {
        //请求轮播图
        axios.post(this.props.ip + "/get_img", {}).then((msg) => {
            this.setState({ bg_list: msg.data })
        })
        //请求歌单信息
        axios.post(this.props.ip + "/get_song_form", {}).then((msg) => {
            this.props.dispatch(save_songform(msg.data))
        })
    }

    render() {
        return (
            <div className='play'>
                <Carousel autoplay>
                    {
                        this.state.bg_list.map((item) => {
                            return <div><h3><img src={this.props.ip + item.img} /></h3></div>
                        })
                    }
                </Carousel>
                <Row className='circle'>
                    <Col span={6} className='menu2'><Icon type="youtube" style={{ fontSize: 22 }} className='yuan' /><span>私人FM</span></Col>
                    <Col span={6} className='menu2'><Icon type="schedule" style={{ fontSize: 22 }} className='yuan' /><span>每日推荐</span></Col>
                    <Col span={6} className='menu2'><Icon type="star-o" style={{ fontSize: 22 }} className='yuan' /><span>歌单</span></Col>
                    <Col span={6} className='menu2'><Icon type="line-chart" style={{ fontSize: 22 }} className='yuan' /><span>排行榜</span></Col>
                </Row>
                <Row><Col span={24} className='title'> 推荐歌单</Col></Row>

                <div style={{ display: 'flex', flexFlow: 'wrap', justifyContent: 'space-around' }}>
                    {
                        this.props.sf.map((item) => {
                            return <div className='gd' onClick={this.enter.bind(this, item)}><img src={this.props.ip + item.form_img} />
                            <div style={{ fontSize: 1.2 + 'rem',width: 7 + 'rem',overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis'}}>{item.form_name}</div>
                            <div className='msg'>{item.info}</div></div>
                        })
                    }
                </div>

                <Row><Col span={24} className='title'> 最新音乐</Col></Row>

                <div style={{ display: 'flex', flexFlow: 'wrap', justifyContent: 'space-around' }}>
                    {
                        this.props.sf.map((item) => {
                            return <div className='gd' onClick={this.enter.bind(this, item)}><img src={this.props.ip + item.form_img} />
                            <div style={{ fontSize: 1.2 + 'rem',width: 7 + 'rem',overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis'}}>{item.form_name}</div>
                            <div className='msg'>{item.info}</div></div>
                        })
                    }
                </div>

            </div>
        )
    }
    enter(item) {
        this.props.dispatch(now_form(item._id))
        this.props.history.push('/song_form')
    }
}
function filter(data) {
    return {
        sf: data.song_form,
        ip:data.ip
    }
}

export default connect(filter)(Music)