import { storageService } from './storage.service.js'

export const locService = {
    getLocs,
    savePlace
}

const KEY_LOC = 'loc-DB'
var gFavLocs = [];
const API_KEY = '00e3dc7cf22ac9682c5d987367707ca3'
const gTempConvertor = 272.15;


const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function savePlace(loc, name) {
    var mark = {
        loc: {
            lat: loc.lat,
            lng: loc.lng,
        },
        createdAt: getDate(),
        updatedAt: getDate(),
        name,
        id: gFavLocs.length
    }
    getWheater(loc)
     .then(res=>{
        mark.weather=res;
    })
    gFavLocs.push(mark);
    storageService.save(KEY_LOC, gFavLocs)
}

// function createLoc(lat lng,name,){

// }

function getWheater(loc) {
    var currTemp
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lng}&APPID=${API_KEY}`)
        .then(res => res.data.main)
        .then(main => {
            currTemp = main.temp - gTempConvertor;
            return currTemp;
        })
}

function getDate() {
    let current = new Date();
    let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    let dateTime = cDate + ' ' + cTime;
    // console.log(dateTime);
    return dateTime;
}