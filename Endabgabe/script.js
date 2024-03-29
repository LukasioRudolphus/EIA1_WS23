// Allgemein
const input = document.querySelector(".eingabe");
const lifePlayer = document.querySelector(".leben");

let lpPlayer = 100; // Lebenspunkte Spieler
let lpPlayerStart = 100; //Startlebenspunkte Spieler
let lpGegner; // Lebenspunkte aktueller Gegner
let lp; // Lebenspunkte, entweder Gegner oder Spieler (situativ)
let lpStart; // Startlebenspunkte, entweder gegner oder Spieler (situativ)
let lpGegnerStart; // Startlebenspunkte Gegner
let change; // Prozentuale veränderung des Lebens
let lpProzentGegner = 100; // Füllstand Lebensleiste Gegner
let lpProzentPlayer = 100; // Füllstand Lebensleiste Spieler
let dmgGegner; // Schadenszahl des jeweiligen gegners
let aufladezeitPlayer = 0; // Lädt der Spieler gerade einen starken Angriff auf?
let aufladezeitGegner = 0; // Lädt der Gegner gerade einen starken Angriff auf?
let blockPlayer = false; // Blockt der Spieler gerade?
let blockGegner = false; // Blockt der Gegner gerade?
let enemyTurn = false; // Ist der Gegner am Zug?
let monsterType; // Welches Monster ist der Gegner?
let turnOne = 0; // Speicherort 1. Feld bei SimonSays
let turnTwo = 0; // Speicherort 2. Feld bei SimonSays
let turnThree = 0; // Speicherort 3. Feld bei SimonSays 
let turnFour = 0; // Speicherort 4. Feld bei SimonSays
let turnFive = 0; // Speicherort 5. Feld bei SimonSays
let numChoices; // Wie viele Raumauswahlmöglichkeiten zur Verfügung stehen
let roomType; // Welchen Raumtyp hat welche Auswahlmöglichkeit
let roomTypeQM; // Welchen Raumtyp die Auswahlmöglichkeiten mit dem Fragezeichen haben
let roomChoiceActive = false; // Ist gerade eine Raumauswahl am laufen?
let raum; // Welcher Raum soll erstellt werden?
let monsterCount = 0; // Existiert gerade ein Monster?
let intervalCounter = 1; // bestimmt, wie viele Felder bei SimonSays leuchten, bevor der Spieler dran ist
let normalAttackActive = false; // (wegen ESP) wird gerade ein Angriff ausgeführt?
let starkeAttackActive = false; // (wegen ESP) wird gerade ein Starker Angriff ausgeführt?
let blockAttackActive = false; // (wegen ESP) wird gerade die Aktion Blocken ausgeführt?
let playerRestActive = false; // (wegen ESP) wird gerade die Aktion Ausruhen ausgeführt?
let pointNumber = 0; // Wie viele Punkte der Spieler gerade hat
let chestCount = 0; // Ist eine kiste vorhanden
let simonCount = 0; // Iste ein SimonSays-Minigame vorhanden

let attackArray = [enemyAttack, enemyStarkeAttack, enemyBlockAttack, enemyRest]; // Array, das alle möglichen Gegneraktionen enthält

//(Somewhat) Random Number Generator
function randomNumber(number){
    number = Math.ceil(Math.random()*number);
    return number;
}

//Restart button
document.querySelector(".reStart").addEventListener("click", restart);

// Gegnertyp: rat
function rat(){
    document.getElementById("lebenGegner").style.width = "100%";
    lpProzentGegner = 100;
    lpGegner = 30;
    lpGegnerStart = lpGegner;
    dmgGegner = 2;
    monsterType = "rat";
}

// Gegnertyp: große ratte
function bigRat(){
    document.getElementById("lebenGegner").style.width = "100%";
    lpProzentGegner = 100;
    lpGegner = 50;
    lpGegnerStart = lpGegner;
    dmgGegner = 5;
    monsterType = "bigRat";
}

// Gegnertyp: skelett
function skelet(){
    document.getElementById("lebenGegner").style.width = "100%";
    lpProzentGegner = 100;
    lpGegner = 60;
    lpGegnerStart = lpGegner;
    dmgGegner = 10;
    monsterType = "skelet";
}

