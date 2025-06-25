// goods.js
Page({
  data: {
    goodsList: [
      {
        id: 1,
        name: '肯德基全家桶',
        price: 88,
        image: 'https://dummyimage.com/200x200/ffcc00/000&text=KFC+1'
      },
      {
        id: 2,
        name: '脆皮炸鸡 5 只装',
        price: 45,
        image: 'https://dummyimage.com/200x200/ff9966/000&text=KFC+2'
      },
      {
        id: 3,
        name: '桶装可乐 2L',
        price: 10,
        image: 'https://dummyimage.com/200x200/99ccff/000&text=Cola'
      }
    ]
  },

  addToCart(e) {
    const id = e.currentTarget.dataset.id;
    const item = this.data.goodsList.find(i => i.id === id);
  
    // 从本地获取购物车列表
    let cart = wx.getStorageSync('cart') || [];
  
    // 判断商品是否已存在购物车
    let existing = cart.find(i => i.id === item.id);
    if (existing) {
      existing.count += 1;
    } else {
      cart.push({
        ...item,
        count: 1
      });
    }
  
    // 存回本地
    wx.setStorageSync('cart', cart);
  
    // 提示用户
    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    });
  
    console.log('当前购物车：', cart);
  },
  
  //返回主页
  goToIndex() {
    wx.navigateTo({
      url: '/pages/index/index'
    });
  }

});
