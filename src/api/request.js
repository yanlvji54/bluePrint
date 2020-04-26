// 获取公用数据
import $ from '../utils/wxRequest';
const host = 'http://localhost:8000';

const net = {
  indexList: host + '/data',
  idData: host + '/data/id',
  personalAdd: host + '/data/addPersonal'
};

const requestGetListData = function () {
  return $.get({
    url: net.indexList,
    data: {}
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
    data: {
      person
    }
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

export { requestGetListData, requestGetIdData, requsetGetPersonDetailById, requestAddPerson };
