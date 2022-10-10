import { excludeSymbol, getModelType, isArray, isObject } from './utils'
import { Enum_Array_Result_Type } from './enum/type'

const handleArray = (json: Array<any>): { type: string; result: string } | void => {
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

		// TODO：暂时不处理Object
		else if (isObject(current)) {
			console.log('object')
		} else {
			// 基本类型处理
			result[i] = typeof current
		}
	}

	return handleArrayResponse(result)
}

const handleArrayResponse = (result: Array<string>) => {
	const resultLen = result.length

	if (resultLen === 1) {
		return { type: Enum_Array_Result_Type.array_generics, result: `Array<${result[0]}>` }
	}

	if (resultLen === 2) {
		const [_1, _2] = result

		return _1 === _2
			? { type: Enum_Array_Result_Type.array_generics, result: `Array<${_1}>` }
			: { type: Enum_Array_Result_Type.array, result: JSON.stringify(result) }
	}

	if (resultLen > 2) {
		const _0 = result.at(0)
		for (let i = 1; i < result.length; i++) {
			// 如果有一个不同、说明无法优化成泛型写法，直接返回数组个数
			if (_0 !== result[i]) {
				return { type: Enum_Array_Result_Type.array, result: JSON.stringify(result) }
			}
		}

		// 可优化返回值
		return { type: Enum_Array_Result_Type.array_generics, result: `Array<${_0}>` }
	}
}

export const jsonToInterface = (json: any, interfaceName = 'IRoot'): string => {
	let dataType: any = null

	if (isArray(json)) {
		const { type, result } = handleArray(json)!

		switch (type) {
			case Enum_Array_Result_Type.void:
				dataType = excludeSymbol(`type ${interfaceName} = ${result}`)
				break
			case Enum_Array_Result_Type.array_generics:
				dataType = excludeSymbol(`type ${interfaceName} = ${result}`)
				break
			case Enum_Array_Result_Type.array:
				dataType = excludeSymbol(`type ${interfaceName} = ${result}`)
				break
			default:
				break
		}
	}
	return dataType
}

console.log(jsonToInterface([], '空数组'))
console.log(jsonToInterface([1, 2], '类型相同数组'))
console.log(jsonToInterface([1, 2, '3'], '类型不同数组'))
console.log(jsonToInterface([1, 2, [1, 2]], '基本类型 + 二维类型相同数组'))
console.log(
	jsonToInterface(
		[
			[1, 2],
			[1, 2]
		],
		'二维类型相同数组'
	)
)
console.log(
	jsonToInterface(
		[
			[1, 2],
			[1, 2, '3']
		],
		'二维数组 + 不同类型'
	)
)

const v: [Array<Array<number>>, Array<[Array<number>, Array<string>]>] = [[[1], [2]], [[[4], ['22']]]]

console.log(jsonToInterface(v, '多维数组嵌套'))
console.log(jsonToInterface([1, 2, '3', [1, 2, '2']], '基本不同类型 + 二维数组不同类型'))

console.log('-------------------------------------')

const vv = [1, [123, [1, [2, '3']]]]
console.log(jsonToInterface(vv, 'TTTTT').replaceAll('\\', '').replaceAll('"', ''))
