import createRequest from "../utils/request";
//存放请求的接口
export function loginRequest(data){ 
    return createRequest({
        url:"/login",
        methods:"POST",
        data,
        needLogin:false
    })
}