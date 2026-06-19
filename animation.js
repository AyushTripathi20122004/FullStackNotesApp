// CURSOR ANIMATION 
let cursor1= document.querySelector(".cursor1")
let cursor2= document.querySelector(".cursor2")
// let parent = document.querySelector('body');
window.addEventListener('mousemove',(e)=>{
    
    gsap.to(cursor1, {
        x: e.x,
        y: e.y
    });
    gsap.to(cursor2, {
        x: e.x,
        y: e.y,
        duration:1
    });
}
);



/// Initialize Lenis
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


// animation
const tl=gsap.timeline();

tl.from('.logo',{
    y:50,
    filter:'blur(10px)',
    opacity:0,
    ease:'back-out(0.2)'
})
tl.from('.searchbar',{
    y:50,
    filter:'blur(10px)',
    opacity:0,
    ease:'back-out(0.2)'
})
tl.from('.menubtn',{
    y:50,
    filter:'blur(10px)',
    opacity:0,
    ease:'back.out(0.2)'
    
})

gsap.from('.CreateButton',{
    filter:'blur(10px)',
    opacity:0,
    duration:1,
    ease:'back.out(0.8)'
})