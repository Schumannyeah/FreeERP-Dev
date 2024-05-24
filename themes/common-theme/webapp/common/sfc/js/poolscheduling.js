var editor; // use a global for the submit and return data rendering in the examples

$(document).ready(function() {
    //automatic load work center list when loaded
    showPoolList();

    // bind the datetimepicker
    $('#txtStartFrom').datetimepicker({
        timepicker:false,
        format:'m/d/Y'
      });
    
    $('#txtEndTo').datetimepicker({
        timepicker:false,
        format:'m/d/Y'
      });
} );

var d1;
var d2;
function dayDiffBetween2Dates(d1,d2){
    var timeDiff = Math.abs(d2.getTime() - d1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
}

function showPoolList(){
    var myPL = $('#tablePool').DataTable({
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
            "dom": '<"top"lf>rt<"bottom"ip><"clear">',
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "ajax": {
                "url": "/manufacturing/control/ShowPoolList",
                // "data": function(d){
                //     d.codeNr = $("#codeNr").val();
                //     },
                "dataSrc": function(d){
                    return d.listPool;
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
                { data: "POOL_ID" },
                { data: "POOL_NAME" },
                { data: "DEPT_ID" },
                { data: "DEPT_NAME" },
                { data: "EMPL_ID" },
                { data: "ME_NAME" }
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

        // Row selection (multiple rows)
        $('#tablePool tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

        $('#tablePool tbody').on('dblclick', 'tr', function () {
            // var data = myWCL.row( this ).data();
            var tr = $(this).closest('tr');
            var row = myPL.row(tr);
            // console.log(row);
            // console.log(row.data());
            // console.log(row.data().WORK_CENTER_NAME);

            //change modal title first
            $("#selectedPoolId").val(row.data().POOL_ID);
            $("resourceChartFilterModalTitle").val(row.data().POOL_NAME + " Scheduling Gantt Chart");

            $("#resourceChartFilterModal").modal("show");
        } );

}

function chartByPool(){
    $("#resourceChartFilterModal").modal("hide");
    // console.log("Testing................");

    // var newUrl = "https://meschzhe01/manufacturing/control/ShowPoolGantt?poolId=" + $("#selectedPoolId").val();
    // // console.log(newUrl);
    // var newUrl = "https://meschzhe01/manufacturing/control/ShowResourceGantt";

    // window.open(newUrl, "MySchedulingByPool");
}
