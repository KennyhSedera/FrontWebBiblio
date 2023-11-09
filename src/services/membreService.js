const { default: Api } = require("./Api")

exports.inscription = (data) => {
    return Api.Api().post('inscription', data)
}
exports.getAllAdhInscrit = () => {
    return Api.Api().get('inscription')
}
exports.getOneAdhInscrit = (id) => {
    return Api.Api().get(`inscription/${id}`)
}
exports.updatedAdhnscrit = (data, id) => {
    return Api.Api().put(`inscription/${id}`, data)
}
exports.deleteAdhnscrit = (id) => {
    return Api.Api().delete(`inscription/${id}`)
}