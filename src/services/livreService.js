const { default: Api } = require("./Api")

exports.createLivre = (data) => {
    return Api.Api().post('livre', data)
}
exports.getAllLivre = () => {
    return Api.Api().get('livre');
}
exports.getAllLivreDispo = () => {
    return Api.Api().get('livreDispo');
}
exports.getAllLivreExp = () => {
    return Api.Api().get('livreExp');
}
exports.getOneLivre = (id) => {
    return Api.Api().get(`livre/${id}`)
}
exports.updateLivre = (data, id) => {
    return Api.Api().put(`livre/${id}`, data)
}
exports.deleteLivre = (id) => {
    return Api.Api().delete(`livre/${id}`)
}
exports.countEmplacement = () => {
    return Api.Api().get('livreCountByEmplacement')
}
exports.countLivre = () => {
    return Api.Api().get('livreCount')
}
exports.totalEmprunt = () => {
    return Api.Api().get('totalEmprunt')
}
exports.livreEmprunt = () => {
    return Api.Api().get('livreEmprunt')
}
exports.livreDispo = () => {
    return Api.Api().get('livreDispo')
}

exports.upload = (formData) => {
    return Api.Api().post('upload', formData,  {headers: {
        "Content-Type": "multipart/form-data",
    },})
}