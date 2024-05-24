//! jobConf.js
//! version : 0
//! authors : Schumann
//! license : MIT
//! SSErp.com
//! incorporate main cookie functions

// window.onload in js file will be directly called when copyAndCreateCheckLog
// window.onload = function() {
//     console.log("------------- You see me first -------------");
//     focusEmpId;
// };

$(document).ready(
    function(){
        document.getElementById("emplId").focus();
    }
);

$(document).ready(
    function(){
        $('input:radio[name=checkResult]').change(function(){
            if(this.value == 'NOT_COMPARED' || this.value == 'PASS'){
                $('input:radio[name=logType][value="QLT_NORMAL"]').prop("checked","checked");
            }else{
                $('input:radio[name=logType][value="QLT_NC"]').prop("checked","checked");
            }
        });
    }
);

function focusEmpId() {
    document.getElementById("emplId").focus();
}

function focusCheckLogRemarks() {
    document.getElementById("remarks").focus();
}

function validateCheckQty(e) {
    var inputCheckQty = $("#checkQty").val();
    var totalQty = $("#totalQty").val();
    if (parseFloat(inputCheckQty) > parseFloat(totalQty)) {
        // TODO: check if emplId is a valid Id
        alert("Error: Check Qty is not allowed to be bigger than Total Qty!");
    }
}

function preValidateCheckResult(e) {
    var checkValDim = $("#checkValDim").val();
    // console.log("--------------Sarah--------------");
    // console.log(checkValDim);
    var pointId = $("#pointId").val();

    if (isNaN(checkValDim)){
        alert("Please provide the input as a number");
        return false;
    }

    if (pointId.length < 1){
        alert("Please provide a check point Id");
        return false;
    }

    var args = {"checkValDim": checkValDim, "pointId": pointId};
    var jqxhr = $.getJSON("/quality/control/numTypeCheckResult",
        args,
        function (data) {
            $.each(data.numTypeCheckResult, function (i, item) {
                if (item.CHECK_RESULT == "BAD"){
                    $("#numPreValResult").val("BAD");
                    $('input:radio[name=logType][value="QLT_NC"]').prop("checked","checked");
                }else{
                    $("#numPreValResult").val("GOOD");
                    $('input:radio[name=logType][value="QLT_NORMAL"]').prop("checked","checked");
                }
            });
        });
}

function checkIfCanCreateCheckLog(){
    // first to validate emplId
    var emplId = $("#emplId").val();
    if (emplId.length < 1) {
        alert("Employee Id could not be empty!");
        return false;
    }
    
    // then to validate checkResult could not be NOT_COMPARED when it is not a NUM_TYPE
    var nonNumCheckResult = $('input:radio[name=checkResult]:checked').val();
    var checkValDimForNonNum = $("#checkValDim").val();
    if (checkValDimForNonNum.length < 1){
        alert("Please input a checked dimension before creating!");
        return false;
    }

    if (nonNumCheckResult == "NOT_COMPARED" && checkValDimForNonNum == "No_Need_For_Value") {
        alert("You must select a check result other than NOT_COMPARED for Non_Num_Type Check Point!");
        return false;
    } else {
        if (nonNumCheckResult == "FAIL" && checkValDimForNonNum == "No_Need_For_Value") {
            $('input:radio[name=logType][value="QLT_NC"]').prop("checked","checked");
        }
        if (nonNumCheckResult == "PASS" && checkValDimForNonNum == "No_Need_For_Value") {
            $('input:radio[name=logType][value="QLT_NORMAL"]').prop("checked","checked");
        }
    }

    // if checkQty + totalCheckedQty > totalQty then fail
    var checkQty = $("#checkQty").val();
    var totalCheckedQty = $("#totalCheckedQty").val();
    var totalQty = $("#totalQty").val();
    // console.log("----------------qty-------------");
    // console.log(checkQty);
    // console.log(totalCheckedQty);
    // console.log(totalQty);

    var logType = $('input:radio[name=logType]:checked').val();
    if (logType == "QLT_NORMAL") {
        // the following is replaced because it is not real-time checking
        // if (parseFloat(checkQty) + parseFloat(totalCheckedQty) > parseFloat(totalQty)) {
        //     alert("Error in check qty more than total qty!");
        //     return false;
        // }

        // Schumann TODO:   to check real-time the totalCheckQty 
        //                  so as to avoid over-booked checked Qty
        var argsCQ = {"orderId": $("#orderId").val(), "pointId": $('#pointId').val(), "checkQty":$("#checkQty").val()};
        var jqxhrCQ = $.getJSON("/quality/control/validateOrderPointCheckedQty",
                argsCQ,
                function (data) {
                    $.each(data.cqByOrderPoint, function (i, item) {
                        if (item.CHECKED_QTY_RESULT !== "GOOD"){
                            alert("Posted cheked Qty could not be more than Total Allowed Qty!");
                            return false;
                        } else {
                            // Start checking emplId and create
                            var args = {"emplId": emplId};
                            var jqxhr = $.getJSON("/quality/control/validateAxEmployee",
                                args,
                                function (data) {
                                    $.each(data.cpAxEmployee, function (i, item) {
                                        if (item.FULL_NAME !== "FOUND"){
                                            alert("Employee Id is not valid or has been deactivated!");
                                            return false;
                                        }else{
                                            createQualityCheckLog();
                                        }
                                    });
                                });
                            // End checking emplId and create
                        }
                    });
                });
    } else {
        if (parseFloat(checkQty) > parseFloat(totalQty)) {
            alert("Error in check qty more than total qty!");
            return false;
        } else {
            // Start checking emplId and create
            var args = {"emplId": emplId};
            var jqxhr = $.getJSON("/quality/control/validateAxEmployee",
                args,
                function (data) {
                    $.each(data.cpAxEmployee, function (i, item) {
                        if (item.FULL_NAME !== "FOUND"){
                            alert("Employee Id is not valid or has been deactivated!");
                            return false;
                        }else{
                            createQualityCheckLog();
                        }
                    });
                });
            // End checking emplId and create
        }
    }
}

function createQualityCheckLog(){
    location.reload();
    var checkValDim = $("#checkValDim").val();
    if (checkValDim == "No_Need_For_Value") {
        checkValDim = 0;
    }

    var args = {"totalQty": $("#totalQty").val(), "checkQty": $("#checkQty").val(), "checkValDim": checkValDim, 
                "pointId": $('#pointId').val(), "orderId": $("#orderId").val(), "emplId": $("#emplId").val(), 
                "ncrDetailId": $("#ncrDetailId").val(), "sourceType": $("#sourceType").val(), "remarks": $("#remarks").val(), 
                "createdByUserLogin": $("#createdByUserLogin").val(), "checkResult": $('input:radio[name=checkResult]:checked').val(), 
                "createdStamp": $("#createdStamp").val(), "logType":$('input:radio[name=logType]:checked').val()};
    var jqxhr = $.getJSON("/quality/control/CopyCreateNewCheckLog",
                args,
                function (data) {
                    $.each(data.iAmFake, function (i, item) {
                        // do nothing
                    });
                });
}