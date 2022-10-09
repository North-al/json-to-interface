export const isArray = (v: unknown) => {
	return Array.isArray(v) && Object.prototype.toString.call(v) === '[object Array]'
}

export const isObject = (v: unknown) => {
	return Object.prototype.toString.call(v) === '[object Object]'
}
