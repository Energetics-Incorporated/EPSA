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

function myPillFilter(data) {
	 yadcf.exFilterColumn(oTable, [[1, data]]);
	 $("#placeholder").css("display", "none");
	}
	
function loadDataTable() {	
	
    // Load Datatables after Tabletop is loaded
    oTable = $('#searchable-table').DataTable({        
		
		dom: "Bf<'paginationWrap'irlp>",
		columnDefs: [
			{
				"targets": [ 6,7,8,9,10,11,12,13,14,15,16,17,18,19,20 ],
				"visible": false
			},			
			/*
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
			}*/
			{width:180, targets: 0}, 
			{width:80, targets: 1}, 
			{width:100, targets: 2},	
			{width:200, targets: 3}, 	
			{width:150, targets: 4}, 
			{width:280, targets: 5}			

		],
		order:[[1, "asc"]],
		oLanguage: {
            "sLengthMenu": "_MENU_ records per page"
        },
        iDisplayLength: 25,		
		fixedColumns: true,
		buttons: [
			
			{
				extend: 'columnToggle',
				columns: '.colName',
				className: 'btn-name',
				titleAttr: 'Name'
			},
			{
				extend: 'columnToggle',
				columns: '.colState',
				className: 'btn-state',
				titleAttr: 'State'
			},
			{
				extend: 'columnToggle',
				columns: '.colJurisdiction',
				className: 'btn-juris',
				titleAttr: 'Jurisdiction: Geographic coverage of policy or program'
			},
			{
				extend: 'columnToggle',
				columns: '.colPolicy',
				className: 'btn-policy',
				titleAttr: 'Type of Policy or Program'
			},
			{
				extend: 'columnToggle',
				columns: '.colRights',
				className: 'btn-wrd',
				titleAttr: 'Water Rights Doctrine: Specifies the type of water rights doctrine (see glossary) relevant to the policy.'
			},
			{
				extend: 'columnToggle',
				columns: '.colWaterbody',
				className: 'btn-waterbody',
				titleAttr: 'Applicable Waterbody Types'
			},
			/*{
				 extend: 'columnToggle',
				 columns: '.secondary',
				 text: 'Water Quality Standards',
				 className: 'btn-vwqs',
				 titleAttr: 'Water Quality Standards: Water quality standards are applicable for "water discharge regulation: water quality standards" entries only, which can be filtered under "Type of Policy or Program" field.'
			}*/
			{
				extend: 'colvis',
				columns: '.secondary',
				text: 'Water Quality Standards',
				className: 'btn-vwqs',
				titleAttr: 'Water Quality Standards: Water quality standards are applicable for "water discharge regulation: water quality standards" entries only, which can be filtered under "Type of Policy or Program" field.',
				prefixButtons: [{extend:'columnToggle',
                          text:'Toggle All',
                          columns:'.secondary'
                         }]
			}
			
		]
		
    });
	

yadcf.init(oTable, 
	[
		{
			column_number: 0,
			filter_type: "text",
	        text_data_delimiter: ",",
			filter_default_label: "Name",
			select_type_options: {
            width: '180px'}
		}, 
		{
			column_number: 1,
			select_type_options: {
            width: '50px'},
			filter_default_label: "Select"
			
		}, 
		{
			column_number: 2,
			filter_type: "multi_select",
			select_type: "select2",			
			select_type_options: {
            width: '80px'},
			filter_default_label: "Select"
		}, 
		{
			column_number: 3,
			filter_type: "multi_select",
			select_type: "select2",
			select_type_options: {
            width: '180px'}
		}, 
		{
			column_number: 4, 
			filter_type: "multi_select",
			select_type: "select2",
			style_class: "appwater",
			select_type_options: {
            width: '140px'}
		},
		{
			column_number: 5,
			width:"50px",
			filter_type: "multi_select",
			select_type: "select2",
			select_type_options: {
            width: '280px'}
		}/*,
		{
			column_number: 21, 			
			//filter_container_id: "some_data"
			
		}*/		
			
		
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
	
	function nWin() {
	  var urlhash = $(this).data('anchor');	  
	  var url = "index.html#";
	  var urllocation = url + urlhash;
	  var wi = window.open(urllocation, '_blank', '');		
	  var html = $(this).next().html();
	  wi.document.write('<html><head><title>Database of State Water Policies Affecting Energy</title><link href="fonts/fonts.css" rel="stylesheet"><link rel="stylesheet" type="text/css" href="css/custom.css"></head><body class="newtab">');		
	  $(wi.document.body).html(html);
	  wi.document.write('</body></html>');
	  wi.document.close();
	  setTimeout(function() {            
            wi.document.close();
        }, 10);
	}

	
			
	$(function() {
		$( "[data-anchor]" ).click(nWin);
	});


    loadDataTable();
	/*
	function nWinload() {
	  //var urlhash = $(this).attr('href');   
	  var hash = window.location.hash.substr(1);	  
	  //alert(hash);
	  var winload = window.open('index.html#' + hash);		
	  var html = $(hash).html();
	  winload.document.write('<html><head><title>Database of State Water Policies Affecting Energy</title><link rel="stylesheet" type="text/css" href="css/custom.css"></head><body class="newtab">');		
	  $(winload.document.body).html(html);
	  winload.document.write('</body></html>');
	  
	  
	}
	
	//function theCode() { code; }

	if(location.hash){
		nWinload();	
	}	
	$(window).on("hashchange", function(){
		nWinload();
	});
	*/
	
}


// Pull data from Google spreadsheet via Tabletop
function initializeTabletopObject(){
	Tabletop.init({
    	key: public_spreadsheet_url,
    	callback: loadToDOM,
    	simpleSheet: true,
    	debug: false
    });
}

// Load Tabletop
initializeTabletopObject();