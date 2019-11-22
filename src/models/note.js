class Note {
    constructor() {
        this.noteId = undefined;
        this.userId = undefined;
        this.noteDate = undefined;
        this.noteTopic = undefined;
        this.modifiedTime = undefined;
    }
}

Note.mappings = {
    table: "Note",
    idColumn: "noteId",
    columns: {
        noteId: "noteId",
        userId: "userId",
        noteDate: "noteDate",
        noteTopic: "noteTopic",
        modifiedTime: "modifiedTime"
    }
};

module.exports = Note;
