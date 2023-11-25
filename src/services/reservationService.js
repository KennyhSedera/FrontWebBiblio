const { default: Api } = require("./Api")

exports.reservation = () => {
    return Api.Api().get('reservation')
}
exports.readReservationUser = (data) => {
    return Api.Api().post('readReservationUser', data)
}
