export interface User {
  /** User unique id */
  userID: number;
  /** User first name */
  firstName: string;
  /** User last name */
  lastName: string;
  /** User nickname */
  nickName: string;
  /** User email */
  email: string;
  /** True if user is a teacher account */
  password?: string;
  isTeacher: boolean;
  // password field intentionally omitted
  triviaContests: number[];
}
