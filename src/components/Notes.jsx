import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { ContextNotes } from "../api/ContextStore";

import {
    Navbar,
    Nav,
    NavItem,
    NavbarBrand,
    Container,
    ListGroup,
    ListGroupItem,
    Button,
} from "reactstrap";

const Notes = () => {
    const { notes, deleteNote } = useContext(ContextNotes);
    return (
        <>
            <Navbar color="dark" dark>
                <Container>
                    <NavbarBrand href="/notes">Notes</NavbarBrand>
                    <Nav>
                        <NavItem>
                            <Link className="btn btn-primary" to="/note/create">
                                Create
                            </Link>
                        </NavItem>
                    </Nav>
                </Container>
            </Navbar>
            <ListGroup className="mt-4">
                {notes.length > 0 ? (
                    <>
                        {notes.map((note) => (
                            <ListGroupItem className="d-flex" key={note.id} style={{backgroundColor: note.color}}>
                                <strong>{note.note}</strong>
                                <div className="ml-auto">
                                    <Link
                                        to={`/note/edit/${note.id}`}
                                        color="warning"
                                        className="btn btn-warning mr-1"
                                    >
                                        Edit
                                    </Link>
                                    <Button onClick={() => deleteNote(note.id)} color="danger">
                                        Delete
                                    </Button>
                                </div>
                            </ListGroupItem>
                        ))}
                    </>
                ) : (
                    <h4 className="text-center">There is no notes</h4>
                )}
            </ListGroup>
        </>
    );
};

export default Notes;
