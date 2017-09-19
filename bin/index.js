/**
 * Created by aroko on 9/19/2017.
 */
var debug = require('debug')('my-application');
var app = require('../app');

app.set('port', process.env.PORT || 4000);

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});
