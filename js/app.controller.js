import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;

function onInit() {
    mapService.initMap()
        .then((map)=>{
            map.addListener('click', (mapsMouseEvent) => {
                // console.log(mapsMouseEvent)
                const location = mapsMouseEvent.latLng.toJSON()
                const locationName = prompt('Location name')
                if (!locationName) return
            
                // addLocation(location, locationName)
                // placeMarkerAndPanTo(location, gMap)
                // renderFavoriteLocations()
              })
        });
        // .catch(() => console.log('Error: cannot init map'))
        // .then(()=>{
// 
        // })
    
        var map = mapService.getMap();
    console.log(map)
   
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}


// gMap.addListener('click', (mapsMouseEvent) => {
//     console.log(mapsMouseEvent)
//     const location = mapsMouseEvent.latLng.toJSON()
//     const locationName = prompt('Location name')
//     if (!locationName) return

//     // addLocation(location, locationName)
//     // placeMarkerAndPanTo(location, gMap)
//     // renderFavoriteLocations()
//   })