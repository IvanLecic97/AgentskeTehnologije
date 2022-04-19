package beans;

import java.util.Collection;

import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import model.User;

@Stateless
@Path("/chat")
@LocalBean
public class ChatBean {
	
	
	@EJB
	private DataBean data;
	
	
	
	
	@POST
	@Path("/users/register")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response register(User user) {
		
		User exists = data.getRegisteredUsers().get(user.getUsername());
		if(exists != null) {
			return Response.status(Response.Status.BAD_REQUEST).entity("Username alredy exists, please input a new one!").build();
		}
		
		User registered = new User(user.getUsername(), user.getPassword());
		data.getRegisteredUsers().put(registered.getUsername(), registered);
		
		
		
		return Response.status(Response.Status.OK).build();
		
	}
	
	@GET
	@Path("/users/registered")
	@Produces(MediaType.APPLICATION_JSON)
	public Response registered() {
		Collection<User> retVal = (Collection<User>) data.getRegisteredUsers().values();
		
		System.out.println("----------------");
		System.out.println("Registered: ");
		for(User u: data.getRegisteredUsers().values()) {
			System.out.println(u.getId() + " " +u.getUsername() + " " + u.getPassword());
		}
		System.out.println("----------------");
		
		return Response.status(Response.Status.OK).entity(retVal).build();
	}
	
	
	@POST
	@Path("/users/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response login(User user) {
		
		User checkRegistered = data.getRegisteredUsers().get(user.getUsername());
		if (checkRegistered == null || !checkRegistered.getPassword().equals(user.getPassword())) {
			return Response.status(Response.Status.BAD_REQUEST).entity("Invalid username or password, please try again!").build();
		}
		
		data.getLoggedInUsers().put(checkRegistered.getUsername(), checkRegistered);
		
		return Response.status(Response.Status.OK).entity(checkRegistered).build();
	}
	
	
	@GET
	@Path("/users/loggedIn")
	@Produces(MediaType.APPLICATION_JSON)
	public Response loggedIn() {
		Collection<User> retVal = (Collection<User>) data.getLoggedInUsers().values();
		
		
		System.out.println("----------------");
		System.out.println("Logged in: ");
		for(User u: data.getLoggedInUsers().values()) {
			System.out.println(u.getId() + " " + u.getUsername() + " " + u.getPassword());
		}
		System.out.println("----------------");
		
		
		return Response.status(Response.Status.OK).entity(retVal).build();
	}
	
	@DELETE
	@Path("/users/loggedIn/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response logout(@PathParam("username") String username) {
		User checkLoggedIn = data.getLoggedInUsers().get(username);
		if (checkLoggedIn == null ) {
			return Response.status(Response.Status.BAD_REQUEST).entity("Not logged in").build();
		}
		
		data.getLoggedInUsers().remove(username);
		
		return Response.status(Response.Status.OK).build();
		
	}
	
	
	

}
