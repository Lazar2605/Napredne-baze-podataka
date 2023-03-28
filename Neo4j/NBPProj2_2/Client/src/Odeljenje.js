import { Lekar } from "./Lekar.js";
import { MedicinskaSestra } from "./MedicinskaSestra.js";
import { Pacijent } from "./Pacijent.js";
export class Odeljenje {
    constructor(id, tip, kapacitet, brojZauzetihMesta, vremePosete, sprat){
        this.id = id;
        this.tip = tip;
        this.kapacitet =  kapacitet;
        this.brojZauzetihMesta = brojZauzetihMesta;
        this.vremePosete = vremePosete;
        this.sprat = sprat;
    }

    crtajRedTabele(host) {

        let divOdeljenjaTab = host.querySelector(".divOdeljenjaTab");
        let tabela = divOdeljenjaTab.querySelector(".tabelaOdeljenje");
        let tr2 = document.createElement("tr");
        tabela.appendChild(tr2);
        let podaci = [this.tip, this.kapacitet, this.brojZauzetihMesta, this.vremePosete, this.sprat];
        podaci.forEach((p, index) => {


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

        td = document.createElement("td");
        tr2.appendChild(td);
        let prikaziSveLekare = document.createElement("button");
        prikaziSveLekare.innerHTML = "prikaži sve lekare";
        td.appendChild(prikaziSveLekare);

        prikaziSveLekare.onclick = () => {
            let tl2 = document.querySelector(".divTabelaL2");
            if (tl2 != null)
                divOdeljenjaTab.removeChild(tl2);
            let tabela = document.createElement("table");
            tabela.className = "tabelaLekar2";
            let divTabela2 = document.createElement("div");
            divTabela2.className = "divTabelaL2";
            divOdeljenjaTab.appendChild(divTabela2);
            let labelaL = document.createElement("label");
            labelaL.innerHTML = "Lekari na odeljenju " + this.tip + ":";
            divTabela2.appendChild(labelaL);
            divTabela2.appendChild(tabela);
            let tr = document.createElement("tr");
            tabela.appendChild(tr);
            let heder = ["ime", "srednje slovo", "prezime", "pol", "datum rođenja", "jmbg", "broj lične karte", "broj telefona", "specijalnost", "broj ordinacije", "odeljenje"];
            heder.forEach(h => {

                let th = document.createElement("th");
                th.innerHTML = h;
                tr.appendChild(th);

            })
            fetch("http://localhost:5001/GetAllLekarFromOdeljenje/" + this.id,
            {
                method:"GET",

            }).then(r=>
                {
                    if(r.status==200) {
                        r.json().then(lekari => {
                            lekari.forEach(lekar => {
                                let l = new Lekar(lekar.ime, lekar.srednjeSlovo, lekar.prezime, lekar.pol, lekar.datumRodjenja, lekar.jmbg, lekar.brojLicneKarte, lekar.brojTelefona, lekar.specijalnost, lekar.brojKancelarije, this.tip, this.id);
                                l.crtajRedTabele(host, 2);
                                
                            })

                        })
                    }
                    else 
                        r.text().then(data => {
                            alert(data);
                    })
                })
        }

        td = document.createElement("td");
        tr2.appendChild(td);
        let prikaziSestre = document.createElement("button");
        prikaziSestre.innerHTML = "prikaži sve sestre";
        td.appendChild(prikaziSestre);

        prikaziSestre.onclick = () => {
            let tl2 = document.querySelector(".divTabelaS2");
            if (tl2 != null)
                divOdeljenjaTab.removeChild(tl2);
            let tabela = document.createElement("table");
            tabela.className = "tabelaMedSestre2";
            let divTabelaS2 = document.createElement("div");
            divTabelaS2.className = "divTabelaS2";
            divOdeljenjaTab.appendChild(divTabelaS2);
            let labelaS = document.createElement("label");
            labelaS.innerHTML = "Medicinske sestre na odeljenju " + this.tip + ":";
            divTabelaS2.appendChild(labelaS);
            divTabelaS2.appendChild(tabela);
            let tr = document.createElement("tr");
            tabela.appendChild(tr);
            let heder = ["ime", "srednje slovo", "prezime", "pol", "datum rođenja", "jmbg", "broj lične karte", "broj telefona", "odeljenje"];
            heder.forEach(h => {

                let th = document.createElement("th");
                th.innerHTML = h;
                tr.appendChild(th);

            })

            fetch("http://localhost:5001/GetAllMedicinskaSestraFromOdeljenje/" + this.id,
                {
                    method:"GET",

                }).then(r=>
                    {
                        if(r.status==200) {
                            r.json().then(medSestre => {
                                medSestre.forEach(medSestra => {
                                    
                                    let ms = new MedicinskaSestra(medSestra.ime, medSestra.srednjeSlovo, medSestra.prezime, medSestra.pol, medSestra.datumRodjenja, medSestra.jmbg, medSestra.brojLicneKarte, medSestra.brojTelefona, this.tip);
                                    ms.crtajRedTabele(host, 2);
                                })

                            })
                        }
                        else 
                            r.text().then(data => {
                                alert(data);
                        })
                    })

        }

        td = document.createElement("td");
        tr2.appendChild(td);
        let prikaziPacijente = document.createElement("button");
        prikaziPacijente.innerHTML = "prikaži sve pacijente";
        td.appendChild(prikaziPacijente);

        prikaziPacijente.onclick = () => {
            let tl2 = document.querySelector(".divTabelaP2");
            if (tl2 != null)
                divOdeljenjaTab.removeChild(tl2);
            let tabela = document.createElement("table");
            tabela.className = "tabelaPacijenti2";
            let divTabelaP2 = document.createElement("div");
            divTabelaP2.className = "divTabelaP2";
            divOdeljenjaTab.appendChild(divTabelaP2);
            let labelaP = document.createElement("label");
            labelaP.innerHTML = "Pacijenti na odeljenju " + this.tip + ":";
            divTabelaP2.appendChild(labelaP);
            divTabelaP2.appendChild(tabela);
            let tr = document.createElement("tr");
            tabela.appendChild(tr);
            let heder = ["ime", "srednje slovo", "prezime", "pol", "datum rođenja", "jmbg", "broj lične karte", "broj zdravstvene knjižice", "broj kartona"];
            heder.forEach(h => {

                let th = document.createElement("th");
                th.innerHTML = h;
                tr.appendChild(th);

            })

            fetch("http://localhost:5001/GetAllPacijent/" + this.id,
                {
                    method:"GET",

                }).then(r=>
                    {
                    if(r.status==200) {
                        r.json().then(pacijenti => {
                            pacijenti.forEach(pacijent => {
                                
                                let p = new Pacijent(pacijent.ime, pacijent.srednjeSlovo, pacijent.prezime, pacijent.pol, pacijent.datumRodjenja, pacijent.jmbg, pacijent.brojLicneKarte, pacijent.brojZdravstveneKnjizice, pacijent.brojKartona);
                                p.crtajRedTabele(host, 2);
                            })

                        })
                    }
                    else 
                        r.text().then(data => {
                            alert(data);
                    })
                })
        }

        buttonIzmeni.onclick = () => {
            
            this.crtajFormu("izmeniOdeljenje", tr2)
        }
    }

    crtajFormu(flag, tr2){

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
            naslov.innerHTML = "Izmeni odeljenje";
            naslov.className = "naslovLek";
            divForma.appendChild(naslov);
        
            let podaci = document.createElement("div");
            podaci.classList.add("podacii");
            divForma.appendChild(podaci);
        
            let host = document.createElement("div");
            host.className = "lekar";
            podaci.appendChild(host);

            if (flag == "izmeniOdeljenje"){
                this.crtajIzmeniOdeljenje(host, tr2);
            }


        }

        crtajIzmeniOdeljenje(host, tr2) {

            let divKapacitet = document.createElement("div");
            host.appendChild(divKapacitet);
            let labelaKapacitet = document.createElement("label");
            labelaKapacitet.innerHTML = "Kapacitet: " + this.kapacitet ;
            let divKapacitet2 = document.createElement("div");
            host.appendChild(divKapacitet2);
            let labelaKapacitet2 = document.createElement("label");
            labelaKapacitet2.innerHTML = "Novi kapacitet";
            divKapacitet.appendChild(labelaKapacitet);
            divKapacitet2.appendChild(labelaKapacitet2);
            let inputKapacitet = document.createElement("input");
            inputKapacitet.type = "number";
            divKapacitet2.appendChild(inputKapacitet);
            let dugmeIzmeniKap = document.createElement("button");
            dugmeIzmeniKap.innerHTML = "Izmeni kapacitet";
            divKapacitet2.appendChild(dugmeIzmeniKap);

            dugmeIzmeniKap.onclick = () => {
                if(inputKapacitet.value <= 0 || inputKapacitet.value == "" || inputKapacitet.value == null || inputKapacitet.value == undefined) {
                    alert("Unesi novi kapacitet");
                    return;
                }
                let odeljenje = {
                    "id": this.id,
                    "kapacitet" : inputKapacitet.value
                }
                let selektor = ".td" + 1;
                this.izmeni(odeljenje, selektor, inputKapacitet, tr2);
            }

            let divVremePosete = document.createElement("div");
            host.appendChild(divVremePosete);
            let labelaVremePosete = document.createElement("label");
            labelaVremePosete.innerHTML = "Vreme posete: " + this.vremePosete;
            let divVremePosete2 = document.createElement("div");
            host.appendChild(divVremePosete2);
            let labelaVremePosete2 = document.createElement("label");
            labelaVremePosete2.innerHTML = "Novo vreme za posete";
            let inputVremePosete = document.createElement("input");
            inputVremePosete.type = "text";
            divVremePosete.appendChild(labelaVremePosete);
            divVremePosete2.appendChild(labelaVremePosete2);
            divVremePosete2.appendChild(inputVremePosete);
            let dugmeIzmeniVP = document.createElement("button");
            dugmeIzmeniVP.innerHTML = "Izmeni vreme posete";
            divVremePosete2.appendChild(dugmeIzmeniVP);

            dugmeIzmeniVP.onclick = () => {
                if(inputVremePosete.value == "" || inputVremePosete.value == null || inputVremePosete.value == undefined) {
                    alert("Unesi novo vreme posete");
                    return;
                }
                let odeljenje = {
                    "id": this.id,
                    "vremePosete" : inputVremePosete.value
                }
                let selektor = ".td" + 3;
                this.izmeni(odeljenje, selektor, inputVremePosete, tr2);
            }

            let divSprat = document.createElement("div");
            host.appendChild(divSprat);
            let labelaSprat = document.createElement("label");
            labelaSprat.innerHTML = "Sprat: " + this.sprat ;
            let divSprat2 = document.createElement("div");
            host.appendChild(divSprat2);
            let labelaSprat2 = document.createElement("label");
            labelaSprat2.innerHTML = "Novi sprat";
            divSprat.appendChild(labelaSprat);
            divSprat2.appendChild(labelaSprat2);
            let inputSprat = document.createElement("input");
            inputSprat.type = "number";
            divSprat2.appendChild(inputSprat);
            let dugmeIzmeniSprat = document.createElement("button");
            dugmeIzmeniSprat.innerHTML = "Izmeni sprat";
            divSprat2.appendChild(dugmeIzmeniSprat);

            dugmeIzmeniSprat.onclick = () => {
                if(inputSprat.value <= 0 || inputSprat.value == "" || inputSprat.value == null || inputSprat.value == undefined) {
                    alert("Unesi novi sprat");
                    return;
                }
                let odeljenje = {
                    "id": this.id,
                    "sprat" : inputSprat.value
                }
                let selektor = ".td" + 4;
                this.izmeni(odeljenje, selektor, inputSprat, tr2);
            }


    }

    izmeni(odeljenje, selektor, input, tr2) {
        fetch("http://localhost:5001/UpdateOdeljenje",
        {
            method:"PUT",
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
                    alert("Uspešno izmenjeno odeljenje");
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
        
    
    
}
