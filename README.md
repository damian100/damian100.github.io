# Damian Lab Portfolio

GitHub Pages에 바로 올릴 수 있는 정적 포트폴리오 사이트입니다.

## 구성

```text
.
├── index.html
├── assets
│   ├── css
│   │   └── style.css
│   └── js
│       └── main.js
├── README.md
└── .nojekyll
```

## 사용 방법

### 1. 개인 메인 주소로 쓰는 경우

GitHub 저장소 이름을 아래처럼 만듭니다.

```text
damian100.github.io
```

이 폴더 안의 파일을 저장소 루트에 그대로 올리면 주소는 아래처럼 됩니다.

```text
https://damian100.github.io
```

### 2. 프로젝트 페이지 주소로 쓰는 경우

저장소 이름을 아래처럼 만들어도 됩니다.

```text
damian-portfolio
```

이 경우 주소는 아래처럼 됩니다.

```text
https://damian100.github.io/damian-portfolio/
```

## Git 명령어 예시

```bash
git init
git add .
git commit -m "Add portfolio site"
git branch -M main
git remote add origin https://github.com/damian100/damian-portfolio.git
git push -u origin main
```

`damian100.github.io` 저장소에 올릴 경우에는 remote 주소만 아래처럼 바꾸면 됩니다.

```bash
git remote add origin https://github.com/damian100/damian100.github.io.git
```

## GitHub Pages 설정

저장소에서 아래 순서로 설정합니다.

```text
Settings → Pages → Build and deployment → Source: Deploy from a branch
Branch: main / root → Save
```

## 수정하면 좋은 부분

- `index.html`의 프로젝트 설명
- GitHub 저장소 링크
- Contact 영역
- 활동 연도와 세부 내용

현재 버전은 제출용으로 바로 사용할 수 있도록 작성되어 있지만, 실제 이력과 다르게 보이는 부분은 제출 전에 수정하는 것이 좋습니다.
