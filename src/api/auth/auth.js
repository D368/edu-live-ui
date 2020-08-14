import http from '@/utils/http'
// 
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
let resquest = "/api"
export default {
    login(params){
        return http.post(`${resquest}/auth/login`,params)
    }


}
// // get请求
// export function get(params){
//     return http.get(`${resquest}/getList.json`,params)
// }
// // post请求
// export function post(params){
//     return http.post(`${resquest}/postForm.json`,params)
// }

// export function login(params){
//     return http.post(`${resquest}/login/auth`,params)
// }
// // put 请求
// export function put(params){
//     return http.put(`${resquest}/putSome.json`,params)
// }
// // delete 请求
// export function deleteRequest(params){
//     return http.delete(`${resquest}/deleteList.json`,params)
// }

