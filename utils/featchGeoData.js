let featchGeoData = async(location,country)=>{
    let Geodata = await fetch(`https://nominatim.openstreetmap.org/search?q=${location},${country}&format=json&limit=1`);
    Geodata = await Geodata.json();

    let lat=0; let lon = 0;
    if(Geodata.length){
       lat = Geodata[0].lat;
       lon = Geodata[0].lon;
    }

    return [lon,lat];
}

module.exports = featchGeoData;