var stackFormat = 'indent'; // marker, indent

var WrappErr = function (error, message) {
	if (!(error instanceof Error)) {
		throw new TypeError('Objects passed to Wrapperr MUST be/inherit Error');
	}

	var tmpError = Error.call(this);
	this.name = 'Error';
	this.message = [message, error.message].join(': ');

	var errorStackArray = tmpError.stack.split('\n');

	switch(stackFormat) {
	case 'indent':
		errorStackArray.shift();
		errorStackArray.shift();
		errorStackArray.shift();
		errorStackArray.push(message);
		errorStackArray.push(errorStackArray.shift());
		errorStackArray.unshift(error.message);
		errorStackArray.unshift(this.message);
		this.stack = errorStackArray.join('\n    ');
		break;
	case 'marker':
		errorStackArray.shift();
		errorStackArray.shift();
		errorStackArray.shift();
		errorStackArray.push('    !!! ' + message);
		errorStackArray.push(errorStackArray.shift());
		errorStackArray.unshift('    !!! ' + error.message);
		errorStackArray.unshift(this.message);
		this.stack = errorStackArray.join('\n');
		break;
	default:
		throw new Error('WrappErr.stackFormat should be either indent or marker');
	}

	return this;
};

WrappErr.setStackFormat = function (format) {
	stackFormat = format;
};

// http://stackoverflow.com/questions/8802845/inheriting-from-the-error-object-where-is-the-message-property
var IntermediateInheritor = function () {}
IntermediateInheritor.prototype = Error.prototype
WrappErr.prototype = new IntermediateInheritor();

module.exports = WrappErr;
