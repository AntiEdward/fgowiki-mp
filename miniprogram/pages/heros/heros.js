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
   * 修改职阶选择
   */
  changeClassName: function (e) {
    let className = e.currentTarget.dataset.classname
    //已选中时，取消选中
    if (this.data.classSearchClicked === className) {
      this.setData({
        classSearchClicked: ''
      })
    } else {
      this.setData({
        classSearchClicked: className
      })
    }
    this.data.pageSkip = 0
    this.getHerosList()
    // console.log('classSearchClicked', this.data.classSearchClicked)
  },
  /**
   * 翻页
   */
  getNuxtPage: function(){
    // console.log('getNuxtPage')
    this.data.pageSkip++
    this.getHerosList()
  },
  /**
   * 获取英灵列表
   */
  getHerosList: function () {
    if (this.data.pageSkip === 0 && this.data.classSearchClicked === ''){
      //不是翻页，没有查询条件 - 全部查询
      this.getAllHerosList()
    } else if (this.data.pageSkip === 0 && this.data.classSearchClicked !== ''){
      //不是翻页，有查询条件 - 条件查询
      this.getHerosListByRequire(this.data.classSearchClicked)
    } else if (this.data.pageSkip !== 0 && this.data.classSearchClicked === ''){
      //是翻页，没有查询条件 - 翻页全部查询
      this.getAllHerosListSkip(this.data.pageSkip)
    }else{
      //是翻页，有查询条件 - 翻页条件查询
      this.getHerosListByRequireSkip(this.data.pageSkip,         this.data.classSearchClicked)
    }
  },
  /**
   * 查询全部英灵列表
   * skip(0) 会报错，全部查询的方法独立出来
   */
  getAllHerosList: function() {
    const db = wx.cloud.database()
    db.collection('hero-list')
      .orderBy('hero_id', 'asc')
      .limit(20)
      .get({
        success: res => {
          console.log('getAllHerosList')
          this.setData({
            herosList: res.data,
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
   * 条件查询 - 查询全部
   */
  getHerosListByRequire: function (_class) {
    //避免渲染卡顿，先置空
    this.setData({
      herosList: []
    })
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const db = wx.cloud.database()
    // console.log(this.data.inputName, this.data.classSearchClicked)
    let req = {}
    req.class = _class
    // 目前只有职阶查询
    // if (this.data.inputName !== '') {
    //   req._name = this.data.inputName
    // } else if (this.data.classSearchClicked !== '') {
    //   req._class = _class
    // }
    // console.log('req', req)
    db.collection('hero-list')
      .where(req)
      .limit(20)
      .get({
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
   * 查询全部英灵列表 - 翻页
   */
  getAllHerosListSkip: function(page){
    const db = wx.cloud.database()
    db.collection('hero-list')
      .orderBy('hero_id', 'asc')
      .skip(page * 20)
      .limit(20)
      .get({
        success: res => {
          // console.log('getAllHerosList')
          let array = this.data.herosList
          array = array.concat(res.data)
          this.setData({
            herosList: array,
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
   * 条件查询 - 翻页
   */
  getHerosListByRequireSkip: function(page, _class){
    const db = wx.cloud.database()
    let req = {}
    req._class = _class
    db.collection('hero-list')
      .where(req)
      .skip(page * 20)
      .limit(20)
      .get({
        success: res => {
          let array = this.data.herosList
          array = array.concat(res.data)
          this.setData({
            herosList: array
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
   * 搜索字段初始化
   */
  searchInit: function () {
    this.setData({
      classSearchClicked: ''
    })
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