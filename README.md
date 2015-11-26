WrappErr
========

Make a burrito out of your errors.

Why?
-----

This makes it easier to figure out where things happen,
especially in large codebases.

For the code:


```javascript
fs.readFile('./abc', function (error, data) {
	if (error) {
		throw new WrappErr(error, 'Could not read abc');
	}
});
```

On error, you would get an `error.message` with:

```bash
Could not read abc: ENOENT, open './abc'
```

And an `error.stack` that looks like:

```
Could not read abc: ENOENT, open './abc'
	ENOENT, open './abc'
		at fs.js:207:20
		at Object.oncomplete (fs.js:107:15)
	Could not read abc
		at /path/to/some/test.js:12:9
```

Or, if using `WrappErr.setStackFormat('marker');`:

```
Could not read abc: ENOENT, open './abc'
	!!! ENOENT, open './abc'
	at fs.js:207:20
	at Object.oncomplete (fs.js:107:15)
	!!! Could not read abc
	at /path/to/some/test.js:12:9
```

Of course, the idea is that you should be able
to re-wrap already wrapped errors to get even
more detailed and contextualised errors.

Install
-------

```bash
npm install --save wrapperr
```

Other examples
---------------

See [./examples](./examples) for more details.

License
--------

MIT.
