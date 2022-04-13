    /* TODO: inserite il codice JavaScript necessario a completare il MHW! */

    //creo una mappa con i nomi delle varie personalita e un numero associato (quante volte vengono scelte) da usare per trovare la personalità più frequente
    const personalita = {'blep' : 0, 'burger' : 0, 'cart': 0, 'dopey': 0, 'happy': 0, 'nerd': 0, 'shy': 0, 'sleeping': 0, 'sleepy': 0};

    //salverà i nomi delle personalità scelte dall'uente cliccando, per adesso è "vuoto"
    let risposte_date = ["one", "two", "three"];

    //titolo e contenuto della risposta da visualizzare in base ai click dell'utente
    let title = document.querySelector("h2");
    let contents = document.querySelector("p");  


//azzera i valori e ripulisce la pagina come se fosse stata ricaricata
    function reset()
    {
        for(const blocco of blocchi)
        {
            const image = blocco.querySelector(".checkbox");
            image.src = "./images/unchecked.png";
            blocco.classList.remove("overlay");
            blocco.classList.remove(".checkbox");
            blocco.classList.remove("risposta_scelta");
            blocco.addEventListener("click", modifica_blocchi);

        }

       //riporto ai valori iniziali il vettore e la mappa 
       risposte_date = ["one", "two", "three"];
              
       for(let nome_personalita in personalita)
       {
           personalita[nome_personalita] = 0;
       }

       //fa sparire nuovamente il blocco risposte

       const blocco_risposta = document.querySelector("#result");
       blocco_risposta.classList.add("hidden");

       title.innerHTML = " ";
       contents.innerHTML = " ";

    }

//restituisce la personalità più scelta dall'utente oppure quella corrispondente alla prima immagine cliccata se sono tutte diverse
    function trovaPersonalita()
    {
        for(let i=0; i<3; i++)
        {
            personalita[risposte_date[i]]++;
        }

       for(let nome_personalita in personalita)
       {
           if(personalita[nome_personalita] > 1)
           {
               return nome_personalita;
           }

           return risposte_date[0];
       }
    }


 //una volta cliccato un blocco per risponedere, attiva tutte le modifiche necessarie
    function modifica_blocchi(event)
    {
        const risposta = event.currentTarget;
        image = risposta.querySelector(".checkbox");
        image.src = "./images/checked.png";
                        
                        
        risposta.classList.add("risposta_scelta");
        const risposte = document.querySelectorAll(".choice-grid div");
                

        for(const risposta_scartata of risposte)
        {
            if(risposta_scartata !== risposta && risposta_scartata.dataset.questionId === risposta.dataset.questionId)  //modifica le immagini solo se non sono quella cliccata e fanno parte dellla stessa domanda
            {
                risposta_scartata.classList.add("overlay");
            
                //per modificare di nuovo se si cambia risposta
                 risposta_scartata.classList.remove("risposta_scelta");
                 risposta_scartata.addEventListener("click", modifica_blocchi);
            
                image_scartata = risposta_scartata.querySelector(".checkbox");
                image_scartata.src = "./images/unchecked.png";
            
                risposta.classList.remove("overlay");
            }   
        }

//aggiorna il vettore di risposte con quelle dell'utente
        for(let i=0; i<3; i++)
        {
            if(risposte_date[i] === risposta.dataset.questionId)
            {
                risposte_date[i] = risposta.dataset.choiceId;
            }
        }

//se ha risposto a tutto, l'utente non può più cliccare 
        if(risposte_date[0] !== "one" && risposte_date[1] !== "two" && risposte_date[2] !== "three")
        {
             for(const blocco of blocchi)
            {
                blocco.removeEventListener("click", modifica_blocchi);
            }

                const blocco_risposta = document.querySelector(".hidden");
                blocco_risposta.classList.remove("hidden");

                const personalita = trovaPersonalita();

                 title.append(RESULTS_MAP[personalita].title);
                 contents.append(RESULTS_MAP[personalita].contents);
            
        }

                const button = document.querySelector("button");
                button.addEventListener("click", reset);
    }


    //permette di ascoltare il click in ogni punto della griglia
    const blocchi = document.querySelectorAll(".choice-grid div");

    for(const blocco of blocchi)
    {
        blocco.addEventListener("click", modifica_blocchi);
    }


