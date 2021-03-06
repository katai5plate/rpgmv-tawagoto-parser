# rpgmv-tawagoto-parser

ツクール MV のイベントコマンドを JavaScript から書けるようにする

## 使い方

`./dist/H2A_TawagotoParser.js` をプロジェクトにコピーして使ってください。

### スクリプトの書き方

```js
const TS = TawagotoScript;
const t = new TS();

// 顔グラフィックの変更
t.setWindow({ face: ["Actor1", 1] });
// ラベルの設定
t.label("質問");
// 文章の表示
t.mes(`
これはメッセージです
これはメッセージです
これはメッセージです
これはメッセージですか？`);
// 選択肢の表示
t.choice(
  // 選択肢ID（内部でネスト構造をラベルで平坦化されるため必須）
  "question_1",
  [
    {
      // 選択項目名
      label: "はい",
      // 押した時の処理
      code: (x) => [x.mes("オッケー！")],
    },
    {
      label: "いいえ",
      code: (x) => [
        x.mes(["ええええーーーーっ！！", "あかんやん！"]),
        x.goto("質問"),
      ],
    },
  ]
);
// スクリプト実行
t.js(`$gameScreen.setZoom(816 * 0.5, 624 * 0.5, 2);`);
// 効果音の再生
t.se("Item3");
// 画面の色調変更
t.changeScreenColor(TS.COLOR.WHITE, 0, 60);
// タイトルへ戻る
t.gotoTitle();

// JSON を出力する
console.log(t.getList());

// イベントコマンドを即時実行する
t.exec();
```

```js
// 出力結果:
[
  // ラベルの設定
  { code: 118, parameters: ["質問"], indent: 0 },
  // 文章の表示 (顔グラフィックの変更, 初期設定等)
  { code: 101, parameters: ["Actor1", 1, 0, 2], indent: 0 },
  // 文章の表示 (出力)
  { code: 401, parameters: ["これはメッセージです"], indent: 0 },
  { code: 401, parameters: ["これはメッセージです"], indent: 0 },
  { code: 401, parameters: ["これはメッセージです"], indent: 0 },
  { code: 401, parameters: ["これはメッセージですか？"], indent: 0 },
  // 選択肢の表示
  { code: 102, parameters: [["はい", "いいえ"], -1, -1, 2, 0], indent: 0 },
  // 「はい」の場合
  { code: 402, parameters: [0, "はい"], indent: 0 },
  // (ラベル question_1_0 に飛ぶ)
  { code: 119, parameters: ["question_1_0"], indent: 1 },
  // (空行)
  { code: 0, parameters: [], indent: 1 },
  // 「いいえ」の場合
  { code: 402, parameters: [1, "いいえ"], indent: 0 },
  // (ラベル question_1_1 に飛ぶ)
  { code: 119, parameters: ["question_1_1"], indent: 1 },
  // (空行)
  { code: 0, parameters: [], indent: 1 },
  // (選択肢の設定終了)
  { code: 404, parameters: [], indent: 0 },
  // 「はい」の場合の処理 (ラベル question_1_0)
  { code: 118, parameters: ["question_1_0"], indent: 0 },
  // 「はい」の場合の処理内容
  { code: 101, parameters: ["", 0, 0, 2], indent: 0 },
  { code: 401, parameters: ["オッケー！"], indent: 0 },
  // (ラベル question_1_END に飛ぶ)
  { code: 119, parameters: ["question_1_END"], indent: 0 },
  // 「いいえ」の場合の処理 (ラベル question_1_1)
  { code: 118, parameters: ["question_1_1"], indent: 0 },
  // 「いいえ」の場合の処理内容
  { code: 101, parameters: ["", 0, 0, 2], indent: 0 },
  { code: 401, parameters: ["ええええーーーーっ！！"], indent: 0 },
  { code: 401, parameters: ["あかんやん！"], indent: 0 },
  { code: 119, parameters: ["質問"], indent: 0 },
  // (ラベル question_1_END に飛ぶ)
  { code: 119, parameters: ["question_1_END"], indent: 0 },
  // 選択肢終了 (ラベル question_1_END)
  { code: 118, parameters: ["question_1_END"], indent: 0 },
  // スクリプト実行
  {
    code: 355,
    parameters: ["$gameScreen.setZoom(816 * 0.5, 624 * 0.5, 2);"],
    indent: 0,
  },
  // 効果音の再生
  {
    code: 250,
    parameters: [{ name: "Item3", volume: 100, pitch: 100, pan: 0 }],
    indent: 0,
  },
  // 画面の色調変更
  { code: 223, parameters: [[255, 255, 255, 0], 60, true], indent: 0 },
  // タイトルへ戻る
  { code: 354, parameters: [], indent: 0 },
  // (空行)
  { code: 0, parameters: [], indent: 0 },
];
```
