const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

document.querySelector(".Automation");
document.querySelector(".Automation").onmouseover = event => {  
  let iteration = 0;
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return event.target.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");
    
    if(iteration >= event.target.dataset.value.length){ 
      clearInterval(interval);
    }
    
    iteration += 1 / 3;
  }, 30);
}

const mask = document.querySelector('.mask');

document.addEventListener('pointermove', (pos) => {
    let x = parseInt(pos.clientX / window.innerWidth * 100);
    let y = parseInt(pos.clientY / window.innerHeight * 100);

    mask.style.setProperty('--mouse-x', x + '%');
    mask.style.setProperty('--mouse-y', y + '%'); 
});

(function () {
    function FlipClock(el, config) {
      var _this = this;
      var updateTimeout;
      _this.el = el;
      _this.config = Object.assign({
        endDate: new Date((new Date().getFullYear() + 1),0,0),
        labels: {
          days: 'Days',
          hours: 'Hours',
          minutes: 'Minutes',
          seconds: 'Seconds'
        }
      }, config);
  
      _this.current = {
        d: "000",
        h: "00",
        m: "00",
        s: "00"
      };
  
      createView();
      updateView();
      addObserver();
   
      function start() {
        _this.current = getTimeUntil(config.endDate.getTime(), new Date().getTime());
        updateView();
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(start, 500);
      }
  
      function stop() {
        clearTimeout(updateTimeout);
      }
  
      function destroy() {
        stop();
        _this.observer.disconnect();
        _this.el.innerHTML = "";
      }
  
      function getTimeUntil(dateFuture, dateNow) {
        var delta = Math.abs(dateFuture - dateNow) / 1000;
        var d = Math.floor(delta / 86400);
        delta -= d * 86400;
        var h = Math.floor(delta / 3600) % 24;
        delta -= h * 3600;
        var m = Math.floor(delta / 60) % 60;
        delta -= m * 60;
        var s = Math.floor(delta % 60);
   
        d = pad3(d);
        h = pad2(h);
        m = pad2(m);
        s = pad2(s);
  
        return {
          d: d + "",
          h: h + "",
          m: m + "",
          s: s + ""
        };
      }
  
      // Assumes a non-negative number.
      function pad2(number) {
        if (number < 10) return "0" + number;
        else return "" + number;
      }
  
      function pad3(number) {
        if (number < 10) return "00" + number;
        else if (number < 100) return "0" + number;
        else return "" + number;
      }
  
      function createView() {
        _this.daysLeaf = createLeaf(_this.config.labels.days, 3);
        _this.hoursLeaf = createLeaf(_this.config.labels.hours);
        _this.minutesLeaf = createLeaf(_this.config.labels.minutes);
        _this.secondsLeaf = createLeaf(_this.config.labels.seconds);
      }
  
      function createLeaf(label, digits) {
        var leaf = document.createElement("div");
        leaf.className = "leaf _" + (digits ? digits : "2") + "-digits";
        leaf.setAttribute("data-label", label);
        var top = document.createElement("div");
        var topLabel = document.createElement("span");
        top.className = "top";
        top.appendChild(topLabel);
        var frontLeaf = document.createElement("div");
        var frontLabel = document.createElement("span");
        frontLeaf.className = "leaf-front";
        frontLeaf.appendChild(frontLabel);
        var backLeaf = document.createElement("div");
        var backLabel = document.createElement("span");
        backLeaf.className = "leaf-back";
        backLeaf.appendChild(backLabel);
        var bottom = document.createElement("div");
        var bottomLabel = document.createElement("span");
        bottom.className = "bottom";
        bottom.appendChild(bottomLabel);
  
        leaf.appendChild(top);
        leaf.appendChild(frontLeaf);
        leaf.appendChild(backLeaf);
        leaf.appendChild(bottom);
  
        _this.el.appendChild(leaf);
  
        return {
          el: leaf,
          topLabel: topLabel,
          frontLabel: frontLabel,
          backLabel: backLabel,
          bottomLabel: bottomLabel
        };
      }
  
      function updateView() {
        updateLeaf(_this.daysLeaf, _this.current.d);
        updateLeaf(_this.hoursLeaf, _this.current.h);
        updateLeaf(_this.minutesLeaf, _this.current.m);
        updateLeaf(_this.secondsLeaf, _this.current.s);
      }
  
      function updateLeaf(leaf, value) {
        if (leaf.isFlipping) return;
  
        var currentValue = leaf.topLabel.innerText;
        if (value !== currentValue) {
          leaf.isFlipping = true;
          leaf.topLabel.innerText = value;
          leaf.backLabel.innerText = value;
          leaf.el.classList.add("flip");
  
          clearTimeout(leaf.timeout);
          leaf.timeout = setTimeout(function () {
            leaf.frontLabel.innerText = value;
            leaf.bottomLabel.innerText = value;
            leaf.el.classList.remove("flip");
          }, 600);
  
          clearTimeout(leaf.timeout2);
          leaf.timeout2 = setTimeout(function () {
            leaf.isFlipping = false;
          }, 1000);
        }
      }
  
      function addObserver() {
        _this.observer = new IntersectionObserver(function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              start();
            } else {
              stop();
            }
          });
        });
  
        _this.observer.observe(_this.el);
      }
  
      return {
        start: start,
        stop: stop,
        destroy: destroy,
        getCurrent: function () {
          return _this.current;
        }
      };
    }

    var currentDate = new Date();
    var endDate = new Date();
    endDate.setDate(currentDate.getDate() + 30);
    new FlipClock(document.getElementById('flipclock-1'), {
      endDate:endDate,
      labels: {
          days: 'Days',
          hours: 'Hours',
          minutes: 'Minutes',
          seconds: 'Seconds'
      }
    });  
  })();
  