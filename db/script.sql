create table if not exists User(
userId int auto_increment primary key,
userName varchar(20),
userEmail varchar(50),
userPasswordHash varchar(100),
modified_time timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
constraint unique_email unique (userEmail)
);

create table if not exists Note(
noteId int auto_increment primary key,
userId int not null,
noteDate date,
noteTopic varchar(50),
note varchar(200),
modified_time timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
constraint fk_userId foreign key(userId) references User(userId)
);
