import { excludeSymbol, isArray, isObject } from './utils'
import { Enum_Array_Result_Type, Enum_Object_Result_Type } from './enum/type'
import { handleArray } from './modules/handleArray'
import { handleObject } from './modules/handleObject'

export const jsonToInterface = (json: any, interfaceName = 'IRoot'): string => {
	let dataType: any = null

	if (isArray(json)) {
		const { type, result } = handleArray(json)!

		switch (type) {
			case Enum_Array_Result_Type.void:
			case Enum_Array_Result_Type.array_generics:
			case Enum_Array_Result_Type.array:
				dataType = excludeSymbol(`type ${interfaceName} = ${result}`)
				break
		}
	}

	if (isObject(json)) {
		const { type, result } = handleObject(json)!

		switch (type) {
			case Enum_Object_Result_Type.void:
			case Enum_Object_Result_Type.object:
				dataType = `interface ${interfaceName} ${JSON.stringify(result, null, 4)}`.replaceAll(
					'\\',
					''
				)
				break
		}
	}

	return dataType
}

// console.log(jsonToInterface({ a: 1, b: { a: { v: 1 } } }, '对象'))
// console.log(jsonToInterface([{ a: 1, b: 2 }], '数组'))

// console.log(jsonToInterface([], '空数组'))
// console.log(jsonToInterface([1, 2], '类型相同数组'))
// console.log(jsonToInterface([1, 2, '3'], '类型不同数组'))
// console.log(jsonToInterface([1, 2, [1, 2]], '基本类型 + 二维类型相同数组'))
// console.log(
// 	jsonToInterface(
// 		[
// 			[1, 2],
// 			[1, 2]
// 		],
// 		'二维类型相同数组'
// 	)
// )
// console.log(
// 	jsonToInterface(
// 		[
// 			[1, 2],
// 			[1, 2, '3', null]
// 		],
// 		'二维数组 + 不同类型'
// 	)
// )

// console.log(jsonToInterface([null, undefined], '处理null和undefined'))

// const v: [Array<Array<number>>, Array<[Array<number>, Array<string>]>] = [[[1], [2]], [[[4], ['22']]]]

// console.log(jsonToInterface(v, '多维数组嵌套'))
// console.log(jsonToInterface([1, 2, '3', [1, 2, '2']], '基本不同类型 + 二维数组不同类型'))

// console.log('-------------------------------------')

// const vv = [1, [123, [1, [2, '3']]]]
// console.log(jsonToInterface(vv, 'TTTTT'))

console.log(
	jsonToInterface({
		code: 0,
		message: '0',
		ttl: 1,
		data: {
			bvid: 'BV1r14y1Y7ZV',
			aid: 773279142,
			videos: 1,
			tid: 122,
			tname: '野生技能协会',
			copyright: 1,
			pic: 'http://i1.hdslb.com/bfs/archive/1f9cff06f3042c10842ef7f9785a28a03929d1c0.jpg',
			title: 'C++到底是如何从代码到游戏的？网友看完直呼：牛皮！！！',
			pubdate: 1663920961,
			ctime: 1663920961,
			desc: '',
			desc_v2: null,
			state: 0,
			duration: 180,
			rights: {
				bp: 0,
				elec: 0,
				download: 1,
				movie: 0,
				pay: 0,
				hd5: 0,
				no_reprint: 1,
				autoplay: 1,
				ugc_pay: 0,
				is_cooperation: 0,
				ugc_pay_preview: 0,
				no_background: 0,
				clean_mode: 0,
				is_stein_gate: 0,
				is_360: 0,
				no_share: 0,
				arc_pay: 0,
				free_watch: 0
			},
			owner: {
				mid: 669881913,
				name: '喝酸奶了咩',
				face: 'https://i0.hdslb.com/bfs/face/e83ffc1ad6700efc98559af1d4c5e1a52b820327.jpg'
			},
			stat: {
				aid: 773279142,
				view: 1225,
				danmaku: 26,
				reply: 12,
				favorite: 16,
				coin: 5,
				share: 12,
				now_rank: 0,
				his_rank: 0,
				like: 78,
				dislike: 0,
				evaluation: '',
				argue_msg: ''
			},
			dynamic: '',
			cid: 841128037,
			dimension: { width: 856, height: 480, rotate: 0 },
			premiere: null,
			teenage_mode: 0,
			is_chargeable_season: false,
			is_story: false,
			no_cache: false,
			pages: [
				{
					cid: 841128037,
					page: 1,
					from: 'vupload',
					part: 'C++到底是如何从代码到游戏的？网友看完直呼：牛皮！！！',
					duration: 180,
					vid: '',
					weblink: '',
					dimension: { width: 856, height: 480, rotate: 0 },
					first_frame: 'http://i0.hdslb.com/bfs/storyff/n220923a26i0h95yvtfi1q7cx6oyk2il_firsti.jpg'
				}
			],
			subtitle: {
				allow_submit: false,
				list: [
					{
						id: 1055039982789707264,
						lan: 'ai-zh',
						lan_doc: '中文（自动生成）',
						is_lock: false,
						subtitle_url:
							'http://i0.hdslb.com/bfs/ai_subtitle/prod/7732791428411280376c12dd94b6a7c871812204b745acd8a8',
						type: 1,
						id_str: '1055039982789707264',
						ai_type: 0,
						ai_status: 2,
						author: {
							mid: 0,
							name: '',
							sex: '',
							face: '',
							sign: '',
							rank: 0,
							birthday: 0,
							is_fake_account: 0,
							is_deleted: 0,
							in_reg_audit: 0,
							is_senior_member: 0
						}
					}
				]
			},
			is_season_display: false,
			user_garb: { url_image_ani_cut: '' },
			honor_reply: {},
			like_icon: ''
		}
	})
)
