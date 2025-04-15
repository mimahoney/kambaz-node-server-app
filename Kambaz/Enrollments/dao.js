import model from "./model.js";
export async function findCoursesForUser(userId) {
 const enrollments = await model.find({ user: userId }).populate("course");
 return enrollments.map((enrollment) => enrollment.course);
}
export async function findUsersForCourse(courseId) {
 const enrollments = await model.find({ course: courseId }).populate("user");
 return enrollments.map((enrollment) => enrollment.user);
}
export function enrollUserInCourse(user, course) {
 return model.create({ user, course, _id: `${user}-${course}` });
}
export function unenrollUserFromCourse(user, course) {
 return model.deleteOne({ user, course });
}
export function enrollUserInCourse(user, course) {
  const newEnrollment = { user, course, _id: `${user}-${course}` };
  return model.create(newEnrollment);
 }
 export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
 }
 


// import Database from "../Database/index.js";
// import { v4 as uuidv4 } from "uuid";


// export function enrollUserInCourse(userId, courseId) {
//   const { enrollments } = Database;
//   enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
// }


// import Database from "../Database/index.js";
// import { v4 as uuidv4 } from "uuid";

// export function findAllEnrollments() {
//   return Database.enrollments;
// }
// export function enrollUserInCourse(userId, courseId) {
//   const newEnrollment = { _id: uuidv4(), user: userId, course: courseId,
//   };
// Database.enrollments = [...Database.enrollments, newEnrollment];
//   return newEnrollment;
// }
// export function unenrollUserFromCourse(userId, courseId) {
//   const { enrollments } = Database;
//   Database.enrollments = enrollments.filter( (e) => e.user !== userId || e.course !== courseId
// );
// }

// export function findCoursesForUser(userId) {
//   const { courses, enrollments } = Database;
//   return courses.filter((course) =>
//     enrollments.some(
//     (enrollment) => enrollment.user === userId && enrollment.course === course._id)
// );
// }

// export function findUsersForCourse(courseId) {
//   const { users, enrollments } = Database;
//   return users.filter((user) =>
//     enrollments.some(
// (enrollment) => enrollment.user === user._id && enrollment.course === courseId
//     )
//   );
// }


// import Database from "../Database/index.js";
// import { v4 as uuidv4 } from "uuid";
// export function findAllCourses() {
//   return Database.courses;
// }
// export function findCoursesForEnrolledUser(userId) {
//   const { courses, enrollments } = Database;
//   const enrolledCourses = courses.filter((course) =>
//     enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
//   return enrolledCourses;
// }
// export function createCourse(course) {
//   const newCourse = { ...course, _id: uuidv4() };
//   Database.courses = [...Database.courses, newCourse];
//   return newCourse;
// }
// export function deleteCourse(courseId) {
//   const { courses, enrollments } = Database;
//   Database.courses = courses.filter((course) => course._id !== courseId);
//   Database.enrollments = enrollments.filter(
//     (enrollment) => enrollment.course !== courseId
// );}

// export function updateCourse(courseId, courseUpdates) {
//   const { courses } = Database;
//   const course = courses.find((course) => course._id === courseId);
//   Object.assign(course, courseUpdates);
//   return course;
// }