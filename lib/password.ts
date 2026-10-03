import { scrypt, randomBytes, timingSafeEqual, createHash } from 'node:crypto';
const parameters={N:32768,r:8,p:3,maxmem:64*1024*1024};
function derive(password:string,salt:string):Promise<Buffer>{return new Promise((resolve,reject)=>scrypt(password,salt,64,parameters,(error,key)=>error?reject(error):resolve(key)));}
export async function hashPassword(password:string){const salt=randomBytes(16).toString('hex');return `scrypt1$${salt}$${(await derive(password,salt)).toString('hex')}`;}
export async function verifyPassword(password:string,stored:string){const [version,salt,hash]=stored.split('$');if(version!=='scrypt1'||!salt||!hash)return false;const key=await derive(password,salt),expected=Buffer.from(hash,'hex');return expected.length===key.length&&timingSafeEqual(expected,key);}
export function tokenDigest(value:string){return createHash('sha256').update(value).digest('hex');}
export function newToken(){return randomBytes(32).toString('hex');}
