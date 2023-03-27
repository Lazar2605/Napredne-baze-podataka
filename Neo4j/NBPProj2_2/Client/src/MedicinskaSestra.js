export class MedicinskaSestra {
    constructor(ime, srednjeSlovo, prezime, pol, datumRodjenja, jmbg, brojLicneKarte, brojTelefona, odeljenje){
        this.ime = ime;
        this.srednjeSlovo = srednjeSlovo;
        this.prezime = prezime;
        this.pol = pol;
        this.datumRodjenja = datumRodjenja;
        this.jmbg = jmbg;
        this.brojLicneKarte = brojLicneKarte;
        this.brojTelefona = brojTelefona;
        this.odeljenje = odeljenje;
    }

    crtajRedTabele(host, n) {
        //let divMedSestre = host.querySelector(".divMedSestreTab");
        let tabela = host.querySelector(".tabelaMedSestre" + n);
        let tr2 = document.createElement("tr");
        tabela.appendChild(tr2);
        let podaci = [this.ime, this.srednjeSlovo, this.prezime, this.pol, this.datumRodjenja, this.jmbg, this.brojLicneKarte, this.brojTelefona, this.odeljenje];
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



        tr2.appendChild(td);

        buttonIzmeni.onclick = () => {
            
            this.crtajFormu("izmeniSestru", tr2)
        }

        buttonObrisi.onclick = () => {
            var result = confirm("Da li ste sigurni?");
            if(result == false){
                event.preventDefault();
            }
            else {
                
                fetch("http://localhost:5001/DeleteMedicinskaSestra/" + this.jmbg,
                {
                    method:"DELETE",
                }).then(r=>
                    {
                        if(r.status==200)
                        {
                            alert("Uspešno izbrisana medicinska sestra");
                            tr2.innerHTML = "";
    
    
                        }
                        else 
                            r.text().then(data => {
                                alert(data);
                        })
                    })
            }
        }

        let tdN = document.createElement("td");
        tdN.className = "tdN";
        let glavna = document.createElement("button");
        let nijeGlavna = document.createElement("button");

        glavna.onclick = () => {
            let gl = document.querySelector(".nijeGlavna" + this.odeljenje);
            if(gl != null)
                gl.click();
            fetch("http://localhost:5001/PostaviSestruZaGlavnu/" + this.jmbg,
            {
                method:"PUT",
            }).then(r=>
                {
                    if(r.status==200)
                    {
                        r.text().then(data => {
                            alert(data);
                        })

                        nijeGlavna.innerHTML = "smeni sestru sa pozicije glavne";
                        nijeGlavna.className = "nijeGlavna" + this.odeljenje;
                        tdN.appendChild(nijeGlavna);
                        tdN.removeChild(glavna);
                        console.log(gl);

                    }
                    else 
                        r.text().then(data => {
                            alert(data);
                    })
                })
        }

        nijeGlavna.onclick = () => {
            fetch("http://localhost:5001/SmeniSestruSaPozicijeGlavnaSestra/" + this.jmbg,
            {
                method:"PUT",
            }).then(r=>
                {
                    if(r.status==200)
                    {
                        r.text().then(data => {
                            alert(data);
                        })
                        
                        glavna.innerHTML = "postavi za glavnu";
                        glavna.className = "glavna" + this.odeljenje;
                        tdN.appendChild(glavna);
                        tdN.removeChild(nijeGlavna);
                    }
                    else 
                        r.text().then(data => {
                            alert(data);
                    })
                })
        }
        fetch("http://localhost:5001/SestraJeGlavna/" + this.jmbg,
        {
            method:"GET",
        }).then(r=>
            {
                if(r.status==200)
                {
                    r.text().then(data => {
                        if(data == "false"){

                            tr2.appendChild(tdN);
                            glavna.innerHTML = "postavi za glavnu";
                            glavna.className = "glavna" + this.odeljenje;
                            tdN.appendChild(glavna);
                        }
                        else{

                            tr2.appendChild(tdN);
                            nijeGlavna.innerHTML = "smeni sestru sa pozicije glavne";
                            nijeGlavna.className = "nijeGlavna" + this.odeljenje;
                            tdN.appendChild(nijeGlavna);
                        }
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
            naslov.innerHTML = "Izmeni medicinsku sestru";
            naslov.className = "naslovMedSes";
            divForma.appendChild(naslov);
        
            let podaci = document.createElement("div");
            podaci.classList.add("podacii");
            divForma.appendChild(podaci);
        
            let host = document.createElement("div");
            host.className = "lekar";
            podaci.appendChild(host);

            if (flag == "izmeniSestru"){
                this.crtajIzmeniSestru(host, tr2);
            }


        }

        crtajIzmeniSestru(host, tr2) {

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
                let medSestra = {
                    "jmbg": this.jmbg,
                    "brojLicneKarte" : inputBrojLicneKarte.value
                }
                let selektor = ".td" + 6;
                this.izmeni(medSestra, selektor, inputBrojLicneKarte, tr2);
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
                let medSestra = {
                    "jmbg": this.jmbg,
                    "brojTelefona" : inputBrojTelefona.value
                }
                let selektor = ".td" + 7;
                this.izmeni(medSestra, selektor, inputBrojTelefona, tr2);
            }

            let divOdeljenje = document.createElement("div");
            host.appendChild(divOdeljenje);
            let labelaOdeljenje = document.createElement("label");
            labelaOdeljenje.innerHTML = "Odeljenje: " + this.odeljenje;
            let divOdeljenje2 = document.createElement("div");
            host.appendChild(divOdeljenje2);
            let labelaOdeljenje2 = document.createElement("label");
            labelaOdeljenje2.innerHTML = "Novo odeljenje";
            let inputOdeljenje = document.createElement("select");

            fetch("http://localhost:5001/VratiSvaOdeljenja",
            {
                method:"GET",
            })
            .then(p => {
                if(p.status == 200){
                    p.json().then(odeljenja=> {
                        odeljenja.forEach(o => {
                            if (o.tip != this.odeljenje){
                                let option = document.createElement("option");
                                option.innerHTML = o.tip;
                                option.id = o.id;
                                inputOdeljenje.appendChild(option);

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
        


            divOdeljenje.appendChild(labelaOdeljenje);
            divOdeljenje2.appendChild(labelaOdeljenje2);
            divOdeljenje2.appendChild(inputOdeljenje);

            let dugmeIzmeniOdeljenje = document.createElement("button");
            dugmeIzmeniOdeljenje.innerHTML = "Izmeni odeljenje";
            divOdeljenje2.appendChild(dugmeIzmeniOdeljenje);

            dugmeIzmeniOdeljenje.onclick = () => {
                
            fetch("http://localhost:5001/SestraJeGlavna/" + this.jmbg,
            {
                method:"GET",
            }).then(r=>
                {
                    if(r.status==200)
                    {
                        r.text().then(data => {
                            if(data == "true"){
                                alert("Sestra je glavna na ovom odeljenju! Moraš je prvo smeniti da bi prešla na drugo!");
                                
                            }
                            else{

                                fetch("http://localhost:5001/ChangeOdeljenjeMedSestra/" + inputOdeljenje.options[inputOdeljenje.selectedIndex].id + "/" + this.jmbg,
                                {
                                    method:"PUT",
                                }).then(r=>
                                    {
                                        if(r.status==200)
                                        {
                                            alert("Uspešno izmenjeno odeljenje medicinske sestre");
                
                                            let divGlavni = document.querySelector(".dodajLekara");
                                            divGlavni.parentNode.removeChild(divGlavni);
                                            let td = tr2.querySelector(".td8");
                                            td.innerHTML = inputOdeljenje.value;
                        
                        
                                        }
                                        else 
                                            r.text().then(data => {
                                                alert(data);
                                        })
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
        }

    izmeni(lekar, selektor, input, tr2) {
        fetch("http://localhost:5001/UpdateMedicinskaSestra",
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
                    alert("Uspešno izmenjena medicinska sestra");
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