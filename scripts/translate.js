/**
 *  Youdao Translate, My private account is for testing purposes only.
 *  Please go to the official account to apply for an account. Thank you for your cooperation.
 *  APP ID：055c2d71f9a05214
 *  Secret key：ZcpuQxQW3NkQeKVkqrXIKQYXH57g2KuN
 */

/* eslint-disable */
const md5 = require('md5');
const qs = require('qs');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const jsonFormat = require('json-format');
const { i18n } = require('../src/config/setting');
const { languages, defaultLanguage } = i18n;
const locales = {};

languages.forEach(item => {
  locales[item.key] = require(`../src/locales/${item.key}/mapping.json`);
});

const youdao = ({ q, from, to }) =>
  new Promise((resolve, reject) => {
    {
      const appid = '055c2d71f9a05214';
      const appse = 'ZcpuQxQW3NkQeKVkqrXIKQYXH57g2KuN';
      const salt = Date.now();

      const sign = md5(appid + q + salt + appse);
      const query = qs.stringify({
        q,
        from,
        to,
        appKey: appid,
        salt,
        sign
      });

      axios.get(`http://openapi.youdao.com/api?${query}`).then(({ data }) => {
        if (data.query && data.translation[0]) {
          resolve(data.translation[0]);
        } else {
          resolve(q);
        }
      });
    }
  });

const transform = async ({ from, to, locales, outputPath }) => {
  for (const key in locales[from]) {
    if (locales[to][key]) {
      console.log(`add to skip: ${key}`);
    } else {
      let value = locales[from][key];
      let res = value;
      let way = 'youdao';
      const [type, ...rest] = key.split('.');
      if (to === 'en' && type === 'menu') {
        res = rest.pop();
        way = 'maintain menu';
      } else {
        const reg = '{([^{}]*)}';
        const tasks = value
          .match(new RegExp(`${reg}|((?<=(${reg}|^)).*?(?=(${reg}|$)))`, 'g'))
          .map(item => {
            if (new RegExp(reg).test(item)) {
              return Promise.resolve(item);
            }
            return youdao({
              q: value,
              from,
              to
            });
          });
        res = (await Promise.all(tasks)).join('');
      }
      locales[to][key] = res;
      console.log(`${way}: ${from} -> ${to}: key:${key} : ${value} -> ${res}`);
    }
  }
  await fs.writeFileSync(
    path.resolve(__dirname, outputPath),
    jsonFormat(locales[to], {
      type: 'space',
      size: 2
    })
  );
};
(async () => {
  const tasks = languages
    .map(item => ({
      from: defaultLanguage,
      to: item.key
    }))
    .filter(item => item.from !== item.to);

  for (const item of tasks) {
    console.log(`start: ${item.from} -> ${item.to}`);
    await transform({
      from: item.from,
      to: item.to,
      locales,
      outputPath: `../src/locales/${item.to}/mapping.json`
    });
    console.log(`completed: ${item.from} -> ${item.to}`);
  }

  console.log('All translations have been completed.');
})();
