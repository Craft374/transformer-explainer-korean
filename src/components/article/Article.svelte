<script>
	import tailwindConfig from '../../../tailwind.config';
	import resolveConfig from 'tailwindcss/resolveConfig';
	import Katex from '~/utils/Katex.svelte';
</script>

<div id="description">
	<div class="article-section" data-click="article-intro">
		<h1>트랜스포머란 무엇인가?</h1>

		<p>
			트랜스포머(Transformer)는 인공지능에 대한 접근 방식을 근본적으로 바꿔 놓은 신경망 아키텍처입니다.
			트랜스포머는 2017년 기념비적인 논문
			<a
				href="https://dl.acm.org/doi/10.5555/3295222.3295349"
				title="ACM Digital Library"
				target="_blank">"Attention is All You Need"</a
			>에서 처음 소개되었고, 이후 딥러닝 모델의 표준 아키텍처로 자리 잡아 OpenAI의
			<strong>GPT</strong>, Meta의 <strong>Llama</strong>, Google의
			<strong>Gemini</strong> 같은 텍스트 생성 모델을 구동하고 있습니다. 트랜스포머는 텍스트뿐 아니라
			<a
				href="https://huggingface.co/learn/audio-course/en/chapter3/introduction"
				title="Hugging Face"
				target="_blank">오디오 생성</a
			>,
			<a
				href="https://huggingface.co/learn/computer-vision-course/unit3/vision-transformers/vision-transformers-for-image-classification"
				title="Hugging Face"
				target="_blank">이미지 인식</a
			>,
			<a href="https://elifesciences.org/articles/82819" title="eLife">단백질 구조 예측</a>, 심지어
			<a
				href="https://www.deeplearning.ai/the-batch/reinforcement-learning-plus-transformers-equals-efficiency/"
				title="Deep Learning AI"
				target="_blank">게임 플레이</a
			>에도 쓰이며, 다양한 분야에서 폭넓은 활용성을 보여 주고 있습니다.
		</p>
		<p>
			근본적으로 텍스트 생성 트랜스포머 모델은 <strong>다음 토큰 예측(next-token prediction)</strong>
			원리로 동작합니다. 즉, 사용자가 입력한 텍스트 프롬프트가 주어졌을 때
			<em>그 뒤에 올 가능성이 가장 높은 다음 토큰(단어 또는 단어의 일부)</em>이 무엇인지를 예측합니다.
			트랜스포머의 핵심 혁신이자 강점은 셀프 어텐션(self-attention) 메커니즘에 있습니다. 이 메커니즘
			덕분에 트랜스포머는 이전 아키텍처보다 전체 시퀀스를 더 효과적으로 처리하고, 멀리 떨어진 요소
			사이의 의존 관계도 잘 포착할 수 있습니다.
		</p>
		<p>
			GPT-2 계열 모델은 텍스트 생성 트랜스포머의 대표적인 예입니다. 이 한국어판 Transformer Explainer는
			GPT-2 (small)와 같은 구조를 가진 한국어 모델
			<a href="https://huggingface.co/skt/kogpt2-base-v2" title="Hugging Face" target="_blank"
				>KoGPT2</a
			>(SK텔레콤, 약 1억 2,500만 개의 파라미터)로 동작합니다. 최신이거나 가장 강력한 트랜스포머 모델은
			아니지만, 현재 최첨단 모델에서 볼 수 있는 아키텍처 구성 요소와 원리를 상당 부분 공유하고 있어
			기초를 이해하기 위한 출발점으로 이상적입니다.
		</p>
	</div>

	<div class="article-section" data-click="article-overview">
		<h1>트랜스포머 아키텍처</h1>

		<p>
			모든 텍스트 생성 트랜스포머는 다음 <strong>세 가지 핵심 구성 요소</strong>로 이루어져 있습니다.
		</p>
		<ol>
			<li>
				<strong class="bold-purple">임베딩(Embedding)</strong>: 입력 텍스트는 토큰이라는 더 작은
				단위(단어 또는 하위 단어)로 나뉩니다. 이 토큰들은 임베딩이라는 숫자 벡터로 변환되며, 임베딩은
				단어의 의미를 담고 있습니다.
			</li>
			<li>
				<strong class="bold-purple">트랜스포머 블록(Transformer Block)</strong>은 입력 데이터를
				처리하고 변환하는 모델의 기본 구성 단위입니다. 각 블록은 다음을 포함합니다.
				<ul class="">
					<li>
						<strong>어텐션 메커니즘(Attention Mechanism)</strong>: 트랜스포머 블록의 핵심 요소입니다.
						토큰들이 서로 정보를 주고받게 하여 문맥 정보와 단어 사이의 관계를 포착합니다.
					</li>
					<li>
						<strong>MLP(다층 퍼셉트론) 층</strong>: 각 토큰에 독립적으로 작동하는 피드포워드
						네트워크입니다. 어텐션 층의 목표가 토큰 사이에 정보를 전달하는 것이라면, MLP의 목표는 각
						토큰의 표현을 다듬는 것입니다.
					</li>
				</ul>
			</li>
			<li>
				<strong class="bold-purple">출력 확률(Output Probabilities)</strong>: 마지막 선형(linear)
				층과 소프트맥스(softmax) 층이 처리된 임베딩을 확률로 바꾸어, 모델이 시퀀스의 다음 토큰을
				예측할 수 있게 합니다.
			</li>
		</ol>
	</div>

	<div class="article-section" id="embedding" data-click="article-embedding">
		<h2>임베딩</h2>
		<p>
			트랜스포머 모델로 텍스트를 생성하고 싶다고 해 봅시다. 예를 들어
			<code>“데이터 시각화는 사용자가”</code> 같은 프롬프트를 입력합니다. 이 입력은
			모델이 이해하고 처리할 수 있는 형태로 변환되어야 하는데, 바로 여기서 임베딩이 필요합니다.
			임베딩은 텍스트를 모델이 다룰 수 있는 숫자 표현으로 바꿔 줍니다. 프롬프트를 임베딩으로 바꾸려면
			1) 입력을 토큰화하고, 2) 토큰 임베딩을 얻고, 3) 위치 정보를 더한 뒤, 마지막으로 4) 토큰 인코딩과
			위치 인코딩을 합쳐 최종 임베딩을 얻어야 합니다. 각 단계가 어떻게 이루어지는지 살펴봅시다.
		</p>
		<div class="figure">
			<img src="./article_assets/embedding.png" width="65%" />
		</div>
		<div class="figure-caption">
			그림 <span class="attention">1</span>. 임베딩 층을 펼쳐서 입력 프롬프트가 벡터 표현으로 변환되는
			과정을 보여 줍니다. 이 과정은 <span class="fig-numbering">(1)</span> 토큰화, (2) 토큰 임베딩, (3)
			위치 인코딩, (4) 최종 임베딩으로 이루어집니다.
		</div>
		<div class="article-subsection">
			<h3>1단계: 토큰화</h3>
			<p>
				토큰화(tokenization)는 입력 텍스트를 토큰이라는 더 작고 다루기 쉬운 조각으로 나누는
				과정입니다. 토큰은 하나의 단어일 수도, 단어의 일부일 수도 있습니다. <code>"데이터"</code>와
				<code>"사용자가"</code>는 각각 하나의 고유한 토큰에 대응하지만,
				<code>"시각화는"</code>은 <code>"시각"</code>과 <code>"화는"</code> 두 개의 토큰으로 나뉩니다.
				전체 토큰 어휘(vocabulary)는 모델을 학습하기 전에 정해지며, KoGPT2의 어휘에는
				<code>51,200</code>개의 고유한 토큰이 있습니다. 이제
				입력 텍스트를 고유한 ID를 가진 토큰으로 나눴으니, 임베딩에서 각 토큰의 벡터 표현을 가져올 수
				있습니다.
			</p>
		</div>
		<div class="article-subsection" id="article-token-embedding">
			<h3>2단계: 토큰 임베딩</h3>
			<p>
				KoGPT2는 어휘의 각 토큰을 768차원 벡터로 표현합니다(벡터의 차원은 모델마다
				다릅니다). 이 임베딩 벡터들은 <code>(51,200, 768)</code> 크기의 행렬에 저장되며, 파라미터가
				약 3,900만 개에 달합니다! 이 거대한 행렬 덕분에 모델은 각 토큰에 의미를 부여할 수 있습니다.
				언어에서 쓰임새나 의미가 비슷한 토큰은 이 고차원 공간에서 서로 가까이, 다른 토큰은 멀리
				배치됩니다.
			</p>
		</div>
		<div class="article-subsection" id="article-positional-embedding">
			<h3>3단계: 위치 인코딩</h3>
			<p>
				임베딩 층은 입력 프롬프트에서 각 토큰의 위치 정보도 인코딩합니다. 위치 인코딩 방식은 모델마다
				다릅니다. GPT-2는 자체 위치 인코딩 행렬을 처음부터 학습하여 학습 과정에 직접 통합합니다.
			</p>

			<!-- <div class="article-subsection-l2">
	<h4>Alternative Positional Encoding Approach <strong class='attention'>[POTENTIALLY COLLAPSIBLE]</strong></h4>
	<p>
	  Other models, like the original Transformer and BERT,
	  use sinusoidal functions for positional encoding.

	  This sinusoidal encoding is deterministic and designed to reflect
	  the absolute as well as the relative position of each token.
	</p>
	<p>
	  Each position in a sequence is assigned a unique mathematical
	  representation using a combination of sine and cosine functions.

	  For a given position, the sine function represents even dimensions,
	  and the cosine function represents odd dimensions within the positional encoding vector.

	  This periodic nature ensures that each position has a consistent encoding,
	  independent of the surrounding context.
	</p>

	<p>
	  Here’s how it works:
	</p>

	<span class='attention'>
	  SINUSOIDAL POSITIONAL ENCODING EQUATION
	</span>

	<ul>
	  <li>
		<strong>Sine Function</strong>: Used for even indices of the embedding vector.
	  </li>
	  <li>
		<strong>Cosine Function</strong>: Used for odd indices of the embedding vector.
	</ul>

	<p>
	  Hover over individual encoding values in the matrix above to
	  see how it's calculated using the sins and cosine functions.
	</p>
  </div> -->
		</div>
		<div class="article-subsection">
			<h3>4단계: 최종 임베딩</h3>
			<p>
				마지막으로 토큰 인코딩과 위치 인코딩을 더해 최종 임베딩 표현을 얻습니다. 이렇게 합친 표현은
				토큰의 의미와 입력 시퀀스에서의 위치를 모두 담고 있습니다.
			</p>
		</div>
	</div>

	<div class="article-section" data-click="article-transformer-block">
		<h2>트랜스포머 블록</h2>

		<p>
			트랜스포머 처리의 핵심은 트랜스포머 블록에 있으며, 블록은 멀티 헤드 셀프 어텐션과 다층
			퍼셉트론(MLP) 층으로 구성됩니다. 대부분의 모델은 이런 블록을 여러 개 차례로 쌓아 올린 구조입니다.
			토큰 표현은 첫 번째 블록부터 마지막 블록까지 층을 거치며 발전하고, 이를 통해 모델은 각 토큰을
			점점 더 정교하게 이해하게 됩니다. 이러한 층층이 쌓인 구조가 입력에 대한 고차원적인 표현을
			만들어 냅니다. 우리가 살펴보는 KoGPT2 모델은 이런 블록 <code>12</code>개로 이루어져
			있습니다.
		</p>
	</div>

	<div class="article-section" id="self-attention" data-click="article-attention">
		<h3>멀티 헤드 셀프 어텐션</h3>
		<p>
			셀프 어텐션 메커니즘은 모델이 시퀀스 안의 토큰 사이 관계를 포착하게 해 주어, 각 토큰의 표현이
			다른 토큰의 영향을 받도록 합니다. 여러 개의 어텐션 헤드는 이러한 관계를 서로 다른 관점에서 볼 수
			있게 해 줍니다. 예를 들어 어떤 헤드는 가까운 단어 사이의 문법적 연결을, 다른 헤드는 더 넓은 의미적
			문맥을 추적할 수 있습니다. 다음 절에서는 멀티 헤드 셀프 어텐션이 어떻게 계산되는지 단계별로
			살펴보겠습니다.
		</p>
		<div class="article-subsection-l2">
			<h4>1단계: 쿼리, 키, 밸류 행렬</h4>

			<div class="figure pt-10">
				<img src="./article_assets/QKV.png" width="80%" />
				<div class="text-xs">
					<Katex
						displayMode
						math={`
		QKV_{ij} = ( \\sum_{d=1}^{768} \\text{Embedding}_{i,d} \\cdot \\text{Weights}_{d,j}) + \\text{Bias}_j
		`}
					/>
				</div>
			</div>
			<div class="figure-caption">
				그림 <span class="attention">2</span>. 원래 임베딩으로부터 쿼리, 키, 밸류 행렬을 계산하는
				과정.
			</div>

			<p>
				각 토큰의 임베딩 벡터는 세 개의 벡터,
				<span class="q-color">쿼리(Query, Q)</span>,
				<span class="k-color">키(Key, K)</span>,
				<span class="v-color">밸류(Value, V)</span>로 변환됩니다. 이 벡터들은 입력 임베딩 행렬에
				<span class="q-color">Q</span>,
				<span class="k-color">K</span>,
				<span class="v-color">V</span> 각각에 대해 학습된 가중치 행렬을 곱해서 얻습니다. 이 행렬들을
				직관적으로 이해할 수 있도록 웹 검색에 비유해 보겠습니다.
			</p>
			<ul>
				<li>
					<strong class="q-color font-medium">쿼리(Q)</strong>는 검색창에 입력하는 검색어입니다.
					<em>"더 많은 정보를 찾고 싶은"</em> 토큰에 해당합니다.
				</li>
				<li>
					<strong class="k-color font-medium">키(K)</strong>는 검색 결과 창에 나오는 각 웹 페이지의
					제목입니다. 쿼리가 주목할 수 있는 후보 토큰들을 나타냅니다.
				</li>
				<li>
					<strong class="v-color font-medium">밸류(V)</strong>는 실제로 보여지는 웹 페이지의
					내용입니다. 알맞은 검색어(쿼리)와 관련된 결과(키)를 매칭한 뒤, 가장 관련성 높은 페이지의
					내용(밸류)을 가져오는 것입니다.
				</li>
			</ul>
			<p>
				모델은 이 QKV 값을 이용해 어텐션 점수를 계산합니다. 어텐션 점수는 예측을 만들 때 각 토큰에
				얼마나 주목해야 하는지를 결정합니다.
			</p>
		</div>
		<div class="article-subsection-l2">
			<h4>2단계: 멀티 헤드 분할</h4>
			<p>
				<span class="q-color">쿼리</span>, <span class="k-color">키</span>,
				<span class="v-color">밸류</span>
				벡터는 여러 개의 헤드로 나뉩니다. KoGPT2의 경우 <code>12</code>개의 헤드로 나뉩니다.
				각 헤드는 임베딩의 일부분을 독립적으로 처리하며, 서로 다른 문법적·의미적 관계를 포착합니다.
				이런 설계 덕분에 다양한 언어적 특징을 병렬로 학습할 수 있어 모델의 표현력이 높아집니다.
			</p>
		</div>
		<div class="article-subsection-l2">
			<h4>3단계: 마스크드 셀프 어텐션</h4>
			<p>
				각 헤드에서 마스크드 셀프 어텐션(masked self-attention) 계산을 수행합니다. 이 메커니즘은
				모델이 입력의 관련 있는 부분에 집중하면서도 미래 토큰에는 접근하지 못하도록 막아, 시퀀스를
				생성할 수 있게 합니다.
			</p>

			<div class="figure">
				<img src="./article_assets/attention.png" width="80%" align="middle" />
			</div>
			<div class="figure-caption">
				그림 <span class="attention">3</span>. 쿼리, 키, 밸류 행렬을 이용해 마스크드 셀프 어텐션을
				계산하는 과정.
			</div>

			<ul>
				<li>
					<strong>내적(Dot Product)</strong>:
					<span class="q-color">쿼리</span>
					행렬과 <span class="k-color">키</span> 행렬의 내적으로
					<strong>어텐션 점수</strong>를 구합니다. 결과는 모든 입력 토큰 사이의 관계를 나타내는
					정사각 행렬입니다.
				</li>
				<li>
					<strong>스케일링 · 마스크(Scaling · Mask)</strong>: 어텐션 점수의 크기를 조정(스케일링)한
					뒤, 어텐션 행렬의 위쪽 삼각형 부분에 마스크를 적용해 해당 값을 음의 무한대로 설정합니다.
					이렇게 해서 모델이 미래 토큰에 접근하지 못하게 합니다. 모델은 미래를 “엿보지” 않고 다음
					토큰을 예측하는 법을 배워야 합니다.
				</li>
				<li>
					<strong>소프트맥스 · 드롭아웃(Softmax · Dropout)</strong>: 마스킹과 스케일링을 거친 어텐션
					점수는 소프트맥스 연산을 통해 확률로 바뀌고, 선택적으로 드롭아웃으로 규제(regularization)됩니다.
					행렬의 각 행은 합이 1이 되며, 해당 토큰 왼쪽에 있는 다른 모든 토큰의 관련도를 나타냅니다.
				</li>
			</ul>
		</div>
		<div class="article-subsection-l2">
			<h4>4단계: 출력과 연결(Concatenation)</h4>
			<p>
				모델은 마스크드 셀프 어텐션 점수에
				<span class="v-color">밸류</span> 행렬을 곱해 셀프 어텐션 메커니즘의
				<span class="purple-color">최종 출력</span>을 얻습니다. KoGPT2에는 <code>12</code>개의 셀프
				어텐션 헤드가 있으며, 각 헤드는 토큰 사이의 서로 다른 관계를 포착합니다. 이 헤드들의 출력은
				하나로 이어 붙여진(concatenate) 뒤 선형 투영(linear projection)을 거칩니다.
			</p>
		</div>
	</div>

	<div class="article-section" id="article-activation" data-click="article-mlp">
		<h3>MLP: 다층 퍼셉트론</h3>

		<div class="figure">
			<img src="./article_assets/mlp.png" width="70%" align="middle" />
		</div>
		<div class="figure-caption">
			그림 <span class="attention">4</span>. MLP 층을 이용해 셀프 어텐션 표현을 더 높은 차원으로
			투영하여 모델의 표현력을 높이는 과정.
		</div>

		<p>
			여러 셀프 어텐션 헤드가 입력 토큰 사이의 다양한 관계를 포착하고 나면, 이어 붙인 출력은 모델의
			표현력을 높이기 위해 다층 퍼셉트론(MLP) 층을 통과합니다. MLP 블록은 두 개의 선형 변환과 그 사이의
			<a
				href="https://en.wikipedia.org/wiki/Rectified_linear_unit#Gaussian-error_linear_unit_(GELU)"
				>GELU</a
			> 활성화 함수로 이루어져 있습니다.
		</p>
		<p>
			첫 번째 선형 변환은 입력의 차원을 <code>768</code>에서 <code>3072</code>로 네 배 확장합니다. 이
			확장 단계에서 모델은 토큰 표현을 더 높은 차원의 공간으로 투영하여, 원래 차원에서는 드러나지 않던
			더 풍부하고 복잡한 패턴을 포착할 수 있습니다.
		</p>
		<p>
			두 번째 선형 변환은 차원을 다시 원래 크기인 <code>768</code>로 줄입니다. 이 압축 단계는 확장
			단계에서 얻은 유용한 비선형 변환은 유지하면서 표현을 다루기 쉬운 크기로 되돌립니다.
		</p>
		<p>
			토큰 사이의 정보를 통합하는 셀프 어텐션 메커니즘과 달리, MLP는 각 토큰을 독립적으로 처리하며
			각 토큰 표현을 한 공간에서 다른 공간으로 매핑하여 모델 전체의 표현력을 풍부하게 합니다.
		</p>
	</div>

	<div class="article-section" id="article-prob" data-click="article-prob">
		<h2>출력 확률</h2>
		<p>
			입력이 모든 트랜스포머 블록을 거치고 나면, 그 출력은 토큰 예측을 위해 마지막 선형 층을
			통과합니다. 이 층은 최종 표현을 <code>51,200</code>차원 공간으로 투영하는데, 여기서 어휘의 모든
			토큰은 <code>로짓(logit)</code>이라는 값을 하나씩 갖게 됩니다. 어떤 토큰이든 다음 단어가 될 수
			있으므로, 이 과정을 통해 각 토큰이 다음 단어가 될 가능성에 따라 순위를 매길 수 있습니다. 그런
			다음 소프트맥스 함수를 적용해 로짓을 합이 1인 확률 분포로 바꿉니다. 이렇게 하면 각 토큰의
			가능성에 따라 다음 토큰을 샘플링할 수 있습니다.
		</p>

		<div class="figure py-5">
			<img src="./article_assets/softmax.png" width="70%" />
		</div>
		<div class="figure-caption">
			그림 <span class="attention">5</span>. 어휘의 각 토큰은 모델이 출력한 로짓을 바탕으로 확률을
			할당받습니다. 이 확률이 각 토큰이 시퀀스의 다음 단어가 될 가능성을 결정합니다.
		</div>

		<p id="article-temperature" data-click="article-temperature">
			마지막 단계는 이 분포에서 샘플링하여 다음 토큰을 생성하는 것입니다. 이 과정에서
			<code>temperature</code>(온도) 하이퍼파라미터가 중요한 역할을 합니다. 수학적으로는 아주 간단한
			연산으로, 모델이 출력한 로짓을 <code>temperature</code>로 나누기만 하면 됩니다.
		</p>

		<ul>
			<li>
				<code>temperature = 1</code>: 로짓을 1로 나누므로 소프트맥스 출력에 아무 영향이 없습니다.
			</li>
			<li>
				<code>temperature &lt; 1</code>: 온도가 낮을수록 확률 분포가 뾰족해져 모델이 더 확신을 갖고
				결정적으로 동작하며, 예측 가능한 출력을 내놓습니다.
			</li>
			<li>
				<code>temperature &gt; 1</code>: 온도가 높을수록 확률 분포가 완만해져 생성되는 텍스트에 더
				많은 무작위성이 생깁니다. 이를 흔히 모델의 <em>“창의성”</em>이라고 부르기도 합니다.
			</li>
		</ul>

		<p id="article-sampling" data-click="article-sampling">
			또한 <code>top-k</code>와 <code>top-p</code> 파라미터를 사용해 샘플링 과정을 더 세밀하게 조정할
			수 있습니다.
		</p>
		<ul>
			<li>
				<code>top-k 샘플링</code>: 후보 토큰을 확률이 가장 높은 상위 k개로 제한하여, 가능성이 낮은
				선택지를 걸러 냅니다.
			</li>
			<li>
				<code>top-p 샘플링</code>: 누적 확률이 임계값 p를 넘는 가장 작은 토큰 집합만 고려합니다.
				가능성이 높은 토큰만 참여하도록 하면서도 다양성을 허용합니다.
			</li>
		</ul>
		<p>
			<code>temperature</code>, <code>top-k</code>, <code>top-p</code>를 조정하면 결정적인 출력과
			다양한 출력 사이에서 균형을 맞추어, 모델의 동작을 원하는 목적에 맞게 조절할 수 있습니다.
		</p>
	</div>

	<div class="article-section" data-click="article-advanced-features">
		<h2>보조 아키텍처 요소</h2>

		<p>
			트랜스포머 모델의 성능을 높여 주는 몇 가지 보조 아키텍처 요소가 있습니다. 모델 전체 성능에는
			중요하지만, 아키텍처의 핵심 개념을 이해하는 데는 그렇게 중요하지 않습니다. 층 정규화(Layer
			Normalization), 드롭아웃(Dropout), 잔차 연결(Residual Connection)은 특히 학습 단계에서 트랜스포머
			모델의 중요한 구성 요소입니다. 층 정규화는 학습을 안정시키고 모델이 더 빨리 수렴하도록 돕습니다.
			드롭아웃은 뉴런을 무작위로 비활성화하여 과적합을 막습니다. 잔차 연결은 기울기(gradient)가
			네트워크를 직접 통과해 흐를 수 있게 하여 기울기 소실 문제를 막는 데 도움을 줍니다.
		</p>
		<div class="article-subsection" id="article-ln">
			<h3>층 정규화</h3>

			<p>
				층 정규화(Layer Normalization)는 학습 과정을 안정시키고 수렴을 개선합니다. 입력을 특징(feature)
				방향으로 정규화하여 활성값의 평균과 분산이 일정하게 유지되도록 합니다. 이 정규화는 내부 공변량
				변화(internal covariate shift)와 관련된 문제를 완화하여 모델이 더 효과적으로 학습하게 하고, 초기
				가중치에 대한 민감도를 줄여 줍니다. 층 정규화는 각 트랜스포머 블록에서 두 번, 즉 셀프 어텐션
				메커니즘 앞과 MLP 층 앞에서 한 번씩 적용됩니다.
			</p>
		</div>
		<div class="article-subsection" id="article-dropout">
			<h3>드롭아웃</h3>

			<p>
				드롭아웃(Dropout)은 학습 중에 모델 가중치의 일부를 무작위로 0으로 만들어 신경망의 과적합을
				막는 규제 기법입니다. 이를 통해 모델은 더 견고한 특징을 학습하고 특정 뉴런에 대한 의존을 줄여,
				처음 보는 새로운 데이터에도 더 잘 일반화할 수 있습니다. 모델 추론(inference) 시에는 드롭아웃이
				비활성화됩니다. 이는 사실상 학습된 여러 하위 네트워크의 앙상블을 사용하는 것과 같아서 더 나은
				모델 성능으로 이어집니다.
			</p>
		</div>
		<div class="article-subsection" id="article-residual">
			<h3>잔차 연결</h3>

			<p>
				잔차 연결(Residual Connection)은 2015년 ResNet 모델에서 처음 소개되었습니다. 이 아키텍처
				혁신은 매우 깊은 신경망의 학습을 가능하게 하여 딥러닝에 혁명을 일으켰습니다. 본질적으로 잔차
				연결은 하나 이상의 층을 건너뛰는 지름길로, 층의 입력을 그 층의 출력에 더합니다. 이는 기울기
				소실 문제를 완화하여, 여러 트랜스포머 블록을 겹겹이 쌓은 깊은 네트워크도 쉽게 학습할 수 있게
				합니다. GPT-2에서 잔차 연결은 각 트랜스포머 블록 안에서 두 번, MLP 앞과 뒤에서 한 번씩
				사용되어 기울기가 더 쉽게 흐르고 앞쪽 층도 역전파 과정에서 충분히 업데이트되도록 합니다.
			</p>
		</div>
	</div>

	<div class="article-section" data-click="article-interactive-features">
		<h1>인터랙티브 기능</h1>
		<p>
			Transformer Explainer는 인터랙티브하게 만들어져 트랜스포머의 내부 동작을 직접 탐색할 수
			있습니다. 다음과 같은 기능을 사용해 볼 수 있습니다.
		</p>

		<ul>
			<li>
				<strong>직접 텍스트를 입력</strong>해서 모델이 어떻게 처리하고 다음 단어를 예측하는지
				확인해 보세요. 어텐션 가중치와 중간 계산 과정을 살펴보고, 최종 출력 확률이 어떻게 계산되는지
				볼 수 있습니다.
			</li>
			<li>
				<strong>온도(temperature) 슬라이더</strong>로 모델 예측의 무작위성을 조절해 보세요. 온도
				값을 바꿔 모델의 출력을 더 결정적으로 또는 더 창의적으로 만들 수 있습니다.
			</li>
			<li>
				<strong>top-k, top-p 샘플링 방식을 선택</strong>해 추론 시 샘플링 동작을 조정해 보세요.
				여러 값을 실험하면서 확률 분포가 어떻게 바뀌고 모델의 예측에 어떤 영향을 주는지 확인할 수
				있습니다.
			</li>
			<li>
				<strong>어텐션 맵과 상호작용</strong>하며 모델이 입력 시퀀스의 여러 토큰에 어떻게 주목하는지
				살펴보세요. 토큰 위에 마우스를 올리면 어텐션 가중치가 강조되어, 모델이 문맥과 단어 사이의
				관계를 어떻게 포착하는지 탐색할 수 있습니다.
			</li>
		</ul>
	</div>

	<div class="article-section" data-click="article-video">
		<h2>동영상 튜토리얼</h2>
		<div class="video-container">
			<iframe
				src="https://www.youtube.com/embed/ECR4oAwocjs"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			>
			</iframe>
		</div>
	</div>

	<div class="article-section" data-click="article-implementation">
		<h2>Transformer Explainer는 어떻게 구현되었나요?</h2>
		<p>
			Transformer Explainer는 브라우저에서 직접 실행되는 KoGPT2 모델을 사용합니다. KoGPT2의 가중치를
			Andrej Karpathy의
			<a href="https://github.com/karpathy/nanoGPT" title="Github" target="_blank">nanoGPT 프로젝트</a
			>에 있는 GPT의 PyTorch 구현에 불러온 뒤, 브라우저에서 원활하게 실행되도록
			<a href="https://onnxruntime.ai/" title="ONNX" target="_blank">ONNX Runtime</a>
			형식으로 변환했습니다. KoGPT2는 SK텔레콤이 공개한
			<a href="https://huggingface.co/skt/kogpt2-base-v2" title="Hugging Face" target="_blank"
				>skt/kogpt2-base-v2</a
			>이며 CC BY-NC-SA 4.0 라이선스(비영리 목적에 한해 사용 가능)를 따릅니다. 인터페이스는 JavaScript로 만들어졌으며, 프런트엔드 프레임워크로
			<a href="https://kit.svelte.dev/" title="Svelte" target="_blank">Svelte</a>를, 동적 시각화에는
			<a href="https://d3js.org/" title="D3" target="_blank">D3.js</a>를 사용했습니다. 수치는 사용자
			입력에 따라 실시간으로 갱신됩니다.
		</p>
	</div>

	<div class="article-section" data-click="article-credit">
		<h2>Transformer Explainer는 누가 만들었나요?</h2>
		<p>
			Transformer Explainer는 조지아 공과대학교(Georgia Institute of Technology)의

			<a href="https://aereeeee.github.io/" target="_blank">Aeree Cho</a>,
			<a href="https://www.linkedin.com/in/chaeyeonggracekim/" target="_blank">Grace C. Kim</a>,
			<a href="https://alexkarpekov.com/" target="_blank">Alexander Karpekov</a>,
			<a href="https://alechelbling.com/" target="_blank">Alec Helbling</a>,
			<a href="https://zijie.wang/" target="_blank">Jay Wang</a>,
			<a href="https://seongmin.xyz/" target="_blank">Seongmin Lee</a>,
			<a href="https://bhoov.com/" target="_blank">Benjamin Hoover</a>,
			<a href="https://poloclub.github.io/polochau/" target="_blank">Polo Chau</a>가

			만들었습니다.
		</p>
	</div>