// Gegnertyp: lebende Rüstung
function armor(){
    document.getElementById("lebenGegner").style.width = "100%";
    lpProzentGegner = 100;
    lpGegner = 70;
    lpGegnerStart = lpGegner;
    dmgGegner = 12;
    monsterType = "armor";
}

// Gegnertyp: golem
function golem(){
    document.getElementById("lebenGegner").style.width = "100%";
    lpProzentGegner = 100;
    lpGegner = 100;
    lpGegnerStart = lpGegner;
    dmgGegner = 20;
    monsterType = "golem";
}


// ESP, aufrufen der Kampfaktionen
function handleTouch12() {
    normalAttack();
}

function handleTouch13() {
    starkeAttack();
}

function handleTouch27() {
    blockAttack();
}

function handleTouch32() {
    playerRest();
}

// Buttons clicken ruft entsprechende Kampfaktion in Form von Funktionen auf
document.querySelector(".attack").addEventListener("click", normalAttack);
document.querySelector(".strongAttack").addEventListener("click", starkeAttack);
document.querySelector(".block").addEventListener("click", blockAttack);
document.querySelector(".rest").addEventListener("click", playerRest);


// Button: Angriff
function normalAttack(){
    enemyTurn = false;

    // Leben welches Angegriffen wird, wird auf das vom Gegner geändert
    lp = lpGegner;
    lpStart = lpGegnerStart;

    // wird die Aktion im Moment ausgeführt? wenn ja, erneutes ausführen nicht möglich (bis zu Ende)
    if (normalAttackActive == true) {
        return;
    }
    normalAttackActive = true; // Angriff wird ausgeführt
    setTimeout(function() { //Delay wegen ESP
        // wenn kein Monster vorhanden, abbruch
        if (monsterCount < 1){
            normalAttackActive = false;
            return;
        }

        // wenn Spieler tot, abbruch
        if (lpPlayer == 0){
            normalAttackActive = false;
            return;
        }

        if (blockGegner == true) { // wenn der Gegner blockt wird kein Schaden verursacht
            normalAttackActive = false;
            chooseAttack();
        } else if(20 <= lp){ // fügt Schaden zu
            schaden(20);
        } else { // fügt Schaden zu, verhindern von negativen Werten
            schaden(lp);
        }
        lpGegner = lp; // Gegnerleben werden für die nächste Runde gespeichert
        blockGegner = false; // Blocken vom gegner endet
        chooseAttack(); // Gegnerische Attacke wird ausgeführt
        normalAttackActive = false; // Angriff wird nicht mehr ausgeführt
    }, 500);
}

// Starker Angriff
function starkeAttack(){
    enemyTurn = false;
    if (starkeAttackActive == true) {
        return;
    }
    starkeAttackActive = true;
    setTimeout(function() {
        if (monsterCount < 1){
            starkeAttackActive = false;
            return;
        }
        if (lpPlayer == 0){
            starkeAttackActive = false;
            return;
        }
        lp = lpGegner;
        lpStart = lpGegnerStart;
        if (aufladezeitPlayer == 1){ // Angriff kann nur erfolgen, wenn bereits 1 runde aufgeladen
            if (blockGegner == true && 25 <= lp){ // Blocken reduziert den Schaden des Starken Angriffs nur um 50%
                schaden(25);
            } else if(50 <= lp){
                schaden(50);
            } else {
                schaden(lp);
            }
            aufladezeitPlayer = 0;
            starkeAttackActive = false;
        } else { // aufladen
            aufladezeitPlayer = 1;
            starkeAttackActive = false;
        }
        blockGegner = false;
        lpGegner = lp;
        chooseAttack();
        starkeAttackActive = false;
    }, 500);
}

// Blocken aller gegnerischen Attacken für 1 Runde
function blockAttack(){
    enemyTurn = false;
    if (blockAttackActive == true) {
        return;
    }
    blockAttackActive = true;
    setTimeout(function() {
        if (monsterCount < 1){
            return;
        }
        if (lpPlayer == 0){
            return;
        }
        blockPlayer = true;
        blockGegner = false;
        chooseAttack();
        blockAttackActive = false;
    }, 500);
}

