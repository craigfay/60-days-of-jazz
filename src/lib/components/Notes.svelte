<script>
	import { onMount } from 'svelte';
	let target;

	export let clef = 'treble';
	export let timeSignature = '4/4';

	// Create the notes
	export let notes = [
		// A quarter-note C.
		{ keys: ['c/4'], duration: '8' },

		{ keys: ['c/4'], duration: '16' },

		{ keys: ['c/4'], duration: '16' },

		// A quarter-note D.
		{ keys: ['d/4'], duration: 'q' },

		{ keys: ['b/3'], duration: 'qr' },

		// A C-Major chord.
		{ keys: ['c/4', 'e/4', 'g/4'], duration: 'q' },
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
		stave.addClef(clef).addTimeSignature(timeSignature);

		// Connect it to the rendering context and draw!
		stave.setContext(context).draw();

		// Create the notes
		const staveNotes = notes.map(options => new VF.StaveNote(options));

		// Create a voice in 4/4 and add above notes
		const voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
		voice.addTickables(staveNotes);

		// Format and justify the notes to 400 pixels.
		new VF.Formatter().joinVoices([voice]).format([voice], 400);

		// Render voice
		voice.draw(context, stave);
	});
</script>

<div class="w-full">
	<svg viewBox="0 0 401 125" class="mx-auto w-full" bind:this={target} />
</div>

<style global>
	svg {
		width: 100%;
	}
</style>
