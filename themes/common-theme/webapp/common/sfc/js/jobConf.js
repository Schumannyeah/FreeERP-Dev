//! jobConf.js
//! version : 0
//! authors : Schumann
//! license : MIT
//! SSErp.com
//! incorporate main cookie functions

function setFocusToOpId() {
    $("#machineSetup").val(0);
    $("#unqualifiedQty").val(0);
    $("#output").val(0);

    var opId = getCookie("opId");
    $("#codeNr").val(opId);

    document.getElementById("codeNr").focus();
}

function focusEmpId() {
    document.getElementById("empId").focus();
}

function focusOutput() {
    document.getElementById("output").focus();
}

function checkIfCanCreate() {
    var postQty = parseFloat($("#output").val());
    var unqualifiedQty = parseFloat($("#unqualifiedQty").val());
    var limitQty = parseFloat($("#outputLimit").val());
    var strItemName = $("#faufItemName").val();
    var itemNameLength = strItemName.length;
    var confType = $('input:radio[name=confType]:checked').val();
    var qtyType = $('input:radio[name=zeroQtyType]:checked').val();

    var codeNr = $("#codeNr").val();
    var purifiedCodeNr = "";
    var first2Char = codeNr.substring(0, 2);
    if (first2Char == "K-") {
        purifiedCodeNr = codeNr.substring(2, 1000);
    } else {
        purifiedCodeNr = codeNr;
    }

    if (limitQty == 0) {
        alert("Warning! The confirmed qty is less than allowed-to-be-confirmed qty!");
        if (qtyType == "QT_DEFAU") {
            alert("For Zero Qty Output, you MUST select the Qty Type as Rework or Wrong Input By Other in order to proceed with confirmation!");
            location.reload();
        } else {
            if ($("#empName").val() == "Wrong Employee Id") {
                alert("Job Confirmation is NOT allowed for invalid Emp Name!");
                location.reload();
            } else {
                // if the final input para are not the same as orginal 
                // update aborted
                if ($("#empId").val() != $("#orgEmpId").val()) {
                    alert("Job Confirmation is NOT allowed for Emp Name Change!");
                    location.reload();
                } else {
                    if (purifiedCodeNr != $("#orgCodeNr").val()) {
                        alert("Job Confirmation is NOT allowed for Op Id Change!");
                        location.reload();
                    } else {
                        if (itemNameLength < 1) {
                            alert("Job Confirmation is NOT allowed for invalid Op Id!");
                            location.reload();
                        } else {
                            if (confType == "JC_NONET") {
                                alert("Network failure! Please fill it in again!");
                                location.reload();
                            } else {
                                $("#output").val(0);
                                createJobConfirmation();
                            }
                        }
                    }
                }
            }
        }
    } else {
        if (postQty + unqualifiedQty <= limitQty) {
            if ($("#empName").val() == "Wrong Employee Id") {
                alert("Job Confirmation is NOT allowed for invalid Emp Name!");
                location.reload();
            } else {
                // if the final input para are not the same as orginal 
                // update aborted
                if ($("#empId").val() != $("#orgEmpId").val()) {
                    alert("Job Confirmation is NOT allowed for Emp Name Change!");
                    location.reload();
                } else {
                    if (purifiedCodeNr != $("#orgCodeNr").val()) {
                        alert("Job Confirmation is NOT allowed for Op Id Change!");
                        location.reload();
                    } else {
                        if (itemNameLength < 1) {
                            alert("Job Confirmation is NOT allowed for invalid Op Id!");
                            location.reload();
                        } else {
                            if (confType == "JC_NONET") {
                                alert("Network failure! Please fill it in again!");
                                location.reload();
                            } else {
                                if (qtyType == "QT_REWRK" || qtyType == "QT_WRONG") {
                                    alert("When allowed-to-be-confirmed Qty is bigger than 0, Qty Type is not allowed to be set as Rework Or Wrong Input!");
                                    location.reload();
                                } else {
                                    createJobConfirmation();
                                }
                            }
                        }
                    }
                }
            }
        } else {
            alert("Job Confirmation is NOT allowed for the current operation because of confirmed Qty + unqualified Qty is more than allowed qty!");
        }
    }
}

