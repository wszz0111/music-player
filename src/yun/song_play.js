import React from 'react'
import axios from 'axios'
import { Carousel } from 'antd';
import { Row, Col, Icon } from 'antd';
import { hidden, now_form, circle, rendom } from '../store/action'
import { connect } from 'react-redux'

import { Slider } from 'antd'
import { clearTimeout, setInterval } from 'timers';


class Song_list extends React.Component {

    componentWillMount() {
        this.props.dispatch(hidden())
        //如果是登录的用户，将此首歌曲id与用户最近播放的所有歌曲匹配，如不重复，加入数据
        let data = this.gets('users', []);
        let suc = true
        if (data.length != 0) {
            axios.post(this.props.ip + "/check_repeat", {
                _id: data[0]._id,
                song_list: this.props.song_list[this.props.index]._id
            })
        }
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
    constructor(p) {
        super(p)
        this.state = {
            playStatus: true,
            currentTime: 0, //当前歌曲播放的时间
            allTime: 0,//总时间
            jd: 0,
            song_list: this.props.song_list,
            index: this.props.index
        }
    }
    componentDidMount() {
        let audio = this.refs.mus
        let t = setInterval(() => {
            this.setState({
                currentTime: audio.currentTime, allTime: audio.duration,
                jd: this.state.currentTime / this.state.allTime * 100
            }, () => {
                if (~~this.state.currentTime >= ~~this.state.allTime) {
                    this.next();
                }
            });
        }, 300);
    }
    componentWillUnmount = () => {
        clearInterval(this.state.t);
    }
    render() {
        return (
            <div className='asing' >
                <Row className='gd_title1'>
                    <Col span={4} className='white'><Icon type="left" onClick={this.goback.bind(this)} style={{ fontSize: 30, lineHeight: 2.4 + 'rem' }} /></Col>
                    <Col span={16} className='white' style={{ lineHeight: 1.4 + 'rem' }}>
                        <div className='fs22'>{this.state.song_list[this.state.index].song_name}</div>
                        <div style={{ fontSize: 1 + 'rem' }}>{this.state.song_list[this.state.index].singer}</div>
                    </Col>
                    <Col span={4}><Icon type="share-alt" style={{ fontSize: 30, lineHeight: 2.4 + 'rem' }} className='white' /></Col>
                </Row>

                <div className='cs_part'>
                    <img className={this.state.playStatus ? 'cd' : 'cd stop'} src={this.props.ip + this.state.song_list[this.state.index].img_src} />
                    <audio id='audio' ref='mus' src={this.props.ip + this.state.song_list[this.state.index].song_src}
                        autoPlay="autoPlay"> </audio>
                </div>

                <Row style={{ width: 15 + 'rem' }} className='dz'>
                    <Col span={6}><Icon type="heart-o" /></Col>
                    <Col span={6}><Icon type="download" /></Col>
                    <Col span={6}><Icon type="message" /></Col>
                    <Col span={6}><Icon type="ellipsis" /></Col>
                </Row>

                <div style={{ textAlign: 'center' }}>
                    <Row>
                        <Col span={4} className="current">{this.timeConvert(this.state.currentTime)}</Col>
                        <Col span={16}></Col>
                        <Col span={4} className="total">{this.timeConvert(this.state.allTime)}</Col>
                    </Row>
                    <Row>
                        <Col span={24} className="jd"><Slider defaultValue={0}
                            value={this.state.allTime ? this.state.currentTime / this.state.allTime * 100 : this.state.currentTime / 239 * 100}
                            onChange={this.changgejd.bind(this)} style={{ width: 20 + "rem" }} /></Col>
                    </Row>
                </div>

                <Row className='controls'>
                    <img src={this.props.song_state == 'circle' ? this.props.ip + '/images/单曲循环.png' : this.props.ip + '/images/随机播放.png'}
                        onClick={this.changge_state.bind(this)} />
                    <div><i className="iconfont icon-shangyishou" onClick={this.last.bind(this)}></i></div>
                    <div><i className={this.state.playStatus ? 'iconfont icon-zanting' : 'iconfont icon-bofang'} style={{ fontSize: 65 + 'px' }} onClick={this.stop.bind(this)}></i></div>
                    <div><i className="iconfont icon-xiayishou" onClick={this.next.bind(this)}></i></div>
                    <img src={this.props.ip + '/images/控制.png'} />
                </Row>
            </div>
        )
    }
    //改变状态
    changge_state() {
        if (this.props.song_state == 'circle') {
            this.props.dispatch(rendom())
        }
        else {
            this.props.dispatch(circle())
        }
    }
    //换算时间
    timeConvert(timestamp) {
        var minutes = Math.floor(timestamp / 60);
        var seconds = Math.floor(timestamp - (minutes * 60));
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        timestamp = minutes + ':' + seconds;
        return timestamp;
    }
    //返回
    goback() {
        this.props.history.goBack()
    }
    //上一首
    last() {
        if (this.props.song_state == 'rendom') {
            let num = parseInt(Math.random() * this.props.song_list.length)
            this.setState({ index: num, playStatus: true })
        }
        else {
            let i = this.state.index;
            if (i <= 0)
                this.setState({ index: this.props.song_list.length - 1, playStatus: true })
            else
                this.setState({ index: i - 1, playStatus: true })
        }
        let data = this.gets('users', []);
        let suc = true
        if (data.length != 0) {
            axios.post(this.props.ip + "/check_repeat", {
                _id: data[0]._id,
                song_list: this.props.song_list[this.state.index]._id
            })
        }
    }
    //下一首
    next() {
        if (this.props.song_state == 'rendom') {
            let num = parseInt(Math.random() * this.props.song_list.length)
            this.setState({ index: num, playStatus: true })
        } else {
            let i = this.state.index;
            if (i >= this.props.song_list.length - 1)
                this.setState({ index: 0, playStatus: true })
            else
                this.setState({ index: i + 1, playStatus: true })
        }
        let data = this.gets('users', []);
        let suc = true
        if (data.length != 0) {
            axios.post(this.props.ip + "/check_repeat", {
                _id: data[0]._id,
                song_list: this.props.song_list[this.state.index]._id
            })
        }
    }
    //暂停播放
    stop() {
        this.setState({ playStatus: !this.state.playStatus }, () => {
            let audio = document.getElementById('audio');
            if (this.state.playStatus) {
                audio.play();
            } else {
                audio.pause();
            }
        })
    }
    //改变进度条
    changgejd(value) {
        audio.currentTime = value / 100 * this.state.allTime
    }
}
function filter(data) {
    return {
        index: data.song_index,
        song_list: data.song_list,
        ip: data.ip,
        song_state: data.song_state
    }
}

export default connect(filter)(Song_list)