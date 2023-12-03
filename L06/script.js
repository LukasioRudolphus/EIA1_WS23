// Szenenbeschreibung + erste Wahlmöglichkeit
let Straße = prompt("Es ist Dezember, und im Schwarzwald bedeutet das tiefster Winter. Der Schnee liegt schon 30 cm hoch. Du willst mit dem Auto nach Furtwangen fahren, dafür hast du 2 Straßen zur Auswahl, entweder die Talstraße, oder die Bergstraße. Welche nimmst du? (Talstraße oder Bergstraße?)");
let Tal;
let Berg;

// Auswirkungen erste Wahlmöglichkeit und zweite Wahlmöglichkeit
if (Straße=="Talstraße") {
    Tal = prompt("Du fährst guter Dinge los. Doch nachdem du ein Stück gefahren bist, siehst du einen Minibuss vor dir auf der Fahrbahn. Er scheint im Schnee stecken geblieben zu sein. Hältst du an oder fährst du an ihm vorbei? (Anhalten oder Weiterfahren?)");
} else if(Straße=="Bergstraße") {
    Berg = prompt("Heute hast du Lust auf einen schönen Ausblick, also beschließt du, die Bergstraße zu nehmen. Auf halber Strecke bemerkst du, dass sich der Himmel zugezogen hat. Kurz darauf fängt es dann auch an zu schneien. Es dauert nich lange, und du kannst keine 5m mehr weit sehen. Hältst du an und wartest bis es besser wird, oder vertraust du auf dein Gedächtnis und fährst weiter? (Anhalten oder Weiterfahren?)");
} else {
    alert("Keine gültge Eingabe");
}

// Ende
if (Tal=="Anhalten") {
    alert("Du hältst an und steigst aus, um deine Hilfe anzubieten. Die Fenster vom Wagen sind zugefroren, und du kannst nur einen dunklen Schemen im Inneren erkennen. Während du noch versuchst genaueres zu erkennen, hörst du hinter dir den schnee knirschen. Doch bevor du dich umdrehen kannst, trifft dich irgendetwas am Kopf, und dir wird schwarz vor Augen.");
    alert("You Died");
} else if (Tal=="Weiterfahren") {
    alert("Du denkst, dass du da auch nicht helfen kannst. Und sowieso, das ist ein Problem für Profis. Wenig später hast du den Wagen auch schon wieder vergessen, und kommst wohl erhalten in Furtwangen an.");
    alert("You Win");
} else if (Berg=="Anhalten") {
    alert("Du beschließt anzuhalten, und abzuwarten. Es dauert zwar 2 Stunden, aber dann beginnt sich das Schneetreiben zu lichten. Nach einer weiteren halben Stunde hört es ganz auf, und du machst dich daran, das Auto freizuräumen. Anschließend machst du dich wieder auf den Weg, und kommst ohne weitere Probleme in Furtwangen an.");
    alert("You Win");
} else if (Berg=="Weiterfahren") {
    alert("Du fährst weiter, aber leider ist dein Gedächtnis nicht so gut wie du dachtest. Die Kurve 100m weiter hattest du vergessen, und prompt stürzt du mit dem Wagen in die Tiefe.");
    alert("You Died");
} else{
    alert("Keine gültge Eingabe");
}

