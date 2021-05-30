import axios from "axios";
import {
  newUserDetails,
  ItemBoundary,
  userBoundery,
} from "./interfaces";
import constance from "./constance.json";

export const signInRequest = (signUpEmail: string) => {
  return axios.get(
    `http://localhost:8080/twins/users/login/${constance.space}/${signUpEmail}`
  );
};

export const signUpRequest = (newUser: newUserDetails) => {
  return axios.post("http://localhost:8080/twins/users", newUser);
};

export const addItem = (newItem: ItemBoundary, email: string) => {
  console.log("this is the item we try to save: ", newItem);
  return axios.post(
    `http://localhost:8080/twins/items/${constance.space}/${email}`,
    {
      ...newItem,
      createdBy: {
        userId: {
          space: constance.space,
          email: email,
        },
      },
    }
  );
};

export const getAllUserItems = (email: string) => {
  return axios.get(
    `http://localhost:8080/twins/items/${constance.space}/${email}`
  );
};

export const updateUserProfile = (
  email: string,
  user: userBoundery
) => {
  return axios.put(
    `http://localhost:8080/twins/users/${constance.space}/${email}`,
    user
  );
};

export const getAllCourses = (email: string) => {
  const operationData = {
    operationId: {
      space: constance.space,
      id: 451,
    },
    Item: {},
    type: "getAllCourses",
    invokedBy: {
      userId: {
        space: constance.space,
        email: email,
      },
    },

    operationAttributes: {},
  };

  return axios.post(
    `http://localhost:8080/twins/operations`,
    operationData
  );
};

export const updateItem = (email: string, item: ItemBoundary) => {
  return axios.put(
    `http://localhost:8080/twins/items/${constance.space}/${email}/${
      constance.space
    }/${item.itemId!.id}`,
    item
  );
};

export const getAllEnrolledCourses = (email:string) => {
  const operationData={
    operationId:{ 
space:constance.space, 
id:451 
}, 
type: "getRegisteredCourses", 
item:{ 

}, 
invokedBy:{ 
userId:{ 
space:constance.space, 
email:email 
} 
}, 

operationAttributes:{ 
	Id: email
} 
  }
  return axios.post(`http://localhost:8080/twins/operations`,operationData)
}


export const registerToCourse = (email:string, itemId:string)=>{

  const operationData={
operationId:{ 
space:constance.space, 
id:451 
}, 
type: "registerToCourse", 
item:{ 
itemId:{ 
space:constance.space, 
id: itemId
} 
}, 
invokedBy:{ 
userId:{ 
space:constance.space, 
email:email 
} 
}, 
operationAttributes:{ 
	Type : "Student",
	Id: email
} 
  }

  return axios.post(`http://localhost:8080/twins/operations`,operationData)

}

  export const resignFromCourse = (email:string, itemId:string)=>{
const operationData={
operationId:{ 
space:constance.space, 
id:451 
}, 
type: "resignFromCourse", 
item:{ 
itemId:{ 
space:constance.space, 
id: itemId
} 
}, 
invokedBy:{ 
userId:{ 
space:constance.space, 
email:email 
} 
}, 

operationAttributes:{ 
	Type : "Student",
	Id: email
} 

}
  return axios.post(`http://localhost:8080/twins/operations`,operationData)
  }
