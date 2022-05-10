<%@page import="com.User"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<title>User Management</title>
	<link rel="stylesheet" href="Views/bootstrap.min.css">
	<script src="Components/jquery-3.6.0.min.js"></script>
	<script src="Components/users.js"></script>
</head>
<body> 
	<div class="container"><div class="row"><div class="col-6"> 
	<h3>User Management For ElectroGrid (EG)</h3><br>
		<form id="formUser" name="formUser" >
 			Enter First Name * 
 			<input id="firstName" name="firstName" type="text" class="form-control form-control-sm" required/>
 			<br> Enter Last Name * 
 			<input id="lastName" name="lastName" type="text" class="form-control form-control-sm" required/>
 			<br> Enter Address * 
 			<input id="userAddress" name="userAddress" type="text" class="form-control form-control-sm" required/>
 			<br> Enter Contact Number * 
 			<input id="userPhone" name="userPhone" maxlength="10" type="text" class="form-control form-control-sm" required/>
 			<br> Enter Email * 
 			<input id="userEmail" name="userEmail" type="text" class="form-control form-control-sm" required/>
 			<br> Enter User Type * 
 			<input id="userType" name="userType" type="text" class="form-control form-control-sm" required/>
 			<br>
 			<input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary" required/>
 			<input type="hidden" id="hidUserIDSave" name="hidUserIDSave" value="">
		</form>
		<div id="alertSuccess" class="alert alert-success" ></div>
		<div id="alertError" class="alert alert-danger"></div>
	<br>
	<div id="divUserGrid">
 	<%
		 User userObj = new User(); 
 		out.print(userObj.viewAllUsers()); 
 	%>
</div>
</div> </div> </div> 
</body>
</html>