import {query} from "./service/API";

const q = async () =>{
  await query.getWords().then((res)=>console.log(res))
}

q()