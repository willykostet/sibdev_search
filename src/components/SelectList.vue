<template>
  <div class="main-page-wrapper">
    <AlertRequest v-show="alert" :idVal="idVal" :isDisable="false" :maxVal="edited?.maxValue" :nameVal="edited?.title"
      :inputVal="edited?.request" :orderVal="edited?.selectFilter" @close="alert = false" />
    <div class="search-page">
      <NavBar />
      <div class="container">
        <div class="list-wrapper">
          <h1 class="header-search">Избранное</h1>
          <div class="favlist">
            <div class="favlist-item" v-for="(f, index) in $store.getters.getSelectList" :key="index">
              <span class="favlist-item-name" @click="searchVideos(f.request, f.maxValue,f.selectFilter)">{{ f?.title }}</span>
              <div class="action-list">
                <span class="action-item edit" @click="edit(f, index)">Изменить</span>
                <span class="action-item remove" @click="deleteItem(f)">Удалить</span>
              </div>
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
export default {
  name: 'MainPage',
  components: { NavBar, AlertRequest },
  data() {
    return {
      alert: false,
      edited: null,
      idVal: null
    }
  },
  methods: {
    searchVideos(searchTerm, maxVal,selectFilter) {
      this.$store.dispatch('GET_DATA_API', { searchTerm, maxVal,selectFilter })
      this.$router.push('/')
    },
    deleteItem(data) {
      this.$store.commit('DELETE_SELECT_DATA', data)
    },
    edit(data, index) {
      this.alert = true
      this.edited = data
      this.idVal = index
    }
  },
  mounted() {
    this.$store.commit('SET_SELECT_DATA')
  },
}
</script>
<style lang="scss">
@import '@/assets/scss/index.scss';
.favlist-item-name {
	width: 100%;
	display: block;
}
.favlist {
	background: $white;
	border-radius: 10px;
	margin-top: 40px;
}
.favlist-item {
	cursor: pointer;
	padding: 13px 20px;
	font-size: 16px;
	line-height: 20px;
	border-bottom: 1px solid $border-black;
	font-weight: 600;
	display: flex;
	justify-content: space-between;
	width: 100%;
	&:last-child {
		border: none;
	}
}
.action-list {
	display: flex;
	align-items: center;
}
.action-item {
	margin-left: 5px;
	cursor: pointer;
	font-size: 14px;
	line-height: 20px;
}
.edit {
	color: $primary;
}
.remove {
	color: $red;
}


</style>
  
