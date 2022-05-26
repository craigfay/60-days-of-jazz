<script>
  import { onMount } from 'svelte';
  let target;

  export let clef = 'treble';

  // Create the notes
  export let notes = [
    { note: { keys: ['a/3'], duration: '8' } },
    { note: { keys: ['b/3'], duration: '8' } },
    { note: { keys: ['c#/4'], duration: '8' }, accidental: '#', },
    { note: { keys: ['d/4'], duration: '8' }, },

    { note: { keys: ['e/4'], duration: '8' }, },
    { note: { keys: ['f/4'], duration: '8' }, },
    { note: { keys: ['f#/4'], duration: '8' }, accidental: '#' },
    { note: { keys: ['g#/4'], duration: '8' }, accidental: '#' },
    // { note: { keys: ['a/4'], duration: '16' }, },
  ];

  onMount(async () => {
    const VF = await import('vexflow');
    const { Vex } = VF;
    const { Renderer, Stave } = Vex.Flow;

    // Create an SVG renderer and attach it to the DIV element named "boo".
    const renderer = new Renderer(target, Renderer.Backends.SVG);

    // Configure the rendering context.
    // renderer.resize(401, 200);
    const context = renderer.getContext();

    const stave = new Stave(0, 0, 400);

    // Add a clef and time signature.
    stave.addClef(clef)

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();

    // Create the notes
    const staveNotes = notes.map(function(options) {
      let staveNote = new VF.StaveNote(options.note);

      if (options.accidental) {
        let modifier = new VF.Accidental(options.accidental);
        staveNote.addModifier(modifier, 0)
      }

      return staveNote
    })

    // Create a voice in 4/4 and add above notes
    const voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
    // const voice = new VF.Voice();
    voice.addTickables(staveNotes);

    // Format and justify the notes to 400 pixels.
    new VF.Formatter().joinVoices([voice]).format([voice], 400 - 40);

    // Render voice
    voice.draw(context, stave);
  });
</script>

<div class="w-full">
  <svg viewBox="0 0 401 125" class="mx-auto w-full" bind:this={target} />
</div>
