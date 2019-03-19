// miniprogram/pages/addHerosList/addHerosList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  add: function(){
    const db = wx.cloud.database()
    db.collection('heros-list-test').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        starts: "ceshi"
      }
    })
      .then(res => {
        console.log(res)
      })
      .catch(console.error)
  }


})