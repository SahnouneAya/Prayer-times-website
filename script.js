let cities = [
    {
        arabicName:" باتنة",
        name:"Batna"
    },
    {
        arabicName:"وهران",
        name: "Oran"
    },
    {
        arabicName:"أدرار",
        name:"Adrar"
    },
    {
        arabicName:"بليدة",
        name:"Blida"
    }
]

for (let city of cities){
    const content = `
    <option >${city.arabicName}</option>
    `
    document.getElementById('select').innerHTML+=content;
}

document.getElementById('select').addEventListener('change',function(){
    document.getElementById("city-name").innerHTML=this.value;
    console.log("changed");
    let cityName = "";
    for(let city of cities){
        if(city.arabicName = this.value){
            cityName=city.name;
        }
    }
    getPrayersTimingOfCity(cityName);
})


function getPrayersTimingOfCity(cityName){

    let params = {
    country:"DZ",
    city:cityName
    }
    axios.get("http://api.aladhan.com/v1/timingsByCity", {
    params:params
    })
    .then((response)=>{
    let timings=response.data.data.timings;
    fillTimeForPrayer("fajr",timings.Fajr);
    fillTimeForPrayer("sunrise",timings.Sunrise);
    fillTimeForPrayer("dhuhr",timings.Dhuhr);
    fillTimeForPrayer("asr",timings.Asr);
    fillTimeForPrayer("sunset",timings.Sunset);
    fillTimeForPrayer("isha",timings.Isha);

    const readableDate = response.data.data.date.readable;
    const weekDay = response.data.data.date.hijri.weekday.ar;

    const date = weekDay +" "+ readableDate;
    document.getElementById('date').innerHTML=date;

    })
    .catch((error)=>{
        console.log("error :"+error);
    })
}

function fillTimeForPrayer(id, time){
    document.getElementById(id).innerHTML=time;
}