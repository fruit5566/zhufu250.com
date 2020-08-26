<template>
  <view class="page">
    <view class="search_bar"><input v-model="key" confirm-type='search' class="search" placeholder="输入关键字" @confirm="getBookmarks"></view>
    <view class="list-view">
      <view v-if="!dataList.length"> 查询无数据</view>
      <view class="item" v-for="item in dataList">
        <navigator :url="'/pages/webview/webview?url='+ encodeURIComponent(JSON.stringify(item.url))">
          <view class="title">
            <image mode="widthFix" class="web_icon" @error="imageErr" :src="item.icon||'https://zhufu250.com/favicon.ico'"></image>
            <text class="title">{{item.title}}</text>
          </view>
        </navigator>
        <view><text class="desc">{{item.desc}}</text></view>
        <view><text class="time">{{item.created_at}}</text></view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        key: '',
        dataList: [],
        nodata: true
      };
    },
    onLoad(option) {
      this.key = JSON.parse(decodeURIComponent(option.key))
      this.getBookmarks()
    },
    methods: {
      imageErr() {
        // console.log('imageErr')
      },
      getBookmarks() {
        uni.request({
          url: 'https://api.zhufu250.com/search',
          method: 'GET',
          data: {
            key: this.key
          },
          success: (res) => {
            // console.log(res.data)
            this.dataList = res.data
            uni.hideKeyboard();
          },
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page {
    display: flex;
    flex: 1;
    width: 750rpx;
    box-sizing: border-box;
    position: relative;
  }

  .search_bar {
    box-sizing: border-box;
    position: fixed;
    z-index: 999;
    width: 750rpx;
    top: 0;
    left: 0;
    background-color: $uni-color-primary;
    padding: 0 16px 10px 16px;
    overflow: hidden;
  }

  .search {
    background-color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 14px;
  }

  .list-view {
    box-sizing: border-box;
    flex: 1;
    width: 750rpx;
    flex-direction: column;
    margin-top: 40px;
    padding: 15px;
  }

  .item {
    padding: 10px 0;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #f5f5f5;
    // line-height: 16px;
  }

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    color: $uni-text-color;
    lines: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    font-weight: 700;
  }

  .desc {
    // margin-top: 4px;
    font-size: 14px;
    color: #555;
    lines: 2;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    line-height: 18px;
    -webkit-box-orient: vertical;
  }

  .time {
    margin-top: 4px;
    font-size: 14px;
    color: $uni-text-color-grey;
  }

  .up_loading {
    text-align: center;
    width: 750rpx;
    font-size: 16px;
    background-color: #fff;
    align-items: center;
    justify-content: center;
    padding-bottom: 15px;
    color: #555;
  }

  .web_icon {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
</style>
