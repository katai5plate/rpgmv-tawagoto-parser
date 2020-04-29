# rpgmv-tawagoto-parser

ツクール MV のイベントコマンドを JavaScript から書けるようにする

## 使い方

`./dist/H2A_TawagotoParser.js` をプロジェクトにコピーして使ってください。

### スクリプトの書き方

```js
const TS = TawagotoScript;
const t = new TS();

t.setWindow({ face: ["Actor1", 1] });
t.label("質問");
t.mes(`
これはメッセージです
これはメッセージです
これはメッセージです
これはメッセージですか？`);
t.choice("question_1", [
  {
    label: "はい",
    code: (x) => [x.mes("オッケー！")],
  },
  {
    label: "いいえ",
    code: (x) => [
      x.mes(["ええええーーーーっ！！", "あかんやん！"]),
      x.goto("質問"),
    ],
  },
]);
t.js(`$gameScreen.setZoom(816 * 0.5, 624 * 0.5, 2);`);
t.se("Item3");
t.changeScreenColor(TS.COLOR.WHITE, 0, 60);
t.gotoTitle();

console.log(t.getList());
```

```json
// 出力結果:
[
  {
    "code": 118,
    "parameters": ["質問"],
    "indent": 0
  },
  {
    "code": 101,
    "parameters": ["Actor1", 1, 0, 2],
    "indent": 0
  },
  {
    "code": 401,
    "parameters": ["これはメッセージです"],
    "indent": 0
  },
  {
    "code": 401,
    "parameters": ["これはメッセージです"],
    "indent": 0
  },
  {
    "code": 401,
    "parameters": ["これはメッセージです"],
    "indent": 0
  },
  {
    "code": 401,
    "parameters": ["これはメッセージですか？"],
    "indent": 0
  },
  {
    "code": 102,
    "parameters": [["はい", "いいえ"], -1, -1, 2, 0],
    "indent": 0
  },
  {
    "code": 402,
    "parameters": [0, "はい"],
    "indent": 0
  },
  {
    "code": 119,
    "parameters": ["question_1_0"],
    "indent": 1
  },
  {
    "code": 0,
    "parameters": [],
    "indent": 1
  },
  {
    "code": 402,
    "parameters": [1, "いいえ"],
    "indent": 0
  },
  {
    "code": 119,
    "parameters": ["question_1_1"],
    "indent": 1
  },
  {
    "code": 0,
    "parameters": [],
    "indent": 1
  },
  {
    "code": 404,
    "parameters": [],
    "indent": 0
  },
  {
    "code": 118,
    "parameters": ["question_1_0"],
    "indent": 0
  },
  {
    "code": 101,
    "parameters": ["", 0, 0, 2],
    "indent": 0
  },
  {
    "code": 401,
    "parameters": ["オッケー！"],
    "indent": 0
  },
  {
    "code": 119,
    "parameters": ["question_1_END"],
    "indent": 0
  },
  {
    "code": 118,
    "parameters": ["question_1_1"],
    "indent": 0
  },
  {
    "code": 101,
    "parameters": ["", 0, 0, 2],
    "indent": 0
  },
  {
    "code": 401,
    "parameters": ["ええええーーーーっ！！"],
    "indent": 0
  },
  {
    "code": 401,
    "parameters": ["あかんやん！"],
    "indent": 0
  },
  {
    "code": 119,
    "parameters": ["質問"],
    "indent": 0
  },
  {
    "code": 119,
    "parameters": ["question_1_END"],
    "indent": 0
  },
  {
    "code": 118,
    "parameters": ["question_1_END"],
    "indent": 0
  },
  {
    "code": 355,
    "parameters": ["$gameScreen.setZoom(816 * 0.5, 624 * 0.5, 2);"],
    "indent": 0
  },
  {
    "code": 250,
    "parameters": [
      {
        "name": "Item3",
        "volume": 100,
        "pitch": 100,
        "pan": 0
      }
    ],
    "indent": 0
  },
  {
    "code": 223,
    "parameters": [[255, 255, 255, 0], 60, true],
    "indent": 0
  },
  {
    "code": 354,
    "parameters": [],
    "indent": 0
  },
  {
    "code": 0,
    "parameters": [],
    "indent": 0
  }
]
```