</div>

<style lang="scss">
	a {
		color: theme('colors.blue.500');

		&:hover {
			color: theme('colors.blue.700');
		}
	}

	.bold-purple {
		color: theme('colors.purple.700');
		font-weight: bold;
	}

	code {
		color: theme('colors.gray.500');
		background-color: theme('colors.gray.50');
		font-family: theme('fontFamily.mono');
	}

	.q-color {
		color: theme('colors.blue.400');
	}

	.k-color {
		color: theme('colors.red.400');
	}

	.v-color {
		color: theme('colors.green.400');
	}

	.purple-color {
		color: theme('colors.purple.500');
	}

	.article-section {
		padding-bottom: 2rem;
	}
	.architecture-section {
		padding-top: 1rem;
	}
	.video-container {
		position: relative;
		padding-bottom: 56.25%; /* 16:9 aspect ratio */
		height: 0;
		overflow: hidden;
		max-width: 100%;
		background: #000;
	}

	.video-container iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	#description {
		padding-bottom: 3rem;
		margin-left: auto;
		margin-right: auto;
		max-width: 78ch;
	}

	#description h1 {
		color: theme('colors.purple.700');
		font-size: 2.2rem;
		font-weight: 300;
		padding-top: 1rem;
	}

	#description h2 {
		// color: #444;
		color: theme('colors.purple.700');
		font-size: 2rem;
		font-weight: 300;
		padding-top: 1rem;
	}

	#description h3 {
		color: theme('colors.gray.700');
		font-size: 1.6rem;
		font-weight: 200;
		padding-top: 1rem;
	}

	#description h4 {
		color: theme('colors.gray.700');
		font-size: 1.6rem;
		font-weight: 200;
		padding-top: 1rem;
	}

	#description p {
		margin: 1rem 0;
	}

	#description p img {
		vertical-align: middle;
	}

	#description .figure-caption {
		font-size: 0.8rem;
		margin-top: 0.5rem;
		text-align: center;
		margin-bottom: 2rem;
	}

	#description ol {
		margin-left: 3rem;
		list-style-type: decimal;
	}

	#description li {
		margin: 0.6rem 0;
	}

	#description p,
	#description div,
	#description li {
		color: theme('colors.gray.600');
		line-height: 1.6;
	}

	#description small {
		font-size: 0.8rem;
	}

	#description ol li img {
		vertical-align: middle;
	}

	#description .video-link {
		color: theme('colors.blue.600');
		cursor: pointer;
		font-weight: normal;
		text-decoration: none;
	}

	#description ul {
		list-style-type: disc;
		margin-left: 2.5rem;
		margin-bottom: 1rem;
	}

	#description a:hover,
	#description .video-link:hover {
		text-decoration: underline;
	}

	.figure,
	.video {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
