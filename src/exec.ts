/*
 * @Author: zhiguo.jzg
 * @Date: 2022-04-30 11:42:52
 * @Description: TODO: Description of file, its uses and information
 * @LastEditTime: 2022-04-30 11:55:27
 * @LastEditors: zhiguo.jzg
 */
import alfy from 'alfy';
import { getConfig, LIST_KEYS, LEVEL_MAP } from './config/index.js'; // node esm require extension .js

interface IDistrict {
  citycode: string;
  adcode: string;
  name: string;
  polyline?: string;
  center: string;
  level: string;
  districts?: IDistrict[];
}
interface IResponse {
  status: '0' | '1';
  info: string;
  infocode: string;
  count: number;
  districts: Array<IDistrict>;
}

export const run = async () => {
  try {
    const keywords = alfy.input;
    const { key, subdistrict, url } = getConfig();

    if (!key) {
      throw new Error('key is required');
    }
    const query = `?subdistrict=${subdistrict}&key=${key}&keywords=${keywords}`;
    const data = (await alfy.fetch(url + query)) as IResponse;
    if (data.status !== '1') {
      throw new Error(data.info);
    }
    const district = data.districts[0];
    if (!district) {
      throw new Error('no district found');
    }
    const items = LIST_KEYS.map(({ en, zh }) => {
      const value = String(district[en]||'');
      
      return {
        title: zh,
        subtitle: LEVEL_MAP[value] || value || '无',
        arg: LEVEL_MAP[value] || value,
        valid: true,
      };
    });
    alfy.output(items);
  } catch (err) {
    alfy.error(err as Error);
  }
};