// Spieler tut nichts / wartet 1 Runde
function playerRest(){
    enemyTurn = false;
    if (playerRestActive == true) {
        return;
    }
    playerRestActive = true;
    setTimeout(function() {
        if (monsterCount < 1){
            return;
        }
        if (lpPlayer == 0){
            return;
        }
        blockGegner = false;
        chooseAttack();
        playerRestActive = false;
    }, 500);
}

// zufällige Auswahl der gegnerischen Aktion
function chooseAttack(){
    if (aufladezeitGegner == 1){
        enemyStarkeAttack();
    } else {
        attackArray[randomNumber(4)-1]();
    }
}

// Schaden wird hinzugefügt und Änderung der Lebensanzeige
function schaden(dmg){
    change  = (dmg/lpStart) * 100; 
    if (enemyTurn == false) {
        lpProzentGegner = lpProzentGegner - change; 
        if (lpProzentGegner < 0.1 && lpProzentGegner > 0 || lpProzentGegner < 0){ // um weirde Werte zu verhindern
            lpProzentGegner = 0;
        }
        document.getElementById("lebenGegner").style.width = lpProzentGegner + "%"; // Prozentuale Veränderung Leben Gegner
    } else {
        lpProzentPlayer = lpProzentPlayer - change; 
        if (lpProzentPlayer < 0.1 && lpProzentPlayer > 0 || lpProzentPlayer < 0){ // um weirde Werte zu verhindern
            lpProzentPlayer = 0; 
        }
        lifePlayer.style.width = lpProzentPlayer + "%"; // Prozentuale Veränderung Leben Spieler          
    }
    lp = lp - dmg;
}

// Angriff Gegner
function enemyAttack(){
    enemyTurn = true;
    if (lpGegner == 0){
        removeCorpse(); // Entfernen von toten Gegnern
        return;
    } else if (blockPlayer == true){
        blockPlayer = false;
        return;
    } else {
        lp = lpPlayer;
        lpStart = lpPlayerStart;
        if (dmgGegner <= lp) {
            schaden(dmgGegner);
        } else {
            schaden(lp);
        }
    }  
    lpPlayer = lp;
    blockPlayer = false;
    if (lpPlayer == 0){ // Prüfen, ob Spieler tot
        defeat(); 
    }
}

// Starker Angriff Gegner
function enemyStarkeAttack(){
    enemyTurn = true;
    if (lpGegner == 0){
        removeCorpse();
        return;
    } else if (aufladezeitGegner == 1){
        lp = lpPlayer;
        lpStart = lpPlayerStart;
        if (blockPlayer == true && ((dmgGegner*1.25) <= lp)){
            schaden(dmgGegner*1.25);
        } else {
            if (dmgGegner*2.5 <= lp){
                schaden(dmgGegner*2.5);
            } else {
                schaden(lp);
            }
        }
        aufladezeitGegner = 0;
        lpPlayer = lp;
    } else {
        aufladezeitGegner = 1;
    }
    blockPlayer = false;
    if (lpPlayer == 0){
        defeat();
    }
}

// Blocken Gegner
function enemyBlockAttack(){
    enemyTurn = true;
    if (lpGegner == 0){
        removeCorpse();
        return;
    }
    blockGegner = true;
    blockPlayer = false;
}

// Warten Gegner
function enemyRest(){
    enemyTurn = true;
    if (lpGegner == 0){
        removeCorpse();
        return;
    }
    blockPlayer = false;
}

