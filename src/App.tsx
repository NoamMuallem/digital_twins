import React, { useState } from "react";
import { ItemBoundary, userBoundery } from "./interfaces";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from "./components/ui/navbar";
import Items from "./components/items/item.component";
import UserProfile from "./components/user_profile/user_profile.component";
import MyCourses from "./components/my_courses/my_courses.component";
import Courses from "./components/courses/courses.component";

function App() {
  const [user, setUser] = useState<userBoundery | null>(null);
  const [courses, setCourses] = useState<Array<ItemBoundary>>([]);
  const [
    enrolledCourses,
    setEnrolledCourses,
  ] = useState<Array<ItemBoundary> | null>(null);

  const addCourseToState = (item: ItemBoundary) => {
    setCourses((ls: Array<ItemBoundary>) => [...ls, item]);
  };

  const changeCourse = (item: ItemBoundary, index: number) => {
    setCourses((ls) => {
      if (ls) {
        const copy = [...ls];
        copy[index] = item;
        return copy;
      } else {
        return [item];
      }
    });
  };

  const addEnrollCourse = (item: ItemBoundary) => {
    setEnrolledCourses((ls: Array<ItemBoundary> | null) => {
      if (ls) {
        const copy = [...ls, item];
        return copy;
      } else {
        return [item];
      }
    });
  };

  const resignFromCourse = (id: string, index: number) => {
    setEnrolledCourses((ls: Array<ItemBoundary> | null) => {
      if (ls) {
        const copy = [...ls];
        copy.splice(index, 1);
        return copy;
      } else {
        return ls;
      }
    });
  };

  return (
    <Router>
      <div className="content">
        <Navbar user={user} setUser={setUser}>
          <Switch>
            <Route
              path="/user"
              render={() => (
                <UserProfile user={user} setUser={setUser} />
              )}
            />
            {user && user.role === "MANAGER" && (
              <Route
                path="/items"
                render={() => (
                  <Items
                    changeCourse={changeCourse}
                    user={user}
                    items={courses}
                    setItems={setCourses}
                    addItemToState={addCourseToState}
                  />
                )}
              />
            )}
            {user && user.role === "PLAYER" && (
              <>
                <Route
                  path="/my_courses"
                  render={() => (
                    <MyCourses
                      user={user}
                      setEnrolledCourses={setEnrolledCourses}
                      enrolledCourses={enrolledCourses}
                      resignFromCourse={resignFromCourse}
                    />
                  )}
                />
                <Route
                  path="/courses"
                  render={() => (
                    <Courses
                      courses={courses}
                      setCourses={setCourses}
                      user={user}
                      setEnrolledCourses={setEnrolledCourses}
                      enrolledCourses={enrolledCourses}
                      addEnrollCourse={addEnrollCourse}
                    />
                  )}
                />
              </>
            )}
          </Switch>
        </Navbar>
      </div>
    </Router>
  );
}

export default App;
