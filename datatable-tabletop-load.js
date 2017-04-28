// URL beginning and end, which will be used with the key
// To give Tabletop a URL
//var google_docs_one = 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=';
//var google_docs_two = '&output=html';

// Google Docs spreadsheet key
//var spreadsheet_key = '1hHJJmRBA1D6-g9wtfvnjvsndP-NxgyzOmFJBC8L2PPQ';

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1xQ5IjvU6H6LOqtYaJhiZo93lq5J6N0xiViZSEZpHQd4/pubhtml';

//old spreadsheet ---- https://docs.google.com/spreadsheets/d/1VnkWfpuGms0TADl3ULik2yJ1nevttJ9g9kq2qjTlRc8/pubhtml


// Template sources and what DIVs they will appear in
var templates = [
    {
        "templatesource": "#datatable-template",
        "templatehtml": "#searchable-table tbody",
        "sheet": "Database"
    }
];

// DataTables formatting options
// More options: http://datatables.net/plug-ins/sorting

// Formatted numbers: i.e. numbers with commas
jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "formatted-num-pre": function ( a ) {
        a = (a === "-" || a === "") ? 0 : a.replace( /[^\d\-\.]/g, "" );
        return parseFloat( a );
    },
    "formatted-num-asc": function ( a, b ) {
        return a - b;
    },
    "formatted-num-desc": function ( a, b ) {
        return b - a;
    }
});
// Currency
jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "currency-pre": function ( a ) {
        a = (a==="-") ? 0 : a.replace( /[^\d\-\.]/g, "" );
        return parseFloat( a );
    },
    
    "currency-asc": function ( a, b ) {
        return a - b;
    },
    
    "currency-desc": function ( a, b ) {
        return b - a;
    }
});
// Percentages
jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "percent-pre": function ( a ) {
        var x = (a == "-") ? 0 : a.replace( /%/, "" );
        return parseFloat( x );
    },
 
    "percent-asc": function ( a, b ) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
 
    "percent-desc": function ( a, b ) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
});


// Load up the DataTable

var oTable;
/*
function myPillFilter(data) {
	 yadcf.exFilterColumn(oTable, [[1, data]]);
	}
*/	
	
function loadDataTable() {	
	
    // Load Datatables after Tabletop is loaded
    oTable = $('#searchable-table').DataTable({        
		
		dom: "Bf<'paginationWrap'irlp>",
		columnDefs: [
			{
				"targets": [ 6,7,8,9,10,11,12,13,14,15,16,17,18,19,20 ],
				"visible": false
			},			
			{
				"targets": 1,
				"width": "80px"
			},
			{
				"targets": 2,
				"width": "80px"
			},
			{
				"targets": 5,
				"width": "50px"
			}
			
		],
		oLanguage: {
            "sLengthMenu": "_MENU_ records per page"
        },
        iDisplayLength: 25,
		fixedHeader: true,		
		buttons: [
			
			{
				text: 'custom name',
				extend: "columnsToggle",
				columns: "0"
			},
			{
				extend: "columnsToggle",
				columns: "1",
				text: 'button 1'
			},
			{
				extend: "columnsToggle",
				columns: "2",
				text: 'button 2'
			},
			{
				extend: "columnsToggle",
				columns: "3",
				text: 'button 3'
			},
			{
				extend: "columnsToggle",
				columns: "4",
				text: 'button 4'
			},
			{
				extend: "columnsToggle",
				columns: "5",
				text: 'button 5'
			},
			{
				 extend: "columnToggle",
				 columns: ".secondary",
				 text:"Water Quality Standards",
				 className: "btn-vwqs"				 
			}
			
		]
		
    });
	

yadcf.init(oTable, 
	[
		{
			column_number: 0,
			filter_type: "text",
	        text_data_delimiter: ",",
			filter_default_label: "Name"
		}, 
		{
			column_number: 1, 
			filter_type: "multi_select",
			select_type: "select2",
			width:"80px"
			// filter_container_id: "some_data"
		}, 
		{
			column_number: 2,
			filter_type: "multi_select",
			select_type: "select2",
			width:"80px"
		}, 
		{
			column_number: 3,
			filter_type: "multi_select",
			select_type: "select2"
		}, 
		{
			column_number: 4, 
			filter_type: "multi_select",
			select_type: "select2"
		},
		{
			column_number: 5,
			width:"50px",
			filter_type: "multi_select",
			select_type: "select2"
		}		
			
		
	]
);


	
	
// Close loadDataTable
};



// Use Handlebars to load data from Tabletop to page
function loadToDOM(tabletop_data, tabletop) {
    // Loop through templates
    _.each(templates, function(element, num_templates) {
    	// Grab HTML of template and compile with Handlebars
    	var template_html = element['templatehtml'];    
    	var source = $(element["templatesource"] + "").html();
    	var sheet = element["sheet"];
        var handlebarscompile = Handlebars.compile(source);

		// Render the templates onto page
		$(template_html).append(handlebarscompile( tabletop.sheets(sheet) ));
	// Close each statement
    }, this);

    loadDataTable();
}


// Pull data from Google spreadsheet via Tabletop
function initializeTabletopObject(){
	Tabletop.init({
    	key: public_spreadsheet_url,
    	callback: loadToDOM,
    	simpleSheet: false,
    	debug: false
    });
}

// Load Tabletop
initializeTabletopObject();
