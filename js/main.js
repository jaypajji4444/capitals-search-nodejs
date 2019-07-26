
const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
let states;

// Get states
const getStates = async () => {
 const res = await fetch('../data/states.json');
 states = await res.json();
};

// FIlter states
const searchStates = searchText => {  //serach text has search.value since it is passes as parameter.......
 // Get matches to current text input
 let matches = states.filter(state => {
  const regex = new RegExp(`^${searchText}`, 'gi'); // ^=> test aftr this sy,bol will be searched
  return state.name.match(regex) || state.abbr.match(regex);  // return matching states array
 });

 // Clear when input or matches are empty
 if (searchText.length === 0) {
  matches = [];
  matchList.innerHTML = '';
 }

 outputHtml(matches);
};

// Show results in HTML
const outputHtml = matches => {
 if (matches.length > 0) {
  const html = matches
   .map(
    match => `<div class="card card-body mb-1">
    <h4>${match.name} (${match.abbr}) 
    <span class="text-primary">${match.capital}</span></h4>
    <small>Lat: ${match.lat} / Long: ${match.long}</small>
   </div>`
   )
   .join('');
  matchList.innerHTML = html;
 }
};

window.addEventListener('DOMContentLoaded', getStates);
search.addEventListener('input', () => searchStates(search.value));