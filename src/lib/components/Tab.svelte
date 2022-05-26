<script>
	import { onMount } from 'svelte';
	let target;

	onMount(async () => {
		const VF = await import('vexflow');

		// Create an SVG renderer and attach it to the DIV element named "boo".
		const renderer = new VF.Vex.Flow.Renderer(target, VF.Vex.Flow.Renderer.Backends.SVG);

		// Configure the rendering context.
		renderer.resize(500, 500);

		const context = renderer.getContext();
		const stave = new VF.TabStave(10, 40, 400);
		stave.addClef('tab').setContext(context).draw();

		const notes = [
			// A single note
			new VF.TabNote({
				positions: [{ str: 3, fret: 7 }],
				duration: 'q'
			}),

			// A chord with the note on the 3rd string bent
			new VF.TabNote({
				positions: [
					{ str: 2, fret: 10 },
					{ str: 3, fret: 9 },
					{ str: 4, fret: 8 }
				],
				duration: 'q'
			}).addModifier(new VF.Bend('Full'), 1),

			// A single note with a harsh vibrato
			new VF.TabNote({
				positions: [{ str: 2, fret: 5 }],
				duration: 'h'
			}).addModifier(new VF.Vibrato().setHarsh(true).setVibratoWidth(50), 0)
		];

		VF.Formatter.FormatAndDraw(context, stave, notes);
	});
</script>

<div bind:this={target} />
