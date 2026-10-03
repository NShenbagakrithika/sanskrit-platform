import {assertOrigin,readJson,object,AppError} from '@/lib/validation';
import {credentials,authLimit,sessionResponse} from '@/lib/local-auth';
import {verifyPassword,hashPassword} from '@/lib/password';
import {database} from '@/lib/storage';
import {failure} from '@/lib/api-context';
let dummy:Promise<string>|undefined;
export async function POST(request:Request){try{
 assertOrigin(request);const {email,password}=credentials(object(await readJson(request,4096)));await authLimit(email);
 const row=await database().prepare('SELECT id,email,password_hash FROM accounts WHERE email=?').bind(email).first<{id:string;email:string;password_hash:string}>();
 dummy??=hashPassword('dummy-credential-not-an-account');
 const valid=await verifyPassword(password,row?.password_hash??await dummy);
 if(!row||!valid)throw new AppError(401,'Email or password is incorrect.');
 return await sessionResponse({userId:row.id,email:row.email},request);
 }catch(e){return failure(e);}}
