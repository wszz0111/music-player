import React from 'react'
import axios from 'axios'
import { Tabs } from 'antd';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import Divider from 'antd/lib/divider';
import { connect } from 'react-redux'
import { List, Avatar } from 'antd';
import { get_song_index, display, save_ss_val,get_song_list } from '../store/action'

class Search extends React.Component {

    constructor(p) {
        super(p)
        this.state = {
            think_list: [],
            search_list: [],
            changge_val: false
        }
    }
    componentWillMount() {
        let obj = {}
        obj[this.props.ss_type] = this.props.ss_val
        axios.post(this.props.ip + "/think_word", obj).then((msg) => {
            this.setState({ search_list: msg.data })
        })
    }
    componentDidMount() {
        this.props.dispatch(display())
        return true
    }
    shouldComponentUpdate() {
        return true
    }
    componentWillUpdate() {
        let obj = {}
        obj[this.props.ss_type] = this.props.ss_val
        axios.post(this.props.ip + "/think_word", obj).then((msg) => {
            this.props.dispatch(get_song_list(msg.data))
            this.setState({ search_list: msg.data })
        })
    }
    render() {
        return (
            <div>
                <Row className='main_ss' style={{ position: 'fixed', left: 0, top: 0, right: 0, zIndex: 55, padding: .5 + 'rem', paddingBottom: 0 }}>
                    <Col span={4} style={{ lineHeight: 3.4 + 'rem' }}><Icon type="sound" style={{ fontSize: 25 }} className='white' /></Col>
                    <Col span={16}>
                        <input type='search' onKeyPress={this.sure.bind(this)} ref='sou2' className='ss_kuang' placeholder="搜索单曲/歌手/歌单/视频"
                            style={{ width: 240 }} onInput={this.think.bind(this)} defaultValue={this.props.ss_val} />
                    </Col>
                    <Col span={4} style={{ lineHeight: 3.4 + 'rem' }}><Icon type="appstore-o" style={{ fontSize: 25 }} className='white' /></Col>
                </Row>
                <ul className={this.state.changge_val ? 'dis think_word' : 'hid'}>
                    {
                        this.state.think_list.map((item) => {
                            return <li refs='think_word' onClick={this.choose.bind(this)}>{item.song_name}</li>
                        })
                    }
                </ul>
                <List style={{ marginTop: 4.5 + 'rem' }}
                    itemLayout="horizontal"
                    dataSource={this.state.search_list}
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
    think() {
        if (this.refs.sou2.value == '') {
            this.setState({ changge_val: false })
        }
        else {
            let obj = {};
            obj[this.props.ss_type] = this.refs.sou2.value
            axios.post(this.props.ip + "/think_word", obj).then((msg) => {
                this.setState({
                    think_list: msg.data,
                    changge_val: true
                })
            })
        }
    }
    sure(e) {
        if (e.which == '13') {
            this.props.dispatch(save_ss_val(this.refs.sou2.value))
            this.setState({ changge_val: false })
        }
    }
    choose(e) {
        this.props.dispatch(save_ss_val(e.target.innerHTML))
        this.setState({ changge_val: false })
    }
    play(index) {
        this.props.dispatch(get_song_index(index))
        this.props.history.push('/song_list')
    }
}
function filter(data) {
    return {
        ss_val: data.search_val,
        ss_type: data.search_type,
        ip:data.ip
    }
}
export default connect(filter)(Search)

