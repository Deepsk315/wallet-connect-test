import React, {useState} from "react";
import {Link} from "react-router-dom";
import { url } from '../actions/config'
import { preciseDecimal } from '../utility'
import DOMPurify from "dompurify";


export default function CourseCard({
  image,
  title,
  category,
  text,
  numLesson,
  nodeId,
  isActive,
  courseId,
  startCourse,
  myCourses
}) {
  const [showModal, setShowModal] = useState(false);

  const myCourse = myCourses.find(course => course.course_id._id == courseId)
  const sanitizedText = DOMPurify.sanitize(text?.length > 150 ? text.slice(0, 150).concat(".....<a href='/course/" + courseId + "/lessons'>View More</a>") : text);


  return (
    <>
      <div className="course-card bg-light_2">
        <div className="course-card-image">
          <img src={url() + image} style={{ objectFit: 'cover' }} />
        </div>
        <div className="row m-2">
          <div className="course-card-lessons text-nowrap col-12">{numLesson} LESSONS</div>
          <div className="course-card-title col-12 p-1">{title}</div>
        </div>
        {/* <div className="d-flex justify-content-between">
          <span className="course-card-title">{title}</span>
          <span className="course-card-lessons text-nowrap">{numLesson} LESSONS</span>
        </div> */}
        {/*
        <div className="d-flex ml-3 btn-group course-card-status">
          {isActive && <div className="bg-dark">• Active</div>}
        </div>
        */}
        <div className="d-flex ml-3 btn-group course-card-status">
          <div className="bg-dark">{category}</div>
        </div>
        {/* <div className="course-card-content p-3">{text.length > 150 ?  text.slice(0,150).concat(".....<Link to={`/course/${courseId}/lessons`}> View More</Link>") : text}</div> */}
        <div className="course-card-content p-3 mb-3" dangerouslySetInnerHTML={{ __html: sanitizedText }}></div>
        <div className="mt-auto mb-4">
          {myCourse ? (
            <div className="mx-5 my-3">
              <h6>{preciseDecimal(myCourse.completed_percent, 1, 0) || 0}% Complete</h6>
              <div
                className="progress"
                style={{ height: "10px" }}
              >
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${myCourse.completed_percent || 0}%`,
                    backgroundColor: myCourse.completed_percent == 100 ? '#60e277' : ''
                  }}
                  aria-valuenow={myCourse.completed_percent || 0}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          ) : <></>}

          <div className="d-flex justify-content-center mt-2">
            <Link to={`/course/${courseId}/lessons`}>
              <button className="btn btn-secondary btn-sm mr-3">View Lessons</button>
            </Link>
            {!myCourse ? (
              <button className="btn btn-primary btn-sm" onClick={() => startCourse(courseId)}>Start Course</button>
            ) : <></>}
          </div>
        </div>
      </div>

      <div className={`purchase-node-modal ${showModal ? "" : "hide"}`}>
        <div
          className="overlay"
          onClick={() => {
            setShowModal(false);
          }}
        ></div>
        <div className="modal-container">
          <h3>Web3 Japan</h3>
          <p>You need to purchase to unlock this course</p>
          <div className="modal-button-group">
            <button
              className="btn btn-primary"
              onClick={() => {
                window.open("https://seven.money/", "_blank");
                setShowModal(false);
              }}
            >
              Purchase
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
