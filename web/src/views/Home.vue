<template>
  <div id="app">
    <!-- 幻灯片 -->
    <div class="b-shadow">
      <swiper :options="swiperOption">
        <swiper-slide>
          <img class="w-100" src="../assets/pic/ubi/tso.jpg" alt />
        </swiper-slide>
        <swiper-slide>
          <img class="w-100" src="../assets/pic/ubi/ef.jpg" alt />
        </swiper-slide>
        <swiper-slide>
          <img class="w-100" src="../assets/pic/ubi/anno2205.jpg" alt />
        </swiper-slide>
        <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
      </swiper>
    </div>
    <!-- 九宫格图片精灵图标 -->
    <!-- d-flex保证div显示在一行；flex-warp另其能够换行 -->
    <div class="nav-icons b-shadow bg-white mt-3 text-center w-100 pt-3 text-grey">
      <div class="d-flex flex-wrap" v-show="isShow">
        <div class="nav-item mb-2">
          <!-- <div class="nav-item mb-2" v-for="n in 10" :key="n"> -->
          <i class="sprite sprite-news"></i>
          <div>news</div>
        </div>
        <div class="nav-item mb-2">
          <i class="sprite sprite-story"></i>
          <div>story</div>
        </div>
        <div class="nav-item mb-2">
          <i class="sprite sprite-pic"></i>
          <div>picture</div>
        </div>
        <div class="nav-item mb-2">
          <i class="sprite sprite-role"></i>
          <div>role</div>
        </div>
        <div class="nav-item mb-2">
          <i class="sprite sprite-sbag"></i>
          <div>sbag</div>
        </div>
        <div class="nav-item mb-2">
          <i class="sprite sprite-roll"></i>
          <div>roll</div>
        </div>
        <div class="nav-item mb-2">
          <i class="sprite sprite-board"></i>
          <div>board</div>
        </div>
        <div class="nav-item mb-2">
          <i class="sprite sprite-hero"></i>
          <div>hero</div>
        </div>
        <div class="nav-item mb-2">
          <i class="sprite sprite-group"></i>
          <div>group</div>
        </div>
        <div class="nav-item mb-2">
          <i class="sprite sprite-wechat"></i>
          <div>wechat</div>
        </div>
      </div>
      <!-- 加上d-flex和ai-center保证i标签图标和span文字内容水平对齐 -->
      <div @click="fold" class="bg-light py-2 fs-sm d-flex jc-center ai-center">
        <i class="sprite sprite-arrow mr-1"></i>
        <!-- 加上span比较容易控制 -->
        <span>{{msg}}</span>
      </div>
    </div>
    <!-- 引用封装的卡片布局 -->
    <!-- 新闻资讯 -->
    <m-list-card icon="Menu" title="新闻资讯" :categories="newsData">
      <!-- #表示要和ListCard组件里面的叫items的slot相关,{}取在那边绑定的category -->
      <!-- 在父组件中直接拿到子组件的数据 -->
      <template #items="{category}">
        <!-- router-link本来是a标签显示，用tag指定显示为div -->
        <router-link 
        tag="div"
        :to="`/articles/${news._id}`"
        class="py-2 fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
          <span class="text-grey">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <!-- text-ellipsis文本溢出范围就显示... -->
          <span class="flex-grow-1 text-dark text-ellipsis pr-2">{{news.title}}</span>
          <!-- 事件格式化，date是下面定义的方法 -->
          <span class="text-grey fs-sm">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>

    <!-- 英雄列表 -->
    <m-list-card icon="people" title="任务列表" :categories="heroData">
      <template #items="{category}">
        <!-- 每张图片都有p-2的边距，所以要在这边给父盒子加一个负边距，使左右两边对齐。 -->
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem;">
          <!-- <router-link 
          tag="div"
          :to="`/heroes/${hero._id}`"
          class="p-2 fs-lg text-center" style="width:20%;" 
          v-for="(hero,i) in category.heroList" 
          :key="i"> -->
          <router-link 
          tag="div"
          :to="`/character/${hero._id}`"
          class="p-2 fs-lg text-center" style="width:20%;" 
          v-for="(hero,i) in category.heroList" 
          :key="i">
            <img :src="hero.avatar" class="w-100 h-80"/>
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>

    <!-- 视频推荐 -->
    <m-card icon="news" title="视频推荐"></m-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  filters: {
    date (val) {
      return dayjs(val).format('MM/DD')
    }
  },
  data () {
    return {
      isShow: true,
      msg: '收起',
      swiperOption: {
        // 2秒轮播效果
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.pagination-home',
          // dynamicBullets:true
        },
      },
      newsData: [],
      heroData: [],
    }
  },
  methods: {
    fold () {
      this.isShow = !this.isShow
      if (this.isShow) {
        this.msg = '收起';
      } else {
        this.msg = '展开';
      }
    },
    async fetchNewsData () {
      const res = await this.$http.get('/news/list')
      this.newsData = res.data
    },
    async fetchHeroData () {
      const res = await this.$http.get('/heroes/list')
      this.heroData = res.data
    }
  },
  created () {
    this.fetchNewsData(),
      this.fetchHeroData()
  },
}
</script>

<style lang="scss">
@import "../assets/scss/_variable.scss";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 0.9;
    border-radius: 0.153846rem;
    background: #fff;
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "primary");
    }
  }
}
.nav-icons {
  .nav-item {
    // 一行显示四个
    width: 25%;
    // border-left: 1px solid $border-color;
    // //css3实现第（4n+1）个元素不加右边框,用它的序号除以4，处理余数为1
    // &:nth-child(4n+1){
    //   border-left: none;
    // }
    border-right: 1px solid $border-color;
    //css3实现第（4n+1）个元素不加右边框,用它的序号除以4，处理余数为1
    &:nth-child(4n) {
      border-right: none;
    }
  }
}

//图片精灵，一般图标是按照双倍像素设计，展示的时候一般是375px
.sprite {
  background: url("../assets/pic/index.png") no-repeat 0 0;
  background-size: 28.846154rem;
  //sprite写在i标签情况下必须要加display，不然无法设置宽高，宽高设置对于精灵图片来说是必须的
  display: inline-block;
  //定义其中的每一个图标
  width: 1.769231rem;
  height: 1.538462rem;
  //因为所有图标都在index.png一张图中，用spritecow网站来定位
  &.sprite-news {
    background-position: 63.546% 15.517%;
  }
  &.sprite-story {
    background-position: 90.483% 15.614%;
  }
  &.sprite-pic {
    background-position: 10.408% 15.517%;
  }
  &.sprite-role {
    background-position: 9.728% 1.266%;
    width: 2rem !important;
  }
  &.sprite-sbag {
    background-position: 36.746% 0.924%;
    height: 1.692308rem !important;
  }
  &.sprite-roll {
    background-position: 36.467% 15.287%;
  }
  &.sprite-board {
    background-position: 89.733% 1.266%;
  }
  &.sprite-hero {
    background-position: 10.408% 27.209%;
  }
  &.sprite-group {
    background-position: 36.827% 41.272%;
  }
  &.sprite-wechat {
    background-position: 0 96.207%;
  }
  &.sprite-arrow {
    width: 0.769231rem !important;
    height: 0.769231rem !important;
    background-position: 38.577% 52.076%;
  }
}

//调整iconfont大小
.icon-Menu {
  font-size: 1.538462rem !important;
}

.card-header {
  border-bottom: 0.076923rem solid;
  border-bottom-color: map-get($colors, "border-grey");
}
</style>