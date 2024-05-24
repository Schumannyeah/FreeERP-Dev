$(document).ready(function() {    
 
    // Setup - add a text input to each footer cell
    $('#tableAxWorkOrdersListList tfoot th').each(function () {
        var title = $(this).text();
        $(this).html('<input type="text" placeholder="' + title + '" />');
    });
    // showAxWorkOrderList();

    // bind the datetimepicker
    $('#faufCommittedDate').datetimepicker({
        timepicker:false,
        format:'m/d/Y'
      });
    
    $("#showWo").click(hideFaufGantt());

    hidePickDiv();
    
} );

function showAxWorkOrderList(){
    var myAWOL = $('#tableAxWorkOrdersListList').DataTable({
            "destroy": true,
            "processing": true,
            "ordering": true,
            "info": true,
            "searching": true,
            "scrollX":   true,
            "scrollY": '55vh',
            "scrollCollapse": true,
            "fixedColumns":   {
                left: 4
            },
            "dom": '<"top"Bf>rt<"bottom"iflp><"clear">',
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "ajax": {
                "url": "/manufacturing/control/ShowAxWorkOrders",
                "dataSrc": function(d){
                    return d.listWorkOrdersAx;
                },
                "type": "POST"
            },
            "columns": [
                {
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": '',
                    "render": function () {
                        return '<i class="fa fa-plus-square" aria-hidden="true"></i>';
                    },
                    width:"10px"
                },
                { data: "WO" },
                { data: "WO_NAME" },
                { data: "ITEM_ID" },
                { data: "WO_QTY" },
                { data: "WO_STATUS" },
                { data: "PLANNER" },
                { data: "POOL_ID" },
                { data: "PROD_POOL_ID" },
                { data: "WO_DEPARTMENT" },
                {
                	"orderable": true,
		            "data": "PRODUCT_END",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                {
                	"orderable": true,
		            "data": "ME_END",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                {
                	"orderable": true,
		            "data": "PRINT_END",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                {
                	"orderable": true,
		            "data": "PICK_END",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                {
                	"orderable": true,
		            "data": "ORDER_START",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                {
                	"orderable": true,
		            "data": "ORDER_END",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                {
                	"orderable": true,
		            "data": "PROD_COMMITTED_DATE",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                { data: "MES_NOTES" },
                { data: "AX_NOTES" },
                { data: "LAST_CONF_OP" },
                { data: "WORK_CENTER" },
                { data: "OP_DESC" },
                {
                	"orderable": true,
		            "data": "LATEST_CONF_DATE",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                { data: "SO" },
                { data: "PRODUCT_END_BY" },
                { data: "ME_END_BY" },
                { data: "PRINT_END_BY" },
                { data: "PICK_END_BY" },
                { data: "DWG_STATUS" },
                { data: "PICKED_STATUS" },
                { data: "ATP_STATUS" },
            ],
            "order": [[14, 'asc']],
            "select": {
                style:    'os',
                selector: 'td:first-child'
            },
            "buttons": [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            "createdRow": function( row, data, dataIndex ) {
                // add class to left fixed columns
                var tdPluss = $(row).children('td:eq(0)');
	           	var tdWo = $(row).children('td:eq(1)');
	           	var tdWoName = $(row).children('td:eq(2)');
	           	var tdItemId = $(row).children('td:eq(3)');
	           	$(tdPluss).addClass('mesfixedcol');
                $(tdWo).addClass('mesfixedcol');
                $(tdWoName).addClass('mesfixedcol');
                $(tdItemId).addClass('mesfixedcol');

                var today = new Date();
            	var woOrderStatus = data["WO_STATUS"];
                var tdWoOrderStatus = $(row).children('td:eq(5)');
                
                var productEnd = data["PRODUCT_END"];
                var meEnd = data["ME_END"];
                var printnd = data["PRINT_END"];
                var pickEnd = data["PICK_END"];
                var productEndBy = data["PRODUCT_END_BY"];
                var meEndBy = data["ME_END_BY"];
                var printndBy = data["PRINT_END_BY"];
                var pickEndBy = data["PICK_END_BY"];
                var dwgStatus = data["DWG_STATUS"];
                var pickStatus = data["PICKED_STATUS"];
                var atpStatus = data["ATP_STATUS"];

                var orderStart = data["ORDER_START"];
                var orderEnd = data["ORDER_END"];
                var prodCommittedDate = data["PROD_COMMITTED_DATE"];
                
	           	var tdProductEnd = $(row).children('td:eq(10)');
	           	var tdMeEnd = $(row).children('td:eq(11)');
	           	var tdPrintEnd = $(row).children('td:eq(12)');
	           	var tdPickEnd = $(row).children('td:eq(13)');
                var tdProductEndBy = $(row).children('td:eq(24)');
	           	var tdMeEndBy = $(row).children('td:eq(25)');
	           	var tdPrintEndBy = $(row).children('td:eq(26)');
	           	var tdPickEndBy = $(row).children('td:eq(27)');
	           	var tdDwgStatus = $(row).children('td:eq(28)');
	           	var tdPickStatus = $(row).children('td:eq(29)');
	           	var tdAtpStatus = $(row).children('td:eq(30)');

	           	var tdOrderStart = $(row).children('td:eq(14)');
	           	var tdOrderEnd = $(row).children('td:eq(15)');
	           	var tdProdCommittedDate = $(row).children('td:eq(16)');
                var dFuture = moment("2049-12-01").toDate();
                var dBlankDate = moment("2000-01-01").toDate();
                
                // set dwg status color
                if (dwgStatus == "AVAILABLE") {
                    $(tdDwgStatus).addClass('rowOk');
                } else {
                    $(tdDwgStatus).addClass('rowAttention');
                }

                // set picked status color
                if (pickStatus == "FULLY_PICKED") {
                    $(tdPickStatus).addClass('rowOk');
                } else {
                    if (pickStatus == "AX_PICK_LIST_NA") {
                        $(tdPickStatus).addClass('rowDangerous');
                    } else {
                        if (pickStatus == "OVER_PICKED") {
                            $(tdPickStatus).addClass('rowAttention');
                        }
                    }
                }

                // set ATP status color
                if (atpStatus == "OK") {
                    $(tdAtpStatus).addClass('rowOk');
                } else {
                    $(tdAtpStatus).addClass('rowAttention');
                }

                // if Completed, set as green
                if (woOrderStatus == "PRUN_COMPLETED") {
                    $(tdWoOrderStatus).addClass('rowOk');
                    $(tdProdCommittedDate).addClass('rowOk');

                    $(tdProductEnd).addClass('rowOk');
                    $(tdMeEnd).addClass('rowOk');
                    $(tdPrintEnd).addClass('rowOk');
                    $(tdPickEnd).addClass('rowOk');
                } else {
                    // if End Date is passing today, 
                    if (woOrderStatus == "PRUN_RUNNING") {
                        $(tdProductEnd).addClass('rowOk');
                        $(tdMeEnd).addClass('rowOk');
                    } else {
                        if(Date.parse(meEnd) < today){
                            if(meEndBy == 'NA'){
                                $(tdMeEnd).addClass('rowDangerous');
                            } else {
                                $(tdMeEnd).addClass('rowOk');
                            }
                        }else {
                            if (dayDiffBetween2Dates(Date.parse(meEnd),today)<5) {
                                $(tdMeEnd).addClass('rowAttention');
                            }
                        }
                    }

                    // if status is not yet completed, set order start as red if passing today
                    // yellow if there is 5 days difference
                    // when being sorted, visualization could not be shown
                    if(Date.parse(orderStart) < today){
                            $(tdOrderStart).addClass('rowDangerous');
                    }else {
                        if (dayDiffBetween2Dates(Date.parse(orderStart),today)<5) {
                            $(tdOrderStart).addClass('rowAttention');
                        }
                    }

                    // if status is not yet completed, set order end as red if passing today
                    // yellow if there is 5 days difference
                    if(Date.parse(orderEnd) < today){
                            $(tdOrderEnd).addClass('rowDangerous');
                    }else {
                        if (dayDiffBetween2Dates(Date.parse(orderEnd),today)<5) {
                            $(tdOrderEnd).addClass('rowAttention');
                        }
                    }                    

                    // if not filling a date then red
                    if(Date.parse(prodCommittedDate) <= dBlankDate){
                        $(tdProdCommittedDate).addClass('rowDangerous');
                    } else {
                        if(Date.parse(prodCommittedDate) >= dFuture){
                            $(tdProdCommittedDate).addClass('rowDangerous');
                        }else {
                            // if prodCommittedDate passes today, then red
                            // elseif prodCommittedDate > order end then yellow
                            // else green
                            if (Date.parse(prodCommittedDate) < today) {
                                $(tdProdCommittedDate).addClass('rowDangerous');
                            } else {
                                if (Date.parse(prodCommittedDate) <= Date.parse(orderEnd)) {
                                    $(tdProdCommittedDate).addClass('rowOk');
                                } else {
                                    $(tdProdCommittedDate).addClass('rowAttention');
                                }
                            }
                        }
                    }
                }
                
            },
            "initComplete": function () {
                // Apply the search
                this.api()
                    .columns()
                    .every(function () {
                        var that = this;
     
                        $('input', this.footer()).on('keyup change clear', function () {
                            if (that.search() !== this.value) {
                                that.search(this.value).draw();
                            }
                        });
                    });
            },
            
        });

        $('div.toolbar').html('<b>Only Showing Production Orders Scheduled in AX.</b>');

        $('#tableAxWorkOrdersListList tbody').on('mouseenter', 'td', function () {
            var colIdx = myAWOL.cell(this).index().column;
     
            $(myAWOL.cells().nodes()).removeClass('highlight');
            $(myAWOL.column(colIdx).nodes()).addClass('highlight');
        });

        // Add event listener for opening and closing details
        $('#tableAxWorkOrdersListList tbody').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var tdi = tr.find("i.fa");
            var row = myAWOL.row(tr);

            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
                tdi.first().removeClass('fa-minus-square');
                tdi.first().addClass('fa-plus-square');

                hidePickDiv();
            }
            else {
                // Open this row
                row.child(format(row.data())).show();     
                var woSelected = row.data().WO;
                var poolIdSelected = row.data().POOL_ID;
                var prodPoolIdSelected = row.data().PROD_POOL_ID;
                var prodCommittedDateSelected = row.data().PROD_COMMITTED_DATE;
                var mesNotesSelected = row.data().MES_NOTES;
                                
                $("#faufId").val(woSelected);
                $("#faufIdForWoGantt").val(woSelected);   
                $("#faufIdConfDate").val(woSelected);              

                $("#productionRunId").val(woSelected);
                $("#faufCommittedDate").val(moment((moment(prodCommittedDateSelected).toDate())).format("MM/DD/YYYY"));
                $("#faufMesNotes").val(mesNotesSelected);

                $("#poolNameForPoolGantt").val(prodPoolIdSelected);
                $("#poolIdForPoolGantt").val(poolIdSelected);
                
                tr.addClass('shown');
                tdi.first().removeClass('fa-plus-square');
                tdi.first().addClass('fa-minus-square');
            }
        });

        myAWOL.on("user-select", function (e, dt, type, cell, originalEvent) {
            if ($(cell.node()).hasClass("details-control")) {
                e.preventDefault();
            }
        }); 

        // Row selection (multiple rows)
        $('#tableAxWorkOrdersListList tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

};

function chartData(myMWOL) {
    var counts = {};
 
    // Count the number of entries for each position
    myMWOL
        .column(7, { search: 'applied' })
        .data()
        .each(function (val) {
            if (counts[val]) {
                counts[val] += 1;
            } else {
                counts[val] = 1;
            }
        });
 
    // And map it to the format highcharts uses
    return $.map(counts, function (val, key) {
        return {
            name: key,
            y: val,
        };
    });
}

function format(d){
    // `d` is the original data object for the row
    return '<table class="popout" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
            '<td><input type="hidden" id="myRowID" value="'+ d.id +'"></td>' +
            '<td colspan="9"><input type="hidden" id="myFaufNr' + d.id + '" value="'+ d.prodid +'">'+
            '<td> <button id="btnEditWoDateAndNote" type="button" class="rowOk" onclick="editFaufDateAndNote()">Edit Committed Date and Notes</button> </td>' +
            '<td> <button id="btnShowWoGantt" type="button" class="rowWarning" onclick="showFaufGantt()">Show WO Gantt</button> </td>' +
            '<td> <button id="btnShowPoolGantt" type="button" class="rowOnhold" onclick="showPoolGantt()">Show Pool Gantt</button> </td>' +
            '<td> <button id="btnShowAxNotesGantt" type="button" class="rowTeal" onclick="showAxNotesGanttModal()">Show Ax Notes Gantt</button> </td>' +
            '<td> <button id="btnConfDate" type="button" class="rowNotADate" onclick="showDateConf()">Confirm Date By Function</button> </td>' +
            '<td> <button id="btnShowPickStatus" type="button" class="rowLightSkyBlue" onclick="showPickStatus()">Show Picking Status</button> </td>' +
        '</tr>' +	        
    '</table>';  
}

function editFaufDateAndNote(){
    $("#faufCommitDateAndNoteModal").modal("show");
}

function hideFaufCommitDateAndNote(){
    $("#faufCommitDateAndNoteModal").modal("hide");
}

function showFaufGantt(){
    var faufId = $("#faufIdForWoGantt").val();
    // The newly set cookie would be cleared after browser jumps to another link
    // setCookie("schType","byFAUF","","");
    // setCookie("faufNrForGantt",faufId,"","");
    // setCookie("directOpenFauf","Yes","","");
    // setCookie("directOpenPool","No","","");
    // setCookie("directOpenResource","No","","");

    // The newly set session storage would be cleared after browser jumps to another link
    //SessionStorageHelper.save("faufNrForWoGantt", faufId);

    // Store, it would be destroyed only after closing the browser
    localStorage.setItem("directOpenFauf", "Yes");
    localStorage.setItem("faufNrForGantt", faufId);
    localStorage.setItem("directOpenPool", "No");
    localStorage.setItem("directOpenResource", "No");
    localStorage.setItem("schType", "byFAUF");   

    // Retrieve
    //document.getElementById("result").innerHTML = localStorage.getItem("lastname");

    $("#showFaufGanttModal").modal("show");
}

function hideFaufGantt(){
    $("#showFaufGanttModal").modal("hide");
}

function showPoolGantt(){
    var poolId = $("#poolIdForPoolGantt").val();
    const dToday = new Date();
    const dStart = new Date();
    const dEnd = new Date();

    dStart.setDate(dToday.getDate() - 30);
    dEnd.setDate(dToday.getDate() + 60);

    var dStartStr = printDateStrInMmDdYyyy(dStart);
    var dEndStr = printDateStrInMmDdYyyy(dEnd);

    // Store, it would be destroyed only after closing the browser
    localStorage.setItem("directOpenFauf", "No");
    localStorage.setItem("poolForGantt", poolId);
    localStorage.setItem("directOpenPool", "Yes");
    localStorage.setItem("directOpenResource", "No");
    localStorage.setItem("schType", "byPool");
    localStorage.setItem("faufActiveForPool", "Yes");    

    localStorage.setItem("poolStartForGantt", dStartStr);
    localStorage.setItem("poolEndForGantt", dEndStr);    

    // Retrieve
    //document.getElementById("result").innerHTML = localStorage.getItem("lastname");

    $("#showPoolGanttModal").modal("show");
}

function showDateConf(){
    const dToday = new Date();
    var dTodayStr = printDateStrInMmDdYyyy(dToday);
    
    $("#confFinishDate").val(dTodayStr);
    $("#mesUser").val(getCookie("mesUser"));

    $("#confDateModal").modal("show");
}

function showPickStatus(){
    showPickDiv();
    showWoFullPickList();
    showWoDeltaPickList();
}

function showPickDiv(){
    // Setup - add a text input to each footer cell
    $('#tableWoPickFullList tfoot th').each(function () {
        var title = $(this).text();
        $(this).html('<input type="text" placeholder="' + title + '" />');
    });

    // Setup - add a text input to each footer cell
    $('#tableWoPickDeltaList tfoot th').each(function () {
        var title = $(this).text();
        $(this).html('<input type="text" placeholder="' + title + '" />');
    });

    $("#pickStatus1").fadeIn("slow");
    $("#pickStatus2").fadeIn("slow");
}

function hidePickDiv(){
    $("#pickStatus1").fadeOut("slow");
    $("#pickStatus2").fadeOut("slow");
}


function hideDateConf(){
    $("#confDateModal").modal("hide");
}

function updateFaufDateAndNote(){
    var faufId = $("#faufId").val();
	var committedDate = $("#faufCommittedDate").val();
	var faufMesNotes = $("#faufMesNotes").val();
    
	var url= "/manufacturing/control/UpdateFaufDateAndNote";
  	var args = {
                "faufId":faufId,
                "committedDate":committedDate,
                "faufMesNotes":faufMesNotes
            };

  	$.post(url, args,
            function(data){
                $("#faufCommitDateAndNoteModal").modal("hide");
          });
    return false;
};

function updateWoConfDate(){
    $.ajax({
        method: "POST",
        url: "/manufacturing/control/updateWoConfDate",
        dataType: 'json',
        data: {
                "mesUser": $("#mesUser").val(),
                "confFinishDate": $("#confFinishDate").val(),
                "faufIdConfDate": $("#faufIdConfDate").val(),
                "dateTypeConfWo": $("#dateTypeConfWo").val()
        }, success: function (data) {
            if (data.WoConfDateUpdated == "Yes") {
                $("#confDateModal").modal("hide");
                
            }
        }
    });
    return false;
}

function showWoFullPickList(){
    var myWFPL = $('#tableWoPickFullList').DataTable({
            "destroy": true,
            "processing": true,
            "ordering": true,
            "info": true,
            "searching": true,
            "scrollX":   true,
            "scrollY": '40vh',
            "scrollCollapse": true,
            "dom": '<"top"Bf>rt<"bottom"iflp><"clear">',
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],

            "ajax": {
                "url": "/manufacturing/control/ShowWoFullPickList",
                "data": function(d){
                    d.faufId = $("#faufId").val(); 
                    },
                "dataSrc": function(d){
                    return d.listWoFullPickList;
                },
                "type": "POST"
            },
            "columns": [
                {
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": '',
                    "render": function () {
                        return '<i class="fa fa-plus-square" aria-hidden="true"></i>';
                    },
                    width:"10px"
                },
                { data: "WO" },
                { data: "WO_STATUS" },
                { data: "BOM_ITEM" },
                { data: "ITEM_NAME" },
                { data: "ITEM_GROUP_ID" },
                { data: "BOM_ITEM_QTY" },
                { data: "BOM_UNIT_ID" },
                { data: "COMP_LOC" },
                { data: "COMPONENT_TYPE" },
                { data: "PICKED_ITEM" },
                { data: "PICKED_UNIT_ID" },
                { data: "PICKED_QTY" },
            ],
            "order": [[3, 'asc']],
            "select": {
                style:    'os',
                selector: 'td:first-child'
            },
            "buttons": [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            "initComplete": function () {
                // Apply the search
                this.api()
                    .columns()
                    .every(function () {
                        var that = this;
     
                        $('input', this.footer()).on('keyup change clear', function () {
                            if (that.search() !== this.value) {
                                that.search(this.value).draw();
                            }
                        });
                    });
            },
            
        });

        $('#tableWoPickFullList tbody').on('mouseenter', 'td', function () {
            var colIdx = myWFPL.cell(this).index().column;
     
            $(myWFPL.cells().nodes()).removeClass('highlight');
            $(myWFPL.column(colIdx).nodes()).addClass('highlight');
        });

        myWFPL.on("user-select", function (e, dt, type, cell, originalEvent) {
            if ($(cell.node()).hasClass("details-control")) {
                e.preventDefault();
            }
        }); 

        // Row selection (multiple rows)
        $('#tableWoPickFullList tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );
};

function showWoDeltaPickList(){
    var myWDPL = $('#tableWoPickDeltaList').DataTable({
            "destroy": true,
            "processing": true,
            "ordering": true,
            "info": true,
            "searching": true,
            "scrollX":   true,
            "scrollY": '40vh',
            "scrollCollapse": true,
            "dom": '<"top"Bf>rt<"bottom"iflp><"clear">',
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "ajax": {
                "url": "/manufacturing/control/ShowWoDeltaPickList",
                "data": function(d){
                    d.faufId = $("#faufId").val(); 
                    },
                "dataSrc": function(d){
                    return d.listWoDeltaPickList;
                },
                "type": "POST"
            },
            "columns": [
                {
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": '',
                    "render": function () {
                        return '<i class="fa fa-plus-square" aria-hidden="true"></i>';
                    },
                    width:"10px"
                },
                { data: "WO" },
                { data: "BOM_ITEM" },
                { data: "ITEM_NAME" },
                { data: "ITEM_GROUP_ID" },
                { data: "VENDOR" },
                { data: "BOM_UNIT_ID" },
                { data: "QTY" },
                { data: "UNIQUE_KEY" },
                
            ],
            "order": [[2, 'asc']],
            "select": {
                style:    'os',
                selector: 'td:first-child'
            },
            "buttons": [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            "initComplete": function () {
                // Apply the search
                this.api()
                    .columns()
                    .every(function () {
                        var that = this;
     
                        $('input', this.footer()).on('keyup change clear', function () {
                            if (that.search() !== this.value) {
                                that.search(this.value).draw();
                            }
                        });
                    });
            },
            
        });

        $('#tableWoPickDeltaList tbody').on('mouseenter', 'td', function () {
            var colIdx = myWDPL.cell(this).index().column;
     
            $(myWDPL.cells().nodes()).removeClass('highlight');
            $(myWDPL.column(colIdx).nodes()).addClass('highlight');
        });

        myWDPL.on("user-select", function (e, dt, type, cell, originalEvent) {
            if ($(cell.node()).hasClass("details-control")) {
                e.preventDefault();
            }
        }); 

        // Row selection (multiple rows)
        $('#tableWoPickDeltaList tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );
};

function showAxNotesGanttModal(){
    $("#showAxNotesGanttModal").modal("show");
}

function showAxNotesGantt(){
    $("#showAxNotesGanttModal").modal("hide");

    // first to clear directOpenAxNotes
    setCookie("directOpenAxNotes","No","","");

    const dToday = new Date();
    const dStart = new Date();
    const dEnd = new Date();

    dStart.setDate(dToday.getDate() - 180);
    dEnd.setDate(dToday.getDate() + 360);

    var dStartStr = printDateStrInMmDdYyyy(dStart);
    var dEndStr = printDateStrInMmDdYyyy(dEnd);
    var axNotes = $("#axProdNotes").val();
    var activeFauf = $("#activeFauf").val();

    // Store, it would be destroyed only after closing the browser
    localStorage.setItem("directOpenAxNotes", "Yes");
    localStorage.setItem("directOpenFauf", "No");
    localStorage.setItem("directOpenPool", "No");
    localStorage.setItem("directOpenResource", "No");
    localStorage.setItem("schType", "byAxNotes");
    localStorage.setItem("faufActiveForAxNotes", activeFauf);    
    localStorage.setItem("axNotes", axNotes);    

    localStorage.setItem("startForAxNotes", dStartStr);
    localStorage.setItem("endForAxNotes", dEndStr);    

    // Open a new windown
    window.open("/manufacturing/control/ShowProductionGantt", "_blank");
}

