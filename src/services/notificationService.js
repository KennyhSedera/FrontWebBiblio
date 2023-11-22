const { default: Api } = require("./Api")

exports.notification = () => {
    return Api.Api().get('reservationNot')
}