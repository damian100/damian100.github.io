---
layout: post
title:  "SuNiTaTaS Challenges 1"
summary: SuNiTaTaS CTF
author: Damian
date: '2020-09-23 14:42:00 +0900'
category: SuNiTaTaS
thumbnail: /assets/img/posts/SuNiTaTaS/a1/p1.png
---

# <center>**SuNiTaTaS**<br> Challenges 1<center>
<center><img src="/assets/img/posts/SuNiTaTaS/a1/p1.png" width="100%" height="100%"></center>





<br>

#### `Mid()` 함수를 처음 보기 때문에 검색해 보았다.

#### <br>

```
Mid( 문자열 , 시작 위치 , 자리수 )
```



#### 코드를 살펴보면 입력값에 a를 aad로 바꾸고 i를 in 으로 바꾼다. 그리고 mid함수로 2번째 문자부터9번째 문자열까지 가져오게된다. 따라서 ami 를 입력하면 AUTH KEY가 나온다.