import { config } from "./ai-server";
type Health={text:boolean;audio:boolean;speech?:boolean;connectionError?:string};
let cached:{fingerprint:string;expires:number;health:Health}|undefined;
export async function aiHealth():Promise<Health>{
 const c=config();if(!c.key)return {text:false,audio:false};
 if(c.provider==="openrouter"){
  if(c.textModel!=="openrouter/free")return {text:false,audio:false,connectionError:"Choose openrouter/free. Paid models are blocked in this setup."};
  try{const response=await fetch("https://openrouter.ai/api/v1/key",{headers:{Authorization:"Bearer "+c.key},signal:AbortSignal.timeout(7000)});
   if(!response.ok)return {text:false,audio:false,speech:false,connectionError:"Check your local OpenRouter key and free-tier access."};
   return {text:true,audio:false,speech:false};
  }catch{return {text:false,audio:false,connectionError:"Could not reach OpenRouter. Try checking the connection again."};}
 }
 const digest=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(c.key+':'+c.textModel+':'+c.audioModel));
 const fingerprint=Array.from(new Uint8Array(digest),v=>v.toString(16).padStart(2,'0')).join('');
 if(cached?.fingerprint===fingerprint&&cached.expires>Date.now())return cached.health;
 const statuses=await Promise.all([c.textModel].map(async model=>{
  try{const response=await fetch('https://api.openai.com/v1/models/'+encodeURIComponent(model),{headers:{Authorization:'Bearer '+c.key},signal:AbortSignal.timeout(7000)});return response.status;}catch{return 0;}
 }));
 const health:Health={text:statuses[0]===200,audio:false,speech:false};
 if(!health.text){health.connectionError=statuses.some(s=>s===401||s===403)?'The local AI key could not be verified. Check the key and its model permissions.':statuses.some(s=>s===404)?'Your account cannot access one of the configured AI models. Check the model names and account access.':'The AI connection could not be verified. Check your network, billing, and model access, then try again.';}
 cached={fingerprint,expires:Date.now()+30000,health};return health;
}
