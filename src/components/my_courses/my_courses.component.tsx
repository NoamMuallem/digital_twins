import React, { ReactElement } from "react"
import {ItemBoundary, userBoundery} from "../../interfaces"
import {getAllEnrolledCourses} from "../../server_api"
import { AxiosResponse } from "axios";
import Item from "../items/new_item/new_item.component"


export interface MyCoursesProps {
  user:userBoundery;
  enrolledCourses:Array<ItemBoundary>|null
  setEnrolledCourses:(courses:Array<ItemBoundary>)=>void;
  resignFromCourse:(id:string, index:number)=>void

}

export default function MyCourses({user, enrolledCourses, setEnrolledCourses, resignFromCourse}: MyCoursesProps): ReactElement | null {
  React.useEffect(()=>{
    if(!enrolledCourses){
      getAllEnrolledCourses(user.userId.email).then((res:AxiosResponse<Array<ItemBoundary>>)=>{
        setEnrolledCourses(res.data)
      })
    }
  },[user, enrolledCourses, setEnrolledCourses])

  if(user.role !== "PLAYER"){
  return null
  }

  return(
    <div>
      {enrolledCourses && enrolledCourses.map((course, index:number)=><Item item={course} user={user} index={index} resignState={resignFromCourse}/>)}
    </div>
  )

}
