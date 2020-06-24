// 获取公用数据
import $ from '../utils/wxRequest';
// 线上环境
// const host = 'https://miniprogram.blueprintlive.cn/api';
// 线下开发环境
const host = 'http://localhost:3000/api';

const net = {
  login: host + '/login',
  register: host + '/register',
  personalAdd: host + '/person/add',
  indexList: host + '/person/find',
  idData: host + '/person/getbook',
  deleteBook: host + '/person/delete',
  updateBook: host + '/person/renewal',
  zjy: host + '/zjy'
};

const requestGetListData = function (user) {
  return $.post({
    url: net.indexList,
    data: user
  });
};

const requestGetIdData = function (book) {
  return $.post({
    url: net.idData,
    data: book
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

const requestDeletePeople = function (book) {
  return $.post({
    url: net.deleteBook,
    data: book
  });
};

const requestLogin = function (person) {
  return $.post({
    url: net.login,
    data: person
  });
};

const requestRegister = function (person) {
  return $.post({
    url: net.register,
    data: person
  });
};

const requestRewanel = function (person) {
  return $.post({
    url: net.updateBook,
    data: person
  });
};

export { requestGetListData, requestGetIdData, requsetGetPersonDetailById, requestAddPerson, requestLogin, requestRegister, requestDeletePeople, requestRewanel };
