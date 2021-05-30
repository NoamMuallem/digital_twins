import React, { ReactElement } from "react"
import {ItemBoundary, userBoundery} from "../../interfaces"
import {getAllEnrolledCourses} from "../../server_api"
import { AxiosResponse } from "axios";
import Item from "../items/new_item/new_item.component"
import TablePagination from '@material-ui/core/TablePagination';
import TextFiled from "../ui/textFiled"
import classes from "./my_courses.style.module.scss"


export interface MyCoursesProps {
  user:userBoundery;
  enrolledCourses:Array<ItemBoundary>|null
  setEnrolledCourses:(courses:Array<ItemBoundary>)=>void;
  resignFromCourse:(id:string, index:number)=>void

}

export default function MyCourses({user, enrolledCourses, setEnrolledCourses, resignFromCourse}: MyCoursesProps): ReactElement | null {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [text, setText] = React.useState<string>("")

  React.useEffect(()=>{
    if(!enrolledCourses){
      getAllEnrolledCourses(user.userId.email).then((res:AxiosResponse<Array<ItemBoundary>>)=>{
        setEnrolledCourses(res.data)
      })
    }
  },[user, enrolledCourses, setEnrolledCourses])

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if(user.role !== "PLAYER"){
  return null
  }

  return(
    <div className={classes.Page} >
      <div className={classes.Headline}>My Courses</div>
      <div className={classes.Tools}>
        <TextFiled label="Search" value={text} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setText(e.target.value)}/>
        <div className={classes.Pagination}>
     <TablePagination
      component="div"
      count={100}
      page={page}
      onChangePage={handleChangePage}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
        </div>
      </div>
      {enrolledCourses && enrolledCourses.map((course, index:number)=><Item item={course} user={user} index={index} resignState={resignFromCourse}/>)}
    </div>
  )

}
