/* Register a simple service worker with caching */
if ('serviceWorker' in navigator){

	navigator.serviceWorker
	.register('./serviceworker.js', { 
		scope:'./'
	})
	.then(function(registration){
		console.log('Service worker is registered!', registration);
	})
	.catch(function(error){
		console.log('Service worker registration failed!', error);
	})
}