// index.js
Page({
  goToGoods() {
    wx.navigateTo({
      url: '/pages/goods/goods'
    });
  },
goToCart() {
    wx.navigateTo({
      url: '/pages/cart/cart'
    });
  },
  goToOrderPage() {
    wx.navigateTo({
      url: '/pages/order/order'
    });
  }
})