<script context="module" lang="ts">
  import type { OctaveAwarePitch } from '$lib/util';

  export type Articulation = {
    pitches: Array<OctaveAwarePitch>,
    duration: '1' | '4' | '8' | '16',
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { octaveUnaware } from '$lib/util';
  import type { Pitch } from '$lib/util';

  let target;

  export let clef = 'treble';
  export let keySignature: Pitch | null = null;

  export let articulations: Articulation[] = [
    { pitches: ['a/3'], duration: '8' },
    { pitches: ['b/3'], duration: '8' },
    { pitches: ['c#/4'], duration: '8' },
    { pitches: ['d/4'], duration: '8' },

    { pitches: ['e/4'], duration: '8' },
    { pitches: ['f/4'], duration: '8' },
    { pitches: ['f#/4'], duration: '8' },
    { pitches: ['g#/4'], duration: '8' },
    { pitches: ['a/4'], duration: '16' },
  ];

  onMount(async () => {
    const VF = await import('vexflow');
    const { Vex } = VF;
    const { Renderer, Stave } = Vex.Flow;

    // const renderer = new Renderer(target, Renderer.Backends.SVG);
    // renderer.resize(target.offsetWidth, target.offsetHeight);

    // Configure the rendering context.
    // const context = renderer.getContext();
    let context = new VF.SVGContext(target);
    // context.setViewBox(target.offsetWidth + 1, 120, 0, 0)
    context.setViewBox(`0 -40 ${target.offsetWidth + 1} 200`)

    const svg = context.svg;
    // svg.setAttribute("preserveAspectRatio", "xMinYMax meet")


    // context.resize(target.offsetWidth, target.offsetHeight)
    // context.setViewBox()
    // context.scale(0.5, 0.5)

    const stave = new Stave(0, 0, target.offsetWidth);
    stave.setContext(context);

    const keyManager = new VF.KeyManager(keySignature ? keySignature.toUpperCase() : 'C');

    if (keySignature) {
      stave.addKeySignature(keySignature.toUpperCase());
    }

    // Add a clef and time signature.
    stave.addClef(clef);

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();


    function articulationToStaveNote(a) {
      let options = { keys: a.pitches, duration: a.duration }
      const staveNote = new VF.StaveNote(options)

      a.pitches.forEach((pitch, idx) => {
        let { accidental } = keyManager.getAccidental(octaveUnaware(pitch));
        let keySignatureHasAccidental = Boolean(accidental);

        // Skipping accidentals that are natural to the key signature
        if (keySignature && keySignatureHasAccidental) return;

        // Adding accidentals that aren't natural to the key signature
        if (pitch.includes('#')) {
          let modifier = new VF.Accidental('#');
          staveNote.addModifier(modifier, idx);
        }

      })

      return staveNote
    }

    // Converting props into the format preferred by Vexflow
    const staveNotes = articulations.map(articulationToStaveNote)


    const beams = VF.Beam.generateBeams(staveNotes);
    VF.Formatter.FormatAndDraw(context, stave, staveNotes)
    beams.forEach(b => b.setContext(context).draw());
  });
</script>


<div class="w-full flex" bind:this={target}></div>
