// pages/cart/cart.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    totalPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const cart = wx.getStorageSync('cart') || [];
    this.setData({ cartList: cart });
    this.calculateTotal();
  },

  calculateTotal() {
    const cart = this.data.cartList;
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.count;
    });
    this.setData({ totalPrice: total.toFixed(2) });
  },
  
  submitOrder() {
    if (this.data.cartList.length === 0) {
      wx.showToast({ title: '购物车为空', icon: 'none' });
      return;
    }
  
    wx.showModal({
      title: '确认订单',
      content: `是否提交订单，总价：￥${this.data.totalPrice}`,
      success: (res) => {
        if (res.confirm) {
          wx.showToast({ title: '订单已提交', icon: 'success' });
  
          // 清空购物车
          wx.removeStorageSync('cart');
          this.setData({ cartList: [], totalPrice: 0 });
        }
      }
    });
  },
  updateCart(newCart) {
    wx.setStorageSync('cart', newCart);
    this.setData({ cartList: newCart });
  },

  increase(e) {
    const id = e.currentTarget.dataset.id;
    let cart = this.data.cartList;
    const item = cart.find(i => i.id === id);
    if (item) item.count += 1;
    this.updateCart(cart);
    this.calculateTotal(); // ✅ 新增
  },

  decrease(e) {
    const id = e.currentTarget.dataset.id;
    let cart = this.data.cartList;
    const index = cart.findIndex(i => i.id === id);
    if (index !== -1) {
      if (cart[index].count > 1) {
        cart[index].count -= 1;
      } else {
        cart.splice(index, 1); // 数量为 1，减少后直接移除
      }
    }
    this.updateCart(cart);
    this.calculateTotal(); // ✅ 新增
  },

  remove(e) {
    const id = e.currentTarget.dataset.id;
    let cart = this.data.cartList.filter(i => i.id !== id);
    this.updateCart(cart);
    this.calculateTotal(); // ✅ 新增
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  goToIndex() {
    wx.navigateTo({
      url: '/pages/index/index'
    });
  }
})