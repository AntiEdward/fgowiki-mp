// miniprogram/pages/craft/craft.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    craftList: [],
    pageSkip: 0,  //当前页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //页面加载时请求list
    this.getCraftListFirst()
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
   * 翻页
   */
    getNuxtPage: function(){
        // console.log('getNuxtPage')
        this.data.pageSkip++
        this.getCraftList(this.data.pageSkip)
    },
    /**
     * 初次查询 - 第一页数据
     */
    getCraftListFirst(){
        const db = wx.cloud.database()
        db.collection('craft-list')
        .orderBy('craft_id', 'asc')
        .limit(20)
        .get({
            success: res => {
                
                let array = this.data.craftList
                // console.log('getCraftListFirst', array)
                //过滤br符号
                for(let i in res.data){
                    res.data[i].skill_describe = res.data[i].skill_describe.replace(/<br \/>/g, "\n")
                    // console.log(res.data[i].skill_describe)
                }
                array = array.concat(res.data)
                this.setData({
                    craftList: array,
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
     * 分页查询
     */
    getCraftList: function(page){
        const db = wx.cloud.database()
        db.collection('craft-list')
        .orderBy('craft_id', 'asc')
        .skip(page * 20)
        .limit(20)
        .get({
            success: res => {
                // console.log('getAllHerosList')
                let array = this.data.craftList
                //过滤br符号
                for(let i in res.data){
                    res.data[i].skill_describe = res.data[i].skill_describe.replace(/<br \/>/g, "\n")
                    
                    // console.log(res.data[i].skill_describe)
                }
                array = array.concat(res.data)
                this.setData({
                    craftList: array,
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
    }
})