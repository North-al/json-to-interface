import { excludeSymbol, isArray, isObject } from './utils'
import { Enum_Array_Result_Type, Enum_Object_Result_Type } from './enum/type'
import { handleArray } from './modules/handleArray'
import { handleObject } from './modules/handleObject'

export const jsonToInterface = (json: any, interfaceName = 'IRoot'): string => {
	let dataType: any = null

	if (isArray(json)) {
		const { type, result, generateInterface } = handleArray(json)!

		switch (type) {
			case Enum_Array_Result_Type.void:
			case Enum_Array_Result_Type.array_generics:
			case Enum_Array_Result_Type.array:
				dataType = `${generateInterface && generateInterface} \n ${excludeSymbol(
					'type ' + interfaceName + ' = ' + result
				)}`
				break
		}
	}

	if (isObject(json)) {
		const { type, result, generateInterface } = handleObject(json)!

		switch (type) {
			case Enum_Object_Result_Type.void:
			case Enum_Object_Result_Type.object:
				let interfaceStr = ``
				if (generateInterface) {
					for (let i = 0; i < generateInterface.length; i++) {
						const item = generateInterface[i]

						if (item.indexOf('interface I') > -1) {
							interfaceStr += item
						} else {
							interfaceStr += `interface IGenerate${i} ${item}`
						}
					}
				}

				// 替换result 中values的\ 和 “
				for (const key in result) {
					if (Object.prototype.hasOwnProperty.call(result, key)) {
						const value = result[key]
						result[key] = value.replaceAll('\\', '').replaceAll('"', '')
					}
				}

				dataType = `${interfaceStr && interfaceStr}
			     \n interface ${interfaceName} ${JSON.stringify(result, null, 4)}`
				break
		}
	}

	return dataType
}

console.log(
	jsonToInterface({
		data: [
			{
				ww: 2
			},
			{
				ww: 2
			},
			{
				www: 333
			}
		]
	})
)
