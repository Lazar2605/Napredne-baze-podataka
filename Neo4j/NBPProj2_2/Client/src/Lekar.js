export class Lekar {
    constructor(ime, srednjeSlovo, prezime, pol, datumRodjenja, jmbg, brojLicneKarte, brojTelefona, specijalnost, brojKancelarije, odeljenje, odeljenjeID){
        this.ime = ime;
        this.srednjeSlovo = srednjeSlovo;
        this.prezime = prezime;
        this.pol = pol;
        this.datumRodjenja = datumRodjenja;
        this.jmbg = jmbg;
        this.brojLicneKarte = brojLicneKarte;
        this.brojTelefona = brojTelefona;
        this.specijalnost = specijalnost;
        this.brojKancelarije = brojKancelarije;
        this.odeljenje = odeljenje;
        this.odeljenjeID = odeljenjeID;
    }

    crtajRedTabele(host, n){

        //let divLekariTab = host.querySelector(".divLekariTab");
        let tabela = host.querySelector(".tabelaLekar" + n);
        let tr2 = document.createElement("tr");
        tr2.className = "tr2";
        tabela.appendChild(tr2);
        let podaci = [this.ime, this.srednjeSlovo, this.prezime, this.pol, this.datumRodjenja, this.jmbg, this.brojLicneKarte, this.brojTelefona, this.specijalnost, this.brojKancelarije, this.odeljenje];
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
        let buttonObrisi = document.createElement("button");
        buttonObrisi.innerHTML = "obriši";
        td.appendChild(buttonObrisi);

        if(n == 2) {

            let tdN = document.createElement("td");
            tdN.className = "tdN";
            let nacelnik = document.createElement("button");
            let nijeNacelnik = document.createElement("button");
    
            nacelnik.onclick = () => {
                let nac = document.querySelector(".nijeNacelnik" + this.odeljenje);
                if(nac != null)
                    nac.click();
                fetch("http://localhost:5001/PostaviLekaraZaNacelnika/" + this.odeljenjeID + "/" + this.jmbg,
                {
                    method:"PUT",
                }).then(r=>
                    {
                        if(r.status==200)
                        {
                            r.text().then(data => {
                                alert(data);
                            })
    
                            nijeNacelnik.innerHTML = "smeni načelnika";
                            nijeNacelnik.className = "nijeNacelnik" + this.odeljenje;
                            tdN.appendChild(nijeNacelnik);
                            tdN.removeChild(nacelnik);
                            console.log(nac);
    
                        }
                        else 
                            r.text().then(data => {
                                alert(data);
                        })
                    })
            }
    
            nijeNacelnik.onclick = () => {
                fetch("http://localhost:5001/SmeniNacelnika/" + this.odeljenjeID + "/" + this.jmbg,
                {
                    method:"DELETE",
                }).then(r=>
                    {
                        if(r.status==200)
                        {
                            r.text().then(data => {
                                alert(data);
                            })
                            
                            nacelnik.innerHTML = "postavi za načelnika";
                            nacelnik.className = "nacelnik" + this.odeljenje;
                            tdN.appendChild(nacelnik);
                            tdN.removeChild(nijeNacelnik);
                        }
                        else 
                            r.text().then(data => {
                                alert(data);
                        })
                    })
            }
    
    
    
    
            fetch("http://localhost:5001/LekarJeNacelnik/" + this.jmbg,
            {
                method:"GET",
            }).then(r=>
                {
                    if(r.status==200)
                    {
                        r.text().then(data => {
                            if(data == "false"){
    
                                tr2.appendChild(tdN);
                                nacelnik.innerHTML = "postavi za načelnika";
                                nacelnik.className = "nacelnik" + this.odeljenje;
                                tdN.appendChild(nacelnik);
                            }
                            else{
    
                                tr2.appendChild(tdN);
                                nijeNacelnik.innerHTML = "smeni načelnika";
                                nijeNacelnik.className = "nijeNacelnik" + this.odeljenje;
                                tdN.appendChild(nijeNacelnik);
                            }
                        })
                    }
                    else 
                        r.text().then(data => {
                            alert(data);
                    })
                })
    
                buttonIzmeni.onclick = () => {
                
                this.crtajFormu("izmeniLekara", tr2)
            }
        }

        buttonObrisi.onclick = () => {
            var result = confirm("Da li ste sigurni?");
            if(result == false){
                event.preventDefault();
            }
            else {
                
                fetch("http://localhost:5001/DeleteLekar/" + this.jmbg,
                {
                    method:"DELETE",
                }).then(r=>
                    {
                        if(r.status==200)
                        {
                            alert("Uspešno izbrisan lekar");
                            tr2.innerHTML = "";
    
    
                        }
                        else 
                            r.text().then(data => {
                                alert(data);
                        })
                    })
            }
        }
    }

    postaviZaNacelnika() {

        fetch("http://localhost:5001/PostaviLekaraZaNacelnika/" + this.odeljenjeID + "/" + this.jmbg,
        {
            method:"PUT",
        }).then(r=>
            {
                if(r.status==200)
                {
                    r.text().then(data => {
                        alert(data);
                    })
                    

                }
                else 
                    r.text().then(data => {
                        alert(data);
                })
            })
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
            naslov.innerHTML = "Izmeni lekara";
            naslov.className = "naslovLek";
            divForma.appendChild(naslov);
        
            let podaci = document.createElement("div");
            podaci.classList.add("podacii");
            divForma.appendChild(podaci);
        
            let host = document.createElement("div");
            host.className = "lekar";
            podaci.appendChild(host);

            if (flag == "izmeniLekara"){
                this.crtajIzmeniLekara(host, tr2);
            }


        }

        crtajIzmeniLekara(host, tr2) {

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
                let lekar = {
                    "jmbg": this.jmbg,
                    "brojLicneKarte" : inputBrojLicneKarte.value
                }
                let selektor = ".td" + 6;
                this.izmeni(lekar, selektor, inputBrojLicneKarte, tr2);
            }

            let divBrojTelefona = document.createElement("div");
            host.appendChild(divBrojTelefona);
            let labelaBrojTelefona = document.createElement("label");
            labelaBrojTelefona.innerHTML = "Broj telefona: " + this.brojTelefona;
            let divBrojTelefona2 = document.createElement("div");
            host.appendChild(divBrojTelefona2);
            let labelaBrojTelefona2 = document.createElement("label");
            labelaBrojTelefona2.innerHTML = "Novi broj telefona";
            let inputBrojTelefona = document.createElement("input");
            inputBrojTelefona.type = "text";
            divBrojTelefona.appendChild(labelaBrojTelefona);
            divBrojTelefona2.appendChild(labelaBrojTelefona2);
            divBrojTelefona2.appendChild(inputBrojTelefona);
            let dugmeIzmeniBT = document.createElement("button");
            dugmeIzmeniBT.innerHTML = "Izmeni broj telefona";
            divBrojTelefona2.appendChild(dugmeIzmeniBT);

            dugmeIzmeniBT.onclick = () => {
                if(inputBrojTelefona.value == "" || inputBrojTelefona.value == null || inputBrojTelefona.value == undefined) {
                    alert("Unesi novi broj telefona");
                    return;
                }
                let lekar = {
                    "jmbg": this.jmbg,
                    "brojTelefona" : inputBrojTelefona.value
                }
                let selektor = ".td" + 7;
                this.izmeni(lekar, selektor, inputBrojTelefona, tr2);
            }

            let divOrdinacije = document.createElement("div");
            host.appendChild(divOrdinacije);
            let labelaBrojOrdinacije = document.createElement("label");
            labelaBrojOrdinacije.innerHTML = "Broj ordinacije: " + this.brojKancelarije;
            let divOrdinacije2 = document.createElement("div");
            host.appendChild(divOrdinacije2);
            let labelaBrojOrdinacije2 = document.createElement("label");
            labelaBrojOrdinacije2.innerHTML = "Novi broj ordinacije";
            let inputBrojOrdinacije = document.createElement("input");
            inputBrojOrdinacije.type = "number";
            divOrdinacije.appendChild(labelaBrojOrdinacije);
            divOrdinacije2.appendChild(labelaBrojOrdinacije2);
            divOrdinacije2.appendChild(inputBrojOrdinacije);
            let dugmeIzmeniBO = document.createElement("button");
            dugmeIzmeniBO.innerHTML = "Izmeni broj ordinacije";
            divOrdinacije2.appendChild(dugmeIzmeniBO);

            dugmeIzmeniBO.onclick = () => {
                if(inputBrojOrdinacije.value == "" || inputBrojOrdinacije.value == null || inputBrojOrdinacije.value == undefined) {
                    alert("Unesi novi broj ordinacije");
                    return;
                }
                let lekar = {
                    "jmbg": this.jmbg,
                    "brojKancelarije" : inputBrojOrdinacije.value
                }
                let selektor = ".td" + 9;
                this.izmeni(lekar, selektor, inputBrojOrdinacije, tr2);
            }


    }

    izmeni(lekar, selektor, input, tr2) {
        fetch("http://localhost:5001/UpdateLekar",
        {
            method:"PUT",
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
                    alert("Uspešno izmenjen lekar");
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