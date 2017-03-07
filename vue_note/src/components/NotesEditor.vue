<template>
	<div id="note-editor">
		<input type="text" v-model="textTitle" @change="eidtNoteTitle({title: textTitle})" />
		<textarea class="form-control" v-model="textVal" @change="editNote({text: textVal})"></textarea>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapActions } from "Vuex";

	export default {
		data() {
			return {
				textVal: "",
				textTitle: ""
			}
		},
		computed: {
			...mapState({
				activeNote: state => state.activeNote,
			})
		},
		methods: {
			...mapActions({
				editNote: 'editNote',
				eidtNoteTitle: 'eidtNoteTitle'
			}),
		},
		watch: {
			activeNote: function() {
				this.$data.textVal = this.activeNote['text'];
				this.$data.textTitle = this.activeNote['title'];
			},
		}
	}
</script>

<style>

</style>