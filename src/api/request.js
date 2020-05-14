// 获取公用数据
import $ from '../utils/wxRequest';
// 线上环境
// const host = 'https://miniprogram.blueprintlive.cn/api';
// 线下开发环境
const host = 'http://localhost:3000/api';

const net = {
  login: host + '/login',
  personalAdd: host + '/person/add',
  indexList: host + '/person/find',
  zjy: host + '/zjy'
};

const requestGetListData = function (user) {
  return $.post({
    url: net.indexList,
    data: user
  });
};

const requestGetIdData = function (id) {
  return $.post({
    url: net.idData,
    data: {
      id
    }
  });
};

const requestAddPerson = function (person) {
  return $.post({
    url: net.personalAdd,
    data: person
  });
};

const requsetGetPersonDetailById = function (id) {
  return $.post({
    url: net.zjy,
    data: {
      id
    }
  });
};

const requestLogin = function (person) {
  return $.post({
    url: net.login,
    data: person
  });
};

export { requestGetListData, requestGetIdData, requsetGetPersonDetailById, requestAddPerson, requestLogin };
