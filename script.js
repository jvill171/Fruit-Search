const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');
const mySuggestions = document.getElementsByClassName("has-suggestions")

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

//Results is populated with fruit, as long as not blank and a valid fruit is found
function search(str) {
	let results = [];
	results = fruit.filter(val => {
		if(str !== ''){
			return val.toLocaleLowerCase().includes(str)
		}
	});
	return results;
}

// Updates suggestions each key press
function searchHandler(e) {
	clearSuggestion();
	showSuggestions(search(input.value.toLowerCase()), input.value)
}

//List up to the first 5 valid suggestions
function showSuggestions(results, inputVal) {
	if(results != 0){
		input.style.borderRadius = "15px 15px 0 0";
		input.style.borderBottom = "";
	}
	else{
		input.style.borderRadius = "15px";
		input.style.borderBottom = "2px solid orangered";
	}
	results.every((val, idx) => {
		const newSTRONG = document.createElement("strong")
		const newLI = document.createElement("li");
		newLI.classList.add("has-suggestions")

		const stylized_suggestion = makeStrong(val, inputVal);

		newLI.append(stylized_suggestion[0])
		newSTRONG.innerText = stylized_suggestion[1]
		newLI.append(newSTRONG)
		newLI.append(stylized_suggestion[2])

		suggestions.append(newLI);
		return idx<4;
	})
}

// Makes input = clicked suggestion & clears the suggestions list upon a suggestion being clicked.
function useSuggestion(e) {
	input.value = e.target.innerText;
	clearSuggestion();
	
	input.style.borderRadius = "15px";
	input.style.borderBottom = "2px solid orangered";
	
}

//Clears the list of susggestions
function clearSuggestion(){
	Array.from(mySuggestions).forEach(val => val.remove())
}

// Returns an array of a sliced suggestion. The slices occur at the point where user input matches the suggestion
function makeStrong(fruitSuggestion, userInput){

	const startSlice = fruitSuggestion.toLowerCase().indexOf(input.value);
	const endSlice = startSlice + userInput.length;

	return [fruitSuggestion.slice(0,startSlice),
			fruitSuggestion.slice(startSlice, endSlice),
			fruitSuggestion.slice(endSlice, fruitSuggestion.length)]
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);

