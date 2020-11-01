import React, { createContext, useReducer } from 'react';
import NotesReducer from './NotesReducer';

export const ContextNotes = createContext( {
    notes: []
});

export const ContextStore = ({ children }) => {
    const [state, dispatch] = useReducer(NotesReducer, {
        notes: []
    });

    const deleteNote = (id) => {
        dispatch({
            type: 'DELETE_NOTE',
            payload: id
        })
    };

    const createNote = (note) => {
        dispatch({
            type: 'CREATE_NOTE',
            payload: note
        })
    };

    const editNote = (note) => {
        dispatch({
            type: 'EDIT_NOTE',
            payload: note
        })
    };

    return (
        <ContextNotes.Provider value={{
            notes: state.notes,
            deleteNote,
            createNote,
            editNote
        }}>
            {children}
        </ContextNotes.Provider>
    )
};