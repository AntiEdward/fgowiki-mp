// miniprogram/pages/heros/heros.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    herosList: [],
    queryResult: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //页面加载时请求list
    this.getHerosList()
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 获取英灵列表
   */
  getHerosList: function(){
    // console.log('ss')
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('heros').get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2)
        })
        this.setData({
          herosList: res.data
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  /**
   * 条件查询
   */
  getHerosListByRequire: function(e){
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const db = wx.cloud.database()

    let req = {}
    let val = e.detail.value
    for(let i in val){
      if(val[i] !== ''){
        let descriptor = Object.create(null);
        descriptor.value = val[i]
        Object.defineProperty(req, i, descriptor)
      }
    }
    console.log('req', req)
    
    db.collection('heros').where({
      
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2)
        })
        this.setData({
          herosList: res.data
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
   /**
   * 跳转详情页面
   */
  getHeroDetail: function(e){
    // console.log('gethd', e.currentTarget.dataset.clickeditem)
    let name = e.currentTarget.dataset.clickeditem.name
    wx.navigateTo({
      url: '../heroDetail/heroDetail?name=' + name
    })
  }
})