// export const changeuserinfo=(newvalues)=>{
//     return{
//         type:"userinfo",
//         payload:newvalues,
//     }
// }
export function changeuserinfo(newvalues){
    return (dispatch)=>{
      dispatch({
        type:"userinfo",
        payload:newvalues,
      })
    }
}

// export  default changeuserinfo;