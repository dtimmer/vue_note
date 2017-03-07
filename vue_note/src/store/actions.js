import * as types from './mutation-types'

export default {
	[types.changeListStatus]({ commit }, { bool }) {
		commit('changeListStatus', bool);
	},
	[types.addNote]({ commit }) {
		commit('addNote');
	},
	[types.editNote]({ commit }, { text }) {
		commit('editNote', text);
	},
	[types.deleteNote]({ commit }) {
		commit('deleteNote');
	},
	[types.toggleFavorite]({ commit }) {
		commit('toggleFavorite');
	},
	[types.setActiveNote]({ commit }, { note }) {
		commit('setActiveNote', note);
	},
	[types.initNotes]({ commit }, { notes }) {
		commit('initNotes', notes);
	},
	[types.eidtNoteTitle]({ commit }, { title }) {
		commit('eidtNoteTitle', title);
	}
}