function createJobConfirmation() {

    var codeNr = $("#codeNr").val();
    var purifiedCodeNr = "";
    var first2Char = codeNr.substring(0, 2);
    if (first2Char == "K-") {
        purifiedCodeNr = codeNr.substring(2, 1000);
    } else {
        purifiedCodeNr = codeNr;
    }

    location.reload();
    var args = {
        "codeNr": purifiedCodeNr, "empId": $("#empId").val(), "output": $("#output").val(),
        "confType": $('input:radio[name=confType]:checked').val(), "altWc": $("#altWc").val(), "remarks": $("#remarks").val(),
        "machineSetup": $("#machineSetup").val(), "linkedId": $("#linkedId").val(), "jcStartCreatedDate": $("#jcStartCreatedDate").val(),
        "hourInDate": $("#hourInDate").val(), "qtyType": $('input:radio[name=zeroQtyType]:checked').val(),
        "unqualifiedQty": $("#unqualifiedQty").val()
    };
    var jqxhr = $.getJSON("/manufacturing/control/createJobConfirmation",
        args,
        function (data) {
            $.each(data.iAmFake, function (i, item) {
                // do nothing
            });
        });
}

function showOutputLimit() {
    var codeNr = $("#codeNr").val();

    var first2Char = codeNr.substring(0, 2);
    if (first2Char == "K-") {
        codeNr = codeNr.substring(2, 1000);
    }

    var opId = codeNr;

    var args = { "opId": opId };
    var jqxhr = $.getJSON("/manufacturing/control/barcodeEmpIdOutputLimit",
        args,
        function (data) {
            $.each(data.barcodeEmpIdOutputLimit, function (i, item) {
                if (item.CODE_NR != null) {
                    $("#outputLimit").val(item.OUTPUT_LIMIT);
                } else {
                    $("#outputLimit").val("Wrong Input...");
                }
            });
        });
    focusEmpId();
}

function showEmpName() {
    var empId = $("#empId").val();
    var args = { "empId": empId };
    var jqxhr = $.getJSON("/manufacturing/control/empIdShowName",
        args,
        function (data) {
            $.each(data.empIdShowName, function (i, item) {
                if (item.EMPLOYEE_ID != null) {
                    $("#empName").val(item.NAME_CHN);
                    if (item.NAME_CHN === "Wrong Employee Id") {
                        focusEmpId();
                    } else {
                        focusOutput();
                    }
                } else {
                    $("#empName").val("Wrong Input...");
                }
            });
        });
}

function checkEmpLength(e) {
    var empLength = e.length;
    if (empLength === 5 || empLength === 6 || empLength === 7) {
        // this is to make sure the queried empId won't be changed before updating
        $("#orgEmpId").val(e);

        var opId = $("#codeNr").val();
        var purifiedCodeNr = "";
        var first2Char = opId.substring(0, 2);
        if (first2Char == "K-") {
            purifiedCodeNr = opId.substring(2, 1000);
        } else {
            purifiedCodeNr = opId;
        }

        var empId = e;
        // var empId = $("#empId").val();
        var args = { "opId": purifiedCodeNr, "empId": empId };
        var $radios = $('input:radio[name=confType]');
        // this is to avoid employee input name first then input code
        if (opId.length < 13) {
            alert("Please fill in Op Id first!");
            location.reload();
        } else {
            var jqxhr = $.getJSON("/manufacturing/control/barcodeEmpIdHasStarted",
                args,
                function (data) {
                    $.each(data.barcodeEmpIdHasStarted, function (i, item) {
                        if (item.SHALL_START == "No") {
                            $radios.filter('[value=JC_END]').prop('checked', true);
                            $("#linkedId").val(item.ID);
                            $("#jcStartCreatedDate").val(item.CREATED_STAMP);
                            $("#hourInDate").val(item.HOUR_IN_DATE);
                        } else {
                            $radios.filter('[value=JC_START]').prop('checked', true);
                        }
                    });
                });
            showOutputLimit();
            showEmpName();
        }
    }
}

