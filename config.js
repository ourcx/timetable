let env = "develop"

const envVersion = wx.getAccountInfoSync().miniProgram.envVersion
//判断不同的环境
if(envVersion === "release"&&env!=="production"){
    env="production"
}

export default {
    env,
    baseUrl:{
        //设置不同环境的接口
        develop:"http://localhost:3000",
        production:"https://api.xxx.com",
    }
}