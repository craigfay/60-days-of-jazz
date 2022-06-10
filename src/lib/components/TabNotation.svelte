<script>
  import { onMount } from 'svelte';

  export let articulations = [
    { fingerings: [{ str: 6, fret: 5 }], duration: '16' },
    { fingerings: [{ str: 6, fret: 7 }], duration: '16' },

    { fingerings: [{ str: 5, fret: 4 }], duration: '16' },
    { fingerings: [{ str: 5, fret: 5 }], duration: '16' },
    { fingerings: [{ str: 5, fret: 7 }], duration: '16' },
    { fingerings: [{ str: 5, fret: 8 }], duration: '16' },

    { fingerings: [{ str: 4, fret: 4 }], duration: '16' },
    { fingerings: [{ str: 4, fret: 6 }], duration: '16' },
    { fingerings: [{ str: 4, fret: 7 }], duration: '16' },
  ];

  let target;



  onMount(async () => {
    const VF = await import('vexflow');
    const renderer = new VF.Vex.Flow.Renderer(target, VF.Vex.Flow.Renderer.Backends.SVG);

    const context = renderer.getContext();
    const stave = new VF.TabStave(0, -50, 400);
    stave.addClef('tab').setContext(context).draw();

    // Definining a helper to convert from a local application
    // object type to a type preferred by VexFlow.
    function articulationToTabNote(a) {
      let options = { positions: a.fingerings, duration: a.duration }
      return new VF.TabNote(options);
    }

    const tabNotes = articulations.map(articulationToTabNote)
    VF.Formatter.FormatAndDraw(context, stave, tabNotes);
  });
</script>

<div class="w-full p-4">
  <svg viewBox="0 0 401 75" class="mx-auto w-full" bind:this={target} />
</div>
