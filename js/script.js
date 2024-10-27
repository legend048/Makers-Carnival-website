// Put your js here or create a new file for it.



// events start


console.log("hello")

const t1 = gsap.timeline({
    scrollTrigger: {
        trigger: ".container ",
        start: "top 50%",
        end: "bottom 100%",
        scrub: 1,
    }
})


t1.from(".box",{
    x:10,
    stagger:0.2,
    opacity:0,
    

})


// events end


// intro


const t2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".sec2 ",
        start: "top 0",
        end: "bottom",
        scrub: 4,
        pin: true,
    }
})


t2.to(".m", {
    delay: 0,
    transform: "translatex(-200%)",

})

function leftt() {
    gsap.to(".m", {
        transform: "translatex(0%)",
        duration: 0.5,
        ease: "power2.out"
    });

}

function Rightt() {
    gsap.to(".m", {
        transform: "translatex(-200%)",
        duration: 0.5,
        ease: "power2.out"
    });
    console.log("right")

}

//  intro end