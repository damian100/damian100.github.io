---
layout: post
title:  "Johannesburg(6)"
summary: Microcorruption CTF
author: Damian
date: '2020-09-24 14:45:00 +0900'
category: MicroCorruption
thumbnail: /assets/img/posts/MicroCorruption/a6/p1.png
---

# <center>Johannesburg<center>
<center><img src="/assets/img/posts/MicroCorruption/a6/p1.png" width="100%" height="100%"></center>





<br>

#### Cusco 문제처럼 리턴값을 덮어씌워서 unlock_door 함수를 호출 해보자.

<br>

<center><img src="/assets/img/posts/MicroCorruption/a6/p2.png" width="100%" height="100%"></center>



<br>

#### 그런데 어째서인지 리턴값이 전혀 변하지 않는다. 글자수 제한이 있나 싶어서 strcpy 함수를 살펴보았다.

<br>

<center><img src="/assets/img/posts/MicroCorruption/a6/p3.png" width="100%" height="100%"></center>

<br>

#### 이 함수에서 r12 함수를 tst 해서 0이면 함수를 종료시킨다. 

#### 따라서 입력값에 리턴 값까지 0이 포함되지 않도록 입력해야한다.



<br>

<center><img src="/assets/img/posts/MicroCorruption/a6/p4.png" width="100%" height="100%"></center>

<br>

#### 리턴값이 정상적으로 바뀌었다.

<br>

### <center>FLAG :  1111 1111 1111 1111 1111 1111 1111 1111 117c 6645</center> 

<br>