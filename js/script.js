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