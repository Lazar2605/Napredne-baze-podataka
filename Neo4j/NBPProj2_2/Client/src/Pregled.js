export class Pregled {
    constructor(datum, razlog, dijagnoza, lekar){
        this.datum = datum;
        this.razlog = razlog;
        this.dijagnoza = dijagnoza;
        this.lekar = lekar;
    }

    crtajRedTabele(host, n){

        //let divLekariTab = host.querySelector(".divLekariTab");
        let tabela = host.querySelector(".tabelaPP" + n);
        if(tabela == null)
            return;
        let tr2 = document.createElement("tr");
        tr2.className = "tr2";
        tabela.appendChild(tr2);
        let podaci;
        if(n == 2)
            podaci = [this.datum, this.razlog, this.dijagnoza, this.lekar];
        else if (n == 1)
            podaci = [this.datum, this.razlog, this.dijagnoza];
        podaci.forEach((p, index) => {
            let td = document.createElement("td");
            td.innerHTML = p;
            td.className = "td" + index;
            tr2.appendChild(td);
        })
    }


}