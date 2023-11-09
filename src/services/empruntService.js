const { default: Api } = require("./Api")

exports.countEmprunt = () => {
    return Api.Api().get('totalEmprunt')
}
exports.createEmprunt = (data) => {
    return Api.Api().post('emprunt', data)
}
exports.getAllEmprunt = () => {
    return Api.Api().get('emprunt')
}
exports.getAllEmpruntEnCours = () => {
    return Api.Api().get('empruntEnCours')
}
exports.retourEmprunt = (data) => {
    return Api.Api().get('retourEmprunt', data)
}