'use strict';

class User {
    constructor() {
        this.userId = undefined;
        this.userName = undefined;
        this.userEmail = undefined;
        this.userPasswordHash = undefined;
    }
}

User.mappings = {
    table: "User",
    idColumn: "userId",
    columns: {
        userId: "userId",
        userName: "userName",
        userEmail: "userEmail",
        userPasswordHash: "userPasswordHash"
    }
};

module.exports = User;