// Entfernen toter Gegner
function removeCorpse(){
    aufladezeitGegner = 0; // tote Gegner können Aufladungen an neue Gegner übergeben
    switch (monsterType){ // welcher Gegner muss entfernt werden
        case "rat": {
            const element = document.getElementById("ratte"); // erfassen des zu entfernenden Elements
            element.remove(); // Entfernen des erfassten Elements
            monsterCount = 0;
            changePoints(10); // Punkte für den Spieler fürs besiegen des Gegners
            break;
        }
        case "bigRat": {
            const element = document.getElementById("bigRatte");
            element.remove();
            monsterCount = 0;
            changePoints(20);
            break;
        }
        case "skelet": {
            const element = document.getElementById("skeleton");
            element.remove();
            monsterCount = 0;
            changePoints(30);
            break;
        }
        case "armor": {
            const element = document.getElementById("livingArmor");
            element.remove();
            monsterCount = 0;
            changePoints(40);
            break;
        }
        case "golem": {
            const element = document.getElementById("aGolem");
            element.remove();
            monsterCount = 0;
            changePoints(50);
            break;
        }
        default:
            break;
    }
}

// Entfernen des monsters, ohne Punkte zu geben (wenn der Spieler ohne zu kämpfen / vor besiegen des Monsters den Raum verlässt)
function deleteCorpse(){
    aufladezeitGegner = 0;
    switch (monsterType){
        case "rat": {
            const element = document.getElementById("ratte");
            element.remove();
            monsterCount = 0;
            break;
        }
        case "bigRat": {
            const element = document.getElementById("bigRatte");
            element.remove();
            monsterCount = 0;
            break;
        }
        case "skelet": {
            const element = document.getElementById("skeleton");
            element.remove();
            monsterCount = 0;
            break;
        }
        case "armor": {
            const element = document.getElementById("livingArmor");
            element.remove();
            monsterCount = 0;
            break;
        }
        case "golem": {
            const element = document.getElementById("aGolem");
            element.remove();
            monsterCount = 0;
            break;
        }
        default:
            break;
    }
}

// wenn der Spieler verloren hat: Erstellen des Todes-Screen
function defeat(){
    let defeatDiv = document.createElement("div");
    document.querySelector("#allumfassend").appendChild(defeatDiv);
    defeatDiv.setAttribute("class", "defeatScreen");

    let defeatBox = document.createElement("div");
    document.querySelector(".defeatScreen").appendChild(defeatBox);
    defeatBox.setAttribute("class", "defeatBox");
    defeatBox.innerHTML = "You Died";

    let pointsBox = document.createElement("div");
    document.querySelector(".defeatScreen").appendChild(pointsBox);
    pointsBox.setAttribute("class", "pointBox");
    pointsBox.innerHTML = "Du hast " + pointNumber + " Punkte erzielt.";

    let restartDeath = document.createElement("button");
    document.querySelector(".pointBox").appendChild(restartDeath);
    restartDeath.setAttribute("class", "defeatRestart");
    restartDeath.innerHTML = "Restart";

    document.querySelector(".defeatRestart").addEventListener("click", restart); // Restart bei Aktivieren des Buttons
}

// lädt die Seite neu und resettet so alles
function restart(){
    window.location.reload();
}

//Weitergehen, Raum Auswählen
document.querySelector(".weiter").addEventListener("click", roomChoices);

