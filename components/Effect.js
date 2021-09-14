let colorCheckTimeout
let prevRunColor1 = "#f54642bf"
let prevRunColor2 = "#08539cbf"

function Effect(instensity,imageDistance,imageAngle,isBackground,color1,color2){
  //Items
  const card = document.getElementById("card-id")
  const container = document.getElementById("effect-container-id")
  const product = document.getElementById("product-img-id") 
  const circle = document.getElementById("circle-id") 
  
  // consts to calculate card center
  const cardDistanceToTop = card.getBoundingClientRect().top
  const scrollPassed = window.pageYOffset
  const cardHeight = card.getBoundingClientRect().height
  const cardWidth = card.getBoundingClientRect().width
  const cardDistanceToRight = card.getBoundingClientRect().left

  // Caculates card Center
  const cardCenterY = cardDistanceToTop + scrollPassed + cardHeight / 2
  const cardCenterX = cardDistanceToRight + cardWidth / 2
  
  //Moving Animation Event
  container.addEventListener("mousemove", (e) => {
    let xAxis = -(cardCenterX - e.pageX) / 500 * instensity;
    let yAxis = (cardCenterY - e.pageY) / 500 * instensity;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;

  });

  //Animate In
  container.addEventListener("mouseenter", (e) => {
    card.style.transition = "none";
    //Popout
    product.style.transform = `translateZ(${imageDistance}px) rotateZ(${imageAngle}deg)`;
  });
  
  //Animate Out
  container.addEventListener("mouseleave", (e) => {
    card.style.transition = "all 0.5s ease";
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    //Popback
    product.style.transform = "translateZ(0px) rotateZ(0deg)";
  });

  //toggle background
  if (isBackground){
    circle.style.display = "unset"
  } else {
    circle.style.display = "none"
  }
  
  //Change circle color
  if (isColorChanged()){
    product.style.opacity = 0.1
    returnOpacityAfterDelay()
  }
  circle.style.background = `linear-gradient( to right,${color1},${color2})`

  // Functions
  function isColorChanged(){
    if (prevRunColor1!==color1 || prevRunColor2!==color2){
      prevRunColor1 = color1
      prevRunColor2 = color2
      return true
    }
    return false
  }

  function returnOpacityAfterDelay(time=1000){
    clearTimeout(colorCheckTimeout)
    colorCheckTimeout = setTimeout(() => {
      product.style.opacity = 1
    }, time);
  }
  
  // window.addEventListener('deviceorientation', function(e) {
  //   console.log("test")
  //   let xAxis = (e.gamma) ;
  //   let yAxis = (e.beta - 90) ;
  //   card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  //   // console.log(e)
  // });
}

export default Effect