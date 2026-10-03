import {cookies} from 'next/headers';
import {assertOrigin} from '@/lib/validation';
import {SESSION_COOKIE} from '@/lib/local-auth';
import {tokenDigest} from '@/lib/password';
import {database} from '@/lib/storage';
import {json,failure} from '@/lib/api-context';
export async function POST(request:Request){try{assertOrigin(request);const token=(await cookies()).get(SESSION_COOKIE)?.value;
 if(token)await database().prepare('DELETE FROM account_sessions WHERE token_hash=?').bind(tokenDigest(token)).run();
 const response=json({ok:true});response.headers.append('Set-Cookie',`${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${new URL(request.url).protocol==='https:'?'; Secure':''}`);return response;
 }catch(e){return failure(e);}}
