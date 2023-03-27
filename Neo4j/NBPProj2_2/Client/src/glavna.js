import { Odeljenje } from "./Odeljenje.js";
import { Lekar } from "./Lekar.js";
import { MedicinskaSestra } from "./MedicinskaSestra.js";
import { Pacijent } from "./Pacijent.js";
import { Pregled } from "./Pregled.js";

function crtajFormu(flag){

    let zaBrisanje = document.querySelector(".dodajLekara");
    if(zaBrisanje != null){
        zaBrisanje.parentNode.removeChild(zaBrisanje);
    }
    let divGlavni = document.createElement("div");
    if (flag == "dodajLekara")
        divGlavni.classList.add("dodajLekara");
    else if (flag == "dodajMedSestru")
        divGlavni.className = "dodajMedSestru";  
    else if (flag == "dodajPacijenta")
        divGlavni.className = "dodajPacijenta"; 
    else if (flag == "dodajOdeljenje")
        divGlavni.className = "dodajOdeljenje"; 
    document.body.appendChild(divGlavni);

    let divForma = document.createElement("div");
    divForma.classList.add("formaDodajLekara");
    divGlavni.appendChild(divForma);

    let zatvori = document.createElement("div");
    zatvori.classList.add("zatvori");
    zatvori.innerHTML = "+";
    divForma.appendChild(zatvori);
    zatvori.onclick = () => {
        divGlavni.parentNode.removeChild(divGlavni);
    }

    let naslov = document.createElement("h1");
    if (flag == "dodajLekara")
        naslov.innerHTML = "Dodaj lekara";
    else if (flag == "dodajMedSestru")
        naslov.innerHTML = "Dodaj medicinsku sestru";
    else if (flag == "dodajPacijenta")
        naslov.innerHTML = "Dodaj pacijenta";
    else if (flag == "dodajOdeljenje")
        naslov.innerHTML = "Dodaj odeljenje";
    naslov.className = "naslovLek";
    divForma.appendChild(naslov);

    let podaci = document.createElement("div");
    podaci.classList.add("podacii");
    divForma.appendChild(podaci);

    let host = document.createElement("div");
    host.className = "lekar";
    podaci.appendChild(host);

    if (flag == "dodajLekara"){
        crtajDodajLekara(host);
    }
    else if (flag == "dodajMedSestru"){
        crtajDodajMedSestru(host);
    }
    else if (flag == "dodajPacijenta"){
        crtajDodajPacijenta(host);
    }
    else if (flag == "dodajOdeljenje"){
        crtajDodajOdeljenje(host);
    }
    

}
function crtajDodajLekara(host){
                        
    let divIme = document.createElement("div");
    host.appendChild(divIme);
    let labelaIme = document.createElement("label");
    labelaIme.innerHTML = "Ime";
    let inputIme = document.createElement("input");
    inputIme.type = "text";
    divIme.appendChild(labelaIme);
    divIme.appendChild(inputIme);

    let divSrednjeSlovo = document.createElement("div");
    host.appendChild(divSrednjeSlovo);
    let labelaSrednjeSlovo = document.createElement("label");
    labelaSrednjeSlovo.innerHTML = "Srednje slovo";
    let inputSrednjeSlovo = document.createElement("input");
    inputSrednjeSlovo.type = "text";
    divSrednjeSlovo.appendChild(labelaSrednjeSlovo);
    divSrednjeSlovo.appendChild(inputSrednjeSlovo);

    let divPrezime = document.createElement("div");
    host.appendChild(divPrezime);
    let labelaPrezime = document.createElement("label");
    labelaPrezime.innerHTML = "Prezime";
    let inputPrezime = document.createElement("input");
    inputPrezime.type = "text";
    divPrezime.appendChild(labelaPrezime);
    divPrezime.appendChild(inputPrezime);

    let divPol = document.createElement("div");
    host.appendChild(divPol);
    let labelaPol = document.createElement("label");
    labelaPol.innerHTML = "Pol";
    let inputPol = document.createElement("select");
    let polovi = ["muški", "ženski"];
    polovi.forEach(p => {
        let option = document.createElement("option");
        option.innerHTML = p;
        inputPol.appendChild(option);
    })
    divPol.appendChild(labelaPol);
    divPol.appendChild(inputPol);

    let divDatumRodjenja = document.createElement("div");
    host.appendChild(divDatumRodjenja);
    let labelaDatumRodjenja = document.createElement("label");
    labelaDatumRodjenja.innerHTML = "Datum rođenja";
    let inputDatumRodjenja = document.createElement("input");
    inputDatumRodjenja.type = "date";
    divDatumRodjenja.appendChild(labelaDatumRodjenja);
    divDatumRodjenja.appendChild(inputDatumRodjenja);

    let divJMBG = document.createElement("div");
    host.appendChild(divJMBG);
    let labelaJMBG = document.createElement("label");
    labelaJMBG.innerHTML = "JMBG";
    let inputJMBG = document.createElement("input");
    inputJMBG.type = "text";
    divJMBG.appendChild(labelaJMBG);
    divJMBG.appendChild(inputJMBG);

    let divBrojLicneKarte = document.createElement("div");
    host.appendChild(divBrojLicneKarte);
    let labelaBrojLicneKarte = document.createElement("label");
    labelaBrojLicneKarte.innerHTML = "Broj lične karte";
    let inputBrojLicneKarte = document.createElement("input");
    inputBrojLicneKarte.type = "text";
    divBrojLicneKarte.appendChild(labelaBrojLicneKarte);
    divBrojLicneKarte.appendChild(inputBrojLicneKarte);

    let divBrojTelefona = document.createElement("div");
    host.appendChild(divBrojTelefona);
    let labelaBrojTelefona = document.createElement("label");
    labelaBrojTelefona.innerHTML = "Broj telefona";
    let inputBrojTelefona = document.createElement("input");
    inputBrojTelefona.type = "text";
    divBrojTelefona.appendChild(labelaBrojTelefona);
    divBrojTelefona.appendChild(inputBrojTelefona);

    let divSpecijalnost = document.createElement("div");
    host.appendChild(divSpecijalnost);
    let labelaSpecijalnost = document.createElement("label");
    labelaSpecijalnost.innerHTML = "Specijalnost";
    let inputSpecijalnost = document.createElement("select");
    let specijalnosti = ["gastroenterolog", "kardiolog", "hematolog", "endokrinolog", "polmolog", "onkolog", "infektolog", "pedijatar", "neurolog", "psihijatar", "ginekolog", "hirurg", "neurohirurg", "plastični hirrug", "urolog",  "kardiohirurg",
                        "anesteziolog", "otorinolaringolog", "dermatolog", "radiolog", "patolog", "farmakolog", "imunolog", "epidemiolog", "alergolog", "lekar opšte prakse"];
    specijalnosti.forEach((s, index) => {
        let option = document.createElement("option");
        option.innerHTML = s;
        option.id = index;
        inputSpecijalnost.appendChild(option);
    })
    divSpecijalnost.appendChild(labelaSpecijalnost);
    divSpecijalnost.appendChild(inputSpecijalnost);

    let divOrdinacije = document.createElement("div");
    host.appendChild(divOrdinacije);
    let labelaBrojOrdinacije = document.createElement("label");
    labelaBrojOrdinacije.innerHTML = "Broj ordinacije";
    let inputBrojOrdinacije = document.createElement("input");
    inputBrojOrdinacije.type = "number";
    divOrdinacije.appendChild(labelaBrojOrdinacije);
    divOrdinacije.appendChild(inputBrojOrdinacije);

    let divDugme = document.createElement("div");
    divDugme.className = "Dugme";
    host.appendChild(divDugme);
    let dugme = document.createElement("button");
    dugme.innerHTML = "Dodaj";
    divDugme.appendChild(dugme);

    dugme.onclick = () => {

        if (inputIme.value == "" || inputIme.value == null || inputIme.value == undefined) {
            alert("Unesite ime");
            return;
        }

        if (inputSrednjeSlovo.value == "" || inputSrednjeSlovo.value == null || inputSrednjeSlovo.value == undefined || inputSrednjeSlovo.value.length != 1) {
            alert("Unesite samo jedno srednje slovo");
            return;
        }

        if (inputSrednjeSlovo.value.charCodeAt(0) < 65 || inputSrednjeSlovo.value.charCodeAt(0) > 90) {
            alert("Srednje slovo mora biti jedan karakter velikog slova");
            return;
        }

        if (inputPrezime.value == "" || inputPrezime.value == null || inputPrezime.value == undefined) {
            alert("Unesite prezime");
            return;
        }
        if (inputDatumRodjenja.value == "" || inputDatumRodjenja == null || inputDatumRodjenja == undefined) {
            alert("Unesite datum");
            return;
        }
        let godina = inputDatumRodjenja.value.split("-")[0];
        if (godina > 1998 || godina < 1950)
        {
            alert("Godina rođenja lekara je između 1950 i 1998");
            return;
        }

        if(inputJMBG.value == "" || inputJMBG.value == null || inputJMBG.value == undefined || inputJMBG.value.length != 13) {
            alert("Unesite 13 cifre jmbga");
            return;
        }
        if (inputBrojLicneKarte.value == "" || inputBrojLicneKarte.value == null || inputBrojLicneKarte.value == undefined) {
            alert("Unesite broj lične karte");
            return;
        }
        if (inputBrojTelefona.value == "" || inputBrojTelefona.value == null || inputBrojTelefona.value == undefined) {
            alert("Unesite broj telefona");
            return;
        }

        if (inputBrojOrdinacije.value <= 0 || inputBrojOrdinacije.value == "" || inputBrojTelefona.value == null || inputBrojTelefona.value == undefined) {
            alert("Unesite broj ordinacije");
            return;
        }
        let flag = 0;
        let odeljenjaa = ["gastroenterologija", "kardiologija", "hematologija", "endokrinologija", "polmologija", "onkologija", "infektologija", "pedijatrija", "neurologija", "psihijatrija", "ginekologija", "hirurgija", "neurohirurgija", "plastična hirrugija", "urologija",  "kardiohirurgija",
        "anesteziologija", "otorinolaringologija", "dermatologija", "radiologija", "patologija", "farmakologija", "imunologija", "epidemiologija", "alergologija", "odeljenje za opštu praksu"];
        fetch("http://localhost:5001/VratiSvaOdeljenja",
        {
            method:"GET",
        })
        .then(p => {
            if(p.status == 200){
                p.json().then(odeljenja=> {
                    odeljenja.forEach(o => {
                        if (o.tip == odeljenjaa[inputSpecijalnost.options[inputSpecijalnost.selectedIndex].id]) {
                            flag = 1;
                            let lekar =  {
                                "ime": inputIme.value,
                                "srednjeSLovo": inputSrednjeSlovo.value,
                                "prezime": inputPrezime.value,
                                "pol": inputPol.value,
                                "datumRodjenja": inputDatumRodjenja.value.split("-")[2] + "." +  inputDatumRodjenja.value.split("-")[1] + "." + inputDatumRodjenja.value.split("-")[0],
                                "jmbg" : inputJMBG.value,
                                "brojLicneKarte" : inputBrojLicneKarte.value,
                                "brojTelefona" : inputBrojTelefona.value,
                                "specijalnost" : inputSpecijalnost.value,
                                "brojKancelarije" : inputBrojOrdinacije.value
                            }
                            fetch("http://localhost:5001/AddLekar/" + o.id,
                            {
                                method:"POST",
                                headers:
                                {
                                    "Accept": "application/json",
                                    "Content-Type":"application/json"
                                },
                                body:JSON.stringify(lekar)
                            }).then(r=>
                                {
                                    if(r.status==200)
                                    {
                                        alert("Uspešno dodat lekar");
                                        let divGlavni = document.querySelector(".dodajLekara");
                                        divGlavni.parentNode.removeChild(divGlavni);

                                        let l = new Lekar(inputIme.value, inputSrednjeSlovo.value, inputPrezime.value, inputPol.value, inputDatumRodjenja.value.split("-")[2] + "." +  inputDatumRodjenja.value.split("-")[1] + "." + inputDatumRodjenja.value.split("-")[0], inputJMBG.value, inputBrojLicneKarte.value, inputBrojTelefona.value, inputSpecijalnost.value, inputBrojOrdinacije.value, o.tip);
                                        
                                        l.crtajRedTabele(divLekari, 1);
                                    }
                                    else 
                                        r.text().then(data => {
                                            alert(data);
                                    })
                                })
                        }
                    })
                    if (flag == 0){
                        alert("Ne postoji odeljenje: " + odeljenjaa[inputSpecijalnost.options[inputSpecijalnost.selectedIndex].id] + " u ovoj bolnici (dodaj ga)");
                        return;
                    }                               
                })
            }
            else {
                p.text().then(data => {
                    alert(data);
                })
            }

        })
        
    }
}

