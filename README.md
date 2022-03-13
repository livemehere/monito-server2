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
