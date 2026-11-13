import test from 'node:test';
import assert from 'node:assert/strict';
import {suggestPriority} from '../src/services/triage.js';
test('electrical sparks are urgent',()=>assert.equal(suggestPriority('Electrical sparks in corridor').priority,'URGENT'));
test('leakage is high',()=>assert.equal(suggestPriority('Water leakage in washroom').priority,'HIGH'));
test('slow connection is medium',()=>assert.equal(suggestPriority('Wi-Fi is slow').priority,'MEDIUM'));
test('ordinary request is low',()=>assert.equal(suggestPriority('Need a new notice board').priority,'LOW'));