function crtajDodajMedSestru(host) {

    let divIme = document.createElement("div");
    host.appendChild(divIme);
    let labelaIme = document.createElement("label");
    labelaIme.innerHTML = "Ime";
    let inputIme = document.createElement("input");
    inputIme.type = "text";
    divIme.appendChild(labelaIme);
    divIme.appendChild(inputIme);

    let divSrednjeSlovo = document.createElement("div");
    host.appendChild(divSrednjeSlovo);
    let labelaSrednjeSlovo = document.createElement("label");
    labelaSrednjeSlovo.innerHTML = "Srednje slovo";
    let inputSrednjeSlovo = document.createElement("input");
    inputSrednjeSlovo.type = "text";
    divSrednjeSlovo.appendChild(labelaSrednjeSlovo);
    divSrednjeSlovo.appendChild(inputSrednjeSlovo);

    let divPrezime = document.createElement("div");
    host.appendChild(divPrezime);
    let labelaPrezime = document.createElement("label");
    labelaPrezime.innerHTML = "Prezime";
    let inputPrezime = document.createElement("input");
    inputPrezime.type = "text";
    divPrezime.appendChild(labelaPrezime);
    divPrezime.appendChild(inputPrezime);

    let divPol = document.createElement("div");
    host.appendChild(divPol);
    let labelaPol = document.createElement("label");
    labelaPol.innerHTML = "Pol";
    let inputPol = document.createElement("select");
    let polovi = ["muški", "ženski"];
    polovi.forEach(p => {
        let option = document.createElement("option");
        option.innerHTML = p;
        inputPol.appendChild(option);
    })
    divPol.appendChild(labelaPol);
    divPol.appendChild(inputPol);

    let divDatumRodjenja = document.createElement("div");
    host.appendChild(divDatumRodjenja);
    let labelaDatumRodjenja = document.createElement("label");
    labelaDatumRodjenja.innerHTML = "Datum rođenja";
    let inputDatumRodjenja = document.createElement("input");
    inputDatumRodjenja.type = "date";
    divDatumRodjenja.appendChild(labelaDatumRodjenja);
    divDatumRodjenja.appendChild(inputDatumRodjenja);

    let divJMBG = document.createElement("div");
    host.appendChild(divJMBG);
    let labelaJMBG = document.createElement("label");
    labelaJMBG.innerHTML = "JMBG";
    let inputJMBG = document.createElement("input");
    inputJMBG.type = "text";
    divJMBG.appendChild(labelaJMBG);
    divJMBG.appendChild(inputJMBG);

    let divBrojLicneKarte = document.createElement("div");
    host.appendChild(divBrojLicneKarte);
    let labelaBrojLicneKarte = document.createElement("label");
    labelaBrojLicneKarte.innerHTML = "Broj lične karte";
    let inputBrojLicneKarte = document.createElement("input");
    inputBrojLicneKarte.type = "text";
    divBrojLicneKarte.appendChild(labelaBrojLicneKarte);
    divBrojLicneKarte.appendChild(inputBrojLicneKarte);

    let divBrojTelefona = document.createElement("div");
    host.appendChild(divBrojTelefona);
    let labelaBrojTelefona = document.createElement("label");
    labelaBrojTelefona.innerHTML = "Broj telefona";
    let inputBrojTelefona = document.createElement("input");
    inputBrojTelefona.type = "text";
    divBrojTelefona.appendChild(labelaBrojTelefona);
    divBrojTelefona.appendChild(inputBrojTelefona);

    let divOdeljenje = document.createElement("div");
    host.appendChild(divOdeljenje);
    let labelaOdeljenje = document.createElement("label");
    labelaOdeljenje.innerHTML = "Odeljenje";
    let inputOdeljenje = document.createElement("select");
    divOdeljenje.appendChild(labelaOdeljenje);
    divOdeljenje.appendChild(inputOdeljenje);

    fetch("http://localhost:5001/VratiSvaOdeljenja",
    {
        method:"GET",
    })
    .then(p => {
        if(p.status == 200){
            p.json().then(odeljenja=> {
                odeljenja.forEach(o => {
                    let option = document.createElement("option");
                    option.innerHTML = o.tip;
                    inputOdeljenje.appendChild(option);
                })
                              
            })
        }
        else {
            p.text().then(data => {
                alert(data);
            })
        }

    })

    let divDugme = document.createElement("div");
    divDugme.className = "Dugme";
    host.appendChild(divDugme);
    let dugme = document.createElement("button");
    dugme.innerHTML = "Dodaj";
    divDugme.appendChild(dugme);

    dugme.onclick = () => {

        if (inputIme.value == "" || inputIme.value == null || inputIme.value == undefined) {
            alert("Unesite ime");
            return;
        }

        if (inputSrednjeSlovo.value == "" || inputSrednjeSlovo.value == null || inputSrednjeSlovo.value == undefined || inputSrednjeSlovo.value.length != 1) {
            alert("Unesite samo jedno srednje slovo");
            return;
        }

        if (inputSrednjeSlovo.value.charCodeAt(0) < 65 || inputSrednjeSlovo.value.charCodeAt(0) > 90) {
            alert("Srednje slovo mora biti jedan karakter velikog slova");
            return;
        }

        if (inputPrezime.value == "" || inputPrezime.value == null || inputPrezime.value == undefined) {
            alert("Unesite prezime");
            return;
        }
        if (inputDatumRodjenja.value == "" || inputDatumRodjenja == null || inputDatumRodjenja == undefined) {
            alert("Unesite datum");
            return;
        }
        let godina = inputDatumRodjenja.value.split("-")[0];
        if (godina > 2004 || godina < 1950)
        {
            alert("Godina rođenja lekara je između 1950 i 2004");
            return;
        }

        if(inputJMBG.value == "" || inputJMBG.value == null || inputJMBG.value == undefined || inputJMBG.value.length != 13) {
            alert("Unesite 13 cifre jmbga");
            return;
        }
        if (inputBrojLicneKarte.value == "" || inputBrojLicneKarte.value == null || inputBrojLicneKarte.value == undefined) {
            alert("Unesite broj lične karte");
            return;
        }
        if (inputBrojTelefona.value == "" || inputBrojTelefona.value == null || inputBrojTelefona.value == undefined) {
            alert("Unesite broj telefona");
            return;
        }
        let flag = 0;

        fetch("http://localhost:5001/VratiSvaOdeljenja",
        {
            method:"GET",
        })
        .then(p => {
            if(p.status == 200){
                p.json().then(odeljenja=> {
                    odeljenja.forEach(o => {
                        if (o.tip == inputOdeljenje.value) {
                            let medSestra =  {
                                "ime": inputIme.value,
                                "srednjeSLovo": inputSrednjeSlovo.value,
                                "prezime": inputPrezime.value,
                                "pol": inputPol.value,
                                "datumRodjenja": inputDatumRodjenja.value.split("-")[2] + "." + inputDatumRodjenja.value.split("-")[1] + "." + inputDatumRodjenja.value.split("-")[0],
                                "jmbg" : inputJMBG.value,
                                "brojLicneKarte" : inputBrojLicneKarte.value,
                                "brojTelefona" : inputBrojTelefona.value,
                            }
                            fetch("http://localhost:5001/AddMedicinskaSestra/" + o.id,
                            {
                                method:"POST",
                                headers:
                                {
                                    "Accept": "application/json",
                                    "Content-Type":"application/json"
                                },
                                body:JSON.stringify(medSestra)
                            }).then(r=>
                                {
                                    if(r.status==200)
                                    {
                                        alert("Uspešno dodata medicinska sestra");
                                        let divGlavni = document.querySelector(".dodajMedSestru");
                                        divGlavni.parentNode.removeChild(divGlavni);

                                        let ms = new MedicinskaSestra(inputIme.value, inputSrednjeSlovo.value, inputPrezime.value, inputPol.value, inputDatumRodjenja.value.split("-")[2] + "." + inputDatumRodjenja.value.split("-")[1] + "." + inputDatumRodjenja.value.split("-")[0], inputJMBG.value, inputBrojLicneKarte.value, inputBrojTelefona.value, o.tip);
                                        
                                        ms.crtajRedTabele(divMedSestre, 1);
                                    }
                                    else 
                                        r.text().then(data => {
                                            alert(data);
                                    })
                                })
                        }
                    })                             
                })
            }
            else {
                p.text().then(data => {
                    alert(data);
                })
            }

        })
        
    }
}

