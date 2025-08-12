let env = 'develop'


const envMap = {
  release: 'production',
  trial: 'staging',    
  develop: 'develop'
}

const envVersion = wx.getAccountInfoSync().miniProgram.envVersion
env = envMap[envVersion] || 'develop'

const baseURL = {
  develop: 'http://localhost:3000',
  staging: 'https://staging.xxx.com', 
  production: 'https://api.xxx.com'
}

export default {
  env,
  baseUrl: baseURL[env] 
}

//另外一个写法
// export default {
//   env,
//   baseUrl : {
//   //设置不同环境的接口
//   develop: 'http://localhost:3000',
//   staging: 'https://staging.xxx.com',
//   production: 'https://api.xxx.com'
// }
//}
//
