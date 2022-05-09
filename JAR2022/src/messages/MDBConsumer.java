package messages;

import javax.ejb.ActivationConfigProperty;
import javax.ejb.EJB;
import javax.ejb.MessageDriven;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.ObjectMessage;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.DataBean;
import ws.WSEndpoint;



@MessageDriven(activationConfig = {
		@ActivationConfigProperty(propertyName = "destinationType", propertyValue = "javax.jms.Queue"),
		@ActivationConfigProperty(propertyName = "destination", propertyValue = "jms/queue/mojQueue")
})
public class MDBConsumer implements MessageListener  {

	@EJB
	AgentManager agents;
	
	@EJB
	WSEndpoint ws;
	
	@EJB
	DataBean data;

	@Override
	public void onMessage(Message msg) {
		// TODO Auto-generated method stub
		
		try {
			ObjectMessage objectMessage = (ObjectMessage) msg;
			model.Message message = (model.Message) objectMessage.getObject();
			
			ObjectMapper mapper = new ObjectMapper();
			String jsonMessage = mapper.writeValueAsString(message);
			
			if(!message.getReceiver().equals("ALL")) {  //message to a single user
				Agent sender = this.agents.getAgentByUsername(message.getSender());
				
				if(sender != null) {
					sender.onMessage(msg);
					ws.sendToOne(message.getSender(), jsonMessage);
				}
				
				 Agent reciever = this.agents.getAgentByUsername(message.getReceiver());
				 if (reciever != null) {
			        	reciever.onMessage(msg);
				        ws.sendToOne(message.getReceiver(), jsonMessage);
			        }
				
				
				
			} else {  //Message to all users
				for(Agent agent : agents.getAgents().values()) {
					agent.onMessage(msg);
				}
				
				ws.broadcast(jsonMessage);
				
				
			}
			
			
			
		} catch (JMSException | JsonProcessingException e) {
			e.printStackTrace();
		}
		
	}
	
	

	

}
