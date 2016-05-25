/**
 * 
 */

jQuery(document).ready(
		function($) {
		  $("#show-idf").click(function(event) {
			var value = 1;
			alert("value( " + value + " ) sending from client to console...");
			$.ajax({
	            type: "POST",
	            contentType: "application/json",
	            url: "/valuefromclientthroughajax",
	            data: JSON.stringify(value),
	            dataType: 'json',
	            timeout: 600000,
	            success: function (data) {
	            },
	            error: function (e) {
	            }
		});
			alert("value( " + value + " ) sent from client to console.");
		});
	  });