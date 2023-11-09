var tl = gsap.timeline();

tl.from(".loader",{
    opacity: 0,
    scale:0,
    duration:1,
});
tl.from(".loader img",{
    x:-400,
    opacity:0,
    y:-400,
    duration:3,
});
tl.to(".loader img",{
    x:400,
    y:400,
    duration:3,
    delay:-1
});
tl.to(".loader",{
    height:"-200vh",
    duration:1,
    opacity:0
});
tl.from(".container",{
    scale:0,
    opacity:0,
    duration:.3,
    delay:-1
});
const text = document.querySelector(".container h1");
text.innerHTML = text.textContent.replace(/./g, "<span>$&</span>");

const characters = text.querySelectorAll("span");

tl.from(characters, {
    opacity: 0,
    duration: 0.5,
    stagger: 0.2, 
});
tl.from(".container  button",{
    opacity:0,
    scale:0,
    duration:.3
})
function updateCurrentTime() {
    const currentTimeElement = document.getElementById("current-time");
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const currentDateTime = new Date().toLocaleDateString('en-US', options);
    
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' });
        currentTimeElement.textContent = currentDateTime + ' - ' + timeString;
    }
    updateTime();
    setInterval(updateTime, 1000);
}
updateCurrentTime();

function openGoogleMaps(latitude, longitude) {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, '_blank');
}

const searchButton = document.querySelector(".container button");
searchButton.addEventListener("click", () => {
    fetch("https://api.wheretheiss.at/v1/satellites/25544")
        .then((response) => response.json())
        .then((data) => {
            const latitude = data.latitude;
            const longitude = data.longitude;
            openGoogleMaps(latitude, longitude);
        })
        .catch((error) => {
            console.error("Error fetching ISS location:", error);
        });
});
