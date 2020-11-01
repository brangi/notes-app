import React, { useState, useContext, useEffect } from "react";
import {CompactPicker} from "react-color";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";

import { Link, useHistory } from "react-router-dom";
import { withRouter } from "react-router";

import {ContextNotes} from "../api/ContextStore";

const FormNote = (props) => {
    const history = useHistory();
    const { action } = props;
    const [note, setNote] = useState('');
    const [currentNote, setCurrentNote] = useState({
        id: '',
        note: '',
        color: ''
    });
    const { createNote, notes, editNote} = useContext(ContextNotes);
    const currentNoteId = props.match.params.id;

    useEffect(() => {
        const noteId = currentNoteId;
        if(noteId && action ==='edit'){
            const currentNote =  notes.find(note => note.id === noteId);
            setCurrentNote(currentNote)
        }
    }, [currentNoteId, notes, action]);


    const onSubmit = (e, action) => {
        e.preventDefault();

        if (action === 'create') {
            const newNote = {
                id: `${Date.now()}`,
                note,
                color: '#e5e5e5'
            };
            createNote(newNote);
        }

        if (action === 'edit') {
            editNote(currentNote)
        }

        history.push("/notes");
    };

    const onChangeNote = (e) => {
        if (action === 'create') {
            setNote(e.target.value);
        }

        if (action === 'edit') {
            const noteEdited = { id: currentNote.id, note: e.target.value };
            setCurrentNote(noteEdited)
        }
    };

    const onChangeColor = (color) => {
        const colorEdited = { id: currentNote.id, note: currentNote.note, color: color.hex };
        setCurrentNote(colorEdited)
    };

    const renderEditColor = () =>{
        return(
            <>
                <Container className="my-4"> <Label>Edit color box: </Label></Container>
                <Container className="my-4">
                    <CompactPicker color={currentNote.color} onChangeComplete={(color) =>onChangeColor(color)}/>
                </Container>
            </>
        )
    };


    return(
        <>
        <Form onSubmit={(e)=> onSubmit(e, action)}>
           <FormGroup>
            <Label>{action ==='create'? 'Create note': 'Edit note'}</Label>
            <Input
                type="text"
                name="note"
                value={ action ==='create'? note : currentNote.note}
                onChange={(e)=> onChangeNote(e,action)}
                placeholder="Enter a note..."
                required
            />
            </FormGroup>
            <Button className="bg-primary" type="submit">
                {action ==='create'? 'Create': 'Update'}
            </Button>
            <Link to="/notes" className="btn btn-dark ml-5">
                Cancel
            </Link>
            {action === 'edit' ? renderEditColor(): null }
        </Form>
    </>
)};

export default withRouter(FormNote);