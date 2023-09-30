const btn = document.getElementById("btn");
const flowers = document.getElementById("flowers");

btn.addEventListener("click", function() {
    
     btn.style.display = "none";
     document.querySelector("h1").style.display = "none";
     
     flowers.style.display = "flex";
     
     const angles = [0, 45, 90, 135, 180, 225, 270, 315];
     
     let time = 0;

     let area = 0;

     let totalArea = window.innerWidth * window.innerHeight;

     let radius = Math.max(20 + 30, 40 / Math.sqrt(2));

     let positions = [];

     function random(min, max) {
         return Math.floor(Math.random() * (max - min + 1)) + min;
     }

     function overlap(x1, y1, x2, y2) {
         let distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
         return distance < radius * 2;
     }

     function generatePosition() {
         let x = random(radius, window.innerWidth - radius * 2);
         let y = random(radius, window.innerHeight - radius * 2);
         let valid = true;
         for (let i = 0; i < positions.length; i++) {
             if (overlap(x, y, positions[i].x, positions[i].y)) {
                 valid = false;
                 break;
             }
         }
         if (valid) {
             positions.push({x, y});
             return {x, y};
         } else {
             return generatePosition();
         }
     }

     while (area < totalArea * 0.2) {
         
         let position = generatePosition();
         
         const flower = document.createElement("div");
         
         flower.classList.add("flower");
         
         flower.style.left = position.x + "px";
         flower.style.top = position.y + "px";
         
         for (let j = 0; j < angles.length; j++) {
             
             const petal = document.createElement("div");
             
             petal.classList.add("petal");
             
             petal.style.transform = `rotate(${angles[j]}deg)`;
             
             flower.appendChild(petal);

             gsap.from(petal, {
                duration: 1,
                scale: 0,
                delay: time,
                ease: "elastic"
            });

            time += 1;
         }

          const center = document.createElement("div");
          
          center.classList.add("center");
          
          flower.appendChild(center);

          gsap.from(center, {
              duration: 0.5,
              scale: 0,
              delay: time - 0.5,
              ease: "back"
          });
         
         flowers.appendChild(flower);
         
         area += Math.PI * radius ** 2;
     }
});
