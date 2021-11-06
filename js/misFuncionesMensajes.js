function getInfoMessage() {
    $.ajax({
        url: "http://localhost:8080/api/Message/all",
        //url:"http://155.248.195.219:8080/api/Message/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            showInfoMessage(respuesta);
        }
    });
}
function showInfoMessage(items) {
    let myTable = "<table>";
    myTable += "<tr>";
    myTable += "<th>Cliente</th>";
    myTable += "<th>Juego</th>";
    myTable += "<th>Mensage</th>";
    myTable += "<th>Editar</th>";
    myTable += "<th>Borrar</th>";
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + items[i].client.name + "</td>";
        myTable += "<td>" + items[i].game.name + "</td>";
        myTable += "<td>" + items[i].messageText + "</td>";
        myTable += "<td> <button onclick='preUpdateMessage(" + items[i].idMessage + ")'>Editar</button>";
        myTable += "<td> <button onclick='deleteInfoMessage(" + items[i].idMessage + ")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoMensajes").html(myTable);
}
function saveInfoMessage() {
    if ($("#msMensaje").val().length == 0 || $("#msClId").val().length == 0
        || $("#msGameId").val().length == 0) {
        alert("Todos los campos son obligatorios");
    } else {
        let myData = {
            messageText: $("#msMensaje").val(),
            client: { idClient: + $("#msClId").val() },
            game: { id: + $("#msGameId").val() },
        };
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "http://localhost:8080/api/Message/save",
            //url:"http://155.248.195.219:8080/api/Message/save",
            datatype: "JSON",
            data: JSON.stringify(myData),

            success: function (respuesta) {
                $("#resultadoMensajes").empty();
                $("#msMensaje").val("");
                $("#msClId").val("");
                $("#msGameId").val("");
                getInfoMessage();
                alert("Se ha GUARDADO la categoria en la base de datos")
            }
        });
    }
}
function preUpdateMessage(idMensaje) {
    $.ajax({
        url: "http://localhost:8080/api/Message/" + idMensaje,
        //url:"http://155.248.195.219:8080/api/Message/"+idMensaje, 
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#msId").val(respuesta.idMessage);
            $("#msMensaje").val(respuesta.messageText);
            //$("#msClId").val(respuesta.client.name);
            //$("#msGameId").val(respuesta.game.name);
            $("#resultadoMensajes").empty();
            $("#btnCrearMensaje").css('visibility', 'hidden');
            $("#btnActualizarMensaje").css('visibility', 'visible');
            alert("ACTUALIZA la informacion del mensaje en el formulario")
        }
    });

}
function updateInfoMessage() {
    if ($("#msId").val().length == 0 || $("#msMensaje").val().length == 0) {
        alert("Todos los campos son obligatorios");
    } else {
        let myData = {
            idMessage: $("#msId").val(),
            messageText: $("#msMensaje").val(),
        };
        console.log(myData);
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://localhost:8080/api/Message/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuesta) {
                $("#resultadoMensajes").empty();
                $("#msId").val("");
                $("#msMensaje").val("");
                $("#btnCrearMensaje").css('visibility', 'visible');
                $("#btnActualizarMensaje").css('visibility', 'hidden');
                getInfoMessage();
                alert("Se ha ACTUALIZADO los datos del mensaje")
            }
        });
    }
}
function deleteInfoMessage(idMensaje) {
    $.ajax({
        url: "http://localhost:8080/api/Message/" + idMensaje,
        //url:"http://155.248.195.219:8080/api/Message/"+idMensaje, 
        type: "DELETE",

        success: function (respuesta) {
            $("#resultadoMensajes").empty();
            getInfoMessage();
            alert("Se ha ELIMINADO el mensaje de la base de datos.")
        }
    });
}

function autoInitClient() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://localhost:8080/api/Client/all",
        //url:"http://155.248.195.219:8080/api/Client/all
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            let $select = $("#msClId");
            $.each(respuesta, function (id, name) {
                $select.append('<option value=' + name.idClient + '>' + name.name + '</option>');
                console.log("select " + name.idClient);
            });
        }

    })
}
function autoInitGame() {
    console.log("se esta ejecutando")
    $.ajax({
        url: "http://localhost:8080/api/Game/all",
        //url:"http://155.248.195.219:8080/api/Game/all
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            let $select = $("#msGameId");
            $.each(respuesta, function (id, name) {
                $select.append('<option value=' + name.id + '>' + name.name + '</option>');
                console.log("select " + name.id);
            });
        }

    })
}