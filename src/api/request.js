// 获取公用数据
import $ from '../utils/wxRequest';

const net = {
  indexList: '/data',
  idData: '/data/id'
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

const requsetGetPersonDetailById = function (id) {
  return $.get({
    url: 'http://zjy.jxjst.gov.cn/w/cms/ry/getRyData',
    data: {
      cardNo: id
    }
  });
};

export { requestGetListData, requestGetIdData, requsetGetPersonDetailById };
