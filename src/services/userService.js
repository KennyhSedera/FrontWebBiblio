const { default: Api } = require("./Api")

    exports.register=(data)=> {
    return Api.Api().post('signup', data)
    }
    exports.login=(data)=> {
       return Api.Api().post('signin', data) 
    }
    exports.getAllUsers=()=> {
        return Api.Api().get('user')
    }
    exports.getOne=(id)=> {
        return Api.Api().get(`user/${id}`)
    }
    exports.verifiEmail=(data)=> {
        return Api.Api().post('verifieemail', data)
    }
