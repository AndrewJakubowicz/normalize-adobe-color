/**
 * Quick utility script to normalize colors into the hex art colors provided.
 */

import commander from 'commander'
import * as fs from 'fs'

const program = new commander.Command();
program.version(`0.0.1`)

program
  .option('-f, --file <file>', 'The art exported javascript file')

program.parse(process.argv)

if (!program.file) {
  console.error('expected a file to be passed in with the `-f` flag.')
}

enum ColorBuckets {
  hairLight = "#752744",
  hairMid = "#431D32",
  hairDark = "#330A1D",
  skinLight = "#DA6D46",
  skinMid = "#703E31",
  skinDark = "#58322A",
  skinAccent = "#3A1E15"
}

const rgbaRegex = /\"rgba\((.*?),(.*?),(.*?),(.*?)\)\"/g

function hexToRgb (hex: string): [number, number, number] {
  const extractHex = (start: number, end: number) => parseInt(hex.slice(start, end), 16);
  return [extractHex(1, 3), extractHex(3, 5), extractHex(5, 7)]
}

// Used to check if two colors are similar.
const isSimilar = (a: number, b: number) => Math.abs(a-b) <= 3

/**
 * Replaces rgba values with the bucketed hex value.
 * Tries to detect if the value is similar to one of the bucket values.
 * If so, will round into a bucket value.
 * @param s text contents of the file
 */
function replaceRgbaWithHex (s: string): string {
  return s.replace(rgbaRegex, (matchedString, r, g, b, _a) => {
    const r1: number = parseInt(r, 10)
    const g1: number = parseInt(g, 10)
    const b1: number = parseInt(b, 10)
    // const a1: number = parseFloat(a)
    for (const hexColor of Object.values(ColorBuckets)) {
      const [r2, g2, b2] = hexToRgb(hexColor)
      if ([[r1, r2], [g1, g2], [b1, b2]].every(([v1, v2]) => isSimilar(v1, v2))) {
        console.log('replacing with normalized value:', hexColor)
        return `"${hexColor}"`
      }
    }
    return matchedString
  })
}

const fileString = fs.readFileSync(program.file).toString()
const transformedFileText = replaceRgbaWithHex(fileString)

fs.writeFileSync(`${program.file.slice(0, -3)}.transformed.js`, transformedFileText)
