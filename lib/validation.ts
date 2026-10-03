export class AppError extends Error {
 status: number;
 constructor(status: number, message: string) { super(message); this.status=status; this.name = "AppError"; }
}
export function assertOrigin(request: Request) {
 const origin = request.headers.get("origin");
 const fetchSite = request.headers.get("sec-fetch-site");
 if (!origin || origin !== new URL(request.url).origin || (fetchSite && !["same-origin", "none"].includes(fetchSite)))
  throw new AppError(403, "Please make this request from the learning app.");
 if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json"))
  throw new AppError(415, "Please send JSON.");
}
export async function readJson(request: Request, limit: number): Promise<unknown> {
 const length = Number(request.headers.get("content-length"));
 if (length > limit) throw new AppError(413, "This request is too large.");
 if (!request.body) throw new AppError(400, "Please provide a request body.");
 const reader = request.body.getReader();
 const chunks: Uint8Array[] = []; let total = 0;
 try { while (true) { const {value,done} = await reader.read(); if (done) break; total += value.byteLength;
  if (total > limit) { await reader.cancel(); throw new AppError(413, "This request is too large."); } chunks.push(value); }
 } finally { reader.releaseLock(); }
 const bytes = new Uint8Array(total); let offset = 0;
 for (const chunk of chunks) { bytes.set(chunk,offset); offset += chunk.length; }
 try { return JSON.parse(new TextDecoder("utf-8", {fatal:true}).decode(bytes)); }
 catch { throw new AppError(400, "This request contains invalid JSON."); }
}
export function object(value: unknown): Record<string, unknown> {
 if (!value || typeof value !== "object" || Array.isArray(value)) throw new AppError(400,"Please provide a valid request.");
 return value as Record<string,unknown>;
}
export type Message = {role:"user"|"assistant";content:string};
export function messages(value: unknown, max = 12): Message[] {
 if (!Array.isArray(value) || value.length < 1 || value.length > max) throw new AppError(400, "Please provide a valid conversation.");
 return value.map(v => { const m=object(v);
  if ((m.role !== "user" && m.role !== "assistant") || typeof m.content !== "string" || !m.content.trim() || m.content.length>4000)
   throw new AppError(400,"Please provide valid conversation messages.");
  return {role:m.role,content:m.content.trim()}; });
}
export function index(value: unknown, max: number): number {
 if (!Number.isInteger(value) || Number(value)<0 || Number(value)>=max) throw new AppError(400,"Please choose a valid lesson or example.");
 return value as number;
}
export function validateWav(value: unknown) {
 if (typeof value !== "string" || value.length>1400000 || !/^[A-Za-z0-9+/]+={0,2}$/.test(value) || value.length%4)
  throw new AppError(400,"Please provide a short WAV recording.");
 let bytes: Uint8Array;
 try { bytes = Uint8Array.from(atob(value), c=>c.charCodeAt(0)); } catch { throw new AppError(400,"Invalid audio encoding."); }
 if (bytes.length<44) throw new AppError(400,"This recording is too short.");
 const v=new DataView(bytes.buffer); const str=(n:number,l:number)=>String.fromCharCode(...bytes.slice(n,n+l));
 if (str(0,4)!=="RIFF" || str(8,4)!=="WAVE" || v.getUint32(4,true)+8!==bytes.length)
  throw new AppError(400,"Please provide a valid WAV recording.");
 let rate=0, channels=0, bits=0, samples:Uint8Array|undefined;
 for(let p=12;p+8<=bytes.length;){const tag=str(p,4),size=v.getUint32(p+4,true),start=p+8;
  if(start+size>bytes.length)throw new AppError(400,"The audio file is incomplete.");
  if(tag==="fmt "){if(size<16||v.getUint16(start,true)!==1)throw new AppError(400,"Use PCM WAV audio.");channels=v.getUint16(start+2,true);rate=v.getUint32(start+4,true);bits=v.getUint16(start+14,true);}
  if(tag==="data")samples=bytes.slice(start,start+size);
  p=start+size+(size%2);
 }
 if(channels!==1||bits!==16||rate<8000||rate>48000||!samples||samples.length%2)throw new AppError(400,"Use mono 16-bit WAV audio.");
 const duration=samples.length/(rate*2);
 if(duration<0.3||duration>20.1)throw new AppError(400,"Record between 1 and 20 seconds.");
 const pcm=new DataView(samples.buffer);let sum=0;for(let n=0;n<samples.length;n+=2)sum+=(pcm.getInt16(n,true)/32768)**2;
 if(Math.sqrt(sum/(samples.length/2))<0.003)throw new AppError(400,"This recording is too quiet. Move closer to the microphone and try again.");
 return {data:value,duration};
}
