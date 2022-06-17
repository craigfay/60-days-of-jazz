<script lang="ts">
  import StaffNotation, { Articulation as StaffArticulation } from '$lib/components/StaffNotation.svelte';
  import TabNotation from '$lib/components/TabNotation.svelte';
  import { guitarStandardTuning, pitchUp, straightenOctaves } from '$lib/util';
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
    let [_pitchName, octave] = rootNote.split('/');


    function rotation(items, element, count) {
      let idxA = items.indexOf(element);
      let idxB = (idxA + count) % items.length;
      return items[idxB];
    }

    return scale.map((pitch, pitchIdx) => {
      let relativeScale = [
        ...scale.slice(pitchIdx, scale.length),
        ...scale.slice(0, pitchIdx),
      ];

      // 1st, 5th, 7th, 3rd
      let intervals = [0, 4, 6, 10];

      let pitches = intervals.map((interval) => {
        let newPitch = rotation(relativeScale, pitch, interval);
        return `${newPitch}/${octave}` as OctaveAwarePitch
      });

      let articulations = { duration: '16', pitches: straightenOctaves(pitches) } as StaffArticulation;
      console.log(articulations.pitches)
      return articulations;
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

  // let eMaj7DiminishedScaleOfChords = makeScaleOfChordsStaff([
  //   'e/3',
  //   'f#/3',
  //   'g#/3',
  //   'a/4',
  //   'b/4',
  //   'c/4',
  //   'c#/4',
  //   'd#/4',
  // ])

  let cMaj7DiminishedScaleOfChords = makeScaleOfChordsStaff([
    'c/3',
    'd/3',
    'e/3',
    'f/3',
    'g/3',
    'g#/3',
    'a/4',
    'b/4',
  ])
  
  // let threeNoteVoicings = eMaj7DiminishedScaleOfChords.map(excludeThe5th);



</script>

<h1>Scales of Chords</h1>

<StaffNotation articulations={cMaj7DiminishedScaleOfChords} />
<!-- <StaffNotation articulations={threeNoteVoicings.map(chord => chord.staffArticulation)} /> -->
<!-- <TabNotation articulations={threeNoteVoicings.map(chord => chord.tabArticulation)} /> -->
