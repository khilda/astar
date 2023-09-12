<!-- # 인터렉션 레퍼런스

## 배경 별
https://codepen.io/sarazond/pen/LYGbwj

## 스타워즈 텍스트
https://codepen.io/scottbram/pen/AZYXzm

## 아이템 시차 인터렉션
https://codepen.io/petersonby/pen/JBrYKG

## 가장자리 빛나는거
https://codepen.io/gayane-gasparyan/pen/jOmaBQK
## 마우스에 따른 glow 효과
https://codepen.io/kanajetzt/pen/LJJqOy

## 무한스크롤(아이템)
https://codepen.io/ykadosh/pen/KKezJzz

## 스크롤시 아이템 나타나고 위로올려도 동작안함
https://codepen.io/jlnljn/pen/bgjbmB

## 스크롤시 원하는 느낌?
https://codepen.io/ig_design/pen/OrLBqO -->

# Project Structure

```
📦khilda.github.io
 ┣ 📂assets
 ┃ ┣ 📂css
 ┃ ┃ ┗ 📜styles.css               - html 에 적용 할 css
 ┃ ┣ 📂fonts                      - font file
 ┃ ┣ 📂images                     - images
 ┃ ┣ 📂js
 ┃ ┃ ┣ 📂func
 ┃ ┃ ┃ ┣ 📜btnTop.js              - btn-top 에 사용할 function
 ┃ ┃ ┃ ┣ 📜contentsBounce.js      - element의 위, 아래 움직임 적용하는 function
 ┃ ┃ ┃ ┣ 📜evtButton.js           - element의 click handler 적용하는 function
 ┃ ┃ ┃ ┣ 📜fetchPage.js           - SPA에서 gnb, visual-area 변경에 따른 contents fetch function
 ┃ ┃ ┃ ┣ 📜logoRolling.js         - mobile 협력업체 rolling 시 element duplicate function
 ┃ ┃ ┃ ┣ 📜planetRotate.js        - visual-area의 nav-btn 클릭 시 interaction class
 ┃ ┃ ┃ ┗ 📜planetThree.js         - visual-area 행성 interaction class
 ┃ ┃ ┣ 📂layout
 ┃ ┃ ┃ ┗ 📜scrollAnimation.js     - visual-area 행성 interaction class
 ┃ ┃ ┣ 📂lib
 ┃ ┃ ┃ ┗ 📜three.min.js           - three.js library
 ┃ ┃ ┣ 📂pages
 ┃ ┃ ┃ ┣ 📜about.js               - about 첫 진입 시 실행 할 function
 ┃ ┃ ┃ ┣ 📜business.js            - business 첫 진입 시 실행 할 function
 ┃ ┃ ┃ ┣ 📜company.js             - company 첫 진입 시 실행 할 function
 ┃ ┃ ┃ ┣ 📜intro.js               - intro 첫 진입 시 실행 할 function
 ┃ ┃ ┃ ┣ 📜main.js                - main 첫 진입 시 실행 할 function
 ┃ ┃ ┃ ┗ 📜visual.js              - visual 첫 진입 시 실행 할 function
 ┃ ┃ ┣ 📜SPA.js                   - SPA 구조에서 실행 할 function
 ┃ ┃ ┣ 📜interactionElement.js    - element 단위 interaction class
 ┃ ┃ ┗ 📜main.js                  - html 에 적용 할 js
 ┃ ┣ 📂scss
 ┃ ┃ ┣ 📂abstracts
 ┃ ┃ ┃ ┣ 📜_mixin.scss            - common mixin scss
 ┃ ┃ ┃ ┗ 📜_variable.scss         - common variable scss
 ┃ ┃ ┣ 📂animate
 ┃ ┃ ┃ ┣ 📜_bg_star_rotate.scss   - background rotate type scss
 ┃ ┃ ┃ ┗ 📜_bg_star_shining.scss  - background shining type scss
 ┃ ┃ ┣ 📂base
 ┃ ┃ ┃ ┣ 📜_fonts.scss            - fonts declare scss
 ┃ ┃ ┃ ┣ 📜_normalize.scss        - modern reset scss
 ┃ ┃ ┃ ┗ 📜_reset.scss            - reset scss
 ┃ ┃ ┣ 📂layouts
 ┃ ┃ ┃ ┣ 📜_container.scss        - common container scss
 ┃ ┃ ┃ ┣ 📜_footer.scss           - common footer scss
 ┃ ┃ ┃ ┗ 📜_header.scss           - common header scss
 ┃ ┃ ┣ 📂modules                  - common modules scss
 ┃ ┃ ┃ ┣ 📜_button.scss
 ┃ ┃ ┃ ┣ 📜_gradient-box.scss
 ┃ ┃ ┃ ┣ 📜_img-desc-group.scss
 ┃ ┃ ┃ ┣ 📜_logo-list.scss
 ┃ ┃ ┃ ┣ 📜_logo.scss
 ┃ ┃ ┃ ┣ 📜_text.scss
 ┃ ┃ ┃ ┗ 📜_visual.scss
 ┃ ┃ ┣ 📂pages                    - pages scss
 ┃ ┃ ┃ ┣ 📜_about.scss
 ┃ ┃ ┃ ┣ 📜_business.scss
 ┃ ┃ ┃ ┣ 📜_company.scss
 ┃ ┃ ┃ ┣ 📜_intro.scss
 ┃ ┃ ┃ ┗ 📜_main.scss
 ┃ ┃ ┗ 📜styles.scss              - main scss
 ┣ 📂html
 ┃ ┗ 📂pages
 ┃ ┃ ┣ 📜about.html
 ┃ ┃ ┣ 📜business.html
 ┃ ┃ ┣ 📜company.html
 ┃ ┃ ┣ 📜intro.html
 ┃ ┃ ┣ 📜layout.html
 ┃ ┃ ┣ 📜main.html
 ┃ ┃ ┗ 📜spa.html
 ┗ 📜index.html                   - get entrypoint
```