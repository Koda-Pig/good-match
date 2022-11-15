// Remove spaces and convert string to an array
function Convert(input) {
  // convert string to lowercase, remove spaces, then convert to array
  return input
    .toLowerCase()
    .split('')
    .filter((char) => char !== ' ')
}

// count number of characters
function Count_Chars(array) {
  // define counter object
  const char_count = {}

  // count how many times each character is used.
  for (const char of array) {
    // if the key already exists, increment its count by 1
    // else, set it to 1
    if (char_count[char]) char_count[char]++
    else char_count[char] = 1
  }

  // return a string made from the values in the counter object
  return Object.values(char_count).join('')
}

// reduce input to 2 characters
function Reduce(string) {
  let reduced_string = ''
  let string_to_array = string.split('')

  while (string_to_array.length > 1) {
    // add sum of first and last elements in input array to end of output
    reduced_string = reduced_string.concat(
      Number(string_to_array[0]) +
        Number(string_to_array[string_to_array.length - 1])
    )
    // remove the elements that have been added
    string_to_array.pop()
    string_to_array.shift()
  }

  // if only 1 element left in array, add it to end of output
  if (string_to_array.length === 1) {
    reduced_string = reduced_string.concat(string_to_array[0])
    string_to_array.pop()
  }

  // If output is 2 characters or less, return result
  // else, continue to reduce
  if (reduced_string.length < 3) return reduced_string
  else return Reduce(reduced_string)
}

// checks output and outputs result to DOM
export default function GoodMatch(sentence, success_output) {
  let output = Reduce(Count_Chars(Convert(sentence)))

  output > 80
    ? (output = sentence.concat(` ${output}%, good match`))
    : (output = sentence.concat(` ${output}%`))

  success_output.innerHTML = output
  return output
}
