export const chromaticScale = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b']

export const guitarStandardTuning = {
  6: 'e/3',
  5: 'a/3',
  4: 'd/4',
  3: 'g/4',
  2: 'b/5',
  1: 'e/5',
}

export function pitchUp(note, semitones) {
  let [pitch, octave] = note.split('/');
  let octaveNum = parseInt(octave);

  let newPitch;
  let newOctaveNum = octaveNum;

  for (let i = chromaticScale.findIndex(n => n == pitch); i < semitones; i++) {
    let scaleIdx = (i + 1) % chromaticScale.length;
    newPitch = chromaticScale[scaleIdx];
    if (scaleIdx == 0) { newOctaveNum += 1 }
  }

  return `${newPitch}/${newOctaveNum}`;
}

export function pitchDown(note, semitones) {
  let [pitch, octave] = note.split('/');
  let octaveNum = parseInt(octave);

  let newPitch;
  let newOctaveNum = octaveNum;

  for (let i = chromaticScale.findIndex(n => n == pitch); i < semitones; i++) {
    let scaleIdx = i - 1;
    if (scaleIdx == -1) scaleIdx = chromaticScale.length - 1;

    newPitch = chromaticScale[scaleIdx];
    if (scaleIdx + 1 == chromaticScale.length) { newOctaveNum -= 1 }
  }

  return `${newPitch}/${newOctaveNum}`;
}

export type ChordQuality = {
  longName: string,
  shortName: string,
  semitoneDistances: number[],
}

export const chordQualities: ChordQuality[] = [
  { longName: 'Major 7', shortName: 'maj7', semitoneDistances: [0, 4, 7, 11] },
  { longName: 'Minor 7', shortName: 'min7', semitoneDistances: [0, 3, 7, 10] },
  { longName: 'Major 6', shortName: 'maj6', semitoneDistances: [0, 4, 7, 9] },
  { longName: 'Minor 6', shortName: 'maj6', semitoneDistances: [0, 3, 7, 9] },
  { longName: 'Dominant 7', shortName: 'dom7', semitoneDistances: [0, 4, 7, 10] },
  { longName: 'Dominant 7 Flat 5', shortName: 'dom7b5', semitoneDistances: [0, 4, 6, 10] },
  { longName: 'Half Diminished', shortName: 'half-dim', semitoneDistances: [0, 3, 6, 10] },
  { longName: 'Diminished', shortName: 'dim', semitoneDistances: [0, 3, 6, 9] },
]

export function applyInversion(semitoneDistances = [], n = 1) {
  let result = [...semitoneDistances]
  for (let i = 0; i < n; i++) {
    const [first, ...rest] = result
    result = [...rest, first]
  }
  return result
}

export type OctaveAwarePitch = | "c/0" | "c#/0" | "d/0" | "d#/0" | "e/0" | "f/0" | "f#/0" | "g/0" | "g#/0" | "a/0" | "a#/0" | "b/0" | "c/1" | "c#/1" | "d/1" | "d#/1" | "e/1" | "f/1" | "f#/1" | "g/1" | "g#/1" | "a/1" | "a#/1" | "b/1" | "c/2" | "c#/2" | "d/2" | "d#/2" | "e/2" | "f/2" | "f#/2" | "g/2" | "g#/2" | "a/2" | "a#/2" | "b/2" | "c/3" | "c#/3" | "d/3" | "d#/3" | "e/3" | "f/3" | "f#/3" | "g/3" | "g#/3" | "a/3" | "a#/3" | "b/3" | "c/4" | "c#/4" | "d/4" | "d#/4" | "e/4" | "f/4" | "f#/4" | "g/4" | "g#/4" | "a/4" | "a#/4" | "b/4" | "c/5" | "c#/5" | "d/5" | "d#/5" | "e/5" | "f/5" | "f#/5" | "g/5" | "g#/5" | "a/5" | "a#/5" | "b/5" | "c/6" | "c#/6" | "d/6" | "d#/6" | "e/6" | "f/6" | "f#/6" | "g/6" | "g#/6" | "a/6" | "a#/6" | "b/6" | "c/7" | "c#/7" | "d/7" | "d#/7" | "e/7" | "f/7" | "f#/7" | "g/7" | "g#/7" | "a/7" | "a#/7" | "b/7" | "c/8" | "c#/8" | "d/8" | "d#/8" | "e/8" | "f/8" | "f#/8" | "g/8" | "g#/8" | "a/8" | "a#/8" | "b/8"