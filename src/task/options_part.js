import React from 'react'

class Choose extends React.Component {

    render() {
        let { data, is_cho } = this.props
        return (
            <div>
                <span onClick={this.click_btn.bind(this, 'all')} className={is_cho == 'all' ? 'choose' : 'no'}>全部</span>
                <span onClick={this.click_btn.bind(this, 'fin')} className={is_cho == 'fin' ? 'choose' : 'no'}>已完成</span>
                <span onClick={this.click_btn.bind(this, 'not')} className={is_cho == 'not' ? 'choose' : 'no'}>未完成</span>
            </div>
        )
    }
    click_btn(type) {
        this.props.click(type)
    }
}
export default Choose