import { completion, config, tutorInstructions } from "@/lib/ai-server";
import { learner, failure, json } from "@/lib/api-context";
import { object, messages, index, readJson, AppError } from "@/lib/validation";
import { lessons } from "@/lib/course";
export async function POST(request:Request){try{
 await learner(request,true);const b=object(await readJson(request,64000));
 const history=messages(b.messages),lesson=index(b.lesson,lessons.length);
 if(history[history.length-1].role!=="user")throw new AppError(400,"End the conversation with your question.");
 return json(await completion({model:config().textModel,messages:[{role:"system",content:tutorInstructions+" Current lesson: "+JSON.stringify(lessons[lesson])},...history],max_completion_tokens:900,store:false},request.signal));
 }catch(e){return failure(e);}}
