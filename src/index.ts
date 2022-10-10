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
					'type ' + interfaceName + '=' + result
				)}`
				break
		}
	}

	if (isObject(json)) {
		const { type, result, generateInterface } = handleObject(json)!

		switch (type) {
			case Enum_Object_Result_Type.void:
			case Enum_Object_Result_Type.object:
				dataType = `${generateInterface && generateInterface}
			     \n interface ${interfaceName} ${JSON.stringify(result, null, 4)}`.replaceAll('\\', '')
				break
		}
	}

	return dataType
}
