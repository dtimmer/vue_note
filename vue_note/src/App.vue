<template>
	<div id="app">
		<toolbar></toolbar>
		<notes-list></notes-list>
		<notes-editor></notes-editor>
	</div>
</template>

<script>
	import Vue from 'vue'
	import VueResource from "vue-resource"
	import { mapActions, mapState, mapGetters } from 'vuex'
	import App from './App'
	
	Vue.use(VueResource);

	import Toolbar from "./components/Toolbar.vue";
	import NotesList from "./components/NotesList.vue";
	import NotesEditor from "./components/NotesEditor.vue";

	export default {
		name: 'app',
		components: {
			Toolbar,
			NotesList,
			NotesEditor
		},
		computed: {
			...mapState({
				isAllList: state => state.isAllList,
				notes: state => state.notes,
				activeNote: state => state.activeNote,
			}),
			...mapGetters({
				favoriteNotes: 'favoriteNotes',
			}),
			save() {
				this.$http.post('/save.action', this.$store.state).then((res) => res.json()).then((data) => console.log(data));
			}
		},
		beforeCreate() {
			this.$http.get('/test.action').then(function(res) {
				return res.json();
			}).then((data) => this.initNotes({notes: data}));
		},
		methods: {
			...mapActions(['initNotes'])
		},
		watch: {
			'isAllList': function() {
				return this.save;
			},
			'notes': function() {
				return this.save;
			},
			'activeNote': {
				handler: function() {
					return this.save;
				},
				deep: true
			},
//			'activeNote.favorite': function() {
//				return this.save;
//			},
//			'activeNote.text': function() {
//				return this.save;
//			},
//			'activeNote.title': function() {
//				return this.save;
//			}
		}
	}
</script>

<style>

</style>