let textTalstr = "Du fährst guter Dinge los. Doch nachdem du ein Stück gefahren bist, siehst du einen Minibuss vor dir auf der Fahrbahn. Er scheint im Schnee stecken geblieben zu sein. Hältst du an oder fährst du an ihm vorbei? (1 oder 2?)";
let textBergstr = "Heute hast du Lust auf einen schönen Ausblick, also beschließt du, die Bergstraße zu nehmen. Auf halber Strecke bemerkst du, dass sich der Himmel zugezogen hat. Kurz darauf fängt es dann auch an zu schneien. Es dauert nich lange, und du kannst keine 5m mehr weit sehen. Hältst du an und wartest bis es besser wird, oder vertraust du auf dein Gedächtnis und fährst weiter? (1 oder 2?)";
let textTalAn = "Du hältst an und steigst aus, um deine Hilfe anzubieten. Die Fenster vom Wagen sind zugefroren, und du kannst nur einen dunklen Schemen im Inneren erkennen. Während du noch versuchst genaueres zu erkennen, hörst du hinter dir den schnee knirschen. Doch bevor du dich umdrehen kannst, trifft dich irgendetwas am Kopf, und dir wird schwarz vor Augen.";
let textTalWei = "Du denkst, dass du da auch nicht helfen kannst. Und sowieso, das ist ein Problem für Profis. Wenig später hast du den Wagen auch schon wieder vergessen, und kommst wohl erhalten in Furtwangen an.";
let textBergAn = "Du beschließt anzuhalten, und abzuwarten. Es dauert zwar 2 Stunden, aber dann beginnt sich das Schneetreiben zu lichten. Nach einer weiteren halben Stunde hört es ganz auf, und du machst dich daran, das Auto freizuräumen. Anschließend machst du dich wieder auf den Weg, und kommst ohne weitere Probleme in Furtwangen an.";
let textBergWei = "Du fährst weiter, aber leider ist dein Gedächtnis nicht so gut wie du dachtest. Die Kurve 100m weiter hattest du vergessen, und prompt stürzt du mit dem Wagen in die Tiefe.";

let arrayTal = [textTalstr, textTalAn, textTalWei];
let arrayBerg = [textBergstr, textBergAn, textBergWei];


let textbox = document.getElementById(".textBig");
const input = document.querySelector(".textSmall")

let zahl = 0;




input.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        if (input.value == "1" && zahl == 0) {
            zahl = 1;
            input.value = "";
            textBig.innerHTML = arrayTal[0];
            weiter();
        } else if (input.value == "2" && zahl == 0) {
            zahl = 2;
            input.value = "";
            textBig.innerHTML = arrayBerg[0];
            weiterTeil();
        } else {
            console.log("Sad");
        }
    }
})



function weiter() {
    console.log(zahl);
    input.addEventListener("keydown", function (event) {
        if (event.key == "Enter") {
            if (input.value == "3" && zahl == 1) {
                textBig.innerHTML = arrayTal[1];
                zahl = 3;
                input.value = "";
                weiter();
            } else if (input.value == "4" && zahl == 1) {
                textBig.innerHTML = arrayTal[2];
                zahl = 3;
                input.value = "";
                weiter();
            } else {
                console.log("AH");
            }
        }
    })
}



function weiterTeil() {
    console.log(zahl);
    input.addEventListener("keydown", function (event) {
        if (event.key == "Enter") {
            if (input.value == "3" && zahl == 2) {
                textBig.innerHTML = arrayBerg[1];
                zahl = 3;
                input.value = "";
                weiterTeil();
            } else if (input.value == "4" && zahl == 2) {
                textBig.innerHTML = arrayBerg[2];
                zahl = 3;
                input.value = "";
                weiterTeil();
            } else {
                console.log("AH");
            }
        }
    })
}




// function weiterTeil() {
//     console.log(zahl);
//     textBig.innerHTML = arrayBerg[0];
//     if (zahl == 2) {
//         if (input.value == "1") {
//             console.log("ich bin nötig")
//             textBig.innerHTML = arrayBerg[1];
//         } else if (input.value == "2") {
//             textBig.innerHTML = arrayBerg[2];
//         }
//     }
// }


