import './style.scss'
import GoodMatch from './good-match'
import HandleCSV from './handle-csv'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>Good Match</h1>
    <p>
      Calculates the match percentage between two peoples first names. 
    </p>
    <div class="theme-switch">
      <p>text</p>
      <label class="theme-switch_holder">
        <input type="checkbox" title="theme switch" />
        <span class="slider"></span>
      </label>
      <p>CSV</p>
    </div>
    <div class="forms">
      <!-- using onsubmit="return false" on the form element instead of e.preventDefault() in JS -->
      <!-- means we still get to use HTML form validation -->
      <form onsubmit="return false" class="form_text">
        <div class="container">
          <fieldset>
            <label for="first_name">First name:</label>
            <input required type="text" id="first_name" placeholder="enter first name" pattern="[a-zA-Z]+" title="Letters only, no spaces, numbers or special characters."/>
          </fieldset>
          <fieldset>
            <label for="second_name">Second name:</label>
            <input required type="text" id="second_name" placeholder="enter second name" pattern="[a-zA-Z]+" title="Letters only, no spaces, numbers or special characters."/>
          </fieldset>
        </div>
        <p class="input-hint">Letters only, no spaces, numbers or special characters.</p>
        <button type="submit" id="submit_text_btn">calculate</button>
        <button class="reset_btn"></button>
        <p class="output_txt"></p>
      </form>
      <!-- CSV Form -->
      <form onsubmit="return false" class="form_CSV  hide">
          <label for="input_file">Upload CSV file:</label>
          <input type="file" name="input_file" id="input_file" accept=".csv">
        <button type="submit" id="submit_CSV_btn">calculate</button>
        <button class="reset_btn"></button>
        <p class="output_CSV"></p>
      </form>
    </div>
  </div>
`
const checkbox = document.querySelector('input[type="checkbox"]'),
  forms = document.querySelectorAll('form'),
  first_name_input = document.querySelector('#first_name'),
  second_name_input = document.querySelector('#second_name'),
  output_para_txt = document.querySelector('.output_txt'),
  output_para_CSV = document.querySelector('.output_CSV'),
  reset_btns = document.querySelectorAll('.reset_btn'),
  formFile = document.querySelector('#input_file')

// change which form shows
checkbox.addEventListener('click', () => {
  forms.forEach((form) => {
    form.classList.toggle('hide')
  })
})

function ResetBtn() {
  reset_btns.forEach((btn) => {
    btn.innerHTML = 'reset'
    btn.addEventListener('click', () => {
      location.reload()
    })
  })
}

// form for text input
document.querySelector('.form_text').addEventListener('submit', () => {
  const first_name_txt = first_name_input.value,
    second_name_txt = second_name_input.value

  let sentence = `${first_name_txt} matches ${second_name_txt}`

  GoodMatch(sentence, output_para_txt)
  ResetBtn()
})

// form for CSV file upload
document.querySelector('.form_CSV').addEventListener('submit', () => {
  HandleCSV(formFile, output_para_CSV, GoodMatch)
  ResetBtn()
})
