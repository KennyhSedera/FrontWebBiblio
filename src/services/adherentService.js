const { default: Api } = require("./Api");

exports.createAdh = (data) => {
    return Api.Api().post('adherent', data);
}
exports.getAllAdh = () => {
    return Api.Api().get('adherent');
}
exports.getAllAdhNoInsc = () => {
    return Api.Api().get('adherentNoInsc');
}
exports.getAllAdhNoEmp = () => {
    return Api.Api().get('adherentNoEmp');
}
exports.getOneAdh = (id) => {
    return Api.Api().get(`adherent/${id}`);
}
exports.updatedAdh = (data, id) => {
    return Api.Api().put(`adherent/${id}`, data);
}
exports.deleteAdh = (id) => {
    return Api.Api().delete(`adherent/${id}`);
}
exports.countAdh = () => {
    return Api.Api().get('adherentCount');
}