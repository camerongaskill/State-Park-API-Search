/* eslint-disable quotes */
/* eslint-disable indent */
function apiUrl(parkVal, limit = 10) {
	const api_key = "ic2r9DyElrPplpnPqxEvfSnb1KbjkMbwUm2GdNSo";
	const baseUrl = "https://developer.nps.gov/api/v1/parks";

	let newParkVal = "";
	for (let i = 0; i < parkVal.length; i++) {
		newParkVal += `${parkVal[i].trim()}`;
	}
	let completeUrl = `${baseUrl}?stateCode=${newParkVal}&limit=${limit}&api_key=${api_key}`;
	fetch(completeUrl)
		.then((response) => {
			return response.json();
		})
		.then((responseJson) => displayResults(responseJson));
}

function parkSearch() {
	$("#submitBtn").click(function (event) {
		event.preventDefault();
		let parkVal = $("#stateEntry").val();
		let limit = $("#maxResults").val();
		if (limit === undefined) {
			limit = 10;
		}
		apiUrl(parkVal, limit);
	});
}

function displayResults(json) {
	$("#results").empty();
	let list = [];
	for (let i = 0; i < json.data.length; i++) {
		list.push(
			`<li>
                <h3><a href="${json.data[i].url}" target="_blank">${json.data[i].fullName}</a></h3>
                <p>${json.data[i].description}</p>
                <p>${json.data[i].addresses[0].line1}, ${json.data[i].addresses[0].city}, ${json.data[i].addresses[0].stateCode}, ${json.data[i].addresses[0].postalCode}</p>
            </li>`
		);
	}
	$("#results").append(list);
}

function main() {
	parkSearch();
}

$(main);