function clearAllImportedFields() {
    $("#faufItemId").val("");
    $("#faufItemName").val("");
    $("#faufOrderStatus").val("");
    $("#faufPoolId").val("");
    $("#faufPlanner").val("");
    $("#faufQty").val("");
    $("#faufQtyGood").val("");
    $("#faufQtyError").val("");
    $("#faufSchedStart").val("");
    $("#faufSchedEnd").val("");
    $("#faufResourceId").val("");
    $("#faufResourceName").val("");
    $("#faufOprId").val("");
    $("#faufSetupHours").val("");
    $("#faufRunHours").val("");
    $("#faufOpNotes").val("");
}

function checkOpLength() {
    clearAllImportedFields();
    var codeNr = $("#codeNr").val();

    var first2Char = codeNr.substring(0, 2);
    if (first2Char != "K-") {

        var opIdLength = codeNr.length;
        var prodId;
        var oprNum;
        var lastChar;
        var hyphenKey;
        var kmcjKey;
        prodId = codeNr.substring(0, 10);
        kmcjKey = codeNr.substring(0, 4);
        hyphenKey = codeNr.substring(10, 11);
        //    console.log("-----------------");
        //    console.log(kmcjKey);
        //    console.log(hyphenKey);

        oprNum = codeNr.substring(11, codeNr.length);
        lastChar = codeNr.substring(12, codeNr.length);
        var $radios = $('input:radio[name=confType]');
        var args;
        var empId = $("#empId").val();
        var empLength = empId.length;
        if (lastChar == "R") {
            alert("Machine Code is NOT allowed!");
            location.reload();
        } else {
            if (kmcjKey == "522-") {
                if (hyphenKey == "-") {
                    if (oprNum == "AU") {
                        if (opIdLength >= 13) {
                            $("#orgCodeNr").val(codeNr);
                            switch (prodId) {
                                case '522-RESTIN':
                                    $("#faufItemName").val("Rest-休息");
                                    break;
                                case '522-MEETIN':
                                    $("#faufItemName").val("Meeting-会议");
                                    break;
                                case '522-TRAINI':
                                    $("#faufItemName").val("Training-培训");
                                    break;
                                case '522-CLEANI':
                                    $("#faufItemName").val("Cleaning-清扫");
                                    break;
                                case '522-MACHBD':
                                    $("#faufItemName").val("Machine Failure-设备故障");
                                    break;
                                case '522-MAINTN':
                                    $("#faufItemName").val("Maintenance-维修维护");
                                    break;
                                case '522-SUPPOR':
                                    $("#faufItemName").val("Support-支持");
                                    break;
                                default:
                                    $("#faufItemName").val("Can NOT be identified-无法识别代码");
                                    break;
                            }
                            $("#empId").val("");
                            $("#empName").val("");
                            $radios.filter('[value=JC_NONET]').prop('checked', true);
                            // there might be something wrong here with the sequence
                            $("#outputLimit").val(1);
                            // showJobsOnTable();
                        }
                    } else {
                        if (opIdLength >= 13) {
                            // this is to make sure the queried codeNr won't be changed before updating
                            $("#orgCodeNr").val(codeNr);

                            args = { "prodId": prodId, "oprNum": oprNum };
                            $.getJSON("/manufacturing/control/barcodeOpInfo",
                                {
                                    prodId: prodId,
                                    oprNum: oprNum,
                                },
                                function (data) {
                                    $.each(data.opInfoByOpId, function (i, item) {
                                        $("#faufItemId").val(item.ITEM_ID);
                                        $("#faufItemName").val(item.ITEM_NAME);
                                        $("#faufOrderStatus").val(item.CURRENT_STATUS_ID);
                                        $("#faufPoolId").val(item.PROD_POOL_ID);
                                        $("#faufPlanner").val(item.PLANNER);
                                        $("#faufQty").val(item.CALC_QTY);
                                        $("#faufQtyGood").val(item.OP_QTY_GOOD);
                                        $("#faufQtyError").val(item.OP_QTY_ERROR);
                                        $("#faufSchedStart").val(dateFormat(item.SCH_START, "yyyy-mm-dd"));
                                        $("#faufSchedEnd").val(dateFormat(item.SCH_END, "yyyy-mm-dd"));
                                        $("#faufResourceId").val(item.RESOURCE_ID);
                                        $("#faufResourceName").val(item.RESOURCE_NAME);
                                        $("#faufOprId").val(item.OPR_ID);
                                        $("#faufSetupHours").val(item.CALC_SETUP);
                                        $("#faufRunHours").val(item.CALC_PROC);
                                        $("#faufOpNotes").val(item.OP_NOTES);
                                    });
                                });
                            // if current empId is not empty and meet length requirement
                            if (empLength == 5) {
                                var jqxhr = $.getJSON("/manufacturing/control/barcodeEmpIdHasStarted",
                                    { "opId": codeNr, "empId": empId },
                                    function (data) {
                                        $.each(data.barcodeEmpIdHasStarted, function (i, item) {
                                            if (item.SHALL_START == "No") {
                                                $radios.filter('[value=JC_END]').prop('checked', true);
                                                $("#linkedId").val(item.ID);
                                                $("#jcStartCreatedDate").val(item.CREATED_STAMP);
                                                $("#hourInDate").val(item.HOUR_IN_DATE);
                                            } else {
                                                $radios.filter('[value=JC_START]').prop('checked', true);
                                            }
                                        });
                                    });
                            }
                            // force to empty the Emp Id so that the input sequence could be guaranteed
                            // if this is done, the upper could be deleted
                            $("#empId").val("");
                            $("#empName").val("");
                            $radios.filter('[value=JC_NONET]').prop('checked', true);
                            // showJobsOnTable();
                        }
                    }
                } else {
                    alert("You have inputted the wrong HYPHEN key in the 11th place!");
                    location.reload();
                }
            } else {
                alert("You should input KMCJ barcode like 522-******-**!");
                location.reload();
            }
        }
        return false;
    } else {
        // with new QRCode, a prefix "K-" has been added therefore removing it before using it
        codeNr = codeNr.substring(2, 1000);

        var opIdLength = codeNr.length;
        var prodId;
        var oprNum;
        var lastChar;
        var hyphenKey;
        var kmcjKey;
        prodId = codeNr.substring(0, 10);
        kmcjKey = codeNr.substring(0, 4);
        hyphenKey = codeNr.substring(10, 11);
        //    console.log("-----------------");
        //    console.log(kmcjKey);
        //    console.log(hyphenKey);

        oprNum = codeNr.substring(11, codeNr.length);
        lastChar = codeNr.substring(12, codeNr.length);
        var $radios = $('input:radio[name=confType]');
        var args;
        var empId = $("#empId").val();
        var empLength = empId.length;
        if (lastChar == "R") {
            alert("Machine Code is NOT allowed!");
            location.reload();
        } else {
            if (kmcjKey == "522-") {
                if (hyphenKey == "-") {
                    if (oprNum == "AU") {
                        if (opIdLength >= 13) {
                            $("#orgCodeNr").val(codeNr);
                            switch (prodId) {
                                case '522-RESTIN':
                                    $("#faufItemName").val("Rest-休息");
                                    break;
                                case '522-MEETIN':
                                    $("#faufItemName").val("Meeting-会议");
                                    break;
                                case '522-TRAINI':
                                    $("#faufItemName").val("Training-培训");
                                    break;
                                case '522-CLEANI':
                                    $("#faufItemName").val("Cleaning-清扫");
                                    break;
                                case '522-MACHBD':
                                    $("#faufItemName").val("Machine Failure-设备故障");
                                    break;
                                case '522-MAINTN':
                                    $("#faufItemName").val("Maintenance-维修维护");
                                    break;
                                case '522-SUPPOR':
                                    $("#faufItemName").val("Support-支持");
                                    break;
                                default:
                                    $("#faufItemName").val("Can NOT be identified-无法识别代码");
                                    break;
                            }
                            $("#empId").val("");
                            $("#empName").val("");
                            $radios.filter('[value=JC_NONET]').prop('checked', true);
                            // there might be something wrong here with the sequence
                            $("#outputLimit").val(1);
                            // showJobsOnTable();
                        }
                    } else {
                        if (opIdLength >= 13) {
                            // this is to make sure the queried codeNr won't be changed before updating
                            $("#orgCodeNr").val(codeNr);

                            args = { "prodId": prodId, "oprNum": oprNum };
                            $.getJSON("/manufacturing/control/barcodeOpInfo",
                                {
                                    prodId: prodId,
                                    oprNum: oprNum,
                                },
                                function (data) {
                                    $.each(data.opInfoByOpId, function (i, item) {
                                        $("#faufItemId").val(item.ITEM_ID);
                                        $("#faufItemName").val(item.ITEM_NAME);
                                        $("#faufOrderStatus").val(item.CURRENT_STATUS_ID);
                                        $("#faufPoolId").val(item.PROD_POOL_ID);
                                        $("#faufPlanner").val(item.PLANNER);
                                        $("#faufQty").val(item.CALC_QTY);
                                        $("#faufQtyGood").val(item.OP_QTY_GOOD);
                                        $("#faufQtyError").val(item.OP_QTY_ERROR);
                                        $("#faufSchedStart").val(dateFormat(item.SCH_START, "yyyy-mm-dd"));
                                        $("#faufSchedEnd").val(dateFormat(item.SCH_END, "yyyy-mm-dd"));
                                        $("#faufResourceId").val(item.RESOURCE_ID);
                                        $("#faufResourceName").val(item.RESOURCE_NAME);
                                        $("#faufOprId").val(item.OPR_ID);
                                        $("#faufSetupHours").val(item.CALC_SETUP);
                                        $("#faufRunHours").val(item.CALC_PROC);
                                        $("#faufOpNotes").val(item.OP_NOTES);
                                    });
                                });
                            // if current empId is not empty and meet length requirement
                            if (empLength == 5) {
                                var jqxhr = $.getJSON("/manufacturing/control/barcodeEmpIdHasStarted",
                                    { "opId": codeNr, "empId": empId },
                                    function (data) {
                                        $.each(data.barcodeEmpIdHasStarted, function (i, item) {
                                            if (item.SHALL_START == "No") {
                                                $radios.filter('[value=JC_END]').prop('checked', true);
                                                $("#linkedId").val(item.ID);
                                                $("#jcStartCreatedDate").val(item.CREATED_STAMP);
                                                $("#hourInDate").val(item.HOUR_IN_DATE);
                                            } else {
                                                $radios.filter('[value=JC_START]').prop('checked', true);
                                            }
                                        });
                                    });
                            }
                            // force to empty the Emp Id so that the input sequence could be guaranteed
                            // if this is done, the upper could be deleted
                            $("#empId").val("");
                            $("#empName").val("");
                            $radios.filter('[value=JC_NONET]').prop('checked', true);
                            // showJobsOnTable();
                        }
                    }
                } else {
                    alert("You have inputted the wrong HYPHEN key in the 11th place!");
                    location.reload();
                }
            } else {
                alert("You should input KMCJ barcode like 522-******-**!");
                location.reload();
            }
        }
        return false;
    }
}

