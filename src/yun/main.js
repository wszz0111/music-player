import React from 'react'
import axios from 'axios'
import { Row, Col, Input, Icon, Tabs } from 'antd';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
const Search = Input.Search;

import Music from './music'
import Radio from './radio'
import Fm from './fm'

import { save_ss_val, get_song_list } from '../store/action'
import { connect } from 'react-redux'

const TabPane = Tabs.TabPane;
// let ip = 'http://172.20.10.6:3000'

class Yun extends React.Component {

    constructor(p) {
        super(p)
        this.state = {
            think_list: [],
            changge_val: false
        }
    }

    render() {
        return (
            <Router>
                <div>
                    <Row className='main_ss' style={{ position: 'fixed', left: 0, top: 0, right: 0, zIndex: 55, padding: .5 + 'rem', paddingBottom: 0 }}>
                        <Col span={4} style={{ lineHeight: 3.4 + 'rem' }}><Icon type="sound" style={{ fontSize: 25 }} className='white' /></Col>
                        <Col span={16}>
                            <input type='search' onKeyPress={this.sure.bind(this)} ref='sou' className='ss_kuang' placeholder="搜索单曲/歌手/歌单/视频"
                                style={{ width: 240 }} onInput={this.think.bind(this)} />
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
                    <Row className='main_one_part'>
                        <Col span={8}><Link to='/main/music' style={{color:'grey'}}>音乐</Link></Col>
                        <Col span={8}><Link to='/main/radio' style={{color:'grey'}}>视频</Link></Col>
                        <Col span={8}><Link to='/main/FM' style={{color:'grey'}}>电台</Link></Col>
                    </Row>

                    <Route path='/main/music' component={Music} />
                    <Route path='/main/radio' component={Radio} />
                    <Route path='/main/FM' component={Fm} />

                </div>
            </Router>
        )
    }
    callback(key) {
        console.log(key);
    }
    think() {
        if (this.refs.sou.value == '') {
            this.setState({ changge_val: false })
        }
        else {
            let obj = {};
            obj[this.props.type] = this.refs.sou.value
            axios.post(this.props.ip + "/think_word", obj).then((msg) => {
                this.setState({
                    changge_val: true,
                    think_list: msg.data
                })
            })
        }
    }
    sure(e) {
        if (e.which == '13') {
            this.props.dispatch(save_ss_val(this.refs.sou.value))
            this.props.dispatch(get_song_list(this.state.think_list))
            this.props.history.push('/searchmus')
        }
    }
    choose(e) {
        this.props.dispatch(save_ss_val(e.target.innerHTML))
        this.props.dispatch(get_song_list(this.state.think_list))
        this.props.history.push('/searchmus')
    }
}
function filter(data) {
    return {
        type: data.search_type,
        ip:data.ip
    }
}

export default connect(filter)(Yun)