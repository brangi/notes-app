const NotesReducer = (state, action) => {
    switch (action.type) {
        case 'DELETE_NOTE':
            return {
                ...state,
                notes: state.notes.filter(note => {
                    return note.id !== action.payload;
                })
            };
        case 'CREATE_NOTE':
            return {
                ...state,
                notes: [action.payload, ...state.notes]
            };
        case 'EDIT_NOTE':
            const newNote = action.payload;
            const updateNotes = state.notes.map(note => {
                if (note.id === newNote.id) {
                    return newNote;
                }
                return note;
            });
            return {
                ...state,
                notes: updateNotes
            };
        default:
            return state;
    }
};

export default NotesReducer