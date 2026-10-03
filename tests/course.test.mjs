import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const compile=s=>'data:text/javascript;base64,'+Buffer.from(ts.transpile(s,{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022})).toString('base64');
const extra=compile(fs.readFileSync('lib/course-expansion.ts','utf8'));
const units=compile(fs.readFileSync('lib/course-units.ts','utf8'));
const source=fs.readFileSync('lib/course.ts','utf8').replace('"./course-expansion"',JSON.stringify(extra)).replace('"./course-units"',JSON.stringify(units));
const {lessons}=await import(compile(source));
test('expanded course has complete examples and valid answer keys',()=>{
 assert.equal(lessons.length,32);assert.equal(new Set(lessons.map(l=>l.title)).size,32);
 for(const lesson of lessons){assert.ok(lesson.intro&&lesson.concept);assert.equal(lesson.questions.length,3);assert.equal(lesson.words.length,3);
  for(const w of lesson.words)assert.ok(w.sa&&w.roman&&w.english&&w.tip);
  for(const q of lesson.questions){assert.ok(q.explain&&q.prompt);assert.ok(q.answer>=0&&q.answer<q.options.length);assert.equal(new Set(q.options).size,q.options.length);}
 }
});
