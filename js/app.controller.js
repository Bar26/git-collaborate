import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { storageService } from './services/storage.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
<<<<<<< HEAD
window.onSearch = onSearch;
=======
window.onSearch = onSearch
>>>>>>> 9355389512cd99e8492383aae70968b50e03388f

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
<<<<<<< HEAD
    var map = mapService.getMap();
    console.log(map)
=======
    // var map = mapService.getMap();
    // console.log(map)
>>>>>>> 9355389512cd99e8492383aae70968b50e03388f

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
<<<<<<< HEAD
        console.log(loc);
        mapService.addMarker({ lat: loc.lat, lng: loc.lng });
        locService.savePlace({ lat: loc.lat, lng: loc.lng }, name)
=======
        var isLocInArr = false
        var arrLocs = locService.myGetLocs();
        console.log(arrLocs);
        arrLocs.forEach(loc => {
            if (name === loc.name) isLocInArr = true;
        })
        console.log(isLocInArr)
        if (!isLocInArr) {
            mapService.addMarker({ lat: loc.lat, lng: loc.lng });
            locService.savePlace({ lat: loc.lat, lng: loc.lng }, name)
        }
>>>>>>> 9355389512cd99e8492383aae70968b50e03388f
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
            mapService.setMap({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            onAddMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude }, 'Your Location')
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


function onSearch(ev) {
    ev.preventDefault()
    const address = document.querySelector('input').value
    locService.search(address)
        .then(res=>{
            var lat = res.results[0].geometry.location.lat();
            var lng = res.results[0].geometry.location.lng();
            return {lat:lat,lng:lng};
        })
        .then(res=>{
            mapService.setMap(res);
            onAddMarker(res,address)
        })
    // console.log(newLoc)
    // if (newLoc) mapService.setMap(newLoc)
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