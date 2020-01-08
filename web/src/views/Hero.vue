<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
      <img src="../assets/logo.png" height="30" />
      <!-- flex-1表示增大占据剩余所有空间 -->
      <div class="px-2 flex-1">
        <span class>SE</span>
        <span class="ml-2">攻略站</span>
      </div>
      <!-- 转义字符gt表示>      & ;表示转义 -->
      <router-link to="/" tag="div">更多英雄 &gt;</router-link>
    </div>
    <!-- style是绑定的变量，只可以写在这边 -->
    <!-- 头部 -->
    <div class="top d-flex" :style="{'background-image':`url(${model.banner})`}">
      <div class="info text-white p-3 h-100 jc-end d-flex flex-column">
        <div class="fs-xs">{{model.title}}</div>
        <h2 class="my-2">{{model.name}}</h2>
        <!-- 需要在服务端先把分类关联调出来,但是这边职业直接用title就行 -->
        <div>{{model.categories.map(v=>{return v.name}).join('AND')}}</div>
        <div class="d-flex jc-btw pt-2">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-primary">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-primary">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-primary">{{model.scores.survive}}</span>
          </div>
          <router-link to="/" tag="span" class="text-white fs-sm">回到首页 &gt;</router-link>
        </div>
      </div>
    </div>
    <!-- body swiper切换 jc-around左右分散对齐，留有边距-->
    <div>
      <div class="bg-white b-shadow">
        <div class="nav d-flex jc-around pt-3 pb-2 flex-wrap">
          <div class="nav-item active">
            <div class="nav-link">新 手</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">进 阶</div>
          </div>
        </div>
      </div>
      <swiper>
        <swiper-slide>
          <div>
            <!-- 技能图标 -->
            <div class="p-3 bg-white ">
              <div class="d-flex">
                <router-link to="/" tag="button" class="btn btn-lg flex-1">
                  <i class="iconfont icon-Menu"></i>
                  介绍视频
                </router-link>
                <router-link to="/" tag="button" class="btn btn-lg flex-1 ml-2">
                  <i class="iconfont icon-Menu"></i>
                  介绍视频
                </router-link>
              </div>
              <!-- skills -->
              <div class="skills bg-white mt-4">
                <div class="d-flex jc-around">
                  <img
                    class="icon"
                    @click="currentSkillIndex = i"
                    :class="{active:currentSkillIndex === i}"
                    :src="item.icon"
                    v-for="(item,i) in model.skills"
                    :key="item.name"
                  />
                </div>
                <div v-if="currentSkill">
                  <div class="d-flex py-4">
                    <strong class="m-0 fs-lg">{{currentSkill.name}}</strong>
                    <span
                      class="text-grey fs-xs ml-4"
                    >（冷却值：{{currentSkill.cd}} 消耗：{{currentSkill.cost}} ）</span>
                  </div>
                  <p>{{currentSkill.description}}</p>
                  <div class="b-bottom"></div>
                  <p class="text-grey mt-3 m-1">小提示：{{currentSkill.tips}}</p>
                </div>
              </div>
            </div>
            <!-- 装备推荐 -->
            <m-card plain icon="Menu" title="装备推荐" class="hero-items">
              <div class="fs-xl">装备组A</div>
              <!-- 由于是一张图片和下方文字组成，需要在外面嵌套一个div -->
              <div class="d-flex jc-around text-center my-3">
                <div v-for="item in model.items1" :key="item.name" >
                  <img class="icon" :src="item.icon" alt="">
                  <div class="fs-xxs">{{item.name}} </div>
                </div>
              </div>
              <div class=""></div>
              <div class="fs-xl mt-3">装备组B</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.items1" :key="item.name" >
                  <img class="icon" :src="item.icon" alt="">
                  <div class="fs-xxs">{{item.name}} </div>
                </div>
              </div>
            </m-card>

            <m-card plain icon="Menu" title="使用技巧">
              <p class="m-0">
                {{model.usageTips}}
              </p>
            </m-card>

            <m-card plain icon="Menu" title="使用思路">
              <p class="m-0">
                {{model.battleTips}}
              </p>
            </m-card>

            <m-card plain icon="Menu" title="英雄关系">
              <div class="fs-xl">配合</div>
              <div v-for="item in model.partners" :key="item.name" 
              class="d-flex pt-3">
                <img :src="item.hero.avatar" alt="" height="50">
                <p class="flex-1 m-0 ml-3">
                  {{item.description}}
                </p>
              </div>
              <div class=" mt-3"></div>
            </m-card>
          </div>
        </swiper-slide>
        <swiper-slide></swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data () {
    return {
      model: null,
      currentSkillIndex: 0,
    }
  },
  // 基于当前技能索引值得到当前技能
  computed: {
    currentSkill () {
      return this.model.skills[this.currentSkillIndex]
    }
  },
  methods: {
    async fetch () {
      const res = await this.$http.get(`heroes/${this.id}`)
      this.model = res.data
    }
  },
  created () {
    this.fetch()
  },
}
</script>

<style lang="scss">
@import "../assets/scss/_variable.scss";
.page-hero {
  // 做背景图需要定义高度，没有高度无法显示
  .top {
    height: 50vw;
    // 宽auto，高100%
    background-size: auto 100%;
    // top：竖直方向上尽量往上靠；center：水平方向尽量居中
    background: #fff no-repeat top center;
  }
  // 背景图的渐变效果
  .info {
    // 黑色 透明度从0 渐变到1
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  }
  .scores {
    .badge {
      margin: 0 0.25rem;
      display: inline-block;
      width: 1rem;
      height: 1rem;
      text-align: center;
      line-height: 0.95rem;
      border-radius: 50%;
      font-size: 0.6rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
  .skills {
    img.icon {
      width: 65px;
      height: 65px;
      &.active {
        border: 2px solid #f79321e1;
      }
      border: 2px solid white;
      border-radius: 50%;
    }
  }

  .hero-items{
    .icon{
      width: 3.8462rem;
      height: 3.8462rem;
      border-radius: 50%;
    }
  }
}
</style>