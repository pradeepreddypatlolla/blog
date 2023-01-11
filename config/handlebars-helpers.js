const moment = require('moment')
module.exports = {
    formatDate: function (date, format) {
        var mmnt = moment(date);
        return mmnt.format(format);
    
  }}