function showJobsOnTable() {
    
    var codeNr = $("#codeNr").val();
    var purifiedCodeNr = "";
    var first2Char = codeNr.substring(0, 2);
    if (first2Char == "K-") {
        purifiedCodeNr = codeNr.substring(2, 1000);
    } else {
        purifiedCodeNr = codeNr;
    }

    var tableJO = $('#tableJobsOn').DataTable({
        "destroy": true,
        "processing": true,
        "serverSide": false,
        "ordering": true,
        "scrollY": '50vh',
        "scrollX": true,
        "scrollCollapse": true,
        "paging": false,
        "info": true,
        "searching": true,
        "ajax": {
            "url": "/manufacturing/control/jobsOnOrOff",
            "data": function (d) {
                d.codeNr = purifiedCodeNr;
            },
            "dataSrc": function (d) {
                return d.jobsOnOffByCodeNr;
            },
            "type": "POST"
        },
        select: "single",
        "columns": [
            { "data": "ID" },
            { "data": "CODE_NR" },
            { "data": "EMP_ID" },
            { "data": "EMP_NAME" },
            { "data": "DEPARTMENT" },
            { "data": "PROD_NAME" },
            { "data": "PROD_QTY" },
            { "data": "ITEM_ID" },
            { "data": "PROD_POOL_ID" },
            { "data": "CONF_TYPE" },
            { "data": "ALT_WC" },
            { "data": "CREATED_STAMP" },
            { "data": "USER_LOGIN_ID" },
            { "data": "REMARKS" }
        ],
        "order": [[1, 'asc']],
        "createdRow": function (row, data, dataIndex) {
            if (data["CONF_TYPE"] && data["CONF_TYPE"] == "JC_START") {
                $(row).addClass('rowDone');
            } else {
                $(row).addClass('rowDangerous');
            }
        }

    });
    showOutputLimit();
}