function crtajDodajPacijenta(host) {

    let divIme = document.createElement("div");
    host.appendChild(divIme);
    let labelaIme = document.createElement("label");
    labelaIme.innerHTML = "Ime";
    let inputIme = document.createElement("input");
    inputIme.type = "text";
    divIme.appendChild(labelaIme);
    divIme.appendChild(inputIme);

    let divSrednjeSlovo = document.createElement("div");
    host.appendChild(divSrednjeSlovo);
    let labelaSrednjeSlovo = document.createElement("label");
    labelaSrednjeSlovo.innerHTML = "Srednje slovo";
    let inputSrednjeSlovo = document.createElement("input");
    inputSrednjeSlovo.type = "text";
    divSrednjeSlovo.appendChild(labelaSrednjeSlovo);
    divSrednjeSlovo.appendChild(inputSrednjeSlovo);

    let divPrezime = document.createElement("div");
    host.appendChild(divPrezime);
    let labelaPrezime = document.createElement("label");
    labelaPrezime.innerHTML = "Prezime";
    let inputPrezime = document.createElement("input");
    inputPrezime.type = "text";
    divPrezime.appendChild(labelaPrezime);
    divPrezime.appendChild(inputPrezime);

    let divPol = document.createElement("div");
    host.appendChild(divPol);
    let labelaPol = document.createElement("label");
    labelaPol.innerHTML = "Pol";
    let inputPol = document.createElement("select");
    let polovi = ["muški", "ženski"];
    polovi.forEach(p => {
        let option = document.createElement("option");
        option.innerHTML = p;
        inputPol.appendChild(option);
    })
    divPol.appendChild(labelaPol);
    divPol.appendChild(inputPol);

    let divDatumRodjenja = document.createElement("div");
    host.appendChild(divDatumRodjenja);
    let labelaDatumRodjenja = document.createElement("label");
    labelaDatumRodjenja.innerHTML = "Datum rođenja";
    let inputDatumRodjenja = document.createElement("input");
    inputDatumRodjenja.type = "date";
    divDatumRodjenja.appendChild(labelaDatumRodjenja);
    divDatumRodjenja.appendChild(inputDatumRodjenja);

    let divJMBG = document.createElement("div");
    host.appendChild(divJMBG);
    let labelaJMBG = document.createElement("label");
    labelaJMBG.innerHTML = "JMBG";
    let inputJMBG = document.createElement("input");
    inputJMBG.type = "text";
    divJMBG.appendChild(labelaJMBG);
    divJMBG.appendChild(inputJMBG);

    let divBrojLicneKarte = document.createElement("div");
    host.appendChild(divBrojLicneKarte);
    let labelaBrojLicneKarte = document.createElement("label");
    labelaBrojLicneKarte.innerHTML = "Broj lične karte";
    let inputBrojLicneKarte = document.createElement("input");
    inputBrojLicneKarte.type = "text";
    divBrojLicneKarte.appendChild(labelaBrojLicneKarte);
    divBrojLicneKarte.appendChild(inputBrojLicneKarte);

    let divZdravstveneKnjizice = document.createElement("div");
    host.appendChild(divZdravstveneKnjizice);
    let labelaBrojZdravstveneKnjizice = document.createElement("label");
    labelaBrojZdravstveneKnjizice.innerHTML = "Broj zdravstvene knjižice";
    let inputBrojZdravstveneKnjizice = document.createElement("input");
    inputBrojZdravstveneKnjizice.type = "text";
    divZdravstveneKnjizice.appendChild(labelaBrojZdravstveneKnjizice);
    divZdravstveneKnjizice.appendChild(inputBrojZdravstveneKnjizice);

    let divBrojKartona = document.createElement("div");
    host.appendChild(divBrojKartona);
    let labelaBrojKartona = document.createElement("label");
    labelaBrojKartona.innerHTML = "Broj kartona";
    let inputBrojKartona = document.createElement("input");
    inputBrojKartona.type = "number";
    divBrojKartona.appendChild(labelaBrojKartona);
    divBrojKartona.appendChild(inputBrojKartona);

    let divDugme = document.createElement("div");
    divDugme.className = "Dugme";
    host.appendChild(divDugme);
    let dugme = document.createElement("button");
    dugme.innerHTML = "Dodaj";
    divDugme.appendChild(dugme);

    dugme.onclick = () => {

        if (inputIme.value == "" || inputIme.value == null || inputIme.value == undefined) {
            alert("Unesite ime");
            return;
        }

        if (inputSrednjeSlovo.value == "" || inputSrednjeSlovo.value == null || inputSrednjeSlovo.value == undefined || inputSrednjeSlovo.value.length != 1) {
            alert("Unesite samo jedno srednje slovo");
            return;
        }

        if (inputSrednjeSlovo.value.charCodeAt(0) < 65 || inputSrednjeSlovo.value.charCodeAt(0) > 90) {
            alert("Srednje slovo mora biti jedan karakter velikog slova");
            return;
        }

        if (inputPrezime.value == "" || inputPrezime.value == null || inputPrezime.value == undefined) {
            alert("Unesite prezime");
            return;
        }
        if (inputDatumRodjenja.value == "" || inputDatumRodjenja == null || inputDatumRodjenja == undefined) {
            alert("Unesite datum");
            return;
        }
        let godina = inputDatumRodjenja.value.split("-")[0];
        if (godina > 2022 || godina < 1900)
        {
            alert("Godina rođenja lekara je između 1900 i 2022");
            return;
        }

        if(inputJMBG.value == "" || inputJMBG.value == null || inputJMBG.value == undefined || inputJMBG.value.length != 13) {
            alert("Unesite 13 cifre jmbga");
            return;
        }
        if (inputBrojLicneKarte.value == "" || inputBrojLicneKarte.value == null || inputBrojLicneKarte.value == undefined) {
            alert("Unesite broj lične karte");
            return;
        }
        if (inputBrojZdravstveneKnjizice.value == "" || inputBrojZdravstveneKnjizice.value == null || inputBrojZdravstveneKnjizice.value == undefined) {
            alert("Unesite broj zdravstvene knjižice");
            return;
        }

        if (inputBrojKartona.value <= 0 || inputBrojKartona.value == "" || inputBrojKartona.value == null || inputBrojKartona.value == undefined) {
            alert("Unesite broj kartona");
            return;
        }
        
        let pacijent = {
            "ime": inputIme.value,
            "srednjeSLovo": inputSrednjeSlovo.value,
            "prezime": inputPrezime.value,
            "pol": inputPol.value,
            "datumRodjenja": inputDatumRodjenja.value.split("-")[2] + "." +  inputDatumRodjenja.value.split("-")[1] + "." + inputDatumRodjenja.value.split("-")[0],
            "jmbg" : inputJMBG.value,
            "brojLicneKarte" : inputBrojLicneKarte.value,
            "brojZdravstveneKnjizice" : inputBrojZdravstveneKnjizice.value,
            "brojKartona" : inputBrojKartona.value
        }

        fetch("http://localhost:5001/AddPacijent",
        {
            method:"POST",
            headers:
            {
                "Accept": "application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(pacijent)
        }).then(r=>
            {
                if(r.status==200)
                {
                    alert("Uspešno dodat pacijent");
                    let divGlavni = document.querySelector(".dodajPacijenta");
                    divGlavni.parentNode.removeChild(divGlavni);

                    let p = new Pacijent(inputIme.value, inputSrednjeSlovo.value, inputPrezime.value, inputPol.value, inputDatumRodjenja.value.split("-")[2] + "." +  inputDatumRodjenja.value.split("-")[1] + "." + inputDatumRodjenja.value.split("-")[0], inputJMBG.value, inputBrojLicneKarte.value, inputBrojZdravstveneKnjizice.value, inputBrojKartona.value);
                    
                    p.crtajRedTabele(divPacijenti, 1);
                }
                else 
                    r.text().then(data => {
                        alert(data);
                })
            })
    }
}

function crtajDodajOdeljenje(host) {

    let divTip = document.createElement("div");
    host.appendChild(divTip);
    let labelaTip = document.createElement("label");
    labelaTip.innerHTML = "Tip";
    let inputTip = document.createElement("select");
    divTip.appendChild(labelaTip);
    let odeljenjaa = ["gastroenterologija", "kardiologija", "hematologija", "endokrinologija", "polmologija", "onkologija", "infektologija", "pedijatrija", "neurologija", "psihijatrija", "ginekologija", "hirurgija", "neurohirurgija", "plastična hirrugija", "urologija",  "kardiohirurgija",
    "anesteziologija", "otorinolaringologija", "dermatologija", "radiologija", "patologija", "farmakologija", "imunologija", "epidemiologija", "alergologija", "odeljenje za opštu praksu"];
    fetch("http://localhost:5001/VratiSvaOdeljenja",
    {
        method:"GET",
    })
    .then(p => {
        if(p.status == 200){
            p.json().then(odeljenja=> {
                odeljenja.forEach(odeljenje => {
                    odeljenjaa = odeljenjaa.filter(o => o !== odeljenje.tip);                    
                });
                odeljenjaa.forEach(o => {
                    let opcija = document.createElement("option");
                    opcija.innerHTML = o;
                    inputTip.appendChild(opcija);
                })
            
                divTip.appendChild(inputTip);
            
                let divKapacitet = document.createElement("div");
                host.appendChild(divKapacitet);
                let labelaKapacitet = document.createElement("label");
                labelaKapacitet.innerHTML = "Kapacitet";
                let inputKapacitet = document.createElement("input");
                inputKapacitet.type = "number";
                divKapacitet.appendChild(labelaKapacitet);
                divKapacitet.appendChild(inputKapacitet);
            
                let divVremePosete = document.createElement("div");
                host.appendChild(divVremePosete);
                let labelaVremePosete = document.createElement("label");
                labelaVremePosete.innerHTML = "Vreme posete";
                let inputVremePosete = document.createElement("input");
                inputVremePosete.type = "text";
                divVremePosete.appendChild(labelaVremePosete);
                divVremePosete.appendChild(inputVremePosete);
            
                let divSprat = document.createElement("div");
                host.appendChild(divSprat);
                let labelaSprat = document.createElement("label");
                labelaSprat.innerHTML = "Sprat";
                let inputSprat = document.createElement("input");
                inputSprat.type = "number";
                divSprat.appendChild(labelaSprat);
                divSprat.appendChild(inputSprat);
            
                let divDugme = document.createElement("div");
                divDugme.className = "Dugme";
                host.appendChild(divDugme);
                let dugme = document.createElement("button");
                dugme.innerHTML = "Dodaj";
                divDugme.appendChild(dugme);

                dugme.onclick = () => {
            
                    if (inputKapacitet.value <= 0 || inputKapacitet.value == "" || inputKapacitet.value == null || inputKapacitet.value == undefined) {
                        alert("Unesite kapacitet");
                        return;
                    }
            
                    if (inputSprat.value <= 0 || inputSprat.value == "" || inputSprat.value == null || inputSprat.value == undefined) {
                        alert("Unesite redni broj sprata");
                        return;
                    }
            
                    if (inputVremePosete.value == "" || inputVremePosete.value == null || inputVremePosete.value == undefined) {
                        alert("Unesite vreme posete");
                        return;
                    }
            
            
                    
                    let odeljenje = {
                        "tip": inputTip.value,
                        "kapacitet": inputKapacitet.value,
                        "brojZauzetihMesta": 0,
                        "vremePosete": inputVremePosete.value,
                        "sprat": inputSprat.value
                    }
            
                    fetch("http://localhost:5001/AddOdeljenje",
                    {
                        method:"POST",
                        headers:
                        {
                            "Accept": "application/json",
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify(odeljenje)
                    }).then(r=>
                        {
                            if(r.status==200)
                            {
                                alert("Uspešno dodato odeljenje");
                                let divGlavni = document.querySelector(".dodajOdeljenje");
                                divGlavni.parentNode.removeChild(divGlavni);
            
                                fetch("http://localhost:5001/VratiSvaOdeljenja",
                                {
                                    method:"GET",
                                })
                                .then(p => {
                                    if(p.status == 200){
                                        p.json().then(odeljenja=> {
                                            odeljenja.forEach(odeljenje => {
                                                if(odeljenje.tip == inputTip.value) {
                                
                                                    let o = new Odeljenje(odeljenje.id, odeljenje.tip ,odeljenje.kapacitet, odeljenje.brojZauzetihMesta, odeljenje.vremePosete, odeljenje.sprat);
                                                    o.crtajRedTabele(divOdeljenja);
            
                                                }
                                            });
                                        })
                                    }
                                    else {
                                        p.text().then(data => {
                                            alert(data);
                                        })
                                    }
                                })
            
                            }
                            else 
                                r.text().then(data => {
                                    alert(data);
                            })
                        })
                }
            })
        }
        else {
            p.text().then(data => {
                alert(data);
            })
        }
    })


}

let divOdeljenja = document.createElement("div");
document.body.appendChild(divOdeljenja);
let dugmeOdeljenja = document.createElement("button");
dugmeOdeljenja.innerHTML = "Odeljenja";
let dugmePovuci = document.createElement("button");
dugmePovuci.innerHTML = "^";
divOdeljenja.appendChild(dugmeOdeljenja);
divOdeljenja.appendChild(dugmePovuci);
let divOdeljenjaTab = document.createElement("div");
divOdeljenjaTab.className = "divOdeljenjaTab";
divOdeljenja.appendChild(divOdeljenjaTab);

dugmePovuci.onclick = () => {
    divOdeljenjaTab.innerHTML = "";
}

dugmeOdeljenja.onclick = () => {

    fetch("http://localhost:5001/VratiSvaOdeljenja",
    {
        method:"GET",
    })
    .then(p => {
        if(p.status == 200){
            p.json().then(odeljenja=> {
                divOdeljenjaTab.innerHTML = "";
                let tabela = document.createElement("table");
                tabela.className = "tabelaOdeljenje";
                divOdeljenjaTab.appendChild(tabela);
                let tr = document.createElement("tr");
                tabela.appendChild(tr);
                let heder = ["tip", "kapacitet", "broj zauzetih mesta", "vreme posete", "sprat"];
                heder.forEach(h => {


                    let th = document.createElement("th");
                    th.innerHTML = h;
                    tr.appendChild(th);

                })
                odeljenja.forEach(odeljenje => {
                    
                    let o = new Odeljenje(odeljenje.id, odeljenje.tip, odeljenje.kapacitet, odeljenje.brojZauzetihMesta, odeljenje.vremePosete, odeljenje.sprat);
                    o.crtajRedTabele(divOdeljenja);



                    
                });

                let divDugmeDodaj = document.createElement("div");
                divOdeljenjaTab.appendChild(divDugmeDodaj);
                let dugmeDodajOdeljenje = document.createElement("button");
                dugmeDodajOdeljenje.innerHTML = "dodaj odeljenje";
                divDugmeDodaj.appendChild(dugmeDodajOdeljenje);

                dugmeDodajOdeljenje.onclick = () => {
                    crtajFormu("dodajOdeljenje");
                }

                


            })
        }
        else {
            p.text().then(data => {
                alert(data);
            })
        }
    })
            

}
    let divLekari = document.createElement("div");
    document.body.appendChild(divLekari);
    let dugmeLekari = document.createElement("button");
    dugmeLekari.innerHTML = "Lekari";
    divLekari.appendChild(dugmeLekari);
    dugmePovuci = document.createElement("button");
    dugmePovuci.innerHTML = "^";
    divLekari.appendChild(dugmePovuci);
    let divLekariTab = document.createElement("div");
    divLekariTab.className = "divLekariTab";
    divLekari.appendChild(divLekariTab);

    dugmePovuci.onclick = () => {
        divLekariTab.innerHTML = "";
    }

    dugmeLekari.onclick = () => {

        fetch("http://localhost:5001/GetAllLekar",
        {
            method:"GET",
        })
        .then(p => {
            if(p.status == 200){
                p.json().then(lekari=> {

                    divLekariTab.innerHTML = "";
                    let tabela = document.createElement("table");
                    tabela.className = "tabelaLekar1";
                    divLekariTab.appendChild(tabela);
                    let tr = document.createElement("tr");
                    tabela.appendChild(tr);
                    let heder = ["ime", "srednje slovo", "prezime", "pol", "datum rođenja", "jmbg", "broj lične karte", "broj telefona", "specijalnost", "broj ordinacije", "odeljenje"];
                    heder.forEach(h => {

                        let th = document.createElement("th");
                        th.innerHTML = h;
                        tr.appendChild(th);

                    })
                    lekari.forEach(lekar => {
                        fetch("http://localhost:5001/VratiOdeljenjeLekara/" + lekar.jmbg,
                            {
                                method:"GET",

                            }).then(r=>
                                {
                                    if(r.status==200) {
                                        r.json().then(odeljenje => {

                                            let l = new Lekar(lekar.ime, lekar.srednjeSlovo, lekar.prezime, lekar.pol, lekar.datumRodjenja, lekar.jmbg, lekar.brojLicneKarte, lekar.brojTelefona, lekar.specijalnost, lekar.brojKancelarije, odeljenje.tip, odeljenje.id);
                                            l.crtajRedTabele(divLekari, 1);
                                        })
                                    }
                                    else 
                                        r.text().then(data => {
                                            alert(data);
                                    })
                                })
                        

                    });

                    let divDugmeDodaj = document.createElement("div");
                    divLekariTab.appendChild(divDugmeDodaj);
                    let dugmeDodajLekara = document.createElement("button");
                    dugmeDodajLekara.innerHTML = "dodaj lekara";
                    divDugmeDodaj.appendChild(dugmeDodajLekara);

                    dugmeDodajLekara.onclick = () => {
                        crtajFormu("dodajLekara");
                    }

                    let divPretrazi = document.createElement("div");
                    divLekariTab.appendChild(divPretrazi);
                    let divIme = document.createElement("div");
                    divLekariTab.appendChild(divIme);
                    let labelaIme = document.createElement("label");
                    labelaIme.innerHTML = "Ime";
                    divIme.appendChild(labelaIme);
                    let inputIme = document.createElement("input");
                    inputIme.type = "text";
                    divIme.appendChild(inputIme);
                
                    let divPrezime = document.createElement("div");
                    divLekariTab.appendChild(divPrezime);
                    let labelaPrezime = document.createElement("label");
                    labelaPrezime.innerHTML = "Prezime";
                    divPrezime.appendChild(labelaPrezime);
                    let inputPrezime = document.createElement("input");
                    inputPrezime.type = "text";
                    divPrezime.appendChild(inputPrezime);
                
                    let divDugmePretrazi = document.createElement("div");
                    divLekariTab.appendChild(divDugmePretrazi);
                    let dugmePretrazi = document.createElement("button");
                    dugmePretrazi.innerHTML = "Pretraži doktora";
                    divDugmePretrazi.appendChild(dugmePretrazi);
                
                    dugmePretrazi.onclick = () => {
                        let tab = document.querySelector(".tab");
                        if(tab != null)
                            divLekariTab.removeChild(tab);
                        if (inputIme.value == "" || inputIme.value == null || inputIme.value == undefined) {
                            alert("Unesite ime");
                            return;
                        }
                        if (inputPrezime.value == "" || inputPrezime.value == null || inputPrezime.value == undefined) {
                            alert("Unesite prezime");
                            return;
                        }
                        fetch("http://localhost:5001/SearchLekar/" + inputIme.value + "/" + inputPrezime.value,
                        {
                            method:"GET",
                            headers:
                            {
                                "Accept": "application/json",
                                "Content-Type":"application/json"
                            },
                            }).then(r=>
                                {
                                    if(r.status==200)
                                    {
                                        r.json().then(lekari => {
                                            let tabelaPretrazi = document.createElement("div");
                                            tabelaPretrazi.className = "tab";
                                            divLekariTab.appendChild(tabelaPretrazi);
                                            tabelaPretrazi.innerHTML = "";
                                            let tabela = document.createElement("table");
                                            tabela.className = "tabelaLekar3";
                                            tabelaPretrazi.appendChild(tabela);
                                            let tr = document.createElement("tr");
                                            tabela.appendChild(tr);
                                            let heder = ["ime", "srednje slovo", "prezime", "pol", "datum rođenja", "jmbg", "broj lične karte", "broj telefona", "specijalnost", "broj ordinacije", "odeljenje"];
                                            heder.forEach(h => {

                                                let th = document.createElement("th");
                                                th.innerHTML = h;
                                                tr.appendChild(th);

                                            })
                                            lekari.forEach(lekar2 => {

                                                if (lekar2.length != 0) {
                                                    console.log(lekar2);
                                                    fetch("http://localhost:5001/VratiOdeljenjeLekara/" + lekar2.jmbg,
                                                    {
                                                        method:"GET",
                    
                                                    }).then(r=>
                                                        {
                                                            if(r.status==200) {
                                                                r.json().then(odeljenje => {
                    
                                                                    let l = new Lekar(lekar2.ime, lekar2.srednjeSlovo, lekar2.prezime, lekar2.pol, lekar2.datumRodjenja, lekar2.jmbg, lekar2.brojLicneKarte, lekar2.brojTelefona, lekar2.specijalnost, lekar2.brojKancelarije, odeljenje.tip, odeljenje.id);
                                                                    l.crtajRedTabele(tabelaPretrazi, 3);
                                                                })
                                                            }
                                                        else 
                                                            r.text().then(data => {
                                                                alert(data);
                                                        })
                                                    })
                                                }
                                                else {
                                                    alert("Ne postoji");
                                                }
                                            })
                
                                        })
                                    }
                                    else 
                                        r.text().then(data => {
                                            alert(data);
                                    })
                        })
                    }

                })
            }
            else {
                p.text().then(data => {
                    alert(data);
                })
            }
        })
        
    }


    let divMedSestre = document.createElement("div");
    document.body.appendChild(divMedSestre);
    let dugmeMedSestre = document.createElement("button");
    dugmeMedSestre.innerHTML = "Medicinske sestre";
    divMedSestre.appendChild(dugmeMedSestre);
    dugmePovuci = document.createElement("button");
    dugmePovuci.innerHTML = "^";
    divMedSestre.appendChild(dugmePovuci);
    let divMedSestreTab = document.createElement("div");
    divMedSestreTab.className = "divMedSestreTab";
    divMedSestre.appendChild(divMedSestreTab);

    dugmePovuci.onclick = () => {
        divMedSestreTab.innerHTML = "";
    }

    dugmeMedSestre.onclick = () => {

        fetch("http://localhost:5001/VratiSveMedicinskeSestre",
        {
            method:"GET",
        })
        .then(p => {
            if(p.status == 200){
                p.json().then(medSestre=> {

                    divMedSestreTab.innerHTML = "";
                    let tabela = document.createElement("table");
                    tabela.className = "tabelaMedSestre1";
                    divMedSestreTab.appendChild(tabela);
                    let tr = document.createElement("tr");
                    tabela.appendChild(tr);
                    let heder = ["ime", "srednje slovo", "prezime", "pol", "datum rođenja", "jmbg", "broj lične karte", "broj telefona", "odeljenje"];
                    heder.forEach(h => {

                        let th = document.createElement("th");
                        th.innerHTML = h;
                        tr.appendChild(th);

                    })
                    medSestre.forEach(medSestra => {
                        fetch("http://localhost:5001/VratiOdeljenjeMedSestre/" + medSestra.jmbg,
                            {
                                method:"GET",

                            }).then(r=>
                                {
                                    if(r.status==200) {
                                        r.json().then(odeljenje => {
                                            let ms = new MedicinskaSestra(medSestra.ime, medSestra.srednjeSlovo, medSestra.prezime, medSestra.pol, medSestra.datumRodjenja, medSestra.jmbg, medSestra.brojLicneKarte, medSestra.brojTelefona, odeljenje.tip);
                                            ms.crtajRedTabele(divMedSestre, 1);

                                        })
                                    }
                                    else 
                                        r.text().then(data => {
                                            alert(data);
                                    })
                                })

                        

                    });

                    let divDugmeDodaj = document.createElement("div");
                    divMedSestreTab.appendChild(divDugmeDodaj);
                    let dugmeDodajMedSestru = document.createElement("button");
                    dugmeDodajMedSestru.innerHTML = "dodaj medicinsku sestru";
                    divDugmeDodaj.appendChild(dugmeDodajMedSestru);

                    dugmeDodajMedSestru.onclick = () => {
                        crtajFormu("dodajMedSestru");
                    }

                    let divPretrazi = document.createElement("div");
                    divMedSestreTab.appendChild(divPretrazi);
                    let divIme = document.createElement("div");
                    divMedSestreTab.appendChild(divIme);
                    let labelaIme = document.createElement("label");
                    labelaIme.innerHTML = "Ime";
                    divIme.appendChild(labelaIme);
                    let inputIme = document.createElement("input");
                    inputIme.type = "text";
                    divIme.appendChild(inputIme);
                
                    let divPrezime = document.createElement("div");
                    divMedSestreTab.appendChild(divPrezime);
                    let labelaPrezime = document.createElement("label");
                    labelaPrezime.innerHTML = "Prezime";
                    divPrezime.appendChild(labelaPrezime);
                    let inputPrezime = document.createElement("input");
                    inputPrezime.type = "text";
                    divPrezime.appendChild(inputPrezime);
                
                    let divDugmePretrazi = document.createElement("div");
                    divMedSestreTab.appendChild(divDugmePretrazi);
                    let dugmePretrazi = document.createElement("button");
                    dugmePretrazi.innerHTML = "Pretraži medicinsku sestru";
                    divDugmePretrazi.appendChild(dugmePretrazi);
                
                    dugmePretrazi.onclick = () => {
                        let tab = document.querySelector(".tabMed");
                        if(tab != null)
                            divMedSestreTab.removeChild(tab);
                        if (inputIme.value == "" || inputIme.value == null || inputIme.value == undefined) {
                            alert("Unesite ime");
                            return;
                        }
                        if (inputPrezime.value == "" || inputPrezime.value == null || inputPrezime.value == undefined) {
                            alert("Unesite prezime");
                            return;
                        }
                        fetch("http://localhost:5001/SearchMedSestra/" + inputIme.value + "/" + inputPrezime.value,
                        {
                            method:"GET",
                            headers:
                            {
                                "Accept": "application/json",
                                "Content-Type":"application/json"
                            },
                            }).then(r=>
                                {
                                    if(r.status==200)
                                    {
                                        r.json().then(sestre => {
                                            let tabelaPretrazi = document.createElement("div");
                                            tabelaPretrazi.className = "tabMed";
                                            divMedSestreTab.appendChild(tabelaPretrazi);
                                            tabelaPretrazi.innerHTML = "";
                                            let tabela = document.createElement("table");
                                            tabela.className = "tabelaMedSestre3";
                                            tabelaPretrazi.appendChild(tabela);
                                            let tr = document.createElement("tr");
                                            tabela.appendChild(tr);
                                            let heder = ["ime", "srednje slovo", "prezime", "pol", "datum rođenja", "jmbg", "broj lične karte", "broj telefona", "odeljenje"];
                                            heder.forEach(h => {

                                                let th = document.createElement("th");
                                                th.innerHTML = h;
                                                tr.appendChild(th);

                                            })
                                            sestre.forEach(sestra => {

                                                if (sestra.length != 0) {
                                                    fetch("http://localhost:5001/VratiOdeljenjeMedSestre/" + sestra.jmbg,
                                                    {
                                                        method:"GET",
                    
                                                    }).then(r=>
                                                        {
                                                            if(r.status==200) {
                                                                r.json().then(odeljenje => {
                    
                                                                    let l = new MedicinskaSestra(sestra.ime, sestra.srednjeSlovo, sestra.prezime, sestra.pol, sestra.datumRodjenja, sestra.jmbg, sestra.brojLicneKarte, sestra.brojTelefona, odeljenje.tip);
                                                                    l.crtajRedTabele(tabelaPretrazi, 3);
                                                                })
                                                            }
                                                        else 
                                                            r.text().then(data => {
                                                                alert(data);
                                                        })
                                                    })
                                                }
                                                else {
                                                    alert("Ne postoji");
                                                }
                                            })
                
                                        })
                                    }
                                    else 
                                        r.text().then(data => {
                                            alert(data);
                                    })
                        })
                    }

                })
            }
            else {
                p.text().then(data => {
                    alert(data);
                })
            }
        })
    }

    let divPacijenti = document.createElement("div");
    document.body.appendChild(divPacijenti);
    let dugmePacijenti = document.createElement("button");
    dugmePacijenti.innerHTML = "Pacijenti";
    divPacijenti.appendChild(dugmePacijenti);
    dugmePovuci = document.createElement("button");
    dugmePovuci.innerHTML = "^";
    divPacijenti.appendChild(dugmePovuci);
    let divPacijentiTab = document.createElement("div");
    divPacijentiTab.className = "divPacijentiTab";
    divPacijenti.appendChild(divPacijentiTab);

    dugmePovuci.onclick = () => {
        divPacijentiTab.innerHTML = "";
    }

    dugmePacijenti.onclick = () => {

        fetch("http://localhost:5001/VratiSvePacijente",
        {
            method:"GET",
        })
        .then(p => {
            if(p.status == 200){
                p.json().then(pacijenti=> {

                    divPacijentiTab.innerHTML = "";
                    let tabela = document.createElement("table");
                    tabela.className = "tabelaPacijenti1";
                    divPacijentiTab.appendChild(tabela);
                    let tr = document.createElement("tr");
                    tabela.appendChild(tr);
                    let heder = ["ime", "srednje slovo", "prezime", "pol", "datum rođenja", "jmbg", "broj lične karte", "broj zdravstvene knjižice", "broj kartona"];
                    heder.forEach(h => {

                        let th = document.createElement("th");
                        th.innerHTML = h;
                        tr.appendChild(th);

                    })
                    pacijenti.forEach(pacijent => {
                        
                        let p = new Pacijent(pacijent.ime, pacijent.srednjeSlovo, pacijent.prezime, pacijent.pol, pacijent.datumRodjenja, pacijent.jmbg, pacijent.brojLicneKarte, pacijent.brojZdravstveneKnjizice, pacijent.brojKartona);
                        p.crtajRedTabele(divPacijenti, 1);


                        
                    });

                    let divDugmeDodaj = document.createElement("div");
                    divPacijentiTab.appendChild(divDugmeDodaj);
                    let dugmeDodajPacijenta = document.createElement("button");
                    dugmeDodajPacijenta.innerHTML = "dodaj pacijenta";
                    divDugmeDodaj.appendChild(dugmeDodajPacijenta);

                    dugmeDodajPacijenta.onclick = () => {
                        crtajFormu("dodajPacijenta");
                    }

                })
            }
            else {
                p.text().then(data => {
                    alert(data);
                })
            }
        })
    }
    let divPregledi1 = document.createElement("div");
    document.body.appendChild(divPregledi1);
    let dugmePregledi = document.createElement("button");
    dugmePregledi.innerHTML = "Prtraži preglede za pacijenta i lekara";
    divPregledi1.appendChild(dugmePregledi);
    dugmePovuci = document.createElement("button");
    dugmePovuci.innerHTML = "^";
    divPregledi1.appendChild(dugmePovuci);

    dugmePovuci.onclick = () => {
        let d = document.querySelector(".divv");
        if(d != null)
            divPregledi1.removeChild(d);
    }

    dugmePregledi.onclick = () => {

        let d = document.querySelector(".divv");
        if(d != null)
            divPregledi1.removeChild(d);
        let div = document.createElement("div");
        div.className = "divv";
        divPregledi1.appendChild(div);
        let divPacijent = document.createElement("div");
        div.appendChild(divPacijent);
        let labelaPacijent = document.createElement("label");
        labelaPacijent.innerHTML = "Pacijent";
        let inputPacijent = document.createElement("select");

        fetch("http://localhost:5001/VratiSvePacijente",
        {
            method:"GET",
        })
        .then(p => {
            if(p.status == 200){
                p.json().then(pacijenti=> {
                    pacijenti.forEach(pacijent => {
                        let option = document.createElement("option");
                        option.innerHTML = pacijent.ime + " " + pacijent.prezime;
                        option.id = pacijent.brojZdravstveneKnjizice;
                        inputPacijent.appendChild(option);
                    })
                                  
                })
            }
            else {
                p.text().then(data => {
                    alert(data);
                })
            }
    
        })
        divPacijent.appendChild(labelaPacijent);
        divPacijent.appendChild(inputPacijent);

        let divLekar = document.createElement("div");
        div.appendChild(divLekar);
        let labelaLekar = document.createElement("label");
        labelaLekar.innerHTML = "Lekar";
        let inputLekar = document.createElement("select");

        fetch("http://localhost:5001/GetAllLekar",
        {
            method:"GET",
        })
        .then(p => {
            if(p.status == 200){
                p.json().then(lekari=> {
                    lekari.forEach(lekar => {
                        let option = document.createElement("option");
                        option.innerHTML = lekar.ime + " " + lekar.prezime;
                        option.id = lekar.jmbg;
                        inputLekar.appendChild(option);
                    })
                                  
                })
            }
            else {
                p.text().then(data => {
                    alert(data);
                })
            }
    
        })
        divLekar.appendChild(labelaLekar);
        divLekar.appendChild(inputLekar);

        let divDugme = document.createElement("div");
        div.appendChild(divDugme);
        let dugme = document.createElement("button");
        dugme.innerHTML = "Pretraži";
        divDugme.appendChild(dugme);

        dugme.onclick = () => {

            let tl2 = document.querySelector(".divTabelaPP1");
            if (tl2 != null)
                div.removeChild(tl2);
            let tabela = document.createElement("table");
            tabela.className = "tabelaPP1";
            let divTabelaPP1 = document.createElement("div");
            divTabelaPP1.className = "divTabelaPP1";
            div.appendChild(divTabelaPP1);
            let labelaPP1 = document.createElement("label");
            labelaPP1.innerHTML = "Pregledi pacijenta:  " + inputPacijent.value + " i lekara " + inputLekar.value;
            divTabelaPP1.appendChild(labelaPP1);
            divTabelaPP1.appendChild(tabela);
            let tr = document.createElement("tr");
            tabela.appendChild(tr);
            let heder = ["datum", "razlog", "dijagnoza"];
            heder.forEach(h => {

                let th = document.createElement("th");
                th.innerHTML = h;
                tr.appendChild(th);

            })


            fetch("http://localhost:5001/GetAllPregledForPacijentAndLekar/" + inputPacijent.options[inputPacijent.selectedIndex].id + "/" + inputLekar.options[inputLekar.selectedIndex].id,
                {
                    method:"GET",

                }).then(r=>
                    {
                    if(r.status==200) {
                        r.json().then(pregledi => {
                            pregledi.forEach(pregled => {
                                
                                let pp = new Pregled(pregled.datumPregleda, pregled.razlog, pregled.dijagnoza, pregled.lekar);
                                pp.crtajRedTabele(div, 1);
                            })

                        })
                    }
                    else {
                        r.text().then(data => {
                            alert(data);
                        })
                    }
                })

        }
    }

    let divPregledi2 = document.createElement("div");
    document.body.appendChild(divPregledi2);
    let dugmePregledi2 = document.createElement("button");
    dugmePregledi2.innerHTML = "Prtraži preglede za pacijenta i odeljenje";
    divPregledi2.appendChild(dugmePregledi2);

    let dugmePovuci2 = document.createElement("button");
    dugmePovuci2.innerHTML = "^";
    divPregledi2.appendChild(dugmePovuci2);

    dugmePovuci2.onclick = () => {
        let d = document.querySelector(".divv2");
        if(d != null)
            divPregledi2.removeChild(d);
    }

    dugmePregledi2.onclick = () => {

        let d = document.querySelector(".divv2");
        if(d != null)
            divPregledi2.removeChild(d);
        let div = document.createElement("div");
        div.className = "divv2";
        divPregledi2.appendChild(div);
        let divPacijent = document.createElement("div");
        div.appendChild(divPacijent);
        let labelaPacijent = document.createElement("label");
        labelaPacijent.innerHTML = "Pacijent";
        let inputPacijent = document.createElement("select");

        fetch("http://localhost:5001/VratiSvePacijente",
        {
            method:"GET",
        })
        .then(p => {
            if(p.status == 200){
                p.json().then(pacijenti=> {
                    pacijenti.forEach(pacijent => {
                        let option = document.createElement("option");
                        option.innerHTML = pacijent.ime + " " + pacijent.prezime;
                        option.id = pacijent.brojZdravstveneKnjizice;
                        inputPacijent.appendChild(option);
                    })
                                    
                })
            }
            else {
                p.text().then(data => {
                    alert(data);
                })
            }
    
        })
        divPacijent.appendChild(labelaPacijent);
        divPacijent.appendChild(inputPacijent);

        let divLekar = document.createElement("div");
        div.appendChild(divLekar);
        let labelaLekar = document.createElement("label");
        labelaLekar.innerHTML = "Odeljenje";
        let inputLekar = document.createElement("select");

        fetch("http://localhost:5001/VratiSvaOdeljenja",
        {
            method:"GET",
        })
        .then(p => {
            if(p.status == 200){
                p.json().then(odeljenja=> {
                    odeljenja.forEach(odeljenje => {
                        let option = document.createElement("option");
                        option.innerHTML = odeljenje.tip;
                        option.id = odeljenje.id;
                        inputLekar.appendChild(option);
                    })
                                    
                })
            }
            else {
                p.text().then(data => {
                    alert(data);
                })
            }
    
        })
        divLekar.appendChild(labelaLekar);
        divLekar.appendChild(inputLekar);

        let divDugme = document.createElement("div");
        div.appendChild(divDugme);
        let dugme = document.createElement("button");
        dugme.innerHTML = "Pretraži";
        divDugme.appendChild(dugme);

        dugme.onclick = () => {

            let tl2 = document.querySelector(".divTabelaPP2");
            if (tl2 != null)
                div.removeChild(tl2);
            let tabela = document.createElement("table");
            tabela.className = "tabelaPP2";
            let divTabelaPP1 = document.createElement("div");
            divTabelaPP1.className = "divTabelaPP2";
            div.appendChild(divTabelaPP1);
            let labelaPP1 = document.createElement("label");
            labelaPP1.innerHTML = "Pregledi pacijenta:  " + inputPacijent.value + " i lekara " + inputLekar.value;
            divTabelaPP1.appendChild(labelaPP1);
            divTabelaPP1.appendChild(tabela);
            let tr = document.createElement("tr");
            tabela.appendChild(tr);
            let heder = ["datum", "razlog", "dijagnoza", "lekar"];
            heder.forEach(h => {

                let th = document.createElement("th");
                th.innerHTML = h;
                tr.appendChild(th);

            })


            fetch("http://localhost:5001/GetAllPregledForPacijentAndOdeljenje/" + inputPacijent.options[inputPacijent.selectedIndex].id + "/" + inputLekar.options[inputLekar.selectedIndex].id,
                {
                    method:"GET",

                }).then(r=>
                    {
                    if(r.status==200) {
                        r.json().then(pregledi => {
                            pregledi.forEach(pregled => {
                                
                                let pp = new Pregled(pregled.datumPregleda, pregled.razlog, pregled.dijagnoza, pregled.lekar);
                                pp.crtajRedTabele(div, 2);
                            })

                        })
                    }
                    else {
                        r.text().then(data => {
                            alert(data);
                        })
                    }
                })

        }
    }


    




