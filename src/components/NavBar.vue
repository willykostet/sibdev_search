<template>
    <header class="nav-bar">
        <div class="container">
            <nav>
                <router-link to="/" ><img src="../assets/logo.svg" alt=""></router-link>
                <div class="nav">
                    <router-link to="/" exact-active-class="active"><span>Поиск</span> </router-link>
                    <router-link to="/list" exact-active-class="active"><span>Избранное</span> </router-link>
                </div>
                <button @click="logOut()" class="logout">Выйти</button>
            </nav>
        </div>
    </header>
</template>
<script>
export default {
    data() {
        return {
            active: 'search'
        }
    },
    methods: {
        logOut() {
            localStorage.removeItem('sibdevAccess')
            this.$router.push("/auth")
        },
    },
}
</script>
<style scoped lang="scss">
@import '@/assets/scss/index.scss';
nav {
	display: flex;
	align-items: center;
	padding: 10px 0;
	width: 100%;
	justify-content: flex-start;
}
.active {
	color: $primary;
	position: relative;
	&::after {
		position: absolute;
		content: '';
		height: 2px;
		width: 100%;
		bottom: -27px;
		left: 0;
		background: $primary;
	}
}
.nav {
	display: flex;
	gap: 20px;
	margin: 0;
	padding: 0;
	color: $light-black;
}
li {
	cursor: pointer;
	font-size: 14px;
	padding: 10px;
	line-height: 28px;
	color: $light-black;
}
header {
	img {
		width: 48px;
	}
}
.nav-bar {
	background: $white;
}
.logout {
	font-size: 14px;
	line-height: 28px;
	color: $primary;
	border: 0;
	background-color: $white;
	margin-left: auto;
}
@media screen and (max-width: 300px) {
	.nav {
		gap: 11px;
		font-size: 13px;
	}
}

</style>