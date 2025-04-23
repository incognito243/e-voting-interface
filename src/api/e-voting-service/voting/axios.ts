import {getAll} from "@/api/e-voting-service/voting/getAll";

getAll().then((res) => {
  console.log(res);
}).catch((_) => {
  console.error("asdasd");
})
