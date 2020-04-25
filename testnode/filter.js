// 规定索引规则的方法
const axios = require('axios');

exports.getMessageById = function (data, id) {
  // 初步容错只支持数组
  if (!(data instanceof Array)) throw Error('prama is not a Array');
  if (!id) throw Error('id conuld be empty');
  let res;
  data.forEach(e=>{
    console.log(e);
    
    if (e.IdCard === id) res = e;
  })
  return res;
}

exports.getCompanyById = function (id) {
  const searchNet = 'http://zjy.jxjst.gov.cn/w/cms/ry/getRyData';
  return axios.post(searchNet, {
    cardNo: id
  })
  .then(function (response) {
    response.cardNo = id;
  })
  .catch(function (error) {
    console.log(error);
  });
}