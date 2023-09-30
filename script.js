const btn = document.getElementById("btn");
const flowers = document.getElementById("flowers");
const container = document.querySelector(".container");

const audio = document.getElementById("audio");
audio.volume = 0.15;

btn.addEventListener("click", function () {

    const initialTotalArea = window.innerWidth * window.innerHeight;

    audio.play();

    btn.style.display = "none";
    document.querySelector("h1").style.display = "none";

    flowers.style.display = "flex";

    const angles = [0, 45, 90, 135, 180, 225, 270, 315];

    let time = 0;

    let area = 0;

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
            positions.push({ x, y });
            return { x, y };
        } else {
            return generatePosition();
        }
    }

    while (area < initialTotalArea * 0.1) {

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
    
            // Asignar el valor actual del porcentaje del área ocupada por las flores
            let percentage = area / initialTotalArea;
    
            // Si el porcentaje es igual o mayor que 0.05, ejecutar la función clearContent
            if (percentage >= 0.1) {
                clearContent();
            }
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
    

    function clearContent() {

        btn.style.display = "none";

        flowers.style.display = "none";

        document.querySelector("h1").style.display = "none";

        const message = document.createElement("h2");

        message.classList.add("message");

        message.textContent = "Te amo mucho";

        container.appendChild(message);

        const tlMessage = gsap.timeline();

        tlMessage.to(message, {
            duration: 5,
            scale: 10,
            ease: "power4"
        });

        tlMessage.to(message, {
            duration: 3,
            y: -window.innerHeight / 4,
            ease: "back"
        }, "-=3");
        const heart = document.getElementById("heart");
        heart.style.display = "block";

        container.appendChild(heart);

        const tlHeart = gsap.timeline();

        tlHeart.from(heart, {
            duration: 1,
            scale: 0,
            ease: "back"
        });

        tlHeart.to(heart, {
            duration: 2,
            y: 170,
            yoyo: true,
            repeat: -1,
            ease: "bounce"
        }, "-=0.5");


    }
    setTimeout(clearContent,47000);
});
