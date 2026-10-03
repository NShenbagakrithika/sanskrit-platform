export function encodeWav(chunks:Float32Array[],inputRate:number,maxSeconds=20):Blob {
 const count=chunks.reduce((n,c)=>n+c.length,0),input=new Float32Array(count);let p=0;
 for(const c of chunks){input.set(c,p);p+=c.length;}
 const rate=24000,length=Math.min(Math.floor(count*rate/inputRate),maxSeconds*rate),buf=new ArrayBuffer(44+length*2),v=new DataView(buf);
 const str=(o:number,s:string)=>{for(let i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i));};
 str(0,"RIFF");v.setUint32(4,36+length*2,true);str(8,"WAVE");str(12,"fmt ");v.setUint32(16,16,true);
 v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,rate,true);v.setUint32(28,rate*2,true);v.setUint16(32,2,true);v.setUint16(34,16,true);str(36,"data");v.setUint32(40,length*2,true);
 for(let i=0;i<length;i++){const at=i*inputRate/rate,lo=Math.floor(at),fraction=at-lo;
 const sample=Math.max(-1,Math.min(1,(input[lo]??0)*(1-fraction)+(input[lo+1]??input[lo]??0)*fraction));
 v.setInt16(44+i*2,sample*(sample<0?32768:32767),true);}
 return new Blob([buf],{type:"audio/wav"});
}
