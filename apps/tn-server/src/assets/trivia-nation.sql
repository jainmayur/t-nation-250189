-- enable foreign key support
PRAGMA foreign_keys = ON;

/***************
* USER SECTION *
****************/

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
****************/

-- question table: all questions have a record here
create table if not exists question (
  questionID integer primary key autoincrement,
  question text not null,
  correctAnswer text not null,
  otherAnswers text not null -- json array
);

insert or ignore into question (
  questionID,
  question,
  correctAnswer,
  otherAnswers
) values 
(
  1,
  'Have you heard about the word?',
  'Bird is the word.',
  'B-B-B-Bird-Bird-Bird-B-Bird'
),
(
  2,
  'Dont you know about the word?',
  'Bird is the word.',
  'B-B-B-Bird-Bird-Bird-B-Bird'
);

-- answer table: all answers have a record here
create table if not exists answer (
  questionID integer not null,
  userID integer not null,
  timestamp integer default (strftime('%s', 'now')), -- epoch
  isCorrect integer not null, -- boolean
  foreign key(questionID) references question(questionID) on delete cascade,
  foreign key(userID) references user(userID) on delete cascade
);

insert or ignore into answer (
  questionID,
  userID,
  isCorrect
) values 
(1, 2, 1),
(1, 2, 0),
(1, 2, 1),
(2, 2, 1);

-- game table: all games have a record here (note one teacher per game)
create table if not exists game (
  gameID integer primary key autoincrement,
  userID integer not null,  -- teacherID
  name text not null,
  created integer not null, -- epoch
  ends integer not null,    -- epoch
  settings text not null,    -- json object
  foreign key(userID) references user(userID) on delete cascade
);

-- player table: all players (aka students) in a game have a record here
create table if not exists player (
  gameID integer not null,
  userID integer not null,  -- studentID
  primary key (gameID, userID),
  foreign key(gameID) references game(gameID) on delete cascade,
  foreign key(userID) references user(userID) on delete cascade
);

-- territory table: every territory in a game has a record here
create table if not exists territory (
  gameID integer not null,
  territoryID integer not null,
  userID integer default null,  -- studentID, can be null (aka unclaimed)
  primary key(gameID, territoryID),
  foreign key(gameID) references game(gameID) on delete cascade,
  foreign key(userID) references user(userID) on delete set null
);

-- leaderboard
-- game stats

-- question stats
create view if not exists vQuestionStats as
select
  questionID, 
  count(*) attempts,
  round(avg(answer.isCorrect)*100) percentCorrect,
  100 - round(avg(answer.isCorrect)*100) percentWrong
from answer
group by questionID;
