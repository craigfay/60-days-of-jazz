<script lang="ts">
  import StaffNotation, { Articulation as StaffArticulation } from '$lib/components/StaffNotation.svelte';
  import TabNotation from '$lib/components/TabNotation.svelte';
  import { guitarStandardTuning, pitchUp } from '$lib/util';
  import type { ChordQuality, OctaveAwarePitch } from '$lib/util';


  function excludeThe5th(chord) {
    let skipNthElement = n => ((_,i) => i != n);
    let chordCopy = { ...chord };
    chordCopy.tabArticulation.fingerings = chord.tabArticulation.fingerings.filter(skipNthElement(1));
    chordCopy.staffArticulation.pitches = chord.staffArticulation.pitches.filter(skipNthElement(1));
    return chordCopy;
  }

  function makeScaleOfChordsStaff(scale: OctaveAwarePitch[]): StaffArticulation[] {
    let tabArticulation = { duration: '8', fingerings: [] };
    let startingFret = 0;

    let [rootNote] = scale;
    let [pitchName, octave] = rootNote.split('/');

    // Raising the starting fret until reaching the root note
    // for (let i = 0; true; i++) {
    //   if (pitchUp(guitarStandardTuning['6'], i) == rootNote) {
    //     startingFret = i;
    //     break;
    //   }
    // }

    return scale.map((pitch, pitchIdx) => {
      let relativeScale = [
        ...scale.slice(pitchIdx, scale.length),
        ...scale.slice(0, pitchIdx),
      ];

      console.log(pitch, relativeScale)

      let intervals = [1, 5, 7, 11];

      let pitches = intervals.map(interval => {
        let pitchIdx = interval % scale.length;
        let octaveDiff = Math.floor(interval / scale.length);
        return `${relativeScale[pitchIdx]}/${octave + octaveDiff}` as OctaveAwarePitch
      });

      return { duration: '16', pitches } as StaffArticulation;
    });

  }


  let emaj7 = {
    tabArticulation: {
      duration: '8',
      fingerings: [
        { str: 6, fret: 0 },
        { str: 5, fret: 3 },
        { str: 4, fret: 1 },
        { str: 3, fret: 1 },
      ]
    },
    staffArticulation: {
      duration: '16',
      pitches: [
        'e/3',
        'e/3',
        'd#/4',
        'g#/4',
      ],
    },

  };

  // let maj7DiminishedScaleOfChords = [
  //   emaj7,
  // ]

  let eMaj7DiminishedScaleOfChords = makeScaleOfChordsStaff([
    'e/3',
    'f#/3',
    'g#/3',
    'a/4',
    'b/4',
    'c/4',
    'c#/4',
    'd#/4',
    'e/4',
  ])
  
  // let threeNoteVoicings = eMaj7DiminishedScaleOfChords.map(excludeThe5th);



</script>

<h1>Scales of Chords</h1>

<StaffNotation articulations={eMaj7DiminishedScaleOfChords} />
<!-- <StaffNotation articulations={threeNoteVoicings.map(chord => chord.staffArticulation)} /> -->
<!-- <TabNotation articulations={threeNoteVoicings.map(chord => chord.tabArticulation)} /> -->
