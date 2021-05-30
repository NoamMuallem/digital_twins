import React, { ReactElement } from "react"
import {ItemBoundary, userBoundery} from "../../interfaces"
import {getAllEnrolledCourses, getAllCourses} from "../../server_api"
import { AxiosResponse } from "axios";
import classes from "./courses.style.module.scss"
import Item from "../items/new_item/new_item.component"

export interface CoursesProps {
  user:userBoundery;
  enrolledCourses:Array<ItemBoundary>|null;
  setEnrolledCourses:(courses:Array<ItemBoundary>)=>void;
  addEnrollCourse:(course:ItemBoundary)=>void;
  courses:Array<ItemBoundary>;
  setCourses:(courses: Array<ItemBoundary>)=>void
}

export default function Courses({user, enrolledCourses, setEnrolledCourses, addEnrollCourse, courses, setCourses}: CoursesProps): ReactElement | null {

  React.useEffect(()=>{
    if(!enrolledCourses){
      getAllEnrolledCourses(user.userId.email).then((res:AxiosResponse<Array<ItemBoundary>>)=>{
        setEnrolledCourses(res.data)
      })
    }
    getAllCourses(user.userId.email).then((res:AxiosResponse<Array<ItemBoundary>>)=>{
      setCourses(res.data)
    })
  },[user, enrolledCourses, setEnrolledCourses, setCourses])

  if(user.role !== "PLAYER"){
  return null
  }

return(
  <div className={classes.Page}>
    {courses.map((course, index:number)=><Item key={course.itemId!.id + index} user={user} index={index} item={course} enrollState={addEnrollCourse}/>)}
  </div>
  )
}
