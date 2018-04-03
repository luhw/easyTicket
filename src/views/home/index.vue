<template>
	<div @click="t()">
		HOME!!!
		{{ pic_list }}
		<Show/>
	</div>
</template>

<script>
	import { createNamespacedHelpers  } from 'vuex'
	import Show from '@/components/Show'

	const { mapGetters, mapState, mapActions } = createNamespacedHelpers('test')


	export default {
		name: 'home',
		computed: {
			...mapGetters(['pic_list'])
		},
		methods: {
			...mapActions(['addPic']),
			t2() {
				this.addPic('2222')
			},
			t() {
				this.t2();
				console.log('this==========', this, this.getAssets, this.addPic)
			}
		},
		components: {
			Show
		},
		created(){
      // this.addPic('111')
    },
	}
</script>

<style scoped></style>