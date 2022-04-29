/*
 * @Author: zhiguo.jzg
 * @Date: 2022-04-29 21:40:24
 * @Description: TODO: Description of file, its uses and information
 * @LastEditTime: 2022-04-30 11:23:11
 * @LastEditors: zhiguo.jzg
 */

export const LIST_KEYS = [
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

export const LEVEL_MAP = {
  country:'国家',

  province:'省份（直辖市会在province和city显示）',

  city:'市（直辖市会在province和city显示）',

  district:'区县',

  street:'街道',
};

export const getConfig = () => {
  return {
    url: process.env.ADCODE_API_URL || 'https://restapi.amap.com/v3/config/district',
    key: process.env.ADCODE_KEY,
    subdistrict: process.env.ADCODE_SUBDISTRICT || 0,
  };
};
