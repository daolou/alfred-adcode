/*
 * @Author: zhiguo.jzg
 * @Date: 2022-04-01 01:48:42
 * @Description: TODO: Description of file, its uses and information
 * @LastEditTime: 2022-05-18 00:54:36
 * @LastEditors: zhiguo.jzg
 */
import aw from './node_modules/@jsany/aw/lib/index.js';

const LIST_KEYS = [
	{
		en: 'name',
		zh: '行政区名称',
	},
	{
		en: 'adcode',
		zh: '区域编码',
	},
	{
		en: 'citycode',
		zh: '城市编码',
	},
	{
		en: 'center',
		zh: '区域中心点',
	},
	{
		en: 'level',
		zh: '行政区级别',
	},
	{
		en: 'polyline',
		zh: '行政区边界坐标点',
	},
];

const LEVEL_MAP = {
	country: '国家',

	province: '省份（直辖市会在province和city显示）',

	city: '市（直辖市会在province和city显示）',

	district: '区县',

	street: '街道',
};

const getConfig = () => {
	return {
		url:
			aw.getEnv('ADCODE_API_URL') ||
			'https://restapi.amap.com/v3/config/district',
		key: aw.getEnv('ADCODE_KEY'),
		subdistrict: aw.getEnv('ADCODE_SUBDISTRICT') || 0,
	};
};

const adcode = async () => {
	try {
		const keywords = aw.input;
		const {key, subdistrict, url} = getConfig();

		if (!key) {
			throw new Error('key is required');
		}

		const query = `?subdistrict=${subdistrict}&key=${key}&keywords=${keywords}`;
		const {data} = await aw.fetch.get(url + query);
		if (data.status !== '1') {
			throw new Error(data.info);
		}

		const district = data.districts[0];
		if (!district) {
			throw new Error('no district found');
		}

		const items = LIST_KEYS.map(({en, zh}) => {
			const value = String(district[en] || '');

			return {
				title: zh,
				subtitle: LEVEL_MAP[value] || value || '无',
				arg: LEVEL_MAP[value] || value,
				valid: true,
			};
		});
		aw.output(items);
	} catch (error) {
		aw.error(error);
	}
};

adcode();
