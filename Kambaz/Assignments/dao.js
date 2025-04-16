// import Database from "../Database/index.js";

// import { v4 as uuidv4 } from "uuid";
  
//   export function findAssignmentsForCourse(courseId) {
//     const { assignments } = Database;
//     return assignments.filter((assignment) => assignment.course === courseId);
//   }
  
//   export function createAssignment(assignment) {
//     const newAssignment = { ...assignment, _id: uuidv4() };
//     Database.assignments = [...Database.assignments, newAssignment];
//     return newAssignment;
//   }
  
//   export function deleteAssignment(assignmentId) {
//     const { assignments } = Database;
//     Database.assignments = assignments.filter((a) => a._id !== assignmentId);
//   }
  
//   export function updateAssignment(assignmentId, assignmentUpdates) {
//     const { assignments } = Database;
//     const assignment = assignments.find((a) => a._id === assignmentId);
//     Object.assign(assignment, assignmentUpdates);
//     return assignment;
//   }
  
// import Database from "../Database/index.js";
import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findAssignmentsForCourse(courseId) {
  return model.find({ course: courseId });
}

export function createAssignment(assignment) {
  return model.create({ ...assignment, _id: uuidv4() });
}

export function deleteAssignment(assignmentId) {
  return model.deleteOne({ _id: assignmentId });
}

export function updateAssignment(assignmentId, updates) {
  return model.updateOne({ _id: assignmentId }, { $set: updates });
}

export function findAssignmentById(aid) {
  return model.findOne({ _id: aid });
}
