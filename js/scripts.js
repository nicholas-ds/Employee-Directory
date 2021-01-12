// Variables
const $gallery = $('#gallery');

// Fetch request
// Pulls 12 random users using random user API
fetch('https://randomuser.me/api/?results=12&nat=us')
        .then(res => res.json())
        .then(data => employeeImport(data))


// Functions

/* Dynamically builds html using
** random user API data from above.
*/
function employeeImport(data) {


  $gallery.after('<div class="modal-container">');
    for (let i = 0; i < data.results.length; i++) {
      //Formats birthday for preferred readability.
      let birthday = data.results[i].dob.date.split('T')[0].split('-');
      birthday = `${birthday[1]}/${birthday[2]}/${birthday[0]}`

      $gallery.append('<div class="card"></div>');
      $('.card').eq(i).append('<div class="card-img-container">');
      $('.card-img-container').eq(i).append(`<img class="card-img" src='${data.results[i].picture.large}' alt="profile picture"></div>`);
      $('.card').eq(i).append('<div class="card-info-container">');
      $('.card-info-container').eq(i).append(`<h3 id="name" class="card-name cap">${data.results[i].name.first} ${data.results[i].name.last}</h3>`)
      $('.card-info-container').eq(i).append(`<p class="card-text">${data.results[i].email}</p>`)
      $('.card-info-container').eq(i).append(`<p class="card-text cap">${data.results[i].location.city}, ${data.results[i].location.state}</p></div>`)


      $('.modal-container').append('<div class="modal">');
      $('.modal').eq(i).append(`<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>`)
      $('.modal').eq(i).append(`<div class="modal-info-container">`);
      $('.modal-info-container').eq(i).append(`<img class="modal-img" src="${data.results[i].picture.large}" alt="profile picture">`)
      $('.modal-info-container').eq(i).append(`<h3 id="name" class="modal-name cap">${data.results[i].name.first} ${data.results[i].name.last}</h3>`)
      $('.modal-info-container').eq(i).append(`<p class="modal-text">${data.results[i].email}</p>`)
      $('.modal-info-container').eq(i).append(`<p class="modal-text cap"> Age: ${data.results[i].dob.age}</p>`)
      $('.modal-info-container').eq(i).append('<hr>')
      $('.modal-info-container').eq(i).append(`<p class="modal-text">${data.results[i].cell}</p>`)
      $('.modal-info-container').eq(i).append(`<p class="modal-text cap"> ${data.results[i].location.city}, ${data.results[i].location.state}</p>`)
      $('.modal-info-container').eq(i).append(`<p class="modal-text">Birdthday: ${birthday}</p>`)

    }
    $('.modal-container').hide();
    $('.modal').hide();

    /* Listens for users click.
    ** When specific employee card is clicked
    ** the correlating modal window is displayed.
    */
    $('.card').click(function(){
      for (let i = 0; i < $('.card').length; i++) {
        if ($(this)[0] === $('.card')[i]) {
          $('.modal-container').show();
          $('.modal').eq(i).show();
        }

    //Listens for user exiting out of modal window.
      $('.modal-close-btn').eq(i).click(function(){
        $('.modal-container').hide();
        $('.modal').hide();
      })
    }
  })
}
