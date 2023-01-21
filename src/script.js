// var articleEl = document.querySelector(".general-article");

var els = document.getElementsByClassName("article-block");
var bodyEl = document.querySelector("body");

// var deg = 0;
// setInterval(() => {
//   foreachElement(els, (el) => {
//     el.style.setProperty("--deg", `${deg}deg`);
//   });
//   deg += 1;
// }, 20);

window.requestAnimationFrame(() => {});

function foreachElement(els, func) {
  for (let i = 0; i < els.length; i++) {
    const el = els[i];
    func(el);
  }
}

foreachElement(els, (el) => {
  el.focus();
});

let constrain = 100;

function transforms(x, y, el) {
  let box = el.getBoundingClientRect();
  let calcX = -(y - box.y - box.height / 2) / constrain;
  let calcY = (x - box.x - box.width / 2) / constrain;

  return `rotateX(${calcX}deg) rotateY(${calcY}deg) `;
}

function transformElement(el, xyEl) {
  el.style.transform = transforms.apply(null, xyEl);
}

foreachElement(els, (el) => {
  el.onmousemove = function (e) {
    let xy = [e.clientX, e.clientY];
    let position = xy.concat([el]);

    window.requestAnimationFrame(function () {
      transformElement(el, position);
    });
  };

  el.onmouseleave = function (e) {
    window.requestAnimationFrame(function () {
      el.style.transform = ` rotateX(${0}deg)    rotateY(${0}deg) `;
    });
  };
});

// function waitForImage(imgElem) {
//   return new Promise((res) => {
//     if (imgElem.complete) {
//       return res();
//     }
//     imgElem.onload = () => res();
//     imgElem.onerror = () => res();
//   });
// }

// // test
// (async () => {
//   const imgs = document.querySelectorAll("img");
//   // to not to cache in the test, set src dynamically

//   imgs.forEach(async function (img) {
//     console.log("height before", img.naturalHeight); // 0
//     await waitForImage(img);
//     console.log("height after", img.naturalHeight); // 48
//   });
// })();
