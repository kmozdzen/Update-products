fetch('https://sklep5534602.homesklep.pl/upload/projektory.json')
.then(response => {
if (!response.ok) {
  throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
    console.log(data);
})
.catch(error => {
console.error('Błąd podczas pobierania danych:', error);
});