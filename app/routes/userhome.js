import Route from '@ember/routing/route';
import CONFIG from 'supplychain-1/config/environment';
export default Route.extend({
    model() {
        this.controllerFor('userhome').set('showlogin', false);

        var mycontroller = this;
        var mydata = [];
        $.ajax({
            url: CONFIG.GOURL + '/readIndex',
            type: 'GET',
            contentType: 'application/json',
            success: function(data) {
                // var message = response.message;
                console.log(JSON.stringify(data));
                mydata = data.message;
                console.log("mydata", mydata);
                /*mycontroller.controllerFor('userhome').set("myarray", myarray);
                mycontroller.controllerFor('userhome').set("data", message);
                console.log("length " + message.length);*****/
                if (mydata.length >= 0) {
                    return $.ajax({
                        url: CONFIG.GOURL + '/readAllRequest',
                        type: 'GET',
                        contentType: 'application/json',
                        success: function(data) {
                            // var message = response.message;
                            console.log(JSON.stringify(data));
                            var mydetails = data.message;
                            console.log("trasationdetails-----", mydetails);
                            // console.log("materialtype-->",JSON.stringify(mydetails[0].Record.transactionlist[0].transactiondetails.materialtype));
                            // console.log("materialtype-->",JSON.stringify(mydetails[0].Key));
                            mycontroller.controllerFor('userhome').set("mydetails", mydetails);
                            var showrecord = [];
                            var mystatus;
                            for (var i = 0; i < mydetails.length; i++) {

                                for (var j = 0; j < mydetails[i].Record.transactionlist.length; j++) {
                                    /// console.log("2---stausarray");
                                    var listarray = (mydetails[i].Record.transactionlist).slice(-1);
                                        mystatus = listarray[0].transactiondetails.status;
                                        break;
                                }

                                showrecord.push({
                                    "key": mydetails[i].Key,
                                    "myrecord": mydetails[i].Record.transactionlist[0],
                                    "mystatus": mystatus
                                });
                                console.log("showrecord----", showrecord);
                                mycontroller.controllerFor('userhome').set("showrecord", showrecord);
                            }



                        },
                        error: function(response) {
                            console.log('DEBUG: GET Enquiries Failed');
                            console.log("Error Message: ", data.message);

                        }


                    });
                }
            },
            error: function(response) {
                console.log('DEBUG: GET Enquiries Failed');
                console.log("Error Message: ", data.message);

            }

        });




    }
});