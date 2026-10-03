import { currentUser } from "./local-auth";
import { AppError, assertOrigin } from "./validation";
import { rateLimit } from "./storage";
export async function learner(request?:Request, limited=false){
 if(request)assertOrigin(request);
 const user=await currentUser();
 if(!user)throw new AppError(401,"Please sign in to save progress and use the tutor.");
 if(limited)await rateLimit(user.userId);
 return user;
}
export function json(data:unknown,status=200){return Response.json(data,{status,headers:{"Cache-Control":"no-store","X-Content-Type-Options":"nosniff","Referrer-Policy":"same-origin"}});}
export function failure(error:unknown){
 if(error instanceof AppError)return json({error:error.message},error.status);
 console.error("Request failed",{type:error instanceof Error?error.name:"unknown"});
 return json({error:"Something went wrong. Please try again."},500);
}
