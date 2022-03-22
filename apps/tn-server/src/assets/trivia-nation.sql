-- enable foreign key support
PRAGMA foreign_keys = ON;

/***************
* USER SECTION *
***************/

-- user table: students and teachers have a record here
create table if not exists user (
  userID integer primary key autoincrement,
  firstName text not null,
  lastName text not null,
  nickName text not null,
  email text not null UNIQUE,
  password text not null, -- argon2 hash
  isTeacher integer not null default 0 -- boolean
);

-- students view: all students are found here
create view if not exists vStudents as
select * from user where isTeacher = 0;

-- teachers view: all teachers are found here
create view if not exists vTeachers as
select * from user where isTeacher = 1;

-- dummy teacher account
insert or ignore into user (
  userID,
  firstName,
  lastName,
  nickName,
  email,
  password,
  isTeacher
) values (
  1,
  'John',
  'Doe',
  'J.D.',
  'jd@example.com',
  '$argon2i$v=19$m=4096,t=3,p=1$OuWaXVAtvxwUKh7VfJX2Nw$Xqm4uwrwlv9CxCopAZO2SlQobgoSKCc6/1sR40L+EIc',
  1
);

-- dummy student account
insert or ignore into user (
  userID,
  firstName,
  lastName,
  nickName,
  email,
  password
) values (
  2,
  'John',
  'Smith',
  'J.S.',
  'js@example.com',
  '$argon2i$v=19$m=4096,t=3,p=1$OuWaXVAtvxwUKh7VfJX2Nw$Xqm4uwrwlv9CxCopAZO2SlQobgoSKCc6/1sR40L+EIc'
);

/***************
* GAME SECTION *
***************/

-- game table: all games have a record here (note one teacher per game)
create table if not exists game (
  gameID integer primary key autoincrement,
  teacherID integer not null,
  name text not null,
  createdEpoch integer not null,
  endsEpoch integer not null,
  settingsJSON text not null,
  invite text not null, -- use a library like nanoid to generate a random string upon game creation
  foreign key(teacherID) references user(userID) on delete cascade
);

insert or ignore into game (
  gameID,
  teacherID,
  name,
  createdEpoch,
  endsEpoch,
  settingsJSON,
  invite
) values 
(
  1,
  1,
  'The First Game',
  1641772800,
  1651881600,
  '{}',
  'W89H5_Q2AAp49Le2-s8X6'
),
(
  2,
  1,
  'The Second Game',
  1641772800,
  1651881600,
  '{"example": "just a test"}',
  'dZVNCNFuN16IgMV62BRPH'
);

-- territory table: every territory in a game has a record here
create table if not exists territory (
  gameID integer not null,
  territoryID integer not null,
  studentID integer default null,  -- can be null (aka unclaimed)
  primary key(gameID, territoryID),
  foreign key(gameID) references game(gameID) on delete cascade,
  foreign key(studentID) references user(userID) on delete set null
);

insert or ignore into territory (
  gameID,
  territoryID,
  studentID
) values
-- assume 3x3 grid for dummy games, '_' means null
-- gameID=1 looks like 'X': 
-- 2 _ 2
-- _ 2 _
-- 2 _ 2
(1, 1, 2),
(1, 2, null),
(1, 3, 2),
(1, 4, null),
(1, 5, 2),
(1, 6, null),
(1, 7, 2),
(1, 8, null),
(1, 9, 2),
-- gameID=2 looks like 'X': 
-- 2 2 2
-- 2 _ 2
-- 2 2 2
(2, 1, 2),
(2, 2, 2),
(2, 3, 2),
(2, 4, 2),
(2, 5, null),
(2, 6, 2),
(2, 7, 2),
(2, 8, 2),
(2, 9, 2);

/**************************
* QUESTION/ANSWER SECTION *
**************************/

-- question table: all questions have a record here
create table if not exists question (
  questionID integer primary key autoincrement,
  question text not null,
  correctAnswer text not null,
  otherAnswersJSON text not null
);

insert or ignore into question (
  questionID,
  question,
  correctAnswer,
  otherAnswersJSON
) values 
(
  1,
  'Have you heard about the word?',
  'Bird is the word.',
  '["B-B-B-Bird-Bird-Bird-B-Bird"]'
),
(
  2,
  'Dont you know about the word?',
  'Bird is the word.',
  '["B-B-B-Bird-Bird-Bird-B-Bird"]'
);

-- answer table: all answers have a record here
create table if not exists answer (
  questionID integer not null,
  studentID integer not null,
  timestampEpoch integer default (strftime('%s', 'now')),
  isCorrect integer not null, -- boolean
  foreign key(questionID) references question(questionID) on delete cascade,
  foreign key(studentID) references user(userID) on delete cascade
);

insert or ignore into answer (
  questionID,
  studentID,
  isCorrect
) values 
(1, 2, 1),
(1, 2, 0),
(1, 2, 1),
(2, 2, 1);

-- game-questions relation: all questions in a particular game have a record here
create table if not exists gameQuestions (
  gameID integer not null,
  questionID integer not null,
  primary key (gameID, questionID),
  foreign key(gameID) references game(gameID) on delete cascade,
  foreign key(questionID) references question(questionID) on delete cascade
);

insert or ignore into gameQuestions (
  gameID,
  questionID
) values
(1, 1),
(2, 1),
(2, 2);

-- question stats (all questions)
create view if not exists vQuestionStats as
select
  questionID, 
  count(*) attempts,
  round(avg(answer.isCorrect)*100) percentCorrect,
  100 - round(avg(answer.isCorrect)*100) percentWrong
from answer
group by questionID;

/*****************
* PLAYER SECTION *
*****************/

-- player table: all players (aka students) in a game have a record here
create table if not exists player (
  gameID integer not null,
  studentID integer not null,
  primary key (gameID, studentID),
  foreign key(gameID) references game(gameID) on delete cascade,
  foreign key(studentID) references user(userID) on delete cascade
);

insert or ignore into player (
  gameID,
  studentID
) values
(1, 2),
(2, 2);