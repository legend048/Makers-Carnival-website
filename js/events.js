// document.addEventListener("DOMContentLoaded", function () {
//   function initTimeline(timelineId) {
//     var timeline = document.getElementById(timelineId);
//     var items = timeline.querySelectorAll(".timeline-item");
//     var activeClass = "timeline-item--active";
//     var backgroundImageElement = timeline;

//     // Set the initial background image and active item
//     items[0].classList.add(activeClass);
//     backgroundImageElement.style.backgroundImage =
//       "url('" +
//       items[0].querySelector(".timeline__img").getAttribute("src") +
//       "')";

//     // Options for the IntersectionObserver
//     var options = {
//       root: null, // Use the viewport as the root
//       rootMargin: "0px",
//       threshold: 0.7,
//     };

//     // Create the IntersectionObserver
//     var observer = new IntersectionObserver(function (entries) {
//       entries.forEach(function (entry) {
//         if (entry.isIntersecting) {
//           var index = Array.from(items).indexOf(entry.target);
//           var currentItem = items[index];

//           // Update active class
//           items.forEach(function (itm) {
//             itm.classList.remove(activeClass);
//           });
//           currentItem.classList.add(activeClass);
//           // Update background image
//           backgroundImageElement.style.backgroundImage =
//             "url(" +
//             JSON.stringify(
//               currentItem
//                 .querySelector(".timeline__img")
//                 .getAttribute("src")
//             ) +
//             ")";
//         }
//       });
//     }, options);

//     // Observe each timeline item
//     items.forEach(function (item) {
//       observer.observe(item);
//     });
//   }

//   // Initialize the timeline
//   initTimeline("timeline-1");
// });


document.addEventListener("DOMContentLoaded", function () {
  function initTimeline(timelineId) {
    const timeline = document.getElementById(timelineId);
    const items = timeline.querySelectorAll(".timeline-item");
    const activeClass = "timeline-item--active";
    const backgroundImageElement = timeline;

    // Set the initial background image and active item
    setInitialState(items, backgroundImageElement, activeClass);

    // IntersectionObserver configuration
    const observerOptions = {
      root: null, // Use the viewport as the root
      rootMargin: "0px",
      threshold: 0.8,
    };

    // Create the observer
    const observer = new IntersectionObserver(
      handleIntersect,
      observerOptions
    );

    // Observe each timeline item
    items.forEach((item) => observer.observe(item));

    // Handle intersection events
    function handleIntersect(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateActiveItem(
            entry.target,
            items,
            backgroundImageElement,
            activeClass
          );
        }
      });
    }
  }

  // Set the initial state
  function setInitialState(items, backgroundImageElement, activeClass) {
    items[0].classList.add(activeClass);
    setBackgroundImage(backgroundImageElement, items[0]);
  }

  // Update the active timeline item
  function updateActiveItem(
    currentItem,
    items,
    backgroundImageElement,
    activeClass
  ) {
    items.forEach((item) => item.classList.remove(activeClass));
    currentItem.classList.add(activeClass);
    setBackgroundImage(backgroundImageElement, currentItem);
  }

  // Set background image for the timeline container
  function setBackgroundImage(element, item) {
    const imageUrl = JSON.stringify(
      item.querySelector(".timeline__img").getAttribute("src")
    );
    element.style.backgroundImage = "url(" + imageUrl + ")";
  }

  // Initialize the timeline
  initTimeline("timeline-1");
});

//   document.addEventListener("DOMContentLoaded", function () {
//     function initTimeline(timelineId) {
//       const timeline = document.getElementById(timelineId);
//       const items = timeline.querySelectorAll(".timeline-item");
//       const activeClass = "timeline-item--active";
//       const backgroundImageElement = timeline;

//       // Set the initial background image and active items
//       setInitialState(items, backgroundImageElement, activeClass);

//       // IntersectionObserver configuration
//       const observerOptions = {
//         root: null, // Use the viewport as the root
//         rootMargin: "0px",
//         threshold: 0.8, // Trigger when 70% of the item is visible
//       };

//       // Create the observer
//       const observer = new IntersectionObserver(handleIntersect, observerOptions);

//       // Observe each timeline item
//       items.forEach((item) => observer.observe(item));

//       // Handle intersection events
//       function handleIntersect(entries) {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             // Add active class to all intersecting items
//             entry.target.classList.add(activeClass);
//             // Update the background image for all active items
//             setBackgroundImage(backgroundImageElement, entry.target);
//           } else {
//             // Remove active class if the item is not intersecting
//             entry.target.classList.remove(activeClass);
//           }
//         });
//       }
//     }

//     // Set the initial state
//     function setInitialState(items, backgroundImageElement, activeClass) {
//       items.forEach((item) => {
//         if (isElementInViewport(item)) {
//           item.classList.add(activeClass);
//           setBackgroundImage(backgroundImageElement, item);
//         }
//       });
//     }

//     // Update the background image for the timeline container
//     function setBackgroundImage(element, item) {
//       const imageUrl = JSON.stringify(item.querySelector(".timeline__img").getAttribute("src"));
//       element.style.backgroundImage = "url(" + imageUrl + ")";
//     }

//     // Utility function to check if an element is in the viewport
//     function isElementInViewport(el, threshold = 0.8) {
//       const rect = el.getBoundingClientRect();
//       const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
//       const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

//       // Calculate how much of the element is visible
//       const verticalVisible = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
//       const horizontalVisible = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
//       const elementArea = rect.height * rect.width;
//       const visibleArea = verticalVisible * horizontalVisible;

//       // Check if the visible area is above the threshold
//       return (visibleArea / elementArea) >= threshold;
//     }

//     // Initialize the timeline
//     initTimeline("timeline-1");
//   });