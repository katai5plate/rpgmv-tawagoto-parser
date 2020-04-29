type Range_0_1 = 0 | 1;
type Range_0_2 = Range_0_1 | 2;
type Range_0_3 = Range_0_2 | 3;
type Range_0_5 = Range_0_3 | 4 | 5;
type Range_0_7 = Range_0_5 | 6 | 7;
type Range_m1_5 = -1 | Range_0_5;
type Range_m2_5 = -2 | Range_m1_5;
type StateWindowFace = [string, Range_0_7];
type DoubleNumber = [number, number];
export type TripleNumber = [number, number, number];
type PresetPicker<T> = { [k: string]: T };

export type State = {
  window: {
    face: StateWindowFace;
    mode: Range_0_2;
    pos: Range_0_2;
  };
  choice: {
    win: Range_0_2;
    pos: Range_0_2;
    init: Range_m1_5;
    esc: Range_m2_5;
  };
  audio: {
    /** 0 - 100 */ vol: number;
    /** 50 - 150 */ pitch: number;
    /** -100 - 100 */ pan: number;
  };
  picture: {
    point: Range_0_1;
    pos: DoubleNumber;
    posMode: Range_0_1;
    scale: DoubleNumber;
    /** 0 - 255 */ alfa: number;
    mixMode: Range_0_3;
  };
};

const WINDOW_MODE: PresetPicker<Range_0_2> = {
  WINDOW: 0,
  BLACK: 1,
  NONE: 2,
};
const CHOICE_CASES: PresetPicker<Range_0_5> = {
  CASE_1: 0,
  CASE_2: 1,
  CASE_3: 2,
  CASE_4: 3,
  CASE_5: 4,
  CASE_6: 5,
};
export const WINDOW: {
  FACE: PresetPicker<StateWindowFace>;
  MODE: PresetPicker<Range_0_2>;
  POS: PresetPicker<Range_0_2>;
} = {
  FACE: {
    EMPTY: ["", 0],
  },
  MODE: WINDOW_MODE,
  POS: { TOP: 0, CENTER: 1, BOTTOM: 2 },
};
export const CHOICE: {
  WIN: PresetPicker<Range_0_2>;
  POS: PresetPicker<Range_0_2>;
  INIT: PresetPicker<Range_m1_5>;
  ESC: PresetPicker<Range_m2_5>;
} = {
  WIN: WINDOW_MODE,
  POS: { LEFT: 0, CENTER: 1, RIGHT: 2 },
  INIT: { NONE: -1, ...CHOICE_CASES },
  ESC: { OK: -2, NG: -1, ...CHOICE_CASES },
};
export const AUDIO: {
  VOL: PresetPicker<number>;
  PITCH: PresetPicker<number>;
  PAN: PresetPicker<number>;
} = {
  VOL: { MIN: 0, MUTE: 0, HALF: 50, MAX: 100 },
  PITCH: { SLOW: 50, DEFAULT: 100, FAST: 150 },
  PAN: { LEFT: -100, CENTER: 0, RIGHT: 100 },
};
export const PICTURE: {
  POINT: PresetPicker<Range_0_1>;
  POS: PresetPicker<DoubleNumber>;
  POSMODE: PresetPicker<Range_0_1>;
  SCALE: PresetPicker<DoubleNumber>;
  ALFA: PresetPicker<number>;
  MIXMODE: PresetPicker<Range_0_3>;
} = {
  POINT: { CORNER: 0, CENTER: 1 },
  POS: { ZERO: [0, 0] },
  POSMODE: { VALUE: 0, VARIABLE: 1 },
  SCALE: { ZERO: [0, 0], DEFAULT: [100, 100] },
  ALFA: { HIDE: 0, HALF: 127, VISIBLE: 255 },
  MIXMODE: { DEFAULT: 0, ADD: 1, SUB: 2, SCREEN: 3 },
};
export const COLOR: PresetPicker<TripleNumber> = {
  BLACK: [0, 0, 0],
  RED: [255, 0, 0],
  GREEN: [0, 255, 0],
  BLUE: [0, 0, 255],
  YELLOW: [255, 255, 0],
  CYAN: [0, 255, 255],
  MAGENTA: [255, 0, 255],
  WHITE: [255, 255, 255],
};
export const INTERPRETER: PresetPicker<number> = {
  EMPTY: 0,
  SCRIPT_BEGIN: 355,
  SCRIPT: 655,
  PLAY_BGM: 241,
  PLAY_BGS: 245,
  PLAY_ME: 249,
  PLAY_SE: 250,
  MESSAGE_INIT: 101,
  MESSAGE: 401,
  CHOICE_INIT: 102,
  CHOICE_CASE: 402,
  CHOICE_ESC: 403,
  CHOICE_END: 404,
  LABEL: 118,
  LABEL_JUMP: 119,
  WAIT: 230,
  GOTO_MENU: 351,
  GOTO_SAVE: 352,
  GOTO_GAMEOVER: 353,
  GOTO_TITLE: 354,
  SCREEN_COLOR: 223,
};

export const INIT_STATE: State = {
  window: {
    face: WINDOW.FACE.EMPTY,
    mode: WINDOW.MODE.WINDOW,
    pos: WINDOW.POS.BOTTOM,
  },
  choice: {
    win: CHOICE.WIN.WINDOW,
    pos: CHOICE.POS.RIGHT,
    init: CHOICE.INIT.NONE,
    esc: CHOICE.ESC.NG,
  },
  audio: {
    vol: AUDIO.VOL.MAX,
    pitch: AUDIO.PITCH.DEFAULT,
    pan: AUDIO.PAN.CENTER,
  },
  picture: {
    point: PICTURE.POINT.CORNER,
    pos: PICTURE.POS.ZERO,
    posMode: PICTURE.POSMODE.VALUE,
    scale: PICTURE.SCALE.DEFAULT,
    alfa: PICTURE.ALFA.VISIBLE,
    mixMode: PICTURE.MIXMODE.DEFAULT,
  },
};
