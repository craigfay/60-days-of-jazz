<script lang="ts">
	import StaffNotation, {
		Articulation as StaffArticulation
	} from '$lib/components/StaffNotation.svelte';
	import TabNotation from '$lib/components/TabNotation.svelte';
	import { guitarStandardTuning, pitchUp, straightenOctaves } from '$lib/util';
	import type { ChordQuality, OctaveAwarePitch } from '$lib/util';

	function excludeThe5th(chord) {
		let skipNthElement = (n) => (_, i) => i != n;
		let chordCopy = { ...chord };
		chordCopy.tabArticulation.fingerings = chord.tabArticulation.fingerings.filter(
			skipNthElement(1)
		);
		chordCopy.staffArticulation.pitches = chord.staffArticulation.pitches.filter(skipNthElement(1));
		return chordCopy;
	}

	function rotation(items, element, count) {
		let idxA = items.indexOf(element);
		let idxB = (idxA + count) % items.length;
		return items[idxB];
	}

	function makeScaleOfChordsStaff(scale: OctaveAwarePitch[]): StaffArticulation[] {
		let tabArticulation = { duration: '8', fingerings: [] };
		let startingFret = 0;

		let [rootNote] = scale;
		let [_pitchName, octave] = rootNote.split('/');

		return scale.map((pitch, pitchIdx) => {
			let relativeScale = [...scale.slice(pitchIdx, scale.length), ...scale.slice(0, pitchIdx)];

			// 1st, 5th, 7th, 3rd
			let intervals = [0, 4, 6, 10];

			let pitches = intervals.map((interval) => {
				let newPitch = rotation(relativeScale, pitch, interval);
				return `${newPitch}/${octave}` as OctaveAwarePitch;
			});

			let articulations = {
				duration: '4',
				pitches: straightenOctaves(pitches)
			} as StaffArticulation;

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
				{ str: 3, fret: 1 }
			]
		},
		staffArticulation: {
			duration: '16',
			pitches: ['e/3', 'e/3', 'd#/4', 'g#/4']
		}
	};


	let eMaj7DiminishedScaleOfChords = makeScaleOfChordsStaff([
	  'e/4',
	  'f#/4',
	  'g#/4',
	  'a/4',
	  'b/4',
	  'c/5',
	  'c#/5',
	  'd#/5',
	])

  let cMaj6DimScale: OctaveAwarePitch[] = [
		'c/4',
		'd/4',
		'e/4',
		'f/4',
		'g/4',
		'g#/4',
		'a/4',
		'b/4'
	]

	let cMaj7DiminishedScaleOfChords = makeScaleOfChordsStaff(cMaj6DimScale);


</script>

<div class="p-4">
  <h1>Scales of Chords</h1>
  <StaffNotation keySignature="e" articulations={eMaj7DiminishedScaleOfChords} />
  <StaffNotation keySignature="c" articulations={cMaj7DiminishedScaleOfChords} />
</div>
