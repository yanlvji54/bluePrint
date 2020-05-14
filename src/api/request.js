// 获取公用数据
import $ from '../utils/wxRequest';
const host = 'https://miniprogram.blueprintlive.cn/api';

const net = {
  login: host + '/login',
  personalAdd: host + '/person/add',
  indexList: host + '/person/find'
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
  return $.get({
    url: 'http://zjy.jxjst.gov.cn/w/cms/ry/getRyData',
    data: {
      cardNo: id
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