// Raumauswahl erstellen
function roomChoices(){
    if (roomChoiceActive == true){
        return;
    }
    roomChoiceActive = true;
    numChoices = randomNumber(4); // zufällige Anzahl an Raumauswahlmöglichkeiten
        for (let i = 1; i <= numChoices; i++){

            let nCol = document.createElement("div");
            document.querySelector(".container").appendChild(nCol);
            nCol.setAttribute("id", "col-" + numChoices + "-" + i);

            let nWege = document.createElement("div");
            document.querySelector("#col-" + numChoices + "-" + i).appendChild(nWege);
            nWege.setAttribute("class", "raumAuswahlBox");
            nWege.setAttribute("id", "weg" + i);

            let wegIconBox = document.createElement("div");
            document.querySelector("#weg" + i).appendChild(wegIconBox);
            wegIconBox.setAttribute("class", "wegIcon" + i);

            // Auswahl jeweiliger Raumtyp
            let roomTypeNumber = randomNumber(3); 
            switch (roomTypeNumber){
                case 1:
                    roomType = "?";
                    break;
                case 2:
                    roomType = "Puzzle";
                    break;
                case 3:
                    roomType = "Kampf";
                    break;
                default:
                    break;
            }

            let wegIcon;
            switch (roomType){
                case "?":
                    // Erstellen grafisches Symbol für Auswahlmöglichkeit
                    wegIcon = document.createElement("img");
                    document.querySelector(".wegIcon" + i).appendChild(wegIcon);
                    wegIcon.setAttribute("src", "../Endabgabe/Bilder/QuestionMark256.png");
                    wegIcon.setAttribute("alt", "Bild eines Fragezeichens");

                    // erstellen eines unsichtbaren Divs, welches über den anderen Elementen der Raumauswahlmöglichkeit liegt und als anklickbare Fläche dient
                    let nFeldUnbekannt = document.createElement("div");
                    document.querySelector("#col-" + numChoices + "-" + i).appendChild(nFeldUnbekannt);

                    // Auswahl jeweiliger Raumtyp für Fragezeichenmöglichkeiten
                    let roomTypeNumberQM = randomNumber(3);
                    switch (roomTypeNumberQM){
                        case 1: {
                            roomTypeQM = "leer";
                            nFeldUnbekannt.classList.add(roomTypeQM);

                            // Erkennen, falls eine Möglichkeit für einen Raum des Typs Leer angeklickt wird
                            const selector = document.querySelectorAll(".leer");

                            for (let iSel = 0; iSel < selector.length; iSel++){
                                selector[iSel].addEventListener("click", machLeer);
                            }
                            break;
                        }

                        case 2: {
                            roomTypeQM = "puzzle";
                            nFeldUnbekannt.classList.add(roomTypeQM);

                            // Erkennen, falls eine Möglichkeit für einen Raum des Typs Puzzle/Kiste angeklickt wird
                            const selector = document.querySelectorAll(".puzzle");

                            for (let iSel = 0; iSel < selector.length; iSel++){
                                selector[iSel].addEventListener("click", machPuzzle);
                            }
                            break;
                        }

                        case 3:{
                            roomTypeQM = "kampf";
                            nFeldUnbekannt.classList.add(roomTypeQM);

                            // Erkennen, falls eine Möglichkeit für einen Raum des Typs Kampf angeklickt wird
                            const selector = document.querySelectorAll(".kampf");

                            for (let iSel = 0; iSel < selector.length; iSel++){
                                selector[iSel].addEventListener("click", machKampf);
                            }
                            break;
                        }

                        default:
                            break;
                    }

                    break;
                case "Puzzle": {
                    wegIcon = document.createElement("img");
                    document.querySelector(".wegIcon" + i).appendChild(wegIcon);
                    wegIcon.setAttribute("src", "../Endabgabe/Bilder/Lock256.png");
                    wegIcon.setAttribute("alt", "Bild eines verschlossenen Schlosses");

                    let nFeldPuzzle = document.createElement("div");
                    document.querySelector("#col-" + numChoices + "-" + i).appendChild(nFeldPuzzle);
                    nFeldPuzzle.classList.add("puzzle");

                    const selector = document.querySelectorAll(".puzzle");

                    for (let iSel = 0; iSel < selector.length; iSel++){
                        selector[iSel].addEventListener("click", machPuzzle);
                    }
                    break;
                }
                case "Kampf": {
                    wegIcon = document.createElement("img");
                    document.querySelector(".wegIcon" + i).appendChild(wegIcon);
                    wegIcon.setAttribute("src", "../Endabgabe/Bilder/Swords256.png");
                    wegIcon.setAttribute("alt", "Bild von 2 gekreuzten Schwertern");

                    let nFeldKampf = document.createElement("div");
                    document.querySelector("#col-" + numChoices + "-" + i).appendChild(nFeldKampf);
                    nFeldKampf.classList.add("kampf");

                    const selector = document.querySelectorAll(".kampf");

                    for (let iSel = 0; iSel < selector.length; iSel++){
                        selector[iSel].addEventListener("click", machKampf);
                    }
                    break;
                }
                default:
                    break;
            }
        }
}

//Funtion, die speichert, das der zu erstellende Raum vom Typ leer ist
function machLeer(){
    raum = "leer";
    newRoom();
}

function machPuzzle(){
    raum = "puzzle";
    newRoom();
}

