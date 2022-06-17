let chromaticScale = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b']

let results = [];

for (let o = 0; o < 9; o++) {
  for (let i = 0; i < 12; i++) {
    results.push(`"${chromaticScale[i]}/${o}"`)
  }
}

console.log(results.join(' | '))