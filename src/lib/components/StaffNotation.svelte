<script context="module" lang="ts">
  export type Articulation = {
    fingerings: Array<{ str: number, fret: number }>,
    duration: '1' | '4' | '8' | '16',
  }
</script>

<script>
  import { onMount } from 'svelte';
  let target;

  export let clef = 'treble';

  export let articulations = [
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

    // Create an SVG renderer and attach it to the DIV element named "boo".
    const renderer = new Renderer(target, Renderer.Backends.SVG);

    // Configure the rendering context.
    const context = renderer.getContext();

    const stave = new Stave(0, 0, 400);

    // Add a clef and time signature.
    stave.addClef(clef);

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();


    function articulationToStaveNote(a) {
      let options = { keys: a.pitches, duration: a.duration }
      const staveNote = new VF.StaveNote(options)

      a.pitches.forEach((pitch, idx) => {
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

<div class="w-full p-4">
  <svg viewBox="0 0 401 125" class="mx-auto w-full" bind:this={target} />
</div>
