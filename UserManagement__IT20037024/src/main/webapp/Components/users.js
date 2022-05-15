$(document).ready(function(){ 
	if ($("#alertSuccess").text().trim() == "") 
 	{ 
 		$("#alertSuccess").hide(); 
    } 
 	$("#alertError").hide(); 
}); 

$(document).on("click", "#btnSave", function(event)
{ 
	// Clear alerts---------------------
 		$("#alertSuccess").text(""); 
 		$("#alertSuccess").hide(); 
 		$("#alertError").text(""); 
 		$("#alertError").hide(); 
 		
// Form validation-------------------
		var status = validateUserForm(); 
		if (status != true) 
 		{ 
 			$("#alertError").text(status); 
 			$("#alertError").show(); 
 			return; 
 		} 
		// If valid------------------------
		var type = ($("#hidUserIDSave").val() == "") ? "POST" : "PUT"; 
 		$.ajax( 
 		{ 
 			url : "UsersAPI", 
 			type : type, 
 			data : $("#formUser").serialize(), 
 			dataType : "text", 
 			complete : function(response, status){ 
 			onUserSaveComplete(response.responseText, status); 
 			} 
 		}); 
});


function onUserSaveComplete(response, status)
{ 
	if (status == "success") 
 	{ 
			 var resultSet = JSON.parse(response); 
 			 if (resultSet.status.trim() == "success"){ 
	
 			 	$("#alertSuccess").text("Successfully saved."); 
 			 	$("#alertSuccess").show(); 
             	$("#divUserGrid").html(resultSet.data); 
             
 		     }else if (resultSet.status.trim() == "error"){ 
	
 				$("#alertError").text(resultSet.data); 
 				$("#alertError").show(); 
 				
 			} 
 } else if (status == "error"){ 
 		    $("#alertError").text("Error while saving."); 
 			$("#alertError").show(); 
 } else{ 
 			$("#alertError").text("Unknown error while saving.."); 
 			$("#alertError").show(); 
 }
			$("#hidUserIDSave").val(""); 
			$("#formUser")[0].reset(); 
}


// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
		{ 
		 $("#hidUserIDSave").val($(this).data("userid")); 
		 $("#firstName").val($(this).closest("tr").find('td:eq(1)').text()); 
		 $("#lastName").val($(this).closest("tr").find('td:eq(2)').text()); 
		 $("#userAddress").val($(this).closest("tr").find('td:eq(3)').text()); 
		 $("#userPhone").val($(this).closest("tr").find('td:eq(4)').text()); 
		 $("#userEmail").val($(this).closest("tr").find('td:eq(5)').text()); 
		 $("#userType").val($(this).closest("tr").find('td:eq(6)').text()); 
		});
		
$(document).on("click", ".btnRemove", function(event)
		{ 
		 $.ajax( 
		 { 
		 url : "UsersAPI", 
		 type : "DELETE", 
		 data : "userID=" + $(this).data("userid"),
		 dataType : "text", 
		 complete : function(response, status) 
		 { 
		 onUserDeleteComplete(response.responseText, status); 
		 } 
		 
		 });
		  
		});		


function onUserDeleteComplete(response, status){ 
	if (status == "success"){ 
 			var resultSet = JSON.parse(response); 
 			if (resultSet.status.trim() == "success"){ 
 					$("#alertSuccess").text("Successfully deleted."); 
 					$("#alertSuccess").show(); 
 					$("#divItemsGrid").html(resultSet.data); 
 			}else if(resultSet.status.trim() == "error"){ 
 					$("#alertError").text(resultSet.data); 
 					$("#alertError").show(); 
 			} 
 	}else if(status == "error"){ 
 		  $("#alertError").text("Error while deleting."); 
 		  $("#alertError").show(); 
 	}else{ 
 		  $("#alertError").text("Unknown error while deleting.."); 
          $("#alertError").show(); 
 } 
};




// CLIENT-MODEL================================================================
function validateUserForm(){
	// FirstName--------------------------
	if ($("#firstName").val().trim() == ""){
		return "Insert First Name.";
	}
	// LastName--------------------------
	if ($("#lastName").val().trim() == ""){
		return "Insert Last Name.";
	}
	
	// UserAddress-------------------------------
	if ($("#userAddress").val().trim() == ""){
		return "Insert User Address.";
	}
	
	// UserPhone-------------------------------
	if ($("#userPhone").val().trim() == ""){
		return "Insert User Contact Number.";
	}
	
	// UserEmail-------------------------------
	if ($("#userEmail").val().trim() == ""){
		return "Insert User Email.";
	}
	
	// UserType-------------------------------
	if ($("#userType").val().trim() == ""){
		return "Insert User Type.";
	}
	
	
	var email = $("#userEmail").val().trim();
    var filter = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
	 if(filter.test(email) === false)
    {
        return "You Have Entered An Invalid E-mail Address";
    }
    
    
    var phone = $("#userPhone").val().trim();
    var phoneFilter = /([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})/;
   	if (phoneFilter.test(phone) === false) {
        return "You Have Entered An Invalid Contact Number";
    }
    
    var firstName =  $("#firstName").val().trim();
    var filterFirst = /^[a-zA-Z]+$/i;
    if (filterFirst.test(firstName) === false) {
        return "You Have Entered An Invalid First Name";
    }
    
    var lastName =  $("#lastName").val().trim();
    var filterLast = /^[a-zA-Z]+$/i;
    if (filterLast.test(lastName) === false) {
        return "You Have Entered An Invalid Last Name";
    }
	
	
	var userType =  $("#userType").val().trim();
    var filterType = /^[a-zA-Z]+$/i;
    if (filterType.test(userType) === false) {
        return "You Have Entered An Invalid User Type";
    }
    
	
	
		
		/* is numerical value
		var tmpPrice = $("#userPhone").val().trim();
		if (!$.isNumeric(tmpPrice))
	{
	return "Insert a numerical value for Item Price.";
	}
		
// convert to decimal price
$("#itemPrice").val(parseFloat(tmpPrice).toFixed(2));*/

	return true;
}
