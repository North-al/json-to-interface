import { isArray, isObject } from '../utils'
import { Enum_Object_Result_Type } from '../enum/type'
import { handleArray } from './handleArray'

const handleObjectResponse = () => {}

export const handleObject = (json: Record<string, any>): { type: string; result: string } | void => {
	const keys = Object.keys(json)
	const result: Record<string, any> = {}
	if (keys.length === 0) {
		return { type: Enum_Object_Result_Type.void, result: '{}' }
	}

	for (const [key, value] of Object.entries(json)) {
		if (value === null) {
			result[key] = 'null'
		} else if (isArray(value)) {
			// 递归处理
			result[key] = handleArray(value)!.result
		} else if (isObject(value)) {
			// 递归处理
			result[key] = handleObject(value)!.result
		} else {
			// 基本类型处理
			result[key] = typeof value
		}
	}
	return { type: Enum_Object_Result_Type.object, result: JSON.stringify(result, null, 4) }
}
