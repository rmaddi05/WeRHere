public with sharing class LoginController {
	
    
    @AuraEnabled
    public static Integer loginController(String username, String password){
        
        
        String abc;
        List<checkUser__c> cuList = new List<checkUser__c>();
        cuList = [Select Id,User_Name__c, Password__c from checkUser__c 
              Where User_Name__c = :username And Password__c = :password];
        System.debug(cuList.size());
        if(cuList.size() != 0){
            abc = cuList[0].id;
            System.debug(abc);
        }
        return cuList.size();
        
    }
    
    @AuraEnabled
    public static String RegistrationController(String FullName, String Email, String username, String password){
        
        String abc;
        List<checkUser__c> cuList = new List<checkUser__c>();
        checkUser__c  cu = new checkUser__c();
        cu.Full_Name__c = FullName;
        cu.Email__c = Email;
        cu.User_Name__c = username;
        cu.Password__c = password;
        
        cuList.add(cu);
        if(cuList.size()>0){
            insert cuList;
            return cu.Full_Name__c;
        }
        else{
            return 'Not Inserted';
        }
        
    }
    
    
    @AuraEnabled(cacheable = true)
    public static List<Event__c> getEvent(String hobbies){
        return [SELECT Id, Name__c, Date_Of_Event__c, Place__c, Hobbies_Needed__c,Event_Co_Ordinator__r.Full_Name__c,Number_Of_Participants__c,Owner.FirstName FROM Event__c Where Hobbies_Needed__c includes (:hobbies)];
    }

	
    @AuraEnabled
    public static String registerEvent(Id eventId,String userName){
        checkUser__c ch = [Select Id from checkUser__c Where User_Name__c =:userName LIMIT 1];
        List<RegisteredEvent__c> rEventList = new List<RegisteredEvent__c>();
        rEventList = [Select Id from RegisteredEvent__c where MDUsers__c = :ch.Id and MDEvents__c = :eventId];
        if(rEventList.size() >= 1){
            return 'Already Registered';
        }
        else{
        	RegisteredEvent__c rEvent = new RegisteredEvent__c();
        	rEvent.MDUsers__c = ch.Id;
        	rEvent.MDEvents__c = eventId;
        	rEventList.add(rEvent);
  			try {
        		insert rEventList;       
			} catch(DmlException e) {
    		}
        	return 'Registered';
        }
    }
    
    @AuraEnabled
    public static List<RegisteredEvent__c> getRegisteredEvent(Id uId){
        return [Select Id,MDEvents__r.Name__c, MDEvents__r.Date_Of_Event__c, MDEvents__r.Place__c, MDEvents__r.Owner.Name,MDEvents__r.Owner.FirstName from RegisteredEvent__c where MDUsers__c =: uId];
    }
    
    @AuraEnabled
    public static List<checkUser__c> getFullName(String username){
        List<checkUser__c> cuList = new List<checkUser__c>();
        checkUser__c cu = [Select Id,Full_Name__c,About_you__c,Address__c,Residence__c,Phone__c,Email__c,Date_of_Birth__c,Age__c from checkUser__c where User_Name__c = :username];
        cuList.add(cu);
        if(cuList.size() > 0){
            return cuList;
        }
        else{
            return cuList;
        }
        
    }
    
    @AuraEnabled
    public static List<Message__c> getMessage(Id chatId){
        List<Message__c> lMsg = new List<Message__c>();
        lMsg = [Select Id,Name, Co_Ordinator_Message__c, User_Message__c, ChatId__c from Message__c where ChatId__c = :chatId ORDER BY Name asc];
        return lMsg;
    }
    
    
    @AuraEnabled
    public static List<User> getCordinator(){
        List<User> lCo = new List<User>();
        lCo = [Select Id,Name,ProfileId,FirstName from User where profileId = '00eJ10000011j8BIAQ'];
        return lCo;
    }
    
    @AuraEnabled
    public static List<Chat__c> getChatId(Id codId, Id uId){
        List<Chat__c> lChat = new List<Chat__c>();
        lChat = [Select Id,UserId__c,EventCod__c from Chat__c where UserId__c = :uId AND EventCod__c =:codId];
        if(lChat.size() == 0){
            Chat__c ch = new Chat__c();
            ch.EventCod__c = codId;
            ch.UserId__c = uId;
            lChat.add(ch);
            if(lChat.size() > 0){
                insert lChat;
            }
        }
        return lChat;
    }
    
    @AuraEnabled
    public static Integer sendMsg(String Msg, Id chatId){
        List<Message__c> lmsg = new List<Message__c>();
        Message__c ms = new Message__c();
        ms.ChatId__c = chatId;
        ms.User_Message__c = Msg;
        lmsg.add(ms);
        if(lmsg.size()>0){
            insert lmsg;   
            return 1;
        }
        else{
            return 0;
        }
            
    }
    
    @AuraEnabled
    public static Integer sendCodMsg(String Msg, Id chatId){
        List<Message__c> lmsg = new List<Message__c>();
        Message__c ms = new Message__c();
        ms.ChatId__c = chatId;
        ms.Co_Ordinator_Message__c = Msg;
        lmsg.add(ms);
        if(lmsg.size()>0){
            insert lmsg;
            return 1;
        }
        else{
            return 0;
        }
            
    }
        
    @AuraEnabled
    public static List<Chat__c> getStudentMsg(Id codId){
        List<Chat__c> lChat = new List<Chat__c>();
        lChat = [Select id,EventCod__c, EventCod__r.FirstName, Name,  UserId__r.Full_Name__c From Chat__C Where EventCod__c =:codId];
        return lChat;
    }
    
    
    @AuraEnabled
    public static List<checkUser__c> updateStudentDetails(String username,String abtU, String add,String email, String rsdnce, String ph, String dob){
        List<checkUser__c> cuList = new List<checkUser__c>();
        checkUser__c cu = [Select Id,Full_Name__c,About_you__c,Address__c,Residence__c,Phone__c,Email__c,Date_of_Birth__c,Age__c from checkUser__c where User_Name__c = :username];
        cu.About_you__c = abtU;
        cu.Address__c = add;
        cu.Residence__c = rsdnce;
        cu.Phone__c = ph;
        cu.Email__c = email;
        cuList.add(cu);
        if(cuList.size() > 0){
            update cuList;
            return cUList;
        }
        else{
            return cuList;
        }   
    }
    
    @AuraEnabled
    public static List<RegisteredEvent__c> getNumberOfUser(Id eId){
        return [Select Id,MDUsers__r.Full_Name__c,MDUsers__r.Name,Name,Number_of_Hours__c,Awarded__c  from RegisteredEvent__c where MDEvents__c =: eId];
    }
    
    @AuraEnabled
    public static List<RegisteredEvent__c> getCompletedEvent(Id uId){
        List<RegisteredEvent__c> ls= new List<RegisteredEvent__c>();
        ls = [Select Id,MDEvents__r.Name__c, MDEvents__r.Date_Of_Event__c, MDEvents__r.Place__c, MDEvents__r.Owner.Name,MDEvents__r.Owner.FirstName,Number_of_Hours__c from RegisteredEvent__c where MDUsers__c =: uId AND MDEvents__r.Completed__c = true];
        System.debug(ls);
        return ls;
    }
    
    @AuraEnabled
    public static List<Decimal> getNumberOfHours(Id uId){
        List<RegisteredEvent__c> listREvent = new List<RegisteredEvent__c>();
        List<Decimal> listData = new List<Decimal>();
        Decimal totalHours = 0;
        Decimal totalEvent = 0;
        Decimal totalAwards = 0;
        listREvent = [Select Id,MDUsers__r.Full_Name__c,MDEvents__r.Name,Name,Number_of_Hours__c,Awarded__c  from RegisteredEvent__c where MDUsers__c  =: uId];
        for(integer i=0; i < listREvent.size(); i++){
            System.debug(listREvent[i].Number_of_Hours__c);
            if(listREvent[i].Number_of_Hours__c != Null){
            totalHours = listREvent[i].Number_of_Hours__c + totalHours;
            }
            else{
                continue;
            }
            if(listREvent[i].Awarded__c == true){
                totalAwards += 1;
            }
        }
        totalEvent = listRevent.size();
        System.debug(totalHours);
        listData.add(totalHours);
        listData.add(totalEvent);
        listData.add(totalAwards);
        return listData;
    }
    
    
}