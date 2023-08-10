import React from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { FiCircle, FiCheckCircle } from "react-icons/fi";




export default function LessonCard({
  title,
  course_id,
  lesson_id,
  course_started,
  completed
}) {

  const Card = () => {
    return (
      <div className="lesson-card bg-light">
        <b>{title}</b>
        <h5>{completed ? (
          <FiCheckCircle color='#10c65f' />
        ) : (
          <FiCircle color='gray' />
        )}</h5>
      </div>
    )
  }

  return course_started ? (
    <Link to={`/course/lesson/${lesson_id}`}>
      <Card />
    </Link>
  ) : (
    <Card />
  )
}
