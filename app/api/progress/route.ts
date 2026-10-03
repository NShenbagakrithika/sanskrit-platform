import { learner, failure, json } from "@/lib/api-context";
import { loadProgress, saveAttempt, database } from "@/lib/storage";
import { object, index, readJson, AppError } from "@/lib/validation";
import { lessons } from "@/lib/course";
export async function GET(){try{const user=await learner();return json({progress:await loadProgress(user.userId)});}catch(e){return failure(e);}}
export async function POST(request:Request){try{
 const user=await learner(request,true),b=object(await readJson(request,2000)),lesson=index(b.lesson,lessons.length),questions=lessons[lesson].questions;
 if(!Array.isArray(b.answers)||b.answers.length!==questions.length)throw new AppError(400,"Complete all questions before saving an attempt.");
 const answers=b.answers.map((a,i)=>index(a,questions[i].options.length));
 const score=answers.filter((a,i)=>a===questions[i].answer).length;
 return json({score,progress:await saveAttempt(user.userId,lesson,score)});
 }catch(e){return failure(e);}}
export async function DELETE(request:Request){try{const user=await learner(request,true);await database().prepare("DELETE FROM lesson_progress WHERE user_id=?").bind(user.userId).run();return json({progress:[]});}catch(e){return failure(e);}}
