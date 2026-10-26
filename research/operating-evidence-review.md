# 운영과 현업 적용의 근거 검토

확인일: `2026-10-26`

이 문서는 최근 공개된 조직 조사를 비용, 정책 준수, 사용자 검수 기준에 연결한다. 발표일과 관측기간을 나눠 읽는다. 응답자의 자기보고는 업무 시스템을 직접 측정한 결과나 인과관계의 증거가 아니다.

## 조사 범위

| 자료 | 발표일 | 실제 조사기간 | 표본과 범위 |
|---|---|---|---|
| KPMG Global AI Pulse Q3 | 2026-09-24 | 2026-07-23~2026-08-26 | 20개 국가·지역의 고위 리더 2,131명 |
| EY AI Risk and Governance | 2026-09-15 | 2026-05-28~2026-06-15 | 미국 매출 10억 달러 이상 상장기업의 AI 감독 책임자 202명 |
| Wharton·GBK AI Adoption | 2026-10-13 | 2026-07-09~2026-07-29 | 미국의 일정 규모 이상 민간기업 정규직. 관리자 이상 1,007명, 초·중급 직원 409명 |

KPMG 조사기간은 기존 사례 확인일인 2026-08-01 전후에 걸쳐 있다. EY와 Wharton 자료는 기준일 뒤에 공개됐지만 관측은 이전에 끝났다. 세 자료를 8~10월의 성장률이나 국내 AX 채용 수요로 환산하지 않는다.

## 비용과 업무 결과

KPMG는 AI 운영 통제와 비용·가치 연결을 함께 다룬다. ROI가 확립됐다고 응답한 조직에서 공식 운영 체계를 두었다는 응답이 더 많지만, 운영 체계를 만들면 ROI가 오른다는 인과관계를 입증하지는 않는다. [공식 결과와 방법론](https://kpmg.com/xx/en/our-insights/ai-and-technology/ai-pulse.html), [발표 원문](https://kpmg.com/xx/en/media/press-releases/2026/09/new-kpmg-ai-pulse-survey-as-ai-maturity-converges-leading-organizations-show-what-ai-at-scale-requires.html).

로드맵에서는 토큰이나 문서 생성 수와 검수를 통과한 업무 완료를 구분한다. [운영 문서](../technical-foundations/production-operations.md)와 [실험 카드](../toolkit/experiment-card.md)는 실패·재시도·검수·재작업·운영 및 배분 고정비를 합산하고 같은 기간의 완료 업무 수로 나눈다. 한 업무를 여러 번 세거나 실패 비용을 빼지 않는다. 이 계산은 저장소의 실습 기준이며 조사 보고서의 공식 산식은 아니다.

## 정책의 실제 준수

EY 조사에서는 98%가 거버넌스 정책을 두었다고 답했지만 47%는 긴급 배포에서 절차를 지키지 않은 경험을 보고했다. 표본은 미국 대형 상장기업의 책임자이며 모든 조직의 위반율을 뜻하지 않는다. [공식 조사와 방법론](https://www.ey.com/en_us/newsroom/2026/09/ey-survey-finds-that-autonomous-ai-implementation-outpaces-oversight-yielding-an-ai-governance-gap).

[배포와 운영](../delivery-lifecycle/06-production-deployment.md)에서는 승인 기록과 실제 실행을 대조하고 정책 서버 장애, 권한 회수, 예외 만료를 시험한다. [조직 성숙도](../organization-maturity/README.md)는 정책 문서의 유무와 실제 준수·중단 기록을 구분한다. 예외를 허용했다면 승인자와 기한, 후속 조치를 남긴다.

## 역할별 검수

Wharton·GBK는 관리자와 실무자의 AI 활용·조직 변화 인식을 나눠 조사했다. 대상 기업은 직원 1,000명 이상, 매출 5,000만 달러 초과 조건을 충족한다. 응답자가 보고한 자율성과 ROI의 관계를 근거로 사람 승인을 없애지는 않는다. [발표](https://knowledge.wharton.upenn.edu/special-report/2026-ai-adoption-report/), [전체 보고서와 방법론](https://knowledge.wharton.upenn.edu/wp-content/uploads/2026/10/Wharton-GBK-AI-Adoption-Report-2026.pdf).

[현업 적용](../delivery-lifecycle/07-adoption-and-change.md)에서는 관리자가 목표와 투자 판단을, 실사용자가 수정 부담과 예외 처리를, 운영자가 장애 대응과 인수인계를 확인한다. 역할별 검수 결과가 다르면 각각 기록하고 이유를 살핀다. 조직에 접근할 수 없는 실습은 가상 역할과 검토 한계를 표시한다.

## 적용 한계

설문 결과는 이 저장소의 실습 성과가 아니다. 공개 시뮬레이션 1개와 설계 문서 14개의 구현 단계도 바뀌지 않는다. 실습을 마쳤다는 판단은 설문 수치가 아니라 해당 업무의 실행 기록과 검수 결과로 내린다. 주장별 날짜, 표본, 측정 방법과 한계는 [근거 기록](../toolkit/evidence-ledger.md)에 남긴다.
