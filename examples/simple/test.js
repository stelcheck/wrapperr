var fs = require('fs');
var WrappErr = require('../../index.js');

process.on('uncaughtException', function (ex) {
	console.error('Uncaught exception:', ex.message);
	console.error('stack:', ex.stack);
	process.exit(1);
});

fs.readFile('./abc', function (error, data) {
	if (error) {
		throw new WrappErr(error, 'Could not read abc');
	}

	console.log('./abc contains:', data.toString('utf8'));

	fs.readFile('./doesNotExist', function (error, data) {
		if (error) {
			throw new WrappErr(error, 'Could not read doesNotExist');
		}

		console.log('./doesNotExist contains:', data.toString('utf8'));
	})
});
