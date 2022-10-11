import { firstUpperCase, isArray, isObject, randomString } from '../utils'
import { Enum_Array_Result_Type } from '../enum/type'
import { handleObject } from './handleObject'

const generateInterface: Array<string> = []

type IHandleArrayResponse = { type: string; result: any; generateInterface?: Array<string> } | void

const handleArrayResponse = (result: Array<string>): IHandleArrayResponse => {
	const resultLen = result.length

	if (resultLen === 1) {
		return {
			type: Enum_Array_Result_Type.array_generics,
			result: `Array<${result[0]}>`,
			generateInterface
		}
	}

	if (resultLen === 2) {
		const [_1, _2] = result

		return _1 === _2
			? {
					type: Enum_Array_Result_Type.array_generics,
					result: `Array<${_1}>`,
					generateInterface
			  }
			: {
					type: Enum_Array_Result_Type.array,
					result: JSON.stringify(result),
					generateInterface
			  }
	}

	if (resultLen > 2) {
		const _0 = result.at(0)
		for (let i = 1; i < result.length; i++) {
			// 如果有一个不同、说明无法优化成泛型写法，直接返回数组个数
			if (_0 !== result[i]) {
				return {
					type: Enum_Array_Result_Type.array,
					result: JSON.stringify(result),
					generateInterface
				}
			}
		}

		// 可优化返回值
		return {
			type: Enum_Array_Result_Type.array_generics,
			result: `Array<${_0}>`,
			generateInterface
		}
	}
}

export const handleArray = (json: Array<any>, key?: string): IHandleArrayResponse => {
	// 如果长为0直接 返回 Array<void>
	if (json.length === 0) {
		return { type: Enum_Array_Result_Type.void, result: 'Array<void>' }
	}

	const result = []
	for (let i = 0; i < json.length; i++) {
		const current = json[i]
		if (current === null) {
			result[i] = 'null'
		} else if (isArray(current)) {
			// 递归处理
			result[i] = handleArray(current)!.result
		}

		// 处理Object
		else if (isObject(current)) {
			console.log({ current })

			// 获取转换后的类型
			const { result: r } = handleObject(current)!

			// 转换成字符串
			const typeFormatStr = JSON.stringify(r, null, 4)

			/// 如果不包含，就添加进去
			if (!generateInterface.includes(typeFormatStr)) {
				const interfaceName = `IGenerate${generateInterface.length}`
				generateInterface.push(typeFormatStr)
				result[i] = interfaceName
			} else {
				// 如果包含、则直接获取interfaceName
				const index = generateInterface.indexOf(typeFormatStr)
				result[i] = `IGenerate${index}`
			}
		} else {
			// 基本类型处理
			result[i] = typeof current
		}
	}

	return handleArrayResponse(result)
}
