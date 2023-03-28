import { Pregled } from "./Pregled.js";
export class Pacijent {
    constructor(ime, srednjeSlovo, prezime, pol, datumRodjenja, jmbg, brojLicneKarte, brojZdravstveneKnjizice, brojKartona){
        this.ime = ime;
        this.srednjeSlovo = srednjeSlovo;
        this.prezime = prezime;
        this.pol = pol;
        this.datumRodjenja = datumRodjenja;
        this.jmbg = jmbg;
        this.brojLicneKarte = brojLicneKarte;                           
        this.brojZdravstveneKnjizice = brojZdravstveneKnjizice;
        this.brojKartona = brojKartona;
    }

    crtajRedTabele(host, n){

        //let divPacijentiTab = host.querySelector(".divPacijentiTab");
        let tabela = host.querySelector(".tabelaPacijenti" + n);
        let tr2 = document.createElement("tr");
        tabela.appendChild(tr2);
        let podaci = [this.ime, this.srednjeSlovo, this.prezime, this.pol, this.datumRodjenja, this.jmbg, this.brojLicneKarte, this.brojZdravstveneKnjizice, this.brojKartona];
        podaci.forEach((p ,index) => {


            let td = document.createElement("td");
            td.innerHTML = p;
            td.className = "td" + index;
            tr2.appendChild(td);
        })

        let td = document.createElement("td");
        tr2.appendChild(td);
        let buttonIzmeni = document.createElement("button");
        buttonIzmeni.innerHTML = "izmeni";
        td.appendChild(buttonIzmeni);

        /*td = document.createElement("td");
        tr2.appendChild(td);
        let buttonObrisi = document.createElement("button");
        buttonObrisi.innerHTML = "obriši";
        td.appendChild(buttonObrisi);*/

        let smestiPacijentaNaOdeljenje = document.createElement("button");
        if (n == 1) {

            td = document.createElement("td");
            tr2.appendChild(td);
            smestiPacijentaNaOdeljenje.innerHTML = "smesti";
            td.appendChild(smestiPacijentaNaOdeljenje);

        }

        td = document.createElement("td");
        tr2.appendChild(td);
        let otpusiPacijentaSaOdeljenje = document.createElement("button");
        otpusiPacijentaSaOdeljenje.innerHTML = "otpusti";
        td.appendChild(otpusiPacijentaSaOdeljenje);

        if (n == 1) {
            td = document.createElement("td");
            tr2.appendChild(td);
            let prikaziPreglede = document.createElement("button");
            prikaziPreglede.className = "prikaziPreglede";
            prikaziPreglede.innerHTML = "Prikaži sve preglede";
            td.appendChild(prikaziPreglede);

            prikaziPreglede.onclick = () => {
                let divPacijentiTab = host.querySelector(".divPacijentiTab")
                let tl2 = document.querySelector(".divTabelaPP2");
                if (tl2 != null)
                    divPacijentiTab.removeChild(tl2);
                let tabela2 = document.createElement("table");
                tabela2.className = "tabelaPP2";
                let divTabelaPP2 = document.createElement("div");
                divTabelaPP2.className = "divTabelaPP2";
                divPacijentiTab.appendChild(divTabelaPP2);
                let labelaPP = document.createElement("label");
                labelaPP.innerHTML = "Pregledi pacijenta:  " + this.ime + " " + this.prezime;
                divTabelaPP2.appendChild(labelaPP);
                divTabelaPP2.appendChild(tabela2);
                let tr = document.createElement("tr");
                tabela2.appendChild(tr);
                let heder = ["datum", "razlog", "dijagnoza", "lekar"];
                heder.forEach(h => {

                    let th = document.createElement("th");
                    th.innerHTML = h;
                    tr.appendChild(th);

                })

                fetch("http://localhost:5001/GetAllPregledForPacijent/" + this.brojZdravstveneKnjizice,
                {
                    method:"GET",

                }).then(r=>
                    {
                    if(r.status==200) {
                        r.json().then(pregledi => {
                            pregledi.forEach(pregled => {
                                
                                let pp = new Pregled(pregled.datumPregleda, pregled.razlog, pregled.dijagnoza, pregled.lekar);
                                pp.crtajRedTabele(host, 2);
                            })

                        })
                    }
                    else {

                        divPacijentiTab.removeChild(divTabelaPP2);
                        r.text().then(data => {
                            alert(data);
                        })
                    }
                })
            }

        }

        td = document.createElement("td");
        tr2.appendChild(td);
        let dodajPregled = document.createElement("button");
        dodajPregled.innerHTML = "Dodaj pregled";
        td.appendChild(dodajPregled);

        dodajPregled.onclick = () => {
            this.crtajFormu("dodajPregled", tr2, host);
        }

        buttonIzmeni.onclick = () => {
            this.crtajFormu("izmeniPacijenta", tr2);
        }

        smestiPacijentaNaOdeljenje.onclick = () => {
            this.crtajFormu("smestiPacijenta", tr2);
        }

        otpusiPacijentaSaOdeljenje.onclick = () => {

            if(n == 2){
                tabela.removeChild(tr2);

            }

            fetch("http://localhost:5001/VratiOdeljenjeNaKojeJeSmestenPacijent/" + this.brojZdravstveneKnjizice,
            {
                method:"GET",
            })
            .then(p => {
                if(p.status == 200){
                    p.json().then(odeljenje => {
                        console.log(odeljenje.tip);
                        fetch("http://localhost:5001/OtpustiPacijentaSaOdeljenja/" + this.brojZdravstveneKnjizice + "/" + odeljenje.id + "/" + "aaa",
                        {
                            method:"PUT",
                        })
                        .then(p => {
                            if(p.status == 200){
                                p.text().then(data => {
                                    alert(data);
                                                    
                                })
                            }
                            else {
                                p.text().then(data => {
                                    alert(data);
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

    crtajFormu(flag, tr2, hostHost){

            let zaBrisanje = document.querySelector(".dodajLekara");
            if(zaBrisanje != null){
                zaBrisanje.parentNode.removeChild(zaBrisanje);
            }
            let divGlavni = document.createElement("div");
            divGlavni.classList.add("dodajLekara");
            divGlavni.id = "dodajLekara";
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
            if (flag == "izmeniPacijenta")
                naslov.innerHTML = "Izmeni pacijenta";
            else if (flag == "smestiPacijenta")
                naslov.innerHTML = "Smesti pacijenta";
            else if (flag == "dodajPregled")
                naslov.innerHTML = "Dodaj pregled";
            naslov.className = "naslovLek";
            divForma.appendChild(naslov);
        
            let podaci = document.createElement("div");
            podaci.classList.add("podacii");
            divForma.appendChild(podaci);
        
            let host = document.createElement("div");
            host.className = "lekar";
            podaci.appendChild(host);

            if (flag == "izmeniPacijenta"){
                this.crtajIzmeniPacijenta(host, tr2);
            }
            if (flag == "smestiPacijenta"){
                this.crtajSmestiPacijenta(host);
            }
            if (flag == "dodajPregled"){
                this.crtajDodajPregled(host, hostHost);
            }


        }

        crtajIzmeniPacijenta(host, tr2) {

            let divBrojLicneKarte = document.createElement("div");
            host.appendChild(divBrojLicneKarte);
            let labelaBrojLicneKarte = document.createElement("label");
            labelaBrojLicneKarte.innerHTML = "Broj lične karte: " + this.brojLicneKarte ;
            let divBrojLicneKarte2 = document.createElement("div");
            host.appendChild(divBrojLicneKarte2);
            let labelaBrojLicneKarte2 = document.createElement("label");
            labelaBrojLicneKarte2.innerHTML = "Novi broj lične karte";
            divBrojLicneKarte.appendChild(labelaBrojLicneKarte);
            divBrojLicneKarte2.appendChild(labelaBrojLicneKarte2);
            let inputBrojLicneKarte = document.createElement("input");
            inputBrojLicneKarte.type = "text";
            divBrojLicneKarte2.appendChild(inputBrojLicneKarte);
            let dugmeIzmeniBLK = document.createElement("button");
            dugmeIzmeniBLK.innerHTML = "Izmeni broj lične karte";
            divBrojLicneKarte2.appendChild(dugmeIzmeniBLK);

            dugmeIzmeniBLK.onclick = () => {
                if(inputBrojLicneKarte.value == "" || inputBrojLicneKarte.value == null || inputBrojLicneKarte.value == undefined) {
                    alert("Unesi novi broj lične karte");
                    return;
                }
                let pacijent = {
                    "jmbg": this.jmbg,
                    "brojLicneKarte" : inputBrojLicneKarte.value
                }
                let selektor = ".td" + 6;
                this.izmeni(pacijent, selektor, inputBrojLicneKarte, tr2);
            }

            let divBrojKartona = document.createElement("div");
            host.appendChild(divBrojKartona);
            let labelaBrojKartona = document.createElement("label");
            labelaBrojKartona.innerHTML = "Broj kartona: " + this.brojKartona;
            let divBrojKartona2 = document.createElement("div");
            host.appendChild(divBrojKartona2);
            let labelaBrojKartona2 = document.createElement("label");
            labelaBrojKartona2.innerHTML = "Novi broj kartona";
            let inputBrojKartona = document.createElement("input");
            inputBrojKartona.type = "number";
            divBrojKartona.appendChild(labelaBrojKartona);
            divBrojKartona2.appendChild(labelaBrojKartona2);
            divBrojKartona2.appendChild(inputBrojKartona);
            let dugmeIzmeniBK = document.createElement("button");
            dugmeIzmeniBK.innerHTML = "Izmeni broj kartona";
            divBrojKartona2.appendChild(dugmeIzmeniBK);

            dugmeIzmeniBK.onclick = () => {
                if(inputBrojKartona.value <= 0 || inputBrojKartona.value == "" || inputBrojKartona.value == null || inputBrojKartona.value == undefined) {
                    alert("Unesi novi broj kartona");
                    return;
                }
                let lekar = {
                    "jmbg": this.jmbg,
                    "brojKartona" : inputBrojKartona.value
                }
                let selektor = ".td" + 8;
                this.izmeni(lekar, selektor, inputBrojKartona, tr2);
            }

    }

    izmeni(pacijent, selektor, input, tr2) {
        fetch("http://localhost:5001/UpdatePacijent",
        {
            method:"PUT",
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
                    alert("Uspešno izmenjen pacijent");
                    let divGlavni = document.querySelector(".dodajLekara");
                    divGlavni.parentNode.removeChild(divGlavni);
                    let td = tr2.querySelector(selektor);
                    td.innerHTML = input.value;


                }
                else 
                    r.text().then(data => {
                        alert(data);
                })
            })
    }

    crtajSmestiPacijenta(host) {

        let divSmestiOdeljenje = document.createElement("div");
        host.appendChild(divSmestiOdeljenje);
        let labelaSmestiOdeljenje = document.createElement("label");
        labelaSmestiOdeljenje.innerHTML = "Odeljenje:";
        let divSmestiOdeljenje2 = document.createElement("div");
        host.appendChild(divSmestiOdeljenje2);
        let selectOdeljenje = document.createElement("select");
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
                            option.id = o.id;
                            selectOdeljenje.appendChild(option);
                        })
                                      
                    })
                }
                else {
                    p.text().then(data => {
                        alert(data);
                    })
                }
        
            })
        divSmestiOdeljenje2.appendChild(selectOdeljenje);
        let dugmeSmesti = document.createElement("button");
        dugmeSmesti.innerHTML = "Smesti";
        divSmestiOdeljenje2.appendChild(dugmeSmesti);

        dugmeSmesti.onclick = () => {
            fetch("http://localhost:5001/SmestiPacijentaNaOdeljenje/" + this.brojZdravstveneKnjizice + "/" + selectOdeljenje.options[selectOdeljenje.selectedIndex].id,
            {
                method:"PUT",
            })
            .then(p => {
                if(p.status == 200){
                    p.text().then(data => {
                        alert(data);
                                      
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

    crtajDodajPregled(host, hostHost) {

        let divDijagnoza = document.createElement("div");
        host.appendChild(divDijagnoza);
        let labelaDijagnoza = document.createElement("label");
        labelaDijagnoza.innerHTML = "Dijagnoza";
        let inputDijagnoza = document.createElement("input");
        inputDijagnoza.type = "text";
        divDijagnoza.appendChild(labelaDijagnoza);
        divDijagnoza.appendChild(inputDijagnoza);

        let divRazlog = document.createElement("div");
        host.appendChild(divRazlog);
        let labelaRazlog = document.createElement("label");
        labelaRazlog.innerHTML = "Razlog";
        let inputRazlog = document.createElement("input");
        inputRazlog.type = "text";
        divRazlog.appendChild(labelaRazlog);
        divRazlog.appendChild(inputRazlog);

        let divLekar = document.createElement("div");
        host.appendChild(divLekar);
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
        divDugme.className = "Dugme";
        host.appendChild(divDugme);
        let dugme = document.createElement("button");
        dugme.innerHTML = "Dodaj";
        divDugme.appendChild(dugme);

        dugme.onclick = () => {

            if (inputDijagnoza.value == "" || inputDijagnoza.value == null || inputDijagnoza.value == undefined) {
                alert("Unesite dijagnozu");
                return;
            }
    
            if (inputRazlog.value == "" || inputRazlog.value == null || inputRazlog.value == undefined) {
                alert("Unesite razlog");
                return;
            }
    
            fetch("http://localhost:5001/AddPregled/" + inputDijagnoza.value + "/" + inputRazlog.value + "/" + this.brojZdravstveneKnjizice + "/" + inputLekar.options[inputLekar.selectedIndex].id,
            {
                method:"POST",
                headers:
                {
                    "Accept": "application/json",
                    "Content-Type":"application/json"
                },
            }).then(r=>
                {
                    if(r.status==200)
                    {
                        alert("Uspešno dodat pregled");
                        let divGlavni = document.querySelector(".dodajLekara");
                        divGlavni.parentNode.removeChild(divGlavni);

                        const date = new Date();

                        let day = date.getDate() + "";
                        let month = date.getMonth() + 1 + "";
                        let year = date.getFullYear() + "";
                        if(day.length == 1)
                            day = 0 + day;
                        if(month.length == 1)
                            month = 0 + month;
                        let currentDate = day + "." + month + "." + year + ".";
                        let pp = new Pregled(currentDate, inputRazlog.value, inputDijagnoza.value, inputLekar.value);
                        pp.crtajRedTabele(hostHost, 2);
                    }
                    else 
                        r.text().then(data => {
                            alert(data);
                    })
                })
        }
    }
}
