const { default: Api } = require("./Api")

// exports.register=(data)=> {
//     return Api.Api().post('signup', data)
// }
// exports.login=(data)=> {
//     return Api.Api().post('signin', data) 
// }
exports.getAllType=()=> {
    return Api.Api().get('type')
}
// exports.getOne=(id)=> {
//     return Api.Api().get(`user/${id}`)
// }
