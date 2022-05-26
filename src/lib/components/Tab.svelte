<script>
  import { onMount } from 'svelte';

  export let notes = [
    {
      positions: [{ str: 3, fret: 7 }],
      duration: 'q'
    },

    {
      positions: [
        { str: 2, fret: 10 },
        { str: 3, fret: 9 },
        { str: 4, fret: 8 }
      ],
      duration: 'q'
    },

    {
      positions: [{ str: 2, fret: 5 }],
      duration: 'h'
    },
  ];

  let target;

  onMount(async () => {
    const VF = await import('vexflow');
    const renderer = new VF.Vex.Flow.Renderer(target, VF.Vex.Flow.Renderer.Backends.SVG);

    const context = renderer.getContext();
    const stave = new VF.TabStave(0, 0, 400);
    stave.addClef('tab').setContext(context).draw();

    const tabNotes = notes.map(options => new VF.TabNote(options));

    VF.Formatter.FormatAndDraw(context, stave, tabNotes);
  });
</script>

<div class="w-full">
  <svg viewBox="0 0 401 125" class="mx-auto w-full" bind:this={target} />
</div>
