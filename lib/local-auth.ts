import { cookies } from 'next/headers';
import { database } from './storage';
import { AppError } from './validation';
import { newToken, tokenDigest } from './password';
export const SESSION_COOKIE='sanskrit_session';
const lifetime=7*24*60*60;
export function credentials(body:Record<string,unknown>){
 if(typeof body.email!=='string'||typeof body.password!=='string')throw new AppError(400,'Enter your email and password.');
 const email=body.email.trim().toLowerCase(),password=body.password;
 if(email.length>254||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw new AppError(400,'Enter a valid email address.');
 if(password.length<10||password.length>128)throw new AppError(400,'Use a password with 10 to 128 characters.');
 return {email,password};
}
export async function currentUser(){
 const token=(await cookies()).get(SESSION_COOKIE)?.value;if(!token||!/^[a-f0-9]{64}$/.test(token))return null;
 return database().prepare('SELECT u.id AS userId,u.email FROM account_sessions s JOIN accounts u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>?').bind(tokenDigest(token),Date.now()).first<{userId:string;email:string}>();
}
export async function authLimit(email:string){
 const db=database(),bucket=Math.floor(Date.now()/900000);
 const increment=(key:string,limit:number)=>db.prepare('INSERT INTO auth_limits(key,bucket,attempts) VALUES(?,?,1) ON CONFLICT(key,bucket) DO UPDATE SET attempts=attempts+1 WHERE attempts<? RETURNING attempts').bind(key,bucket,limit);
 const results=await db.batch([increment(tokenDigest(email),10),increment('global',100)]);
 if(results.some(r=>!r.results.length))throw new AppError(429,'Too many sign-in attempts. Please try again in 15 minutes.');
 await db.prepare('DELETE FROM auth_limits WHERE bucket<?').bind(bucket-1).run();
}
export async function sessionResponse(user:{userId:string;email:string},request:Request){
 const token=newToken();await database().prepare('INSERT INTO account_sessions(token_hash,user_id,expires_at) VALUES(?,?,?)').bind(tokenDigest(token),user.userId,Date.now()+lifetime*1000).run();
 await database().prepare('DELETE FROM account_sessions WHERE expires_at<=?').bind(Date.now()).run();
 const response=Response.json({user},{headers:{'Cache-Control':'no-store'}});
 response.headers.append('Set-Cookie',`${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${lifetime}${new URL(request.url).protocol==='https:'?'; Secure':''}`);
 return response;
}