// ---------------------------------------------------------------------------------------------------
// below is for Machine OEE
function setFocusToMachineId() {
    document.getElementById("resourceCode").focus();
}

function checkMachineCodeLength() {
    var codeNrMachine = $("#resourceCode").val();
    var codeMachineLength = codeNrMachine.length;
    var lastCharMachine;
    lastCharMachine = codeNrMachine.substring(12, codeNrMachine.length);
    var $radiosMachine = $('input:radio[name=onOffType]');
    var args;
    if (codeMachineLength == 13) {
        if (lastCharMachine == "R") {
            $("#orgResourceCode").val(codeNrMachine);

            args = { "codeNrMachine": codeNrMachine };
            $.getJSON("/manufacturing/control/machineInfo",
                args,
                function (data) {
                    $.each(data.machineInfoByResCode, function (i, item) {
                        $("#resourceDescription").val(item.RES_DESC);
                        $("#resourceDepartment").val(item.DEPARTMENT);
                    });
                });
            $.getJSON("/manufacturing/control/machineOnOrOffByCode",
                args,
                function (data) {
                    $.each(data.machineOnOffByResCode, function (i, item) {
                        if (item.ON_OFF == "MC_ON") {
                            $radiosMachine.filter('[value=MC_OFF]').prop('checked', true);
                            $("#linkedIdMachine").val(item.ID);
                            $("#jcStartCreatedDateMachine").val(item.CREATED_STAMP);
                            $("#hourInDateMachine").val(item.HOUR_IN_DATE);
                        } else {
                            $radiosMachine.filter('[value=MC_ON]').prop('checked', true);
                        }
                    });
                });
            showMachineOnTable();
        } else {
            alert("Code other than Machine is NOT allowed!");
        }
    }
    return false;
}

