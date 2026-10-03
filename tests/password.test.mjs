import test from 'node:test';
import assert from 'node:assert/strict';
import {hashPassword,verifyPassword,newToken,tokenDigest} from '../lib/password.ts';
test('password hashes are salted and reject incorrect credentials',async()=>{
 const password='test-account-password';const a=await hashPassword(password),b=await hashPassword(password);
 assert.notEqual(a,b);assert.equal(await verifyPassword(password,a),true);assert.equal(await verifyPassword('wrong-password',a),false);assert.equal(await verifyPassword(password,'invalid'),false);
});
test('session tokens are random and stored as digests',()=>{const a=newToken(),b=newToken();assert.match(a,/^[a-f0-9]{64}$/);assert.notEqual(a,b);assert.notEqual(tokenDigest(a),a);});
