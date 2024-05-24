var editor; // use a global for the submit and return data rendering in the examples

$(document).ready(function() {
    // editor = new $.fn.dataTable.Editor( {
    //     ajax: "/sfa/control/ReturnAllForecastItems",
    //     table: "#example",
    //     fields: [ {
    //             label: "ID:",
    //             name: "ID"
    //         }, {
    //             label: "FORECAST VERSION:",
    //             name: "PROG_VER"
    //         }, {
    //             label: "CUSTOMER:",
    //             name: "CUSTOMER"
    //         }, {
    //             label: "ITEM ID:",
    //             name: "ITEM_ID"
    //         }, {
    //             label: "QTY:",
    //             name: "QTY"
    //         }, {
    //             label: "EXW DATE:",
    //             name: "EXW_DATE",
    //             type: "datetime"
    //         }
    //     ]
    // } );
 
    // // Activate an inline edit on click of a table cell
    // $('#example').on( 'click', 'tbody td:not(:first-child)', function (e) {
    //     editor.inline( this );
    // } );
 
    // $('#example').DataTable( {
    //     dom: "Bfrtip",
    //     ajax: "/sfa/control/ReturnAllForecastItems",
    //     order: [[ 1, 'asc' ]],
    //     columns: [
    //         {
    //             data: null,
    //             defaultContent: '',
    //             className: 'select-checkbox',
    //             orderable: false
    //         },
    //         { data: "ID" },
    //         { data: "PROG_VER" },
    //         { data: "CUSTOMER" },
    //         { data: "ITEM_ID" },
    //         { data: "QTY" },
    //         { data: "EXW_DATE" }
    //     ],
    //     select: {
    //         style:    'os',
    //         selector: 'td:first-child'
    //     },
    //     buttons: [
    //         'copy', 'excel', 'pdf'
    //     ]
    // } );

    // load templates used for forecasted module
    $("#forecastTemplates").loadTemplates().remove();
} );

function showForecastItemsAll(){
    var myFIA = $('#example').DataTable({
            "destroy": true,
            "processing": true,
            // "serverSide": false,
            "ordering": true,
            // "scrollY": '50vh',
            // "scrollX": true,
            // "scrollCollapse": true,
            // "paging": false,
            "info": true,
            "searching": true,
            "dom": "Bfrtip",
            "ajax": {
                "url": "/sfa/control/ReturnAllForecastItems",
                // "data": function(d){
                //     d.codeNr = $("#codeNr").val();
                //     },
                "dataSrc": function(d){
                    return d.listForecastAll;
                },
                "type": "POST"
            },
            // select:"single",
            "columns": [
                {
                    data: null,
                    defaultContent: '',
                    className: 'select-checkbox',
                    orderable: false
                },
                { data: "ID" },
                { data: "PROG_VER" },
                { data: "CUSTOMER" },
                { data: "ITEM_ID" },
                { data: "QTY" },
                { data: "EXW_DATE" }
            ],
            "order": [[1, 'asc']],
            "select": {
                style:    'os',
                selector: 'td:first-child'
            },
            "buttons": [
                'copy', 'excel', 'pdf'
            ]

        });

        // Row selection and deletion (single row)
        // $('#example tbody').on( 'click', 'tr', function () {
        //     if ( $(this).hasClass('selected') ) {
        //         $(this).removeClass('selected');
        //     }
        //     else {
        //         myFIA.$('tr.selected').removeClass('selected');
        //         $(this).addClass('selected');
        //     }
        // } );
        // $('#button').click( function () {
        //     table.row('.selected').remove().draw( false );
        // } );

        // Row selection (multiple rows)
        $('#example tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

        // $('#example tbody')
        // .on( 'mouseenter', 'td', function () {
        //     var colIdx = table.cell(this).index().column;
 
        //     $( table.cells().nodes() ).removeClass( 'highlight' );
        //     $( table.column( colIdx ).nodes() ).addClass( 'highlight' );
        // } );

        $('#example tbody').on('dblclick', 'tr', function () {
            var data = myFIA.row( this ).data();
            alert( 'You clicked on '+data[4]+'\'s row' );
        } );

        // $('#btnAddRowForecastItemRow').on( 'click', function () {
        //     myFIA.row.add( [
        //         '',
        //         '.1',
        //         '.2',
        //         '.3',
        //         '.4',
        //         '.5',
        //         '.6'
        //     ] ).draw( false );
        // } );

}

//------------------------------------------- Schumi: Open a black popup for importing plan. ------------------------------------------------------
function addNewForecastItem() {
    //make Add FI Editor
    var addFiEditor = $.JST.createFromTemplate({}, "ADD_FI_EDITOR");

    var ndo = createBlackPage(600, 400).append(addFiEditor);
    rebindChosen();

    $("#forecastVersionAddFI").empty();
    var sugForcVer = 'P' + (new Date()).getFullYear();
    var curMonth = (new Date()).getMonth() + 1;
    if (curMonth < 10)
        sugForcVer = sugForcVer + '0' + curMonth;
    else
        sugForcVer = sugForcVer + curMonth;
    var prefForcVer = sugForcVer;
    $.getJSON("/sfa/control/forecastVerJson", function(data) {
        $.each(data.forecastVers, function(i, item) {
            if(prefForcVer == item.progVer){
                $("#forecastVersionAddFI").append("<option value='" + item.progVer + "' selected>" + item.remarks + "</option>");
            }else{
                $("#forecastVersionAddFI").append("<option value='" + item.progVer + "'>" + item.remarks + "</option>");
            }
        });
    });

};