import { get } from 'svelte/store';
import {
	expandedBlock,
	weightPopover,
	isBoundingBoxActive,
	textbookCurrentPageId,
	isExpandOrCollapseRunning,
	isFetchingModel,
	userId
} from '~/store';
import {
	highlightElements,
	removeHighlightFromElements,
	applyTransformerBoundingHeight,
	resetElementsHeight,
	highlightAttentionPath,
	removeAttentionPathHighlight,
	removeFingerFromElements
} from '~/utils/textbook';
import { drawResidualLine } from './animation';

export interface TextbookPage {
	id: string;
	title: string;
	content?: string;
	component?: any;
	timeoutId?: number;
	on: () => void;
	out: () => void;
	complete?: () => void;
}

const { drawLine, removeLine } = drawResidualLine();

export const textPages: TextbookPage[] = [
	{
		id: 'what-is-transformer',
		title: '트랜스포머란?',
		content: `<p><strong>트랜스포머(Transformer)</strong>는 ChatGPT, Gemini 같은 모델을 구동하는 현대 AI의 핵심 아키텍처입니다. 2017년에 처음 소개되어 AI가 정보를 처리하는 방식을 혁신했습니다. 같은 아키텍처가 방대한 데이터로 모델을 학습(training)할 때와, 학습된 모델로 결과를 생성(추론, inference)할 때 모두 쓰입니다. 여기서는 최신 모델보다 단순하지만 기본 원리를 배우기에 딱 알맞은, GPT-2 (small)과 같은 구조의 한국어 모델 KoGPT2를 사용합니다.</p>
`,
		on: () => {},
		out: () => {}
	},
	{
		id: 'how-transformers-work',
		title: '트랜스포머는 어떻게 동작할까?',
		content: `<p>트랜스포머는 마법이 아닙니다. 다음 질문을 반복하며 텍스트를 한 단계씩 만들어 갑니다.</p>
	<blockquote class="question">
		"이 입력 다음에 올 가능성이 가장 높은 단어는 무엇일까?"
	</blockquote>
	<p>여기서는 학습된 모델이 텍스트를 생성하는 과정을 살펴봅니다. 직접 텍스트를 입력하거나 예시를 고른 다음 <strong>생성</strong> 버튼을 눌러 동작을 확인해 보세요. 모델이 아직 준비되지 않았다면 다른 <strong>예시</strong>를 선택해 보세요.</p>`,
		on: () => {
			highlightElements(['.input-form']);
			if (get(isFetchingModel)) {
				highlightElements(['.input-form .select-button']);
			} else {
				highlightElements(['.input-form .generate-button']);
			}
		},
		out: () => {
			removeHighlightFromElements([
				'.input-form',
				'.input-form .select-button',
				'.input-form .generate-button'
			]);
		},
		complete: () => {
			removeFingerFromElements(['.input-form .select-button', '.input-form .generate-button']);
			if (get(textbookCurrentPageId) === 'how-transformers-work') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'how-transformers-work'
				});
			}
		}
	},
	{
		id: 'transformer-architecture',
		title: '트랜스포머 아키텍처',
		content:
			'<p>트랜스포머는 세 가지 주요 부분으로 이루어져 있습니다.</p><div class="numbered-list"><div class="numbered-item"><span class="number-circle">1</span><div class="item-content"><strong>임베딩</strong>은 텍스트를 숫자로 바꿉니다.</div></div><div class="numbered-item"><span class="number-circle">2</span><div class="item-content"><strong>트랜스포머 블록</strong>은 셀프 어텐션으로 정보를 섞고 MLP로 정보를 다듬습니다.</div></div><div class="numbered-item"><span class="number-circle">3</span><div class="item-content"><strong>확률</strong>은 각 토큰이 다음에 올 가능성을 결정합니다.</div></div></div>',
		on: () => {
			const selectors = [
				'.step.embedding',
				'.step.softmax',
				'.transformer-bounding',
				'.transformer-bounding-title'
			];
			highlightElements(selectors);
			applyTransformerBoundingHeight(['.softmax-bounding', '.embedding-bounding']);
		},
		out: () => {
			const selectors = [
				'.step.embedding',
				'.step.softmax',
				'.transformer-bounding',
				'.transformer-bounding-title'
			];
			removeHighlightFromElements(selectors);
			resetElementsHeight(['.softmax-bounding', '.embedding-bounding']);
		}
	},
	{
		id: 'embedding',
		title: '임베딩',
		content: `<p>트랜스포머가 텍스트를 사용하려면 먼저 텍스트를 작은 단위로 쪼개고, 각 단위를 숫자 목록(벡터)으로 표현해야 합니다. 이 과정을 <strong>임베딩(embedding)</strong>이라고 하며, 이 용어는 과정 자체와 그 결과로 나온 벡터를 모두 가리킬 수 있습니다.</p><p>이 도구에서 각 벡터는 직사각형으로 표시되며, 마우스를 올리면 크기를 확인할 수 있습니다.</p>`,
		on: () => {
			highlightElements(['.step.embedding .title']);
		},
		out: () => {
			removeHighlightFromElements(['.step.embedding .title']);
		},
		complete: () => {
			removeFingerFromElements(['.step.embedding .title']);
			if (get(textbookCurrentPageId) === 'embedding') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'embedding'
				});
			}
		}
	},
	{
		id: 'token-embedding',
		title: '토큰 임베딩',
		content: `<p><strong>토큰화(tokenization)</strong>는 입력 텍스트를 단어나 단어의 일부 같은 작은 단위인 토큰으로 나눕니다. KoGPT2의 어휘에는 51,200개의 토큰이 있고, 각 토큰은 고유한 ID를 갖습니다.</p><p><strong>토큰 임베딩</strong> 단계에서는 모든 토큰을 큰 조회 테이블(lookup table)에서 768개의 숫자로 된 벡터에 대응시킵니다. 이 벡터들은 각 토큰의 의미를 가장 잘 나타내도록 학습 과정에서 조정됩니다.</p>`,
		on: function () {
			const selectors = [
				'.token-column .column.token-string',
				'.token-column .column.token-embedding'
			];
			if (get(expandedBlock).id !== 'embedding') {
				expandedBlock.set({ id: 'embedding' });
				this.timeoutId = setTimeout(() => {
					highlightElements(selectors);
				}, 500);
			} else {
				highlightElements(selectors);
			}
		},
		out: function () {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = undefined;
			}
			const selectors = [
				'.token-column .column.token-string',
				'.token-column .column.token-embedding'
			];
			removeHighlightFromElements(selectors);
			if (get(textbookCurrentPageId) !== 'positional-encoding') expandedBlock.set({ id: null });
		}
	},
	{
		id: 'positional-encoding',
		title: '위치 인코딩',
		content: `<p>언어에서는 단어의 순서가 중요합니다. <strong>위치 인코딩(positional encoding)</strong>은 각 토큰에 시퀀스 안에서의 위치 정보를 제공합니다.</p><p>GPT-2는 학습된 위치 임베딩을 토큰 임베딩에 더하는 방식을 쓰지만, 최신 모델은 특정 벡터를 회전시켜 위치를 인코딩하는 RoPE 같은 다른 방법을 쓰기도 합니다. 어떤 방법이든 목표는 모델이 텍스트의 순서를 이해하도록 돕는 것입니다.</p>`,
		on: function () {
			const selectors = [
				'.token-column .column.position-embedding',
				'.token-column .column.symbol'
			];
			if (get(expandedBlock).id !== 'embedding') {
				expandedBlock.set({ id: 'embedding' });
				this.timeoutId = setTimeout(() => {
					highlightElements(selectors);
				}, 500);
			} else {
				highlightElements(selectors);
			}
		},
		out: function () {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = undefined;
			}
			const selectors = [
				'.token-column .column.position-embedding',
				'.token-column .column.symbol'
			];
			removeHighlightFromElements(selectors);
			if (get(textbookCurrentPageId) !== 'token-embedding') expandedBlock.set({ id: null });
		}
	},
	{
		id: 'blocks',
		title: '반복되는 트랜스포머 블록',
		content: `<p><strong>트랜스포머 블록</strong>은 모델의 주요 처리 단위이며, 두 부분으로 이루어져 있습니다.</p><ul><li><strong>멀티 헤드 셀프 어텐션</strong> – 토큰끼리 정보를 공유하게 합니다</li><li><strong>MLP</strong> – 각 토큰의 세부 정보를 다듬습니다</li></ul><p>모델은 블록을 여러 개 쌓아서, 토큰 표현이 블록을 통과할수록 더 풍부해지도록 합니다. KoGPT2에는 블록이 12개 있습니다.</p>`,
		on: function () {
			this.timeoutId = setTimeout(
				() => {
					highlightElements([
						'.transformer-bounding',
						'.step.transformer-blocks .guide',
						'.attention > .title',
						'.mlp > .title'
					]);
					highlightElements(['.transformer-bounding-title'], 'textbook-button-highlight');
					isBoundingBoxActive.set(true);
				},
				get(isExpandOrCollapseRunning) ? 500 : 0
			);
		},
		out: function () {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = undefined;
			}
			removeHighlightFromElements([
				'.transformer-bounding',
				'.step.transformer-blocks .guide',
				'.attention > .title',
				'.mlp > .title'
			]);
			removeHighlightFromElements(['.transformer-bounding-title'], 'textbook-button-highlight');
			isBoundingBoxActive.set(false);
		},
		complete: () => {
			removeFingerFromElements(['.transformer-bounding-title']);
			if (get(textbookCurrentPageId) === 'blocks') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'blocks'
				});
			}
		}
	},
	{
		id: 'self-attention',
		title: '멀티 헤드 셀프 어텐션',
		content:
			'<p><strong>셀프 어텐션(self-attention)</strong>은 모델이 각 토큰에 대해 입력의 어느 부분이 가장 관련 있는지 판단하게 해 줍니다. 덕분에 멀리 떨어진 단어 사이에서도 의미와 관계를 포착할 수 있습니다.</p><p><strong>멀티 헤드(multi-head)</strong> 방식에서는 여러 어텐션 과정을 병렬로 실행하며, 각각이 텍스트의 서로 다른 패턴에 집중합니다.</p>',
		on: () => {
			highlightElements(['.step.attention']);
		},
		out: () => {
			removeHighlightFromElements(['.step.attention']);
		}
	},
	{
		id: 'qkv',
		title: '쿼리, 키, 밸류',
		content: `
	<p>셀프 어텐션을 수행하기 위해 각 토큰의 임베딩은
  <span class="highlight">세 개의 새로운 임베딩</span>, 즉
  <span class="blue">쿼리(Query)</span>,
  <span class="red">키(Key)</span>,
  <span class="green">밸류(Value)</span>로 변환됩니다.
  이 변환은 각 토큰 임베딩에 서로 다른 가중치와 편향을 적용해서 이루어집니다. 이 파라미터(가중치와 편향)는 학습을 통해 최적화됩니다.</p>

<p>이렇게 만들어진 <span class="blue">쿼리</span>는 <span class="red">키</span>와 비교되어 관련도를 측정하고, 이 관련도를 이용해 <span class="green">밸류</span>에 가중치를 부여합니다.</p>
`,
		on: function () {
			this.timeoutId = setTimeout(
				() => {
					highlightElements(['g.path-group.qkv', '.step.qkv .qkv-column']);
				},
				get(isExpandOrCollapseRunning) ? 500 : 0
			);
		},
		out: function () {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = undefined;
			}
			removeHighlightFromElements(['g.path-group.qkv', '.step.qkv .qkv-column']);
			weightPopover.set(null);
		},
		complete: () => {
			removeFingerFromElements(['.step.qkv .qkv-column']);
			if (get(textbookCurrentPageId) === 'qkv') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'qkv'
				});
			}
		}
	},

	{
		id: 'multi-head',
		title: '멀티 헤드',
		content:
			'<p><span class="blue">Q</span>, <span class="red">K</span>, <span class="green">V</span> 임베딩을 만든 뒤, 모델은 이를 여러 개의 <strong>헤드</strong>로 나눕니다(KoGPT2는 12개). 각 헤드는 자기만의 더 작은 <span class="blue">Q</span>/<span class="red">K</span>/<span class="green">V</span> 묶음으로 작업하며 문법, 의미, 멀리 떨어진 단어 간의 연결 같은 텍스트의 서로 다른 패턴에 집중합니다.</p><p>여러 헤드 덕분에 모델은 다양한 종류의 관계를 병렬로 학습하여 더 풍부하게 이해할 수 있습니다.</p>',
		on: () => {
			highlightAttentionPath();
			highlightElements(['.multi-head .head-title']);
		},
		out: () => {
			removeAttentionPathHighlight();
			removeHighlightFromElements(['.multi-head .head-title']);
		},
		complete: () => {
			removeFingerFromElements(['.multi-head .head-title']);
			if (get(textbookCurrentPageId) === 'multi-head') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'multi-head'
				});
			}
		}
	},
	{
		id: 'masked-self-attention',
		title: '마스크드 셀프 어텐션',
		content: `<p>각 헤드에서 모델은 각 토큰이 다른 토큰에 얼마나 주목할지 결정합니다.</p><ul><li><strong>내적(Dot Product)</strong> – <span class="blue">쿼리</span>/<span class="red">키</span> 벡터에서 같은 위치의 숫자끼리 곱한 뒤 모두 더해 <span class="purple">어텐션 점수</span>를 구합니다.</li><li><strong>마스크(Mask)</strong> – 미래 토큰을 가려서 앞을 엿보지 못하게 합니다.</li><li><strong>소프트맥스(Softmax)</strong> – 점수를 확률로 바꿉니다. 각 행의 합은 1이 되며, 앞쪽 토큰들에 얼마나 주목하는지를 보여 줍니다.</li></ul>`,
		on: () => {
			highlightAttentionPath();
			highlightElements(['.attention-matrix.attention-result']);
		},
		out: () => {
			removeAttentionPathHighlight();
			removeHighlightFromElements(['.attention-matrix.attention-result']);
			expandedBlock.set({ id: null });
		},
		complete: () => {
			removeFingerFromElements(['.attention-matrix.attention-result']);
			if (get(textbookCurrentPageId) === 'masked-self-attention') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'masked-self-attention'
				});
			}
		}
	},
	{
		id: 'output-concatenation',
		title: '어텐션 출력과 연결',
		content:
			'<p>각 헤드는 <span class="highlight"><span class="purple">어텐션 점수</span>와 <span class="green">밸류</span> 임베딩을 곱해 어텐션 출력을 만듭니다</span>. 이는 문맥을 고려한 뒤 각 토큰을 다듬은 표현입니다.</p><p>KoGPT2에는 이런 출력이 12개 있으며, 이들을 이어 붙여(concatenate) 원래 크기(숫자 768개)의 벡터 하나를 만듭니다.</p>',
		on: function () {
			this.timeoutId = setTimeout(
				() => {
					highlightElements(['path.to-attention-out.value-to-out', '.attention .column.out']);
				},
				get(isExpandOrCollapseRunning) ? 500 : 0
			);
		},
		out: function () {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = undefined;
			}
			removeHighlightFromElements(['path.to-attention-out.value-to-out', '.attention .column.out']);
			weightPopover.set(null);
		},
		complete: () => {
			removeFingerFromElements(['.attention .column.out']);
			if (get(textbookCurrentPageId) === 'output-concatenation') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'output-concatenation'
				});
			}
		}
	},
	{
		id: 'mlp',
		title: 'MLP (다층 퍼셉트론)',
		content:
			'<p>어텐션 출력은 토큰 표현을 다듬기 위해 <strong>MLP</strong>를 통과합니다. 선형(Linear) 층이 학습된 가중치와 편향으로 임베딩의 값과 크기를 바꾸고, 이어서 비선형 활성화 함수가 각 값을 얼마나 통과시킬지 결정합니다.</p><p>활성화 함수에는 여러 종류가 있는데, GPT-2는 <strong>GELU</strong>를 사용합니다. GELU는 작은 값은 일부만, 큰 값은 모두 통과시켜 미묘한 패턴과 강한 패턴을 함께 포착하도록 돕습니다.</p>',
		on: () => {
			highlightElements(['.step.mlp', '.operation-col.activation']);
		},
		out: () => {
			removeHighlightFromElements(['.step.mlp', '.operation-col.activation']);
		}
	},

	{
		id: 'output-logit',
		title: '출력 로짓',
		content: `<p>모든 트랜스포머 블록을 거친 뒤, 앞선 모든 토큰의 문맥이 담긴 마지막 토큰의 출력 임베딩에 마지막 층의 학습된 가중치를 곱합니다.</p><p>그 결과 <strong>로짓(logit)</strong>이 만들어집니다. 로짓은 KoGPT2 어휘의 토큰마다 하나씩, 총 51,200개의 숫자로 각 토큰이 다음에 올 가능성이 얼마나 되는지를 나타냅니다.</p>`,
		on: () => {
			highlightElements(['g.path-group.softmax', '.column.final']);
		},
		out: () => {
			removeHighlightFromElements(['g.path-group.softmax', '.column.final']);
			weightPopover.set(null);
		},
		complete: () => {
			removeFingerFromElements(['.column.final']);
			if (get(textbookCurrentPageId) === 'output-logit') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'output-logit'
				});
			}
		}
	},
	{
		id: 'output-probabilities',
		title: '확률',
		content:
			'<p>로짓은 가공되지 않은 점수일 뿐입니다. 해석하기 쉽도록 0과 1 사이의 값이면서 모두 더하면 1이 되는 <strong>확률</strong>로 바꿉니다. 이 확률이 각 토큰이 다음 단어가 될 가능성을 알려 줍니다.</p><p>항상 확률이 가장 높은 토큰만 고르는 대신, 여러 선택 전략을 사용해 생성되는 텍스트의 안정성과 창의성 사이에서 균형을 맞출 수 있습니다.</p>',
		on: () => {
			highlightElements(['.step.softmax .title']);
		},
		out: () => {
			removeHighlightFromElements(['.step.softmax .title']);
		},
		complete: () => {
			removeFingerFromElements(['.step.softmax .title']);
			if (get(textbookCurrentPageId) === 'output-probabilities') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'output-probabilities'
				});
			}
		}
	},
	{
		id: 'temperature',
		title: '온도(Temperature)',
		content:
			'<p><strong>온도(temperature)</strong>는 로짓을 확률로 바꾸기 전에 로짓의 크기를 조정합니다. <strong>낮은 온도</strong>(예: 0.2)는 큰 로짓은 더 크게, 작은 로짓은 더 작게 만들어 점수가 가장 높은 토큰을 선호하게 하므로 더 <strong>예측 가능한 선택</strong>으로 이어집니다. <strong>높은 온도</strong>(예: 1.0 이상)는 차이를 평평하게 만들어 가능성이 낮은 토큰도 경쟁력을 갖게 하므로 더 <strong>창의적인 출력</strong>으로 이어집니다.</p>',
		on: function () {
			if (get(expandedBlock).id !== 'softmax') {
				expandedBlock.set({ id: 'softmax' });
				this.timeoutId = setTimeout(() => {
					highlightElements([
						'.formula-step.scaled',
						'.title-box.scaled',
						'.content-box.scaled',
						'.temperature-input'
					]);
				}, 500);
			} else {
				highlightElements([
					'.formula-step.scaled',
					'.title-box.scaled',
					'.content-box.scaled',
					'.temperature-input'
				]);
			}
		},
		out: function () {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = undefined;
			}
			removeHighlightFromElements([
				'.formula-step.scaled',
				'.title-box.scaled',
				'.temperature-input',
				'.content-box.scaled'
			]);
			if (!['temperature', 'sampling'].includes(get(textbookCurrentPageId)))
				expandedBlock.set({ id: null });
		},
		complete: () => {
			removeFingerFromElements(['.temperature-input']);
			if (get(textbookCurrentPageId) === 'temperature') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'temperature'
				});
			}
		}
	},
	{
		id: 'sampling',
		title: '샘플링 전략',
		content:
			'<p>마지막으로 다음 토큰을 고를 전략이 필요합니다. 여러 방법이 있지만 흔히 쓰이는 것은 다음과 같습니다. 탐욕적 탐색(greedy search)은 가장 높은 것 하나를 고릅니다. <strong>Top-k</strong>는 가능성이 가장 높은 k개 토큰만 남기고, <strong>top-p</strong>는 확률의 합이 p 이상이 되는 가장 작은 토큰 집합만 남겨 가능성이 낮은 토큰을 미리 잘라 냅니다.</p><p>그런 다음 소프트맥스가 남은 로짓을 확률로 바꾸고, 허용된 집합에서 토큰 하나를 무작위로 뽑습니다.</p>',
		on: function () {
			if (get(expandedBlock).id !== 'softmax') {
				expandedBlock.set({ id: 'softmax' });
				this.timeoutId = setTimeout(() => {
					highlightElements([
						'.formula-step.sampling',
						'.title-box.sampling',
						'.sampling-input',
						'.content-box.sampling'
					]);
				}, 500);
			} else {
				highlightElements([
					'.formula-step.sampling',
					'.title-box.sampling',
					'.sampling-input',
					'.content-box.sampling'
				]);
			}
		},
		out: function () {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = undefined;
			}
			removeHighlightFromElements([
				'.formula-step.sampling',
				'.title-box.sampling',
				'.sampling-input',
				'.content-box.sampling'
			]);
			if (!['temperature', 'sampling'].includes(get(textbookCurrentPageId)))
				expandedBlock.set({ id: null });
		},
		complete: () => {
			removeFingerFromElements(['.sampling-input']);
			if (get(textbookCurrentPageId) === 'sampling') {
				window.dataLayer?.push({
					user_id: get(userId),
					event: `textbook-complete`,
					page_id: 'sampling'
				});
			}
		}
	},
	{
		id: 'residual',
		title: '잔차 연결',
		content: `<p>트랜스포머에는 모델 성능을 높여 주는 보조 요소들이 있습니다. 예를 들어 <strong>잔차 연결(residual connection)</strong>은 층의 입력을 그 층의 출력에 더해, 정보가 여러 블록을 거치면서 사라지지 않도록 합니다. GPT-2에서는 블록마다 두 번 사용되어 더 깊은 구조를 효과적으로 학습할 수 있게 합니다.</p>`,
		on: function () {
			this.timeoutId = setTimeout(
				() => {
					highlightElements(['.operation-col.residual', '.residual-start']);
					drawLine();
				},
				get(isExpandOrCollapseRunning) ? 500 : 0
			);
		},
		out: function () {
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
				this.timeoutId = undefined;
			}
			removeHighlightFromElements(['.operation-col.residual', '.residual-start']);
			removeLine();
		}
	},
	{
		id: 'layer-normalization',
		title: '층 정규화',
		content: `<p><strong>층 정규화(Layer Normalization)</strong>는 입력 숫자들의 평균과 분산이 일정하게 유지되도록 조정하여 학습과 추론을 모두 안정시킵니다. 덕분에 모델은 초기 가중치에 덜 민감해지고 더 효과적으로 학습할 수 있습니다. GPT-2에서는 셀프 어텐션 앞, MLP 앞, 그리고 최종 출력 앞에서 한 번 더 적용됩니다.</p>`,
		on: () => {
			highlightElements(['.operation-col.ln']);
		},
		out: () => {
			removeHighlightFromElements(['.operation-col.ln']);
		}
	},
	{
		id: 'dropout',
		title: '드롭아웃',
		content: `<p>학습 중에 <strong>드롭아웃(dropout)</strong>은 숫자 사이의 연결 일부를 무작위로 끊어, 모델이 특정 패턴에 과적합되지 않도록 합니다. 이를 통해 더 잘 일반화되는 특징을 학습할 수 있습니다. GPT-2는 드롭아웃을 사용하지만, 최신 LLM은 거대한 데이터셋으로 학습해 과적합이 덜 문제가 되기 때문에 생략하는 경우가 많습니다. 추론 시에는 드롭아웃이 꺼집니다.</p>`,
		on: () => {
			highlightElements(['.operation-col.dropout']);
		},
		out: () => {
			removeHighlightFromElements(['.operation-col.dropout']);
		}
	}
	// {
	// 	id: 'final',
	// 	title: `Let's explore!`,
	// 	content: '',
	// 	on: () => {},
	// 	out: () => {}
	// }
];