function machKampf(){
    raum = "kampf";
    newRoom();
}

// neuer Raum wird erstellt
function newRoom(){
    // leeren des alten Raumes
    if (monsterCount == 1){
        deleteCorpse();
    }
    if (chestCount == 1){
        const chest = document.getElementById("lockedChest");
        chest.remove();
        chestCount = 0;
    }
    if (simonCount == 1){
        const element = document.getElementById("simon");
        element.remove();
        simonCount = 0;
    }
    for (let i = 1; i <= numChoices; i++){
        const element = document.getElementById("col-" + numChoices + "-" + i);
        element.remove();
    }
    switch (raum){ //falls weiter Elemente im Raum vorhanden sein sollen, aufrufen von Funktionen zum erstellen dieser
        case "leer": {
            roomChoiceActive = false;
            break;
        }
        case "puzzle": {
            roomChoiceActive = false;
            spawnSimon();
            break;
        }
        case "kampf": 
            roomChoiceActive = false;
            spawnMonster();
            break;
        default:
            break;
    }
}


// erstelle Monster
function spawnMonster (){
    if (monsterCount == 0) {
        let monsterAuswahl = randomNumber(5);
        let spawnMonsterDiv = document.createElement("div");
        document.querySelector("#allumfassend").appendChild(spawnMonsterDiv);
        spawnMonsterDiv.setAttribute("class", "gegner");
        switch (monsterAuswahl){ // zufällige Auswahl, welches Monster erscheint
            case 1: 
                spawnMonsterDiv.setAttribute("id", "ratte");
            
                let spawnRat = document.createElement("img");
                document.querySelector(".gegner").appendChild(spawnRat);
                spawnRat.setAttribute("src", "../Endabgabe/Bilder/Rat256.png");
                spawnRat.setAttribute("class", "monster");
                spawnRat.setAttribute("alt", "Ratte");
            
                spawnLebensleiste();
                monsterCount = 1;
                rat(); // Zuweisen der Werte des jeweiligen monsters
                break;
            case 2: 
                spawnMonsterDiv.setAttribute("id", "bigRatte");
            
                let spawnBigRat = document.createElement("img");
                document.querySelector(".gegner").appendChild(spawnBigRat);
                spawnBigRat.setAttribute("src", "../Endabgabe/Bilder/BigRat288.png");
                spawnBigRat.setAttribute("class", "monster");
                spawnBigRat.setAttribute("alt", "Große Ratte");
            
                spawnLebensleiste();
                monsterCount = 1;
                bigRat();
                break;
            case 3: 
                spawnMonsterDiv.setAttribute("id", "skeleton");
            
                let spawnSkelet = document.createElement("img");
                document.querySelector(".gegner").appendChild(spawnSkelet);
                spawnSkelet.setAttribute("src", "../Endabgabe/Bilder/Skeleton256.png");
                spawnSkelet.setAttribute("class", "monster");
                spawnSkelet.setAttribute("alt", "Skelett");
            
                spawnLebensleiste();
                monsterCount = 1;
                skelet();
                break;
            case 4: 
                spawnMonsterDiv.setAttribute("id", "livingArmor");
            
                let spawnArmor = document.createElement("img");
                document.querySelector(".gegner").appendChild(spawnArmor);
                spawnArmor.setAttribute("src", "../Endabgabe/Bilder/Armor288.png");
                spawnArmor.setAttribute("class", "monster");
                spawnArmor.setAttribute("alt", "Lebende Rüstung");
            
                spawnLebensleiste();
                monsterCount = 1;
                armor();
                break;
            case 5: 
                spawnMonsterDiv.setAttribute("id", "aGolem");
            
                let spawnGolem = document.createElement("img");
                document.querySelector(".gegner").appendChild(spawnGolem);
                spawnGolem.setAttribute("src", "../Endabgabe/Bilder/Golem320.png");
                spawnGolem.setAttribute("class", "monster");
                spawnGolem.setAttribute("alt", "Golem");
            
                spawnLebensleiste();
                monsterCount = 1;
                golem();
                break;
            default:
                break;
        }
    } else {
        return;
    }

}

