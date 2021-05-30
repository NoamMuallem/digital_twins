import React, { ReactElement } from "react";
import { ItemBoundary, userBoundery } from "../../interfaces";
import {
  getAllEnrolledCourses,
  getAllCourses,
} from "../../server_api";
import { AxiosResponse } from "axios";
import classes from "./courses.style.module.scss";
import Item from "../items/new_item/new_item.component";
import TablePagination from "@material-ui/core/TablePagination";
import TextFiled from "../ui/textFiled.jsx";

export interface CoursesProps {
  user: userBoundery;
  enrolledCourses: Array<ItemBoundary> | null;
  setEnrolledCourses: (courses: Array<ItemBoundary>) => void;
  addEnrollCourse: (course: ItemBoundary) => void;
  courses: Array<ItemBoundary>;
  setCourses: (courses: Array<ItemBoundary>) => void;
}

export default function Courses({
  user,
  enrolledCourses,
  setEnrolledCourses,
  addEnrollCourse,
  courses,
  setCourses,
}: CoursesProps): ReactElement | null {
  const [text, setText] = React.useState<string>("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    if (!enrolledCourses) {
      getAllEnrolledCourses(user.userId.email).then(
        (res: AxiosResponse<Array<ItemBoundary>>) => {
          setEnrolledCourses(res.data);
        }
      );
    }
    getAllCourses(user.userId.email).then(
      (res: AxiosResponse<Array<ItemBoundary>>) => {
        setCourses(res.data);
      }
    );
  }, [user, enrolledCourses, setEnrolledCourses, setCourses]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (user.role !== "PLAYER") {
    return null;
  }

  return (
    <div className={classes.Page}>
      <div className={classes.Headline}>Courses</div>
      <div className={classes.Tools}>
        <TextFiled
          label="Search"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
        />
        <div className={classes.Pagination}>
          <TablePagination
            component="div"
            count={
              courses.filter(
                (course) => course.name.indexOf(text) !== -1
              ).length
            }
            page={page}
            onChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
      </div>
      {courses
        .filter((course) => course.name.indexOf(text) !== -1)
        .map((course, index: number) => {
          if (
            index < page * rowsPerPage ||
            index > (page + 1) * rowsPerPage
          ) {
            return null;
          }
          return (
            <Item
              canEnroll={
                enrolledCourses
                  ? enrolledCourses
                      .map((course) => course.itemId!.id)
                      .findIndex(
                        (courseId: string) =>
                          courseId.toString() ===
                          course.itemId!.id.toString()
                      ) === -1
                  : false
              }
              key={course.itemId!.id + index}
              user={user}
              index={index}
              item={course}
              enrollState={addEnrollCourse}
            />
          );
        })}
    </div>
  );
}
