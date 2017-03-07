export default {
	favoriteNotes: state => {
		return state.notes.filter((v, i) => v['favorite']);
	}
}