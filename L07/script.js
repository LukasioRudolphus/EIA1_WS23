// Text als Variable gespeichert
let textStart = "Es ist Dezember, und im Schwarzwald bedeutet das tiefster Winter. Der Schnee liegt schon 30 cm hoch. Du willst mit dem Auto nach Furtwangen fahren, dafür hast du 2 Straßen zur Auswahl, entweder die Talstraße, oder die Bergstraße. Welche nimmst du? (1 oder 2?)"; 
let textTalstr = "Du fährst guter Dinge los. Doch nachdem du ein Stück gefahren bist, siehst du einen Minibuss vor dir auf der Fahrbahn. Er scheint im Schnee stecken geblieben zu sein. Hältst du an oder fährst du an ihm vorbei? (1 oder 2?)";
let textBergstr = "Heute hast du Lust auf einen schönen Ausblick, also beschließt du, die Bergstraße zu nehmen. Auf halber Strecke bemerkst du, dass sich der Himmel zugezogen hat. Kurz darauf fängt es dann auch an zu schneien. Es dauert nich lange, und du kannst keine 5m mehr weit sehen. Hältst du an und wartest bis es besser wird, oder vertraust du auf dein Gedächtnis und fährst weiter? (1 oder 2?)";
let textTalAn = "Du hältst an und steigst aus, um deine Hilfe anzubieten. Die Fenster vom Wagen sind zugefroren, und du kannst nur einen dunklen Schemen im Inneren erkennen. Während du noch versuchst genaueres zu erkennen, hörst du hinter dir den schnee knirschen. Doch bevor du dich umdrehen kannst, trifft dich irgendetwas am Kopf, und dir wird schwarz vor Augen.";
let textTalWei = "Du denkst, dass du da auch nicht helfen kannst. Und sowieso, das ist ein Problem für Profis. Wenig später hast du den Wagen auch schon wieder vergessen, und kommst wohl erhalten in Furtwangen an.";
let textBergAn = "Du beschließt anzuhalten, und abzuwarten. Es dauert zwar 2 Stunden, aber dann beginnt sich das Schneetreiben zu lichten. Nach einer weiteren halben Stunde hört es ganz auf, und du machst dich daran, das Auto freizuräumen. Anschließend machst du dich wieder auf den Weg, und kommst ohne weitere Probleme in Furtwangen an.";
let textBergWei = "Du fährst weiter, aber leider ist dein Gedächtnis nicht so gut wie du dachtest. Die Kurve 100m weiter hattest du vergessen, und prompt stürzt du mit dem Wagen in die Tiefe.";
let textWin = "You Win";
let textDie = "You Died";


let textArray = [textStart, textTalstr, textTalAn, textTalWei, textBergstr, textBergAn, textBergWei];
let wdArray = [textWin, textDie];
// andere Variablen
// let count = 0;
// let Zahl = 0;
// let Straße;

let entscheidung = prompt(textArray[0]);
let duMagstZahlen;
let ichMagZahlen;
let win;

if(entscheidung == "1"){
    duMagstZahlen = nichtMehrKompliziert(textArray[1]);
} else if(entscheidung =="2") {
    ichMagZahlen = nichtMehrKompliziert(textArray[4]);
} else {
    alert("Keine gültge Eingabe");
    reStart();
}

if(duMagstZahlen == "1"){
    duMagstZahlen = mehrKompliziert(textArray[2]);
    mehrKompliziert(wdArray[1]);
} else if(duMagstZahlen =="2") {
    duMagstZahlen = mehrKompliziert(textArray[3]);
    mehrKompliziert(wdArray[0]);
} else if((entscheidung == "1") && (duMagstZahlen != "1" || duMagstZahlen != "2")){
    alert("Keine gültge Eingabe");
    reStart();
}

if(ichMagZahlen == "1"){
    ichMagZahlen = mehrKompliziert(textArray[5]);
    mehrKompliziert(wdArray[0]);
} else if(ichMagZahlen =="2") {
    ichMagZahlen = mehrKompliziert(textArray[6]);
    mehrKompliziert(wdArray[1]);
} else if((entscheidung == "2") && (ichMagZahlen != "1" || ichMagZahlen != "2")){
    alert("Keine gültge Eingabe");
    reStart();
}

function nichtMehrKompliziert(geschichte){
    return prompt(geschichte);
} 

function mehrKompliziert(geschichte){
    return alert(geschichte);
} 

function reStart() {
    window.location.reload();
}



// Array zur Textauswahl


// // Funktion, die die Story ausgibt 
// function Wahl(Straße = prompt(TextArray[count])){
//     // Überprüfung, ob Weg 1 oder Weg 2
//     if (count == 0 && Straße == "2") {
//         count = 2;
//     }

//     // Auswahl in Zahlen übersetzen
//     if (Straße == "1"){
//         Zahl = 1;
//     } else if (Straße == "2"){
//         Zahl = 2;
//     }

//     //Fortschreiten der Story
//     count = count + Zahl;
//     return count, Straße;
// }


// // Damit zum richtigen Zeitpunkt Ende ist
// // if (count == 0 || Straße == "1" || Straße == "2") {
// //     console.log("ja");
// //     for (let i = 0; i < 3; i++) {
// //         Wahl();
// //     }
// // } else {
// //     alert("Keine gültge Eingabe");
// //     count = 0;
// // }

// for (let i = 0; i < 3; i) {
//     if (count == 0 || Straße == "1" || Straße == "2") {
//         console.log(i);
//         console.log(Straße);
//         console.log(count);
//         Wahl();
//         i++;
//     } else {
//         alert("Keine gültge Eingabe");
//         count = 0;
//         i = 0;
//     }
// }

// let entscheidung = "1";
// let duMagstZahlen = "2";

// if((entscheidung == "1" || entscheidung == "2") && (duMagstZahlen == "1" || duMagstZahlen == "2")){
//     alert("Hi");
// }
