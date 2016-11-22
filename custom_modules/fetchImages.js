import axios from "axios";
import has from "lodash/has";
import "es6-promise/auto";

export default function fetchImages ( sortColumn="id", page, callback ) {

	var limit = 30;
	var root = "https://jsonplaceholder.typicode.com/";
	var query = `${root}photos?_page=${page}&_limit=${limit}&_sort=${sortColumn}`;

	axios.get( query )
		.then(( response ) => {

			var endReached = response.data.length < limit;
			callback( response.data, endReached );

		})
		.catch(( error ) => {

			console.log( error );

		});

}
