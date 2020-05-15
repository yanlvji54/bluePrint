const wxLogin = function (code) {
  return new Promise((resolve, reject) => {
    wx.login({
      success (res) {
        if (res.code) {
          resolve(res.code);
        } else {
          reject(res.errMsg);
        }
      }
    });
  });
};

export {
  wxLogin
};
