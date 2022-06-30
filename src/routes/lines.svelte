
<script lang="ts">
  import TabNotation, { Articulation } from '$lib/components/TabNotation.svelte'

</script>

<h1>Lines on the 1 of Emaj</h1>

<p>flat 7 -> 6</p>
<TabNotation
  articulations={[
    { fingerings: [{ str: 3, fret: 7 }], duration: '16' },
    { fingerings: [{ str: 3, fret: 8 }], duration: '16' },
    { fingerings: [{ str: 3, fret: 6 }], duration: '16' },
    { fingerings: [{ str: 4, fret: 8 }], duration: '16' },
    { fingerings: [{ str: 4, fret: 9 }], duration: '16' },
    { fingerings: [{ str: 3, fret: 6 }], duration: '16' },
  ]}
/>


<p>1 -> 6
<TabNotation
  articulations={[
    { fingerings: [{ str: 3, fret: 9 }], duration: '16' },
    { fingerings: [{ str: 3, fret: 8 }], duration: '16' },
    { fingerings: [{ str: 3, fret: 7 }], duration: '16' },
    { fingerings: [{ str: 3, fret: 8 }], duration: '16' },
    { fingerings: [{ str: 4, fret: 8 }], duration: '16' },
    { fingerings: [{ str: 3, fret: 6 }], duration: '16' },
  ]}
/>

<p>flat 7 -> 6. Try starting on the off-beat.</p>
<TabNotation
  articulations={[
    { fingerings: [{ str: 3, fret: 7 }], duration: '16' },
    { fingerings: [{ str: 3, fret: 6 }], duration: '16' },
    { fingerings: [{ str: 4, fret: 6 }], duration: '16' },
    { fingerings: [{ str: 4, fret: 9 }], duration: '16' },
    { fingerings: [{ str: 3, fret: 6 }], duration: '16' },
  ]}
/>

<p>2 -> 3</p>
<TabNotation
  articulations={[
    { fingerings: [{ str: 2, fret: 7 }], duration: '16' },
    { fingerings: [{ str: 3, fret: 8 }], duration: '16' },
    { fingerings: [{ str: 3, fret: 6 }], duration: '16' },
    { fingerings: [{ str: 3, fret: 8 }], duration: '16' },
    { fingerings: [{ str: 4, fret: 9 }], duration: '16' },
    { fingerings: [{ str: 4, fret: 6 }], duration: '16' },
  ]}
/>


<p>3 -> 7. Try dropping the 3 an octave.</p>
<TabNotation
  articulations={[
    { fingerings: [{ str: 4, fret: 7 }], duration: '16' },
    { fingerings: [{ str: 3, fret: 8 }], duration: '16' },
    { fingerings: [{ str: 3, fret: 7 }], duration: '16' },
    { fingerings: [{ str: 4, fret: 9 }], duration: '16' },
    { fingerings: [{ str: 3, fret: 7 }], duration: '16' },
    { fingerings: [{ str: 3, fret: 9 }], duration: '16' },
  ]}
/>



