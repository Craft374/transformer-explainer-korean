# Transformer Explainer (한국어판): 텍스트 생성 모델을 인터랙티브하게 배우기

> 이 저장소는 [poloclub/transformer-explainer](https://github.com/poloclub/transformer-explainer)의 **한국어 번역 fork**입니다. 화면의 UI, 본문 설명, 교재 페이지를 한국어로 옮겼습니다. 사용되는 GPT-2 모델은 영어로 학습되었기 때문에 **입력 문장은 영어로 입력해야 합니다.**

Transformer Explainer는 GPT 같은 트랜스포머 기반 모델이 어떻게 동작하는지 누구나 배울 수 있도록 만든 인터랙티브 시각화 도구입니다. 브라우저에서 실제 GPT-2 모델을 실행하므로, 직접 텍스트를 입력해 보면서 트랜스포머의 내부 구성 요소와 연산이 어떻게 함께 작동하여 다음 토큰을 예측하는지 실시간으로 관찰할 수 있습니다. 원본(영어판)은 http://poloclub.github.io/transformer-explainer 에서 사용해 볼 수 있고, 데모 영상은 YouTube https://youtu.be/TFUc41G2ikY 에서 볼 수 있습니다.<br/><br/>
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![arxiv badge](https://img.shields.io/badge/arXiv-2408.04619-red)](https://arxiv.org/abs/2408.04619)

<a href="https://youtu.be/TFUc41G2ikY" target="_blank"><img width="100%" src='https://github.com/user-attachments/assets/0a4d8888-6555-4df5-bc71-77f1299115c3'></a>

## 라이브 데모

원본(영어판) 사용해 보기: http://poloclub.github.io/transformer-explainer

## 연구 논문

[**Transformer Explainer: Learning LLM Transformers with Interactive Visual Explanation and Experimentations**](https://dl.acm.org/doi/pdf/10.1145/3772318.3791725) (Transformer Explainer: 인터랙티브 시각적 설명과 실험을 통한 LLM 트랜스포머 학습).
Aeree Cho, Grace C. Kim, Alexander Karpekov, Seongmin Lee, Alec Helbling, Benjamin Hoover, Zijie J. Wang, Minsuk Kahng, Duen Horng Chau.
_Proceedings of the 2026 CHI Conference on Human Factors in Computing Systems._

## 로컬에서 실행하기

#### 준비물

- Node.js v20 이상
- NPM v10 이상

#### 실행 방법

```bash
git clone -b korean https://github.com/Craft374/transformer-explainer-korean.git
cd transformer-explainer-korean
npm install
npm run dev
```

그런 다음 웹 브라우저에서 http://localhost:5173 에 접속하세요.

## 만든 사람들

Transformer Explainer는 조지아 공과대학교(Georgia Institute of Technology)의 <a href="https://aereeeee.github.io/" target="_blank">Aeree Cho</a>, <a href="https://www.linkedin.com/in/chaeyeonggracekim/" target="_blank">Grace C. Kim</a>, <a href="https://alexkarpekov.com/" target="_blank">Alexander Karpekov</a>, <a href="https://alechelbling.com/" target="_blank">Alec Helbling</a>, <a href="https://zijie.wang/" target="_blank">Jay Wang</a>, <a href="https://seongmin.xyz/" target="_blank">Seongmin Lee</a>, <a href="https://bhoov.com/" target="_blank">Benjamin Hoover</a>, <a href="https://poloclub.github.io/polochau/" target="_blank">Polo Chau</a>가 만들었습니다.

## 인용

```bibTeX
@inproceedings{cho2026transformer,
  title={Transformer Explainer: Learning LLM Transformers with Interactive Visual Explanation and Experimentation},
  author={Cho, Aeree and Kim, Grace C and Karpekov, Alexander and Lee, Seongmin and Helbling, Alec and Hoover, Benjamin and Wang, Zijie J and Kahng, Minsuk and Chau, Duen Horng},
  booktitle={Proceedings of the 2026 CHI Conference on Human Factors in Computing Systems},
  pages={1--21},
  year={2026}
}
```

## 라이선스

이 소프트웨어는 [MIT 라이선스](https://github.com/poloclub/transformer-explainer/blob/main/LICENSE)로 제공됩니다.

## 문의

원본 프로젝트에 대한 질문은 원본 저장소에 [이슈를 등록](https://github.com/poloclub/transformer-explainer/issues/new/choose)하거나 [Aeree Cho](https://aereeeee.github.io/) 또는 위에 적힌 기여자들에게 연락해 주세요.

## 함께 보면 좋은 AI 설명 도구

- [**Diffusion Explainer**](https://poloclub.github.io/diffusion-explainer): Stable Diffusion이 텍스트 프롬프트를 이미지로 바꾸는 과정을 배울 수 있습니다
- [**CNN Explainer**](https://poloclub.github.io/cnn-explainer)
- [**GAN Lab**](https://poloclub.github.io/ganlab): 브라우저에서 생성적 적대 신경망(GAN)을 직접 다뤄 볼 수 있습니다
