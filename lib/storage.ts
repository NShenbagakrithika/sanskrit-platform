import { env } from "cloudflare:workers";
import { AppError } from "./validation";
export function database(): D1Database {
 const db=(env as unknown as {DB?:D1Database}).DB;
 if(!db)throw new AppError(503,"Learning storage is unavailable. Please try again later.");
 return db;
}
export async function rateLimit(userId:string){
 const db=database(),minute=Math.floor(Date.now()/60000),day=1_000_000_000_000+Math.floor(Date.now()/86400000);
 const update=(bucket:number,limit:number)=>db.prepare("INSERT INTO request_limits(user_id,bucket,requests) VALUES(?,?,1) ON CONFLICT(user_id,bucket) DO UPDATE SET requests=requests+1 WHERE requests<? RETURNING requests").bind(userId,bucket,limit);
 const result=await db.batch([update(minute,12),update(day,120)]);
 if(!result[0].results.length)throw new AppError(429,"You’ve made several requests. Wait a minute before trying again.");
 if(!result[1].results.length)throw new AppError(429,"You’ve reached today’s request limit. Please return tomorrow.");
 await db.prepare("DELETE FROM request_limits WHERE rowid IN (SELECT rowid FROM request_limits WHERE bucket<? OR (bucket>=1000000000000 AND bucket<?) LIMIT 100)").bind(minute-60,day-2).run();
}
export async function loadProgress(userId:string){
 const result=await database().prepare("SELECT lesson,best_score AS bestScore,attempts,updated_at AS updatedAt FROM lesson_progress WHERE user_id=? ORDER BY lesson").bind(userId).all();
 return result.results;
}
export async function saveAttempt(userId:string,lesson:number,score:number){
 await database().prepare("INSERT INTO lesson_progress(user_id,lesson,best_score,attempts,updated_at) VALUES(?,?,?,1,?) ON CONFLICT(user_id,lesson) DO UPDATE SET best_score=MAX(best_score,excluded.best_score),attempts=attempts+1,updated_at=excluded.updated_at")
  .bind(userId,lesson,score,Date.now()).run();return loadProgress(userId);
}
