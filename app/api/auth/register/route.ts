import {assertOrigin,readJson,object,AppError} from '@/lib/validation';
import {credentials,authLimit,sessionResponse} from '@/lib/local-auth';
import {hashPassword} from '@/lib/password';
import {database} from '@/lib/storage';
import {failure} from '@/lib/api-context';
export async function POST(request:Request){try{
 assertOrigin(request);const {email,password}=credentials(object(await readJson(request,4096)));await authLimit(email);
 const hash=await hashPassword(password),userId=crypto.randomUUID();
 const result=await database().prepare('INSERT INTO accounts(id,email,password_hash,created_at) VALUES(?,?,?,?) ON CONFLICT(email) DO NOTHING RETURNING id').bind(userId,email,hash,Date.now()).all();
 if(!result.results.length)throw new AppError(409,'An account with this email already exists. Please sign in.');
 return await sessionResponse({userId,email},request);
 }catch(e){return failure(e);}}
