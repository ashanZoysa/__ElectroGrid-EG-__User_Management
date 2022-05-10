package com;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap; 
import java.util.Map; 
import java.util.Scanner;


/**
 * Servlet implementation class UserAPI
 */
@WebServlet("/UsersAPI")
public class UsersAPI extends HttpServlet {
	private static final long serialVersionUID = 1L;
	User userObj = new User();
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UsersAPI() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		String output = userObj.addNewUsers(request.getParameter("firstName"), 
				   							request.getParameter("lastName"), 
				   							request.getParameter("userAddress"), 
				   							request.getParameter("userPhone"),
				   							request.getParameter("userEmail"),
				   							request.getParameter("userType")
				   							); 
		
		response.getWriter().write(output);


		
		doGet(request, response);
	}

	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Map paras = getParasMap(request); 
		String output = userObj.updateUser(paras.get("hidUserIDSave").toString(), 
										   paras.get("firstName").toString(), 
										   paras.get("lastName").toString(), 
										   paras.get("userAddress").toString(), 
										   paras.get("userPhone").toString(),
										   paras.get("userEmail").toString(),
										   paras.get("userType").toString()
										   ); 
		
		
		
		
		response.getWriter().write(output); 
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Map paras = getParasMap(request); 
		String output = userObj.deleteUser(paras.get("userID").toString()); 
		response.getWriter().write(output);
	}

	
	// Convert request parameters to a Map
		private static Map getParasMap(HttpServletRequest request){ 
		 Map<String, String> map = new HashMap<String, String>(); 
		try{ 
		 Scanner scanner = new Scanner(request.getInputStream(),"UTF-8"); 
		 String queryString = scanner.hasNext() ? 
		 scanner.useDelimiter("\\A").next() : ""; 
		 scanner.close(); 
		 String[] params = queryString.split("&"); 
		 
		 for (String param : params){
			 String[] p = param.split("=");
			 map.put(p[0], p[1]); } 
		 
		 }catch (Exception e)
		   { 
				
		   }
		
			return map; 
			
		}
	

}	

