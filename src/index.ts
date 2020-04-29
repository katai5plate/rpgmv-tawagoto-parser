import {
  WINDOW,
  CHOICE,
  AUDIO,
  PICTURE,
  COLOR,
  INTERPRETER,
  INIT_STATE,
  State,
  TripleNumber,
} from "./constants";
import { isStringArray, lengthIs } from "./validation";
import { createInterpreterItem, InterpreterItem } from "./utils";

type Message = string | string[];
type ChoiceCase = {
  label: string;
  code: (x: TawagotoScript) => InterpreterItem[];
};
type ChoiceCases =
  | [ChoiceCase, ChoiceCase, ChoiceCase, ChoiceCase, ChoiceCase, ChoiceCase]
  | [ChoiceCase, ChoiceCase, ChoiceCase, ChoiceCase, ChoiceCase]
  | [ChoiceCase, ChoiceCase, ChoiceCase, ChoiceCase]
  | [ChoiceCase, ChoiceCase, ChoiceCase]
  | [ChoiceCase, ChoiceCase]
  | [ChoiceCase];

export default class TawagotoScript {
  state: State;
  list: InterpreterItem[];
  static WINDOW = WINDOW;
  static CHOICE = CHOICE;
  static AUDIO = AUDIO;
  static PICTURE = PICTURE;
  static COLOR = COLOR;
  static INTERPRETER = INTERPRETER;
  constructor(initialState?: Partial<State>, initialList?: InterpreterItem[]) {
    const { window, choice, audio, picture } = initialState || {};
    this.state = {
      window: { ...INIT_STATE.window, ...(window || {}) },
      choice: { ...INIT_STATE.choice, ...(choice || {}) },
      audio: { ...INIT_STATE.audio, ...(audio || {}) },
      picture: { ...INIT_STATE.picture, ...(picture || {}) },
    };
    this.list = initialList || [];
  }
  /**
   * 配列の場合: そのまま返す
   * 複数行文字列の場合: 1行目が空なら省略、各行のスペースorタブを除外
   * １行文字列の場合: 単純に配列変換
   */
  messageToArray(message: Message) {
    if (isStringArray(message)) return message;
    if (typeof message !== "string")
      throw new TypeError("メッセージの型が不正です。");
    const texts = message.split("\n");
    if (texts.length === 1) return [texts[0]];
    const fixed = texts.map((x) => x.trim());
    const [one, ...rest] = fixed;
    if (one === "") return rest;
    return fixed;
  }
  getList() {
    return [...this.list, createInterpreterItem(INTERPRETER.EMPTY, [])];
  }
  exec() {
    (window as any).$gameMap._interpreter._list = this.list;
  }
  setWindow(option: State["window"]) {
    this.state.window = { ...this.state.window, ...option };
  }
  setChoice(option: State["choice"]) {
    this.state.choice = { ...this.state.choice, ...option };
  }
  setAudio(option: State["audio"]) {
    this.state.audio = { ...this.state.audio, ...option };
  }
  setPicture(option: State["picture"]) {
    this.state.picture = { ...this.state.picture, ...option };
  }
  js(message: Message) {
    const [one, ...rest] = this.messageToArray(message);
    const result = [
      createInterpreterItem(INTERPRETER.SCRIPT_BEGIN, [one]),
      ...rest.map((x) => createInterpreterItem(INTERPRETER.SCRIPT, [x])),
    ];
    this.list = [...this.list, ...result];
    return result;
  }
  playAudio(code: number, name: string) {
    const { vol: volume, pitch, pan } = this.state.audio;
    const result = [
      createInterpreterItem(code, [{ name, volume, pitch, pan }]),
    ];
    this.list = [...this.list, ...result];
    return result;
  }
  bgm(name: string) {
    return this.playAudio(INTERPRETER.PLAY_BGM, name);
  }
  bgs(name: string) {
    return this.playAudio(INTERPRETER.PLAY_BGS, name);
  }
  me(name: string) {
    return this.playAudio(INTERPRETER.PLAY_ME, name);
  }
  se(name: string) {
    return this.playAudio(INTERPRETER.PLAY_SE, name);
  }
  mes(message: Message) {
    const { face, mode, pos } = this.state.window;
    if (!lengthIs(face, 2))
      throw new TypeError("顔グラフィック設定が不正です。");
    const text = this.messageToArray(message);
    const result = [
      createInterpreterItem(INTERPRETER.MESSAGE_INIT, [...face, mode, pos]),
      ...text.map((x) => createInterpreterItem(INTERPRETER.MESSAGE, [x])),
    ];
    this.list = [...this.list, ...result];
    return result;
  }
  choice(id: string, cases: ChoiceCases, escCase?: ChoiceCase["code"]) {
    const { win, pos, init, esc } = this.state.choice;
    const result = [
      createInterpreterItem(INTERPRETER.CHOICE_INIT, [
        cases.map((x) => x.label),
        esc,
        init,
        pos,
        win,
      ]),
      ...cases.reduce<InterpreterItem[]>(
        (p, { label }, i) => [
          ...p,
          createInterpreterItem(INTERPRETER.CHOICE_CASE, [i, label]),
          createInterpreterItem(INTERPRETER.LABEL_JUMP, [`${id}_${i}`], 1),
          createInterpreterItem(INTERPRETER.EMPTY, [], 1),
        ],
        []
      ),
      ...(escCase !== undefined
        ? [
            createInterpreterItem(INTERPRETER.CHOICE_ESC, [6, null]),
            createInterpreterItem(INTERPRETER.LABEL_JUMP, [`${id}_ESC`], 1),
            createInterpreterItem(INTERPRETER.EMPTY, [], 1),
          ]
        : []),
      createInterpreterItem(INTERPRETER.CHOICE_END, []),
      ...cases.reduce<InterpreterItem[]>(
        (p, { code }, i) => [
          ...p,
          createInterpreterItem(INTERPRETER.LABEL, [`${id}_${i}`]),
          // FIXME: 型解決する
          ...code(new TawagotoScript()).reduce<InterpreterItem[]>(
            (p, c: any) => {
              return [...p, ...c];
            },
            []
          ),
          createInterpreterItem(INTERPRETER.LABEL_JUMP, [`${id}_END`]),
        ],
        []
      ),
      ...(escCase !== undefined
        ? [
            createInterpreterItem(INTERPRETER.LABEL, [`${id}_ESC`]),
            // FIXME: 型解決する
            ...escCase(new TawagotoScript()).reduce<InterpreterItem[]>(
              (p, c) => [...p, ...(c as any)],
              []
            ),
            createInterpreterItem(INTERPRETER.LABEL_JUMP, [`${id}_END`]),
          ]
        : []),
      createInterpreterItem(INTERPRETER.LABEL, [`${id}_END`]),
    ];
    this.list = [...this.list, ...result];
    return result;
  }
  label(name: string) {
    const result = [createInterpreterItem(INTERPRETER.LABEL, [name])];
    this.list = [...this.list, ...result];
    return result;
  }
  goto(name: string) {
    const result = [createInterpreterItem(INTERPRETER.LABEL_JUMP, [name])];
    this.list = [...this.list, ...result];
    return result;
  }
  wait(frame: string) {
    const result = [createInterpreterItem(INTERPRETER.WAIT, [frame])];
    this.list = [...this.list, ...result];
    return result;
  }
  gotoMenu() {
    const result = [createInterpreterItem(INTERPRETER.GOTO_MENU, [])];
    this.list = [...this.list, ...result];
    return result;
  }
  gotoSave() {
    const result = [createInterpreterItem(INTERPRETER.GOTO_SAVE, [])];
    this.list = [...this.list, ...result];
    return result;
  }
  gotoGameOver() {
    const result = [createInterpreterItem(INTERPRETER.GOTO_GAMEOVER, [])];
    this.list = [...this.list, ...result];
    return result;
  }
  gotoTitle() {
    const result = [createInterpreterItem(INTERPRETER.GOTO_TITLE, [])];
    this.list = [...this.list, ...result];
    return result;
  }
  changeScreenColor(
    color: TripleNumber,
    gray: number,
    wait: number,
    nonStop = false
  ) {
    if (!lengthIs(color, 3)) throw new TypeError("色指定が不正です。");
    const result = [
      createInterpreterItem(INTERPRETER.SCREEN_COLOR, [
        [...color, gray],
        wait,
        !nonStop,
      ]),
    ];
    this.list = [...this.list, ...result];
    return result;
  }
}

(window as any).TawagotoScript = TawagotoScript;