// Lebensleiste für das onster erstellen
function spawnLebensleiste() {
    let spawnLebenDiv = document.createElement("div");
    document.querySelector(".gegner").appendChild(spawnLebenDiv);
    spawnLebenDiv.setAttribute("class", "rahmenMonster");

    let spawnLeben = document.createElement("div");
    document.querySelector(".rahmenMonster").appendChild(spawnLeben);
    spawnLeben.setAttribute("id", "lebenGegner");
}

// erstelle Kiste
function spawnSimon(){
    if (chestCount == 1){
        return;
    }

    chestCount = 1;

    let imgSimon = document.createElement("img");
    document.querySelector("#allumfassend").appendChild(imgSimon);
    imgSimon.setAttribute("src", "../Endabgabe/Bilder/Chest256.png");
    imgSimon.setAttribute("alt", "verschlossene Kiste");
    imgSimon.setAttribute("id", "lockedChest")

    document.querySelector("#lockedChest").addEventListener("click", simonSays); // wenn Kiste angeklickt wird, rufe funktion zum erstellen vom Minigame auf
}

// Erstellen des SominSays Minigames
function simonSays(){
    if (simonCount == 1){
        return;
    }

    intervalCounter = 1;
    let simonSaysDiv = document.createElement("div");
    document.querySelector("#allumfassend").appendChild(simonSaysDiv);
    simonSaysDiv.setAttribute("id", "simon");

    for (let i = 1; i <= 9; i++) {
        let simonSaysFeld = document.createElement("div");
        document.querySelector("#simon").appendChild(simonSaysFeld);
        simonSaysFeld.setAttribute("class", "simonFeld");
        simonSaysFeld.setAttribute("id", "feld" + i);
        simonSaysFeld.setAttribute("onClick", "reply_click(this.id)")
    }
    simonCount = 1;
    simonLeucht();
}

// Funktion, die die einzelnen Felder aufleuchten lässt
function simonLeucht(){
    setTimeout(function() {
        feldX = randomNumber(9);
        const leucht = document.querySelector("#feld" + feldX);
        leucht.style.backgroundColor = "red";

        // Speichern der Leuchtreihenfolge
        if (turnOne == 0){
            turnOne = feldX;
        } else if (turnTwo == 0){
            turnTwo = feldX;
        } else if (turnThree == 0){
            turnThree = feldX;
        } else if (turnFour == 0){
            turnFour = feldX;
        } else if (turnFive == 0){
            turnFive = feldX;
        }

         simonDunkel();
    }, 500);
}

// Funktion, die die einzelnen Felder wieder dunkel werden lässt
function simonDunkel(){
    setTimeout(function() {
        const leucht = document.querySelector("#feld" + feldX);
        leucht.style.backgroundColor = "lightgrey";
        intervalCounter++;

        // Überprüfen, ob noch ein leuchten Erfolgen soll
        if (intervalCounter <= 5){
            simonLeucht();
        }
    }, 500);
}

// Prüfen, ob das richtige Feld vom Spieler angeklickt wurde
function reply_click(clicked_id){
    if (clicked_id == "feld" + turnOne){
        turnOne = 0;
    } else if (clicked_id == "feld" + turnTwo && turnOne == 0){
        turnTwo = 0;
    } else if (clicked_id == "feld" + turnThree && turnTwo == 0){
        turnThree = 0;
    } else if (clicked_id == "feld" + turnFour && turnThree == 0){
        turnFour = 0;
    } else if (clicked_id == "feld" + turnFive && turnFour == 0){
        turnFive = 0;
        simonWin();
    }
}

// Wenn der Spieler alle Felder richtig angeklickt hat, gutschreiben der Punkte und entfernen der Kiste und des Minigames
function simonWin(){
    const chest = document.getElementById("lockedChest");
    chest.remove();
    const element = document.getElementById("simon");
    element.remove();
    simonCount = 0;
    chestCount = 0;
    changePoints(10);
}

// Punkteanzeige ändern
function changePoints(punktestand){
    pointNumber = pointNumber + punktestand;
    document.getElementById("points").innerHTML = pointNumber;
}