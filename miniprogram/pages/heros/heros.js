// miniprogram/pages/heros/heros.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    herosList: [],
    inputName: '',
    classSearchClicked: '',
    pageSkip: 0,  //当前页数
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
    const db = wx.cloud.database()
    let pageSkipNum = this.data.pageSkip
    // if (pageSkipNum === 0){
    //   getHerosListByRequire()
    // }
    db.collection('heros-list')
      .orderBy('hero_id', 'asc')
      .skip(pageSkipNum) 
      .limit(20)
      .get({
      success: res => {
        //判断头像图标是否有缓存，有缓存就取缓存数据，没有就存入缓存
        //只是储存了地址，不是图片文件
        // let list = res.data
        // for(let i in list){
        //   wx.getStorage({
        //     key: list[i].hero_id,
        //     success(res) {
        //       list[i].icon = res.data
        //     },
        //     fail(res) {
        //       wx.setStorage({
        //         key: list[i].hero_id,
        //         data: list[i].icon
        //       })
        //     }
        //   })
        // }

        this.setData({
          herosList: res.data,
          pageSkip: pageSkipNum + 20
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
   * 输入框内容
   */
  bindKeyInput: function(e){
    this.setData({
      inputName: e.detail.value
    })
  },
  /**
   * 条件查询
   */
  getHerosListByRequire: function(e){
    //避免渲染卡顿，先置空
    this.setData({
      herosList: []
    })
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const db = wx.cloud.database()
    // console.log(this.data.inputName, this.data.classSearchClicked)
    let req = {}
    if (this.data.inputName !== ''){
      req._name = this.data.inputName
    } else if (this.data.classSearchClicked !== ''){
      req._class = this.data.classSearchClicked
    } else {
      this.getHerosList()
    }
    // console.log('req', req)
    db.collection('heros-list').where(req).get({
      success: res => {
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
   * 搜索字段初始化
   */
  searchInit: function () {
    this.setData({
      classSearchClicked: ''
    })
  },
  /**
   * 修改职阶选择
   */
  changeClassName: function(e){
    let className = e.currentTarget.dataset.classname
    //已选中时，取消选中
    if (this.data.classSearchClicked === className){
      this.setData({
        classSearchClicked: ''
      })
    }else{
      this.setData({
        classSearchClicked: className
      })
    }
    this.getHerosListByRequire()
    // console.log('classSearchClicked', this.data.classSearchClicked)
  },
   /**
   * 跳转详情页面
   */
  getHeroDetail: function(e){
    // console.log('gethd', e.currentTarget.dataset.clickeditem)
    let hero_id = e.currentTarget.dataset.clickeditem.hero_id
    wx.navigateTo({
      url: '../heroDetail/heroDetail?hero_id=' + hero_id
    })
  }
})