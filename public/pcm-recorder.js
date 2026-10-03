class PCMRecorder extends AudioWorkletProcessor {
 constructor(){super();this.samples=0;this.buffer=[];this.stopped=false;this.port.onmessage=e=>{if(e.data==='stop'){this.flush();this.stopped=true;this.port.postMessage({stopped:true});}};}
 flush(){if(this.buffer.length){const samples=new Float32Array(this.buffer);this.buffer=[];this.port.postMessage({samples},[samples.buffer]);}}
 process(inputs){if(this.stopped)return false;const channel=inputs[0]?.[0];if(!channel)return true;
  const limit=Math.ceil(sampleRate*20);for(let i=0;i<channel.length&&this.samples<limit;i++){this.buffer.push(channel[i]);this.samples++;}
  if(this.buffer.length>=2048)this.flush();
  if(this.samples>=limit){this.flush();this.stopped=true;this.port.postMessage({limit:true});return false;}return true;}
}
registerProcessor('pcm-recorder',PCMRecorder);