function showMachineOnTable() {
    var tableMO = $('#tableMachineOn').DataTable({
        "destroy": true,
        "processing": true,
        "serverSide": false,
        "ordering": true,
        "scrollY": '50vh',
        "scrollX": true,
        "scrollCollapse": true,
        "paging": false,
        "info": true,
        "searching": true,
        "ajax": {
            "url": "/manufacturing/control/machineOnOrOff",
            "data": function (d) {
                d.codeNrMachine = $("#resourceCode").val();
            },
            "dataSrc": function (d) {
                return d.machineOnOffAll;
            },
            "type": "POST"
        },
        select: "single",
        "columns": [
            { "data": "RESOURCE_CODE" },
            { "data": "RES_DESC" },
            { "data": "ON_OFF" },
            { "data": "EMP_ID" },
            { "data": "EMP_NAME" },
            { "data": "CREATED_STAMP" },
            { "data": "USER_LOGIN_ID" },
            { "data": "REMARKS" }
        ],
        "order": [[1, 'asc']],
        "createdRow": function (row, data, dataIndex) {
            if (data["ON_OFF"] && data["ON_OFF"] == "MC_ON") {
                $(row).addClass('rowDone');
            } else {
                $(row).addClass('rowDangerous');
            }
        }

    });

    // Add event listener for opening and closing details
    //        $('#tableMachineOn tbody').on('click', 'td.details-control', function () {
    //            var tr = $(this).closest('tr');
    //            var tdi = tr.find("i.fa");
    //            var row = table.row(tr);
    //
    //            if (row.child.isShown()) {
    //                // This row is already open - close it
    //                row.child.hide();
    //                tr.removeClass('shown');
    //                tdi.first().removeClass('fa-minus-square');
    //                tdi.first().addClass('fa-plus-square');
    //            }
    //            else {
    //                row.child(format(row.data())).show();
    //                tr.addClass('shown');
    //                tdi.first().removeClass('fa-plus-square');
    //                tdi.first().addClass('fa-minus-square');
    //            }
    //        });
    //
    //        $('#tableMachineOn').on("user-select", function (e, dt, type, cell, originalEvent) {
    //            if ($(cell.node()).hasClass("details-control")) {
    //                e.preventDefault();
    //            }
    //        }); 

    setFocusToMachineEmpId();
}

