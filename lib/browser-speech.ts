// Use Devanagari-capable voices; never silently read Sanskrit with an English voice.
export function exampleVoice<T extends {lang:string}>(voices:T[]):T|undefined {
 return voices.find(v=>/^sa(?:-|$)/i.test(v.lang))??voices.find(v=>/^hi(?:-|$)/i.test(v.lang));
}
