export async function startRecording(onTime:(n:number)=>void){
 const stream=await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:true,noiseSuppression:true}});
 let ctx:AudioContext;
 try{ctx=new AudioContext();await ctx.resume();}catch(e){stream.getTracks().forEach(t=>t.stop());throw e;}
 const source=ctx.createMediaStreamSource(stream),processor=ctx.createScriptProcessor(4096,1,1),gain=ctx.createGain();gain.gain.value=0;
 const chunks:Float32Array[]=[];let count=0,closed=false;source.connect(processor);processor.connect(gain);gain.connect(ctx.destination);
 processor.onaudioprocess=e=>{const a=new Float32Array(e.inputBuffer.getChannelData(0));chunks.push(a);count+=a.length;onTime(count/ctx.sampleRate);};
 return async()=>{if(closed)throw new Error("Recording already stopped");closed=true;processor.disconnect();source.disconnect();gain.disconnect();stream.getTracks().forEach(t=>t.stop());const rate=ctx.sampleRate;await ctx.close();const buf=new ArrayBuffer(44+count*2),v=new DataView(buf);const str=(o:number,s:string)=>{for(let i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i));};str(0,"RIFF");v.setUint32(4,36+count*2,true);str(8,"WAVE");str(12,"fmt ");v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,rate,true);v.setUint32(28,rate*2,true);v.setUint16(32,2,true);v.setUint16(34,16,true);str(36,"data");v.setUint32(40,count*2,true);let i=44;for(const chunk of chunks)for(const sample of chunk){v.setInt16(i,Math.max(-1,Math.min(1,sample))*(sample<0?32768:32767),true);i+=2;}return new Blob([buf],{type:"audio/wav"});
 }
}
export async function blobBase64(blob:Blob){const bytes=new Uint8Array(await blob.arrayBuffer());let s="";for(let i=0;i<bytes.length;i+=8192)s+=String.fromCharCode(...bytes.subarray(i,i+8192));return btoa(s);}
