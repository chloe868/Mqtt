$(document).ready(function() {
    var topic1 = $("#Topic").val();
    $("#btnDisconnect").click(function() {
        client.end();
        //  $("button").attr("disable", true);
        alert("session ended");
        $("#checkStatus").val("Disconnected !");
        location.reload();
    })
    $("#btnConnect").click(function() {
        //$("button").attr("disable", false);
        // console.log($("#Address").val());
        client = mqtt.connect($("#Address").val())

        client.on("connect", function() {
            $("#checkStatus").val("Connected !");
            console.log("successfully connected");
        })
        subs = false;
        $("#btnPublish").click(function() {

            var topic = $("#Topic").val();
            var payload = $("#Payload").val();
            var row = "<tr><td>" + topic + "</td><td>" + payload + "</td><td>" + moment().format('MMMM Do YYYY, h:mm:ss a') + "</td></tr>";
            $("#tbpublish").append(row);
            subs = true;

            client.publish(topic, payload)
        })

        $("#btnSubscribe").click(function() {
            var topic = $("#SubTopic").val();
            var row = "<tr><td>" + topic + "</td><td>" + moment().format('MMMM Do YYYY, h:mm:ss a') + "</td></tr>";
            $("#tbsubscribe").append(row);
            $("#btnPublish").click(function() {
                var payload = $("#Payload").val();
                if (topic == topic1) {
                    var row = "<tr><td>" + topic + "</td><td>" + payload + "</td><td>" + moment().format('MMMM Do YYYY, h:mm:ss a') + "</td></tr>";
                    $("#tbbroker").append(row);
                }

            });
            topic1 = $("#Topic").val();

            client.subscribe(topic)
            client.on("message", function(topic, payload) {
                console.log([topic, payload].join(": "));
            })

        })
        $("#btnUnsubscribe").click(function() {
            var topic = $("#SubTopic").val();
            client.unsubscribe(topic)
            topic1 = "";

        })

    })
})