export function save_songform(val) {
    return {
        type: 'SONG_FORM',
        val
    }
}
export function now_form(val) {
    return {
        type: 'NOW_FORM',
        val
    }
}
export function get_song_index(i) {
    return {
        type: 'GET_SONG_INDEX',
        i
    }
}
export function get_song_list(val) {
    return {
        type: 'GET_SONG_LIST',
        val,
    }
}
//循环播放
export function circle() {
    return {
        type: 'CIRCLE'
    }
}
//随机播放
export function rendom() {
    return {
        type: 'RENDOM'
    }
}

//隐藏菜单
export function hidden(val) {
    return {
        type: 'HIDDEN',
    }
}
export function display(val) {
    return {
        type: 'DISPLAY',
    }
} 

//保存用户
export function save_user(val){
    return{
        type:'LOG_USER',val
    }
}

//保存搜索值
export function save_ss_val(val){
    console.log(val);
    return{
        type:'SEARCH',val
    }
}
