import React from 'react'
import axios from 'axios'
import { Row, Col, Input, Icon, Button, Switch } from 'antd';
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { display } from '../store/action'
import { connect } from 'react-redux'
import Avatar from './tx'

class Acc extends React.Component {

    shouldComponentUpdate() {
        this.props.dispatch(display()) 
        return true
    }
    constructor(p) {
        super(p)
        this.state = {
            islog: false,
            users: ''
        }
    }
    componentWillMount() {
        let data = this.gets('users', []);
        if (data.length != 0) {
            axios.post(this.props.ip + "/get_user_info", { _id: data[0]._id }).then((msg) => {
                this.setState({
                    users: msg.data,
                    islog: true
                })
            })
        }
        this.props.dispatch(display())
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
    //退出账号，清除session
    out() {
        sessionStorage.users = []
        this.setState({ islog: false })
    }
    render() {
        return (
            <div className='boot'>
                <Row className='main_ss' style={{ position: 'fixed', left: 0, top: 0, right: 0, zIndex: 55 }}>
                    <Col span={4}></Col>
                    <Col span={16} className='white fs22'>账号</Col>
                    <Col span={4}><Icon type="bar-chart" style={{ fontSize: 22 }} className='white' /></Col>
                </Row>
                <Row className={this.state.islog ? 'nosee' : 'acc_info view'}>
                    <Col span={12}><Button><Link to='/login'>去登陆</Link></Button></Col>
                    <Col span={12}><Button><Link to='/register'>去注册</Link></Button></Col>
                </Row>
                <Row className={this.state.islog ? 'acc_info view' : 'nosee'}>
                    <Col span={10}><Avatar img_info={this.state.users.img} /></Col>
                    <Col span={14} style={{ fontSize: 1.5 + 'rem',marginTop:1+'rem' }}>{this.state.users.userName}</Col>
                </Row>
                <Row className='acc_act'>
                    <Col span={6} className='guanzhu'><div><div className=''>动态</div><div>1</div></div></Col>
                    <Col span={6} className='guanzhu'><div className='pad'><div>关注</div><div>0</div></div></Col>
                    <Col span={6} className='guanzhu'><div className='pad'><div>粉丝</div><div>2</div></div></Col>
                    <Col span={6} className='guanzhu'><div className='pad'><div>我的资料</div><div><Icon type="form" /></div></div></Col>
                </Row>

                <div className='mt'>
                    <Row>
                        <Col span={6}><Icon type="mail" style={{ fontSize: 22 }} /></Col>
                        <Col span={15} className='taleft'>我的消息</Col>
                        <Col span={3}><Icon type="right" style={{ fontSize: 22 }} /></Col>
                    </Row>
                </div>

                <div className='mt'>
                    <Row>
                        <Col span={6}><Icon type="gift" style={{ fontSize: 22 }} /></Col>
                        <Col span={15} className='taleft'>会员中心</Col>
                        <Col span={3}><Icon type="right" style={{ fontSize: 22 }} /></Col>
                    </Row>
                    <Row>
                        <Col span={6}><Icon type="shopping-cart" style={{ fontSize: 22 }} /></Col>
                        <Col span={15} className='taleft'>商城</Col>
                        <Col span={3}><Icon type="right" style={{ fontSize: 22 }} /></Col>
                    </Row>
                    <Row>
                        <Col span={6}><Icon type="cloud-o" style={{ fontSize: 22 }} /></Col>
                        <Col span={15} className='taleft'>在线听歌免流量</Col>
                        <Col span={3}><Icon type="right" style={{ fontSize: 22 }} /></Col>
                    </Row>
                </div>

                <div className='mt'>
                    <Row>
                        <Col span={6}><Icon type="setting" style={{ fontSize: 22 }} /></Col>
                        <Col span={15} className='taleft'>设置</Col>
                        <Col span={3}><Icon type="right" style={{ fontSize: 22 }} /></Col>
                    </Row>
                    <Row>
                        <Col span={6}><Icon type="scan" style={{ fontSize: 22 }} /></Col>
                        <Col span={15} className='taleft'>扫一扫</Col>
                        <Col span={3}><Icon type="right" style={{ fontSize: 22 }} /></Col>
                    </Row>
                    <Row>
                        <Col span={6}><Icon type="bulb" style={{ fontSize: 22 }} /></Col>
                        <Col span={14} className='taleft'>夜间模式</Col>
                        <Col span={4}><Switch defaultChecked onChange={this.onChange} /></Col>
                    </Row>

                </div>

                <div className={this.state.islog ? 'mt view' : 'nosee'}>
                    <Row>
                        <Col span={24} onClick={this.out.bind(this)}>退出账号</Col>
                    </Row>
                </div>

            </div>
        )
    }
    onChange(checked) {
        console.log(`switch to ${checked}`);
    }
}
function filter(data) {
    return {
        user: data.user_info,
        ip:data.ip
    }
}

export default connect(filter)(Acc)