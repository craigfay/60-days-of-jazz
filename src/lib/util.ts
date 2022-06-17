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
  return pitchUp(note, 0 - semitones)
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