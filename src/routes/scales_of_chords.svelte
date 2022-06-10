<script>
  import StaffNotation from '$lib/components/StaffNotation.svelte';
  import TabNotation from '$lib/components/TabNotation.svelte';

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
      pitches: [
        'e/3',
        'e/3',
        'd#/4',
        'g#/4',
      ],
      duration: '8'
    },

  };

  let maj7DiminishedScaleOfChords = [
    emaj7,
  ]
  
  let threeNoteVoicings = maj7DiminishedScaleOfChords.map(excludeThe5th);

  function excludeThe5th(chord) {
    let skipNthElement = n => ((_,i) => i != n);
    let chordCopy = { ...chord };
    chordCopy.tabArticulation.fingerings = chord.tabArticulation.fingerings.filter(skipNthElement(1));
    chordCopy.staffArticulation.pitches = chord.staffArticulation.pitches.filter(skipNthElement(1));
    return chordCopy;
  }

</script>

<h1>Scales of Chords</h1>

<StaffNotation articulations={threeNoteVoicings.map(chord => chord.staffArticulation)} />
<TabNotation articulations={threeNoteVoicings.map(chord => chord.tabArticulation)} />
