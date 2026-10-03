export async function requestJson<T>(url:string,body?:unknown,signal?:AbortSignal):Promise<T>{
 const res=await fetch(url,{method:body===undefined?'GET':'POST',headers:body===undefined?{}:{'Content-Type':'application/json'},...(body===undefined?{}:{body:JSON.stringify(body)}),signal:signal?AbortSignal.any([signal,AbortSignal.timeout(55000)]):AbortSignal.timeout(55000)});
 const data=await res.json() as T&{error?:string};
 if(!res.ok)throw new Error(data.error||'Please try again.');return data;
}
export function requestError(e:unknown){if(e instanceof Error&&e.name==='AbortError')return 'Request cancelled.';if(e instanceof Error&&e.name==='TimeoutError')return 'The request timed out. Please try again.';return e instanceof Error?e.message:'Something went wrong. Please try again.';}
