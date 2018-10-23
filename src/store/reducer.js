import { combineReducers } from "redux";
import acc from "../yun/acc";

function song_form(state = [], action) {
    switch (action.type) {
        case 'SONG_FORM':
            let newarr = [...action.val]
            return newarr
        default: return state
    }
}

function now_form(state = '', action) {
    switch (action.type) {
        case 'NOW_FORM':
            return action.val
        default: return state
    }
}

function song_index(state = 0, action) {
    switch (action.type) {
        case 'GET_SONG_INDEX':
            return action.i
        case 'LAST':
            return action.i
        case 'NEXT':
            return action.i
        default: return state
    }
}
//得到联合查询到的歌单
function song_list(state = [], action) {
    switch (action.type) {
        case 'GET_SONG_LIST':
            let newarr = [...action.val]
            return newarr
        default: return state
    }

}

//是否有菜单
function menu(state = 'yes', action) {
    switch (action.type) {
        case 'HIDDEN':
            return 'no'
        case 'DISPLAY':
            return 'yes'
        default: return state
    }
}
//保存用户信息
function user_info(state = '', action) {
    switch (action.type) {
        case 'LOG_USER':
            return action.val
        default: return state
    }
}
//搜索值
function search_val(state = '', action) {
    switch (action.type) {
        case 'SEARCH':
            return action.val
        default: return state
    }
}
//搜索类型，默认歌曲
function search_type(state = 'song_name', action) {
    switch (action.type) {
        case 'SEARCH_SONG':
            return 'song_name'
        default: return state
    }
}
//ip
function ip(state, action) {
    // return 'http://192.168.123.120:3000'
    // return 'http://172.20.10.6:3000'
    return 'http://172.20.10.4:3000'
}
//歌曲播放状态
function song_state(state = 'circle', action) {
    switch (action.type) {
        case 'CIRCLE':
            return 'circle'
        case 'RENDOM':
            return 'rendom'
        default: return state
    }
}

export default combineReducers({
    song_form,
    now_form,
    song_index,
    menu,
    song_list,
    user_info,
    search_val,
    search_type,
    ip,
    song_state
})