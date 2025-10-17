function getAllTecnicos(codTecnico) {
    $.ajax({
        url: "https://unfurbished-elissa-dcollet.ngrok-free.dev/APITecnicos-NoSQL/tecnicos",
        type: "GET",
        dataType: "json",
        success: function(datos) {
            const tablaTecnicos = datos.data.find(item => item.type === "table" && item.name === "tecnicos");
            if (tablaTecnicos && Array.isArray(tablaTecnicos.data)) {
                const tecnicoEncontrado = tablaTecnicos.data.find(t => t.codTecnico === codTecnico);

                if (tecnicoEncontrado) {
                    console.log("Código correcto, técnico encontrado:", tecnicoEncontrado);
                    localStorage.setItem("nombreTecnico", tecnicoEncontrado.nombreCompleto);
                    localStorage.setItem("codTecnico", tecnicoEncontrado.codTecnico);
                    cambiarTectoTecnico(tecnicoEncontrado);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Código incorrecto",
                        text: "El código ingresado es incorrecto"
                    });
                }
            } else {
                console.error("No se encontró la tabla de técnicos o formato incorrecto.");
            }
        },
        error: function(xhr, status, error) {
            console.error("Error en la solicitud:", status, error);
        }
    });
}

function enviar(codTecnico, nombreTecnico, importe, delegacion, fecha, alimento, ticket) {
    console.log(codTecnico);
    console.log(nombreTecnico);
    console.log(importe);
    console.log(fecha);
    console.log(alimento);
    console.log(ticket);
    console.log(delegacion);

    const formData = new FormData();
    formData.append("codigoEmpleado", codTecnico); 
    formData.append("nombreTecnico", nombreTecnico);
    formData.append("delegacion", delegacion);      
    formData.append("importe", importe);
    formData.append("fecha", fecha);
    formData.append("imagenAlimento", alimento);
    formData.append("imagenTicket", ticket);

    $.ajax({
        url: "https://unfurbished-elissa-dcollet.ngrok-free.dev/APITecnicos-NoSQL/gastos",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            if (response.status === "success") {
                  Swal.fire({
                    icon: "success",
                    title: "Éxito",
                    text: "Se han ingresado los datos correctamente"
                });
            } else {
                alert("Error: " + response.message);
            }
        },
        error: function (xhr, status, error) {
            console.error("error", status, error);
            alert("Error al enviar los datos");
        }
    });
}