import * as types from './mutation-types'

export default {
	[types.changeListStatus](state, bool) {
		state.isAllList = bool;
	},
	[types.addNote](state) {
		const newNote = {
			text: 'New note',
			title: 'New',
			favorite: !state.isAllList,
			_rm: Math.random(),
		}
		state.notes.push(newNote);
		state.activeNote = newNote;
	},
	[types.editNote](state, text) {
		state.activeNote.text = text;
	},
	[types.deleteNote](state) {
		let rm = state.activeNote['_rm'];
		let index = state.notes.findIndex(function(v, i) {
			if(rm == v['_rm']) return true;
			return false;
		});
		if(index >= 0) state.notes.splice(index, 1);
		state.activeNote = state.notes[0] || {};
	},
	[types.toggleFavorite](state) {
		state.activeNote['favorite'] = !state.activeNote['favorite']
	},
	[types.setActiveNote](state, note) {
		state.activeNote = note;
	},
	[types.initNotes](state, notes) {
		for(let i of notes.notes) {
			if(i._rm === notes.activeNote._rm) {
				notes.activeNote = i;
				break;
			}
		}
		state.isAllList = notes.isAllList;
		state.notes = notes.notes;
		state.activeNote = notes.activeNote;
		window.state = state;
	},
	[types.eidtNoteTitle](state, title) {
		state.activeNote.title = title;
	}
}