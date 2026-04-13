function mostrar(id){
    document.querySelectorAll(".pantalla").forEach(p=>{
        p.classList.remove("activa");
    });
    document.getElementById(id).classList.add("activa");
}

// DIARIO
function guardarDiario(){
    let texto=document.getElementById("textoDiario").value;

    if(texto.trim()===""){
        alert("Escribe algo 😅");
        return;
    }

    let entradas=JSON.parse(localStorage.getItem("diario"))||[];

    let fecha=new Date().toLocaleString();

    entradas.push({texto,fecha});

    localStorage.setItem("diario",JSON.stringify(entradas));

    document.getElementById("textoDiario").value="";

    mostrarDiario();
}

function mostrarDiario(){
    let lista=document.getElementById("listaDiario");
    lista.innerHTML="";

    let entradas=JSON.parse(localStorage.getItem("diario"))||[];

    entradas.slice().reverse().forEach((e,index)=>{
        let div=document.createElement("div");
        div.classList.add("entrada");

        div.innerHTML=`
        <strong>${e.fecha}</strong><br>
        ${e.texto}<br><br>
        <button onclick="eliminarEntrada(${index})">🗑</button>
        `;

        lista.appendChild(div);
    });
}

function eliminarEntrada(index){
    let entradas=JSON.parse(localStorage.getItem("diario"))||[];

    entradas.splice(entradas.length-1-index,1);

    localStorage.setItem("diario",JSON.stringify(entradas));

    mostrarDiario();
}

// GRAFICA
window.onload=function(){
    mostrarDiario();

    const ctx=document.getElementById("grafica");

    if(ctx){
        new Chart(ctx,{
            type:'line',
            data:{
                labels:['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],
                datasets:[{
                    data:[6,7,5,9,6,7,8],
                    borderColor:'#ff4da6',
                    backgroundColor:'rgba(255,77,166,0.2)',
                    tension:0.4,
                    fill:true
                }]
            }
        });
    }
};