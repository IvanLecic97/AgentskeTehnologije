package model;

import java.io.Serializable;
import java.util.ArrayList;

import beans.IdGenerator;

public class User implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private long id = IdGenerator.getNextId();
	private String username;
	private String host;
	private String password;
	private ArrayList<Message> messages = new ArrayList<Message>();
	
	public User() {
		super();
	}

	public User(String username,  String password) {
		super();
		this.username = username;
		this.password = password;
	}
	
	public User(String username, String password, ArrayList<Message> messages) {
		super();
		this.username = username;
		this.password = password;
		this.messages = messages;
	}
	
	

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	public ArrayList<Message> getMessages() {
		return messages;
	}

	public void setMessages(ArrayList<Message> messages) {
		this.messages = messages;
	}
	
	
	
	
	

}
