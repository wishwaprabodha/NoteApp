'use strict';

class Note {
    constructor() {
        this.noteId = undefined;
        this.userId = undefined;
        this.noteDate = undefined;
        this.noteTopic = undefined;
        this.note = undefined;
        this.modifiedTime = undefined;
    }
}

Note.mappings = {
    table: "Note",
    idColumn: "noteId",
    columns: {
        userId: "userId",
        noteId: "noteId",
        noteDate: "noteDate",
        noteTopic: "noteTopic",
        note: "note",
        modifiedTime: "modified_time"
    }
};

module.exports = Note;

