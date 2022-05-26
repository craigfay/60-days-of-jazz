<script>
	import { onMount } from 'svelte';
	let target;

	export let clef = 'treble';

	// Create the notes
	export let notes = [
		{ note: { keys: ['a/3'], duration: '8' } },
		{ note: { keys: ['b/3'], duration: '8' } },
		{ note: { keys: ['c#/4'], duration: '8' }, accidental: '#' },
		{ note: { keys: ['d/4'], duration: '8' } },

		{ note: { keys: ['e/4'], duration: '8' } },
		{ note: { keys: ['f/4'], duration: '8' } },
		{ note: { keys: ['f#/4'], duration: '8' }, accidental: '#' },
		{ note: { keys: ['g#/4'], duration: '8' }, accidental: '#' },
		{ note: { keys: ['a/4'], duration: '16' }, },
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

		// Create the notes
		const staveNotes = notes.map(function (options) {
			let staveNote = new VF.StaveNote(options.note);

			if (options.accidental) {
				let modifier = new VF.Accidental(options.accidental);
				staveNote.addModifier(modifier, 0);
			}

			return staveNote;
		});

		const beams = VF.Beam.generateBeams(staveNotes);
    VF.Formatter.FormatAndDraw(context, stave, staveNotes)
		beams.forEach(b => b.setContext(context).draw());
	});
</script>

<div class="w-full p-4">
	<svg viewBox="0 0 401 125" class="mx-auto w-full" bind:this={target} />
</div>
