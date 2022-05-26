<script>
  import { onMount } from 'svelte';

  export let notes = [
    { positions: [{ str: 6, fret: 5 }], duration: '16' },
    { positions: [{ str: 6, fret: 7 }], duration: '16' },

    { positions: [{ str: 5, fret: 4 }], duration: '16' },
    { positions: [{ str: 5, fret: 5 }], duration: '16' },
    { positions: [{ str: 5, fret: 7 }], duration: '16' },
    { positions: [{ str: 5, fret: 8 }], duration: '16' },

    { positions: [{ str: 4, fret: 4 }], duration: '16' },
    { positions: [{ str: 4, fret: 6 }], duration: '16' },
    { positions: [{ str: 4, fret: 7 }], duration: '16' },
  ];

  let target;

  onMount(async () => {
    const VF = await import('vexflow');
    const renderer = new VF.Vex.Flow.Renderer(target, VF.Vex.Flow.Renderer.Backends.SVG);

    const context = renderer.getContext();
    const stave = new VF.TabStave(0, -50, 400);
    stave.addClef('tab').setContext(context).draw();

    const tabNotes = notes.map(options => new VF.TabNote(options));

    VF.Formatter.FormatAndDraw(context, stave, tabNotes);
  });
</script>

<div class="w-full">
  <svg viewBox="0 0 401 75" class="mx-auto w-full" bind:this={target} />
</div>
