import { encodeWav } from "./wav";
export async function startRecording(onTime:(n:number)=>void,onLimit:()=>void){
 const stream=await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:true,noiseSuppression:true}});
 let ctx:AudioContext|undefined,source:MediaStreamAudioSourceNode|undefined,node:AudioWorkletNode|undefined;
 try{
 ctx=new AudioContext();await ctx.resume();await ctx.audioWorklet.addModule('/pcm-recorder.js');
 source=ctx.createMediaStreamSource(stream);node=new AudioWorkletNode(ctx,'pcm-recorder',{numberOfInputs:1,numberOfOutputs:1,channelCount:1});
 const chunks:Float32Array[]=[];let count=0,stopped=false,resolveFlush:(()=>void)|undefined;
 const rate=ctx.sampleRate;
 node.port.onmessage=e=>{if(e.data.samples){chunks.push(e.data.samples);count+=e.data.samples.length;onTime(Math.min(20,count/rate));}
 if(e.data.stopped)resolveFlush?.();if(e.data.limit)onLimit();};
 source.connect(node);node.connect(ctx.destination);
 return async()=>{if(stopped)throw new Error('Recording already stopped.');stopped=true;
 try{await new Promise<void>(resolve=>{let timeout:ReturnType<typeof setTimeout>;resolveFlush=()=>{clearTimeout(timeout);resolve();};timeout=setTimeout(resolve,200);node!.port.postMessage('stop');});return encodeWav(chunks,rate);}
 finally{node!.disconnect();source!.disconnect();stream.getTracks().forEach(t=>t.stop());await ctx!.close();}
 };
 }catch(e){source?.disconnect();node?.disconnect();stream.getTracks().forEach(t=>t.stop());if(ctx&&ctx.state!=='closed')await ctx.close();throw e;}
}
export async function blobBase64(blob:Blob){const bytes=new Uint8Array(await blob.arrayBuffer());let s="";for(let i=0;i<bytes.length;i+=8192)s+=String.fromCharCode(...bytes.subarray(i,i+8192));return btoa(s);}

export async function recordingLevel(blob:Blob){
 const bytes=await blob.arrayBuffer(),view=new DataView(bytes);let peak=0,sum=0,count=0;
 for(let i=44;i+1<bytes.byteLength;i+=2){const sample=view.getInt16(i,true)/32768;peak=Math.max(peak,Math.abs(sample));sum+=sample*sample;count++;}
 return {peak,rms:Math.sqrt(sum/Math.max(1,count))};
}
export async function replayRecording(blob:Blob,onEnd:()=>void){
 const context=new AudioContext();
 try{await context.resume();const buffer=await context.decodeAudioData(await blob.arrayBuffer());
 const source=context.createBufferSource(),gain=context.createGain();let peak=0;
 const samples=buffer.getChannelData(0);for(const sample of samples)peak=Math.max(peak,Math.abs(sample));
 if(peak<0.001)throw new Error("This recording has no audible microphone signal. Check your input device and record again.");
 gain.gain.value=Math.min(6,0.8/peak);source.buffer=buffer;source.connect(gain);gain.connect(context.destination);
 let ended=false;const finish=()=>{if(ended)return;ended=true;void context.close();onEnd();};source.onended=finish;source.start();
 return ()=>{if(!ended){source.stop();finish();}};
 }catch(e){await context.close();throw e;}
}
