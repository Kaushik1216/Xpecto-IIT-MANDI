var oldvalue={
email:"",
displayname:"",
firstname:"",
image:"",
phonenumber:"",
fullname:"",
collegename:"",
degree:"",
branch:"",
referralcode:"",
}

const userinfo=(state =oldvalue,action)=>{
    if (action.type === "userinfo") {
        // return the new state
        return action.payload
      }
      // always return state
      return state
}
// const userinfo=(state =oldvalue,action)=>{
//     var newstate=state;
//     switch(action.type){
//         case "userinfo":
//             console.log("nnjr 0",action.payload);
//             newstate=action.payload;
//             return state=newstate;
//          break;
//         default:
//                 return state;
//             }
// }
export default userinfo;