import { User } from '../user';

export const studentMock: User = {
  userID: 999,
  firstName: 'Jane',
  lastName: 'Smith',
  nickName: 'J.S.',
  email: 'jane@example.com',
  password : 'jane123',
  isTeacher: false,
  triviaContests: [11]
};

export const teacherMock: User = {
  userID: 1000,
  firstName: 'Brian',
  lastName: 'Eddy',
  nickName: 'BEddy',
  email: 'beddy@example.com',
  isTeacher: true,
  triviaContests: [11,12]
};
