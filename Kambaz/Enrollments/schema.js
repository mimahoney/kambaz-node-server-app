import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: String,
    user: String,
    course: { type: String, ref: "CourseModel" },
  },
  { collection: "enrollments" }
);
export default schema;