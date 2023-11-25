const { default: Api } = require("./Api")

exports.notification = () => {
    return Api.Api().get('reservationNot')
}
exports.readNotificationUser = (data) => {
    return Api.Api().post('readNotificationUser', data)
}
