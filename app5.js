const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1: message1, greet2: message2 });
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1: "Hello world", greet2: "Bon jour" });
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename: "./public/Apple_logo_black.svg", alt: "Apple Logo" });
});

app.get("/luck", (req, res) => {
  const num = Math.floor(Math.random() * 6 + 1);
  let luck = '';
  if (num == 1) luck = '大吉';
  else if (num == 2) luck = '中吉';
  console.log('あなたの運勢は' + luck + 'です');
  res.render('luck', { number: num, luck: luck });
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number(req.query.win)||0;
  let total = Number(req.query.total)||0;
  console.log({ hand, win, total });

  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = '';
  if (num == 1) cpu = 'グー';
  else if (num == 2) cpu = 'チョキ';
  else cpu = 'パー';

  // 勝敗の判定
  let judgement = '';
  if (hand === cpu) {
    judgement = '引き分け';
  } else if (
    (hand === 'グー' && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー') ||
    (hand === 'パー' && cpu === 'グー')
  ) {
    judgement = '勝ち';
    win += 1;
  } else {
    judgement = '負け';
  }
  total += 1;

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  };
  
  res.render('janken', display);
});
app.get("/fortune", (req, res) => {
  let birthday = req.query.birthday;
  let win = Number(req.query.win) || 0;
  let total = Number(req.query.total) || 0;
  console.log({ birthday, win, total });

  if (!birthday) {
    res.render('fortune', {
      message: "誕生日を入力してください",
      result: '',
      win: win,
      total: total
    });
    return;
  }

  // 誕生日からランダムな数値を生成して占い結果を決定
  const seed = new Date(birthday).getTime();
  const random = Math.abs(Math.sin(seed)) * 10000;
  const fortuneNum = Math.floor(random) % 5;
  
  let fortuneResult = '';
  switch (fortuneNum) {
    case 0:
      fortuneResult = '大吉: 素晴らしい一日が待っている!';
      win += 1; // 大吉ならラッキーとしてカウント
      break;
    case 1:
      fortuneResult = '中吉: 良いことがあるかも!';
      break;
    case 2:
      fortuneResult = '小吉: 今日は平穏な日です。';
      break;
    case 3:
      fortuneResult = '凶: 気をつけて行動しましょう。';
      break;
    case 4:
      fortuneResult = '大凶: 注意深く過ごしましょう。';
      break;
  }
  total += 1;

  const display = {
    birthday: birthday,
    result: fortuneResult,
    win: win,
    total: total
  };


  app.get("/personality", (req, res) => {
    const answer = req.query.answer || '';
    let result = "";
    
    // 回答に基づいて診断結果を決定
    if (answer === 'A') result = "あなたはリーダータイプです!";
    else if (answer === 'B') result = "あなたは思慮深いタイプです!";
    else if (answer === 'C') result = "あなたは冒険心が強いタイプです!";
    else result = "選択肢を選んでください。";
  
    // レンダリングするためのデータを渡す
    res.render('personality', { result });
  });
  
  res.render('fortune', display);
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));