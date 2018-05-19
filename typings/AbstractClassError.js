module.exports = class AbstractClassError extends Error {
	constructor(message) {
		super(message);
		this.name = 'AbstractClassError';
	}
}