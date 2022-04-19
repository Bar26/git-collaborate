import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { storageService } from './services/storage.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onSearch = onSearch;

function onInit() {
    mapService.initMap()
        .then((map) => {
            map.addListener('click', (mapsMouseEvent) => {
                // console.log(mapsMouseEvent)
                const location = mapsMouseEvent.latLng.toJSON()
                const locationName = prompt('Location name')
                if (!locationName) return
                onAddMarker(location, locationName)

            })
        });
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

function onAddMarker(loc, name) {
    if (!name) {
        console.log('Adding a marker');
        mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
    }
    else {
        console.log(loc);
        mapService.addMarker({ lat: loc.lat, lng: loc.lng });
        locService.savePlace({ lat: loc.lat, lng: loc.lng }, name)
    }
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


function renderWheather(loc) {

}
renderLocations()
function renderLocations() {
    const locations = storageService.load('loc-DB')
    console.log(locations)
    let strHTML = ``
    if (locations) {
        locations.forEach(location => {
            strHTML += `<div class="location-item">
            <p class="name"> ${location.name}</p>
            <p>Created at: ${location.createdAt} </p>
            <p>Updated at: ${location.updatedAt}</p>
            <p>current weather is: ${location.weather}</p>
            </div>`
        })
        document.querySelector('.location-list-container').innerHTML = strHTML
    }
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

console.log(axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCm-AvgCqCVjjOlrmSLpkolgE7wdcAQ8HY').then(res => res.data))

function onSearch(ev) {
    ev.preventDefault()
    const address = document.querySelector('input').value
    locService.search(address)
}