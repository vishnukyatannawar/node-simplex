var slogerrConfig = require(__CONFIG__.app_base_path + 'slogerr-config');
var request = require('request');

/**
 * A module that will log the errors into the slogerr.
 *
 * @param req
 * @param res
 */

var Slogerr = {
  log: function(logMessage, stackTrace, severity, cb) {
    var dataToSend = slogerrConfig.data;
    dataToSend.LogMessage = logMessage;
    dataToSend.StackTrace = stackTrace;
    dataToSend.Severity = severity;
    var options = {
      url: slogerrConfig.url,
      method: slogerrConfig.method,
      headers: slogerrConfig.headers,
      body: JSON.stringify(dataToSend)
    };
    request(options, function(err, response, body) {
      if(cb) {
        return cb(err, response, body);
      }      
    });
  }
};

module.exports = Slogerr;