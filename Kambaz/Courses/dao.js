// import Database from "../Database/index.js";
import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
export function findAllCourses() {
  return model.find();
}
export function findCoursesForEnrolledUser(userId) {
  const { courses, enrollments } = Database;
  const enrolledCourses = courses.filter((course) =>
    enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
  return enrolledCourses;
}
export function createCourse(course) {
  return model.create({ ...course, _id: uuidv4() });
}
export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
}


export async function updateCourse(courseId, courseUpdates) {
  // const updated = await model.findByIdAndUpdate(courseId, courseUpdates, { new: true });
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
  // return updated;
}
