// Smoke check: transformers.js must tokenize Korean with the bundled KoGPT2 tokenizer exactly like the
// HuggingFace reference (a transformers.js upgrade or a tokenizer.json change silently yields <unk>).
// Run: node src/utils/model/check_tokenizer.mjs
import assert from 'node:assert/strict';
import { AutoTokenizer, env } from '@xenova/transformers';

env.allowLocalModels = true;
env.allowRemoteModels = false;
env.localModelPath = new URL('../../../static/tokenizer/', import.meta.url).pathname;

const tok = await AutoTokenizer.from_pretrained('kogpt2');
assert.deepEqual(tok.encode('근육이 커지기 위해서는'), [33245, 10114, 12748, 11357]);
assert.deepEqual(tok.encode('데이터 시각화는 사용자가'), [16071, 13494, 11118, 26463]);
assert.equal(tok.model.vocab[33245], '▁근육이'); // word starts keep their '▁' marker (decode([id]) drops it)
console.log('tokenizer ok');
