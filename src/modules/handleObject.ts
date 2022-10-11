import { firstUpperCase, isArray, isObject } from '../utils'
import { Enum_Object_Result_Type } from '../enum/type'
import { handleArray } from './handleArray'

let generateInterface: Array<string> = []

type HandleObjectResponse = { type: string; result: any; generateInterface?: Array<string> } | void

export const handleObject = (json: Record<string, any>): HandleObjectResponse => {
	const keys = Object.keys(json)

	const result: Record<string, any> = {}

	if (keys.length === 0) {
		return { type: Enum_Object_Result_Type.void, result: 'void' }
	}

	for (const [key, value] of Object.entries(json)) {
		if (value === null) {
			result[key] = 'null'
		} else if (isArray(value)) {
			// 递归处理
			const { result: r, generateInterface: g } = handleArray(value)!
			result[key] = r
			generateInterface.push(...g!)
		} else if (isObject(value)) {
			// 递归处理
			generateInterface.push(
				`interface I${firstUpperCase(key)} ${JSON.stringify(handleObject(value)!.result, null, 4)}`
			)
			result[key] = `I${firstUpperCase(key)}`
		} else {
			// 基本类型处理
			result[key] = typeof value
		}
	}
	return {
		type: Enum_Object_Result_Type.object,
		result: JSON.parse(JSON.stringify(result)),
		generateInterface
	}
}
