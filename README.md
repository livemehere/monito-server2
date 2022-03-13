# 모니토 서버

- 2022.03.14 : 미들웨어 세팅

## DB

### 사용법

- export default 를 통한 singletone 사용
- pool.query()로 바로 사용

```js
pool.getConnection((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("DB 연결 성공");
    pool.query("SELECT * FROM user", (err, result) => {
      console.log(result);
    });
  }
});
```

# Docker 서버 설치 메뉴얼

- Docker로 alpine환경설치
- volume 설정 : 소스코드 , db
- github으로 코드 업데이트
- 'initSchemas.sql'구분 하나씩 실행해서 디비 초기화
- monit_EER.mwb 로 구조변경 가능
