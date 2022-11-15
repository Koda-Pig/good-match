// get data from form and output .txt file for download
export default function HandleCSV(file_input, output_para, GoodMatch) {
  let obj_set = {},
    male_arr = [],
    female_arr = []

  if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
    console.error('The File APIs are not fully supported in this browser.')
    return
  }

  if (!file_input.files) {
    console.error(
      "This browser doesn't seem to support the `files` property of file inputs."
    )
  } else if (!file_input.files[0]) {
    console.error('No file selected.')
  } else {
    let file = file_input.files[0]
    let fr = new FileReader()
    fr.onload = receivedText
    fr.readAsText(file)

    function receivedText() {
      // convert to object
      let arr = fr.result.split('\r\n')
      arr.pop()

      arr.forEach((elem) => {
        elem = elem.split(';')
      })

      arr.forEach((elem) => {
        obj_set[elem] = elem.charAt(elem.length - 1)
      })

      Object.keys(obj_set).forEach((key) => {
        if (obj_set[key] === 'm') {
          male_arr.push(key.slice(0, key.length - 2))
        } else {
          female_arr.push(key.slice(0, key.length - 2))
        }
      })

      const output_arr = []

      for (let i = 0; i < female_arr.length; i++) {
        male_arr.forEach((elem) => {
          let sentence = `${elem} matches ${female_arr[i]}`
          output_arr.push(GoodMatch(sentence, output_para))
        })
      }

      const fileName = 'output.txt',
        fileContent = output_arr,
        myFile = new Blob([fileContent], { type: 'text/plain' })

      window.URL = window.URL || window.webkitURL

      output_para.innerHTML = `
      Download the outputted file: <a href="${window.URL.createObjectURL(
        myFile
      )}" download="${fileName}">${fileName}</a>`
    }
  }
}
