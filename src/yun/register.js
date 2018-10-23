import React from 'react'
import axios from 'axios'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import Divider from 'antd/lib/divider';
import { hidden } from '../store/action';
import { connect } from 'react-redux'

const FormItem = Form.Item;

class NormalRegisterForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post(this.props.ip + "/reg", values).then((msg) => {
                    this.props.history.push('/login')
                })
            }
        });
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
                    <Col span={16} className='white fs22'>账号注册</Col>
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
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码' }],
                        })(
                            <Input type="password" placeholder="请输入密码" />
                            )}
                    </FormItem>

                    <FormItem>
                        <Row className='logbtn_part'>
                            <Col span={24}>
                                <Button type="danger" ghost htmlType="submit" className="login-form-button">
                                    注册</Button></Col>
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
const RegisterForm = Form.create()(NormalRegisterForm);
export default connect(filter)(RegisterForm)