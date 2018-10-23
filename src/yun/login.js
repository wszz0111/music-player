import React from 'react'
import axios from 'axios'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import Divider from 'antd/lib/divider';
import { hidden } from '../store/action'
import { connect } from 'react-redux'
import { save_user } from '../store/action'


// let ip = 'http://192.168.123.120:3000'
// let ip = 'http://172.20.10.6:3000'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post(this.props.ip + "/login", values).then((msg) => {
                    if (msg.data.length == 0)
                        this.setState({ wrong: true })
                    else {
                        this.saves(msg.data, 'users');
                        this.props.dispatch(save_user(msg.data))
                        this.props.history.push('/acc')
                    }
                })
            }
        });
    }
    saves(data, name) {
        if (typeof data == 'object') {
            sessionStorage[name] = JSON.stringify(data)
        }
        else {
            sessionStorage[name] = data
        }
    }
    constructor(p) {
        super(p)
        this.state = {
            wrong: false
        }
    }
    componentWillMount() {
        this.props.dispatch(hidden())
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Row className='main_ss'>
                    <Col span={4} className='white' onClick={this.back.bind(this)}>返回</Col>
                    <Col span={16} className='white fs22'>登录</Col>
                    <Col span={4}><Icon type="bar-chart" style={{ fontSize: 22 }} className='white' /></Col>
                </Row>


                <Form onSubmit={this.handleSubmit} className="login-form log_from">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入手机号' }],
                        })(
                            <Input placeholder="请输入手机号" />
                            )}
                    </FormItem>
                    <div className={this.state.wrong ? 'dis' : 'hid'}>账号或密码错误</div>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码' }],
                        })(
                            <Input type="password" placeholder="请输入密码" />
                            )}
                    </FormItem>

                    <FormItem>
                        <Row className='logbtn_part'>
                            <Col span={12}>
                                <Button type="danger" ghost htmlType="submit" className="login-form-button">
                                    登录</Button></Col>
                            <Col span={12}>
                                <Button type="danger" ghost className="login-form-button">
                                    <Link to='/register'>注册</Link></Button></Col>
                        </Row>
                    </FormItem>
                </Form>
            </div>
        );
    }
    back() {
        this.props.history.goBack()
    }
}
function filter(data) {
    return {
        ip: data.ip
    }
}
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default connect(filter)(WrappedNormalLoginForm)