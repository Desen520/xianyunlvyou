// vuex仓库 保存的数据
export const state ={
    postlist:{
        token:'',
        user:{}
    }
}
// 同步修改state的数据
export const mutations ={
    setUser(state,data){
        state.postlist=data
    },
    cleanpostlist(state,info){
        if(process.browser){
            localStorage.removeItem('postlist')
        }
        state.postlist={}
    }
}
//异步修改数据
export const actions={
    
}