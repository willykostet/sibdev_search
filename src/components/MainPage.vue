<template>
  <div class="main-page-wrapper">
    <AlertRequest v-show="alert" :isDisable="true" :inputVal="inputed" @close="onClose" @saved="onSaved" />
    <div class="search-page">
      <NavBar />
      <div class="search-main" v-if="$store.getters.getSearchList.length == 0">
        <h1 class="header-search">Поиск видео</h1>
        <div class="searchbar">
          <form action="" class="search-form" @submit.prevent="searchVideos(inputed, 12)">
            <input class="searchbar-input" v-model="inputed" type="text" placeholder="Что хотите посмотреть?">
            <button type="submit" class="search-btn">Найти</button>
          </form>
        </div>
      </div>
      <div class="container" v-else>
        <div class="search-wrapper">
          <h1 class="header-search">Поиск видео</h1>
          <div class="searchbar">
            <form action="" class="search-form" @submit.prevent="searchVideos(inputed, 12)">
              <input class="searchbar-input" v-model="inputed" type="text" placeholder="Что хотите посмотреть?">
              <div class="fav-wrapper">
                <div @click="alert = true" v-if="inputed" class="like-basic" :class="{ 'favAlert': favAlert }"></div>
                <div v-if="favAlert" class="fav-alert">
                  <p class="fav-alert-title">Поиск сохранён в разделе «Избранное»</p>
                  <p class="fav-alert-link"><router-link to="/list">Перейти в избранное</router-link> </p>
                </div>
              </div>
              <button type="submit" class="search-btn">Найти</button>
            </form>
          </div>
          <div v-if="$store.getters.getSearchList" class="result">
            <div class="result-header">
              <p> Видео по запросу <b>«{{ $store.getters.getinputField || 0 }}»</b> <span class="result-length">{{
                  $store.getters.getSearchList.length || 0
              }}</span></p>
              <div class="view-list">
                <div class="view-item" :class="{ 'active': setView == 0 }" @click="setView = 0">
                  <img src="../assets/view1.svg" alt="">
                </div>
                <div class="view-item" :class="{ 'active': setView == 1 }" @click="setView = 1">
                  <img src="../assets/view2.svg" alt="">
                </div>
              </div>
            </div>
            <div class="video-list" v-if="setView == 1">
              <VideoItem v-for="v in $store.getters.getSearchList" :key="v.id.videoId" :data="v" />
            </div>
            <div class="video-list list-wide" v-else>
              <VideoItem v-for="v in $store.getters.getSearchList" :key="v.id.videoId" :data="v" :wide="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import NavBar from './NavBar.vue'
import AlertRequest from './AlertRequest.vue'
import VideoItem from './VideoItem.vue'
export default {
  name: 'MainPage',
  components: { NavBar, AlertRequest, VideoItem },
  data() {
    return {
      favAlert: false,
      alert: false,
      inputed: '',
      setView: 1
    }
  },
  mounted() {
    if (this.$store.getters.getinputField != null) this.inputed = this.$store.getters.getinputField
  },

  methods: {
    searchVideos(searchTerm) {
      this.$store.dispatch('GET_DATA_API', { searchTerm })
    },
    onClose() {
      this.alert = false
    },
    onSaved() {
      this.favAlert = true
      setTimeout(() => {
        this.favAlert = false
      }, 3000);
    }
  }
}
</script>
  
<style lang="scss">
@import '@/assets/scss/index.scss';

.search-wrapper {
  width: 100%;
}

.error {
  color: $red;
  margin-bottom: 20px;
}

.search-main {
  max-width: 686px;
  width: 100%;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  text-align: center;

  .header-search {
    font-weight: bold;
    margin-bottom: 40px;
    margin-top: 0;
  }

  @media screen and (max-width: 700px) {
    max-width: 90%;
  }
}

.like-basic {
  cursor: pointer;
  width: 24px;
  height: 24px;
  background: url('../assets/like.svg');
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: center center;

  &:hover {
    background: url('../assets/like2.svg');

  }

  &.favAlert {
    background: url('../assets/like2.svg');
  }
}

.fav-wrapper {
  position: absolute;
  right: 160px;
  top: 10px;

  @media screen and (max-width: 450px) {
    right: 105px;
  }
}

.fav-alert {
  position: absolute;
  top: 100%;
  padding: 10px;
  font-size: 16px;
  line-height: 24px;
  box-shadow: 0px 2px 6px $border-black;
  border-radius: 10px;
  left: 50%;
  background: $white;
  z-index: 100;
  width: 220px;
  transform: translateX(-50%);
}

.fav-alert-title {
  color: $lightern-black;
  opacity: 0.5;
  margin-bottom: 15px;
}

.fav-alert-link {
  color: $primary;
  cursor: pointer;
}

.searcbar {
  display: flex;
  border-radius: 10px;
}

.search-btn {
  font-size: 18px;
  line-height: 24px;
  max-width: 150px;
  width: 100%;
  color: $white;
  background: $primary;
  height: 100%;
  padding: 10px 20px;
  border-radius: 0px 10px 10px 0px;
  border: 0;

  @media screen and (max-width: 450px) {
    max-width: 90px;
  }

  @media screen and (max-width: 300px) {
    font-size: 11px;
    line-height: 14px;
  }
}

input {
  &:focus {
    background: $gray;
    outline-color: $primary;
  }

  &:focus+.search-btn {
    border: 1px solid $primary;
    border-left: 0;
  }
}

.searchbar {
  position: relative;
  width: 100%;
  margin-top: 12px;
}

.search-form {
  display: flex;
  align-items: center;
}

.searchbar-input {
  width: 100%;
  height: 100%;
  font-size: 18px;
  border: 2px solid $dark-blue;
  line-height: 30px;
  padding: 10px 20px;
  border-radius: 10px 0px 0px 10px;
  border-right: none;

  @media screen and (max-width: 300px) {
    font-size: 11px;
    line-height: 30px;
  }
}

label {
  font-size: 16px;
  line-height: 22px;
}

.result {
  width: 100%;
  margin-top: 40px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .result-length {
    color: $dark-blue;
    margin-left: 15px;
  }
}

.view-list {
  display: flex;
  align-items: center;
}

.view-item {
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: 10px;
  opacity: 0.5;
}

.view-item.active {
  opacity: 1;
}

.header-search {
  margin-top: 40px;
  font-weight: normal;

  @media screen and (max-width: 300px) {
    margin-top: 25px;
    font-size: 18px;
  }
}

.video-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
  