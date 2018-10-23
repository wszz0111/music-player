import React from 'react'
import Add_input from './add_part.js'
import Task_list from './list_part.js'
import Choose from './options_part.js'

class Task extends React.Component {

    constructor(props) {
        super(props)
        console.log('zong设置初始化state');
        this.state = {
            data_list: [{
                id: '0',
                task_name: '击杀野生素芬',
                info: 'finish'
            }, {
                id: '1',
                task_name: '采矿采药',
                info: 'finish'
            }, {
                id: '2',
                task_name: '洗jio洗脸',
                info: 'not'
            }, {
                id: '3',
                task_name: '做十全大补丸',
                info: 'not'
            }, {
                id: '4',
                task_name: '偷看仙女洗澡',
                info: 'finish'
            }, {
                id: '5',
                task_name: '买滑板鞋',
                info: 'not'
            }],
            zt: 'all'
        }
    }

    componentWillMount(){
        console.log('zong_state设置完毕');
    }

    componentDidMount(){
        console.log('zong_dom绘制完毕');
    }

    render() {
        console.log('render_zong');
        return (
            <div>
                <Add_input click={this.add_item.bind(this)} />
                <Task_list data={this.refresh(this.state.zt)} click={this.changge.bind(this)} />
                <Choose click={this.option.bind(this)} is_cho={this.state.zt}/>
            </div>
        )

    }

    componentWillReceiveProps(nextProps,nextState)
    {
        console.log('zong收到新的props')
    }

    shouldComponentUpdate(nextProps,nextState){
        console.log('zong比较值，是否修改');
        return true
    }
    componentWillUpdate()
    {
        console.log('zong修改state值');
    }
    componentDidUpdate()
    {
        console.log('zong更新完成，获取新dom，返回should')
    }

    //zengjia 
    add_item(add_task) {
        let arr = this.state.data_list
        arr.push({
            id: arr.length,
            task_name: add_task,
            info: 'not'
        })
        this.setState({
            data_list: arr
        })
    }
    //3中状态下的data_list
    option(type) {
        this.setState({
            zt: type
        })
    }
    //筛选
    refresh(type) {
        if (type == 'all') {
            return this.state.data_list
        }
        if (type == 'fin') {
            let fin = this.state.data_list.filter((item) => {
                return item.info == 'finish'
            })
            return fin
        }
        if (type == 'not') {
            let not = this.state.data_list.filter((item) => {
                return item.info == 'not'
            })
            return not
        }
    }
    //变色
    changge(index) {
        for(let i=0;i<this.state.data_list.length;i++)
        {
            if(this.state.data_list[i].id == index && this.state.data_list[i].info == 'finish')
            {
                this.state.data_list[i].info='not'
            }
            else
            {
                if(this.state.data_list[i].id == index && this.state.data_list[i].info == 'not')
                {
                    this.state.data_list[i].info='finish'
                }
            }
        }
        this.setState({})
    }
}

export default Task