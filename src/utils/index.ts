export * from './is'
export * from './parse'

export const excludeSymbol = (str: string) => {
	return str.replaceAll('\\', '').replaceAll('"', '').replaceAll(',', ', ')
}
