<template>
    <div class="alert-wrap">
        <form class="request-form">
            <h2 class="alert-title">{{ isDisable ? 'Сохранить запрос' : 'Изменить запрос' }}</h2>
            <label>Запрос</label>
            <input v-model="alertData.request" :disabled="isDisable" type="text" placeholder="чем кормить кота">
            <label><span class="red">*</span> Название</label>
            <input v-model="alertData.title" type="text" placeholder="Укажите название">
            <label>Сортировать по</label>
            <select name="select" v-model="alertData.select_filter" class="request-select">
                <option :value="null">-</option>
                <option v-for="(item, index) in sortList" :key="index" :value="item.filter" >{{ item.name }}</option>
            </select>
            <label>Максимальное количество</label>
            <div class="range-input-wrapper">
                <input type="range" class="range" id="volume" name="volume" min="0" max="50" step="1"
                    v-model="alertData.maxValue">
                <input class="range-input" v-model="alertData.maxValue" type="text" />
            </div>
            <p class="error" v-if="errored">{{ errored }}</p>
            <div class="alert-buttons">
                <button type="button" @click="cancel">{{ isDisable ? 'Не сохранять' : 'Не изменять' }}</button>
                <button type="button" class="save" @click="save()">{{ isDisable ? 'Сохранить' : 'Изменить' }}</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    props: ["inputVal", "isDisable", "maxVal", "nameVal", "idVal","orderVal"],
    data() {
        return {
            errored: false,
            alertData: {
                request: null,
                title: null,
                maxValue: 12,
                select_filter: null,
            },
            sortList:[
                {
                    filter:'date',
                    name:'По дате'
                },{
                    filter:'rating',
                    name:'По рейтингу'
                },{
                    filter:'relevance',
                    name:'По актуальности'
                },{
                    filter:'title',
                    name:'По названию'
                },{
                    filter:'videoCount',
                    name:'По количеству'
                },{
                    filter:'viewCount',
                    name:'По просмотру'
                },
            ]
        }
    },
    methods: {
        cancel() {
            this.$emit('close')
            this.errored = null
        },
        saved() {
            this.$emit('saved')
        },
        save() {
            if (!this.alertData.title && !this.alertData.request) { console.log(this.errored = 'Заполните поля'); return false }
            if (!this.alertData.title) { console.log(this.errored = 'Введите название'); return false }
            if (!this.alertData.request) { console.log(this.errored = 'Введите запрос'); return false }
            let r = {
                request: this.alertData.request,
                title: this.alertData.title,
                maxValue: this.alertData.maxValue,
                selectFilter: this.alertData.select_filter,
            }
            let currentUser = localStorage.getItem('currentUser')
            let currentUserData = JSON.parse(localStorage.getItem(currentUser))
            if (this.isDisable) {
                currentUserData.push(r)
                localStorage.setItem(currentUser, JSON.stringify(currentUserData))
                this.$store.commit('SET_SELECT_DATA')
            } 
            else {
                this.$store.commit('EDIT_SELECT_DATA', { id: this.idVal, data: r})
            }
            this.cancel()
            this.saved()
        },
    },
    watch: {
        inputVal: function (val) {
            this.alertData.request = val
        },
        maxVal: function (val) {
            this.alertData.maxValue = val
        },
        nameVal: function (val) {
            this.alertData.title = val
        },
        orderVal: function (val) {
            this.alertData.select_filter = val
        },
    },
}
</script>
<style lang="scss">
@import '@/assets/scss/index.scss';
.alert-wrap {
	position: absolute;
	width: 100%;
	height: 100vh;
	min-height: 560px;
	background: $light-blue;
	z-index: 100;
	display: flex;
	justify-content: center;
	align-items: center;
}
.request-form {
	max-width: 510px;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	box-shadow: 0px 10px 50px $lightern-blue;
	border-radius: 10px;
	padding: 30px;
	background-color: $white;
	input {
		outline: none;
		width: 100%;
		height: 48px;
		border: 1px solid $dark-blue;
		border-radius: 10px;
		padding: 5px 20px;
		font-size: 20px;
		line-height: 24px;
		margin-bottom: 24px;
	}
	select {
		outline: none;
		width: 100%;
		height: 48px;
		border: 1px solid $dark-blue;
		border-radius: 10px;
		padding: 5px 20px;
		font-size: 20px;
		line-height: 24px;
		margin-bottom: 24px;
	}
	.range {
		padding: 0;
	}
}
.alert-title {
	font-size: 18px;
	line-height: 28px;
	text-align: center;
	margin: 0 auto;
	margin-bottom: 36px;
}
.alert-buttons {
	width: 100%;
	display: flex;
	justify-content: space-between;
	button {
		max-width: 210px;
		width: 100%;
		border-radius: 10px;
		font-size: 18px;
		line-height: 24px;
		border: 0;
		padding: 14px 0px;
		text-align: center;
		cursor: pointer;
		color: $primary;
		background: $white;
		border: 1px solid $primary;
	}
	.save {
		background: $primary;
		color: $white;
	}
}
.range-input-wrapper {
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
}
.range-input {
	max-width: 100px;
	margin-left: 20px;
}
.red {
	color: $red;
}
@media screen and (max-width: 600px) {
	.request-form {
		max-width: 90%;
	}
	.alert-buttons {
		button {
			max-width: 48%;
		}
	}
}
@media screen and (max-width: 390px) {
	.request-form {
		padding: 20px 10px;
	}
	.alert-buttons {
		button {
			font-size: 18px;
			line-height: 24px;
		}
	}
	.alert-title {
		margin-bottom: 25px;
	}
}

</style>