function setFocusToMachineEmpId() {
    document.getElementById("empIdMachine").focus();
}

function checkEmpLengthMachine(e) {
    var empLengthMachine = e.length;
    if (empLengthMachine === 5) {
        $("#orgOmpIdMachine").val(e);

        var empIdMachine = $("#empIdMachine").val();
        var args = { "empId": empIdMachine };
        var jqxhrMachine = $.getJSON("/manufacturing/control/empIdShowName",
            args,
            function (data) {
                $.each(data.empIdShowName, function (i, item) {
                    if (item.EMPLOYEE_ID != null) {
                        $("#empNameMachine").val(item.NAME_CHN);
                    } else {
                        $("#empNameMachine").val("Wrong Input...");
                    }
                });
            });
        focusRemarks();
    }
}

function focusRemarks() {
    document.getElementById("remarksMachine").focus();
}

function checkIfCanCreateMachine() {
    if ($("#empNameMachine").val() == "Wrong Employee Id") {
        alert("Machine Confirmation is NOT allowed for invalid Emp Name!");
        location.reload();
    } else {
        // if the final input para are not the same as orginal 
        // update aborted
        if ($("#resourceCode").val() != $("#orgResourceCode").val()) {
            alert("Machine Confirmation is NOT allowed for Machine Change!");
            location.reload();
        } else {
            if ($("#resourceDescription").val() == "NA") {
                alert("Machine Confirmation is NOT allowed for invalid Machine Code!");
                location.reload();
            } else {
                var args = {
                    "resourceCode": $("#resourceCode").val(), "empIdMachine": $("#empIdMachine").val(),
                    "onOffType": $('input:radio[name=onOffType]:checked').val(), "remarksMachine": $("#remarksMachine").val(),
                    "linkedIdMachine": $("#linkedIdMachine").val(), "jcStartCreatedDateMachine": $("#jcStartCreatedDateMachine").val(),
                    "hourInDateMachine": $("#hourInDateMachine").val()
                };
                var jqxhrMO = $.getJSON("/manufacturing/control/createMachineOee",
                    args,
                    function (data) {
                        $.each(data.iAmFake, function (i, item) {
                            // do nothing
                        });
                    });
                location.reload();
            }
        }
    }
}
