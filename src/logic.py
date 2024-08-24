#standard packages and modules
import threading
import readchar
import sys
import requests

#the following code defines the classes that will be used in the program, the first being the main class that will be used to create the Overall Pair Coding Session
class PairSession:
    def __init__(self):  #this function will initialize the session
        self.roomLookup = {}

    def addRoom(self, roomID): #this function will add a room to the session
        if roomID not in self.roomLookup: #check if the room already exists
            self.roomLookup[roomID] = Room(roomID)
        else:
            return False

    def getRoom(self, roomID): #this function will return the room object
        return self.roomLookup[roomID]
    
    def removeRoom(self, roomID): #this function will remove a room from the session
        del self.roomLookup[roomID]

    def roomExists(self, roomID): #this function will check if a room exists
        if roomID in self.roomLookup: #check if the room already exists
            return True
        else:
            return False
        
#the following code defines the class that will be used to create the individual rooms
class Room:
   
    def __init__(self, roomID): #this function will initialize the room
        self.filename = "room" + roomID + ".txt"
        self.fileWrite = open(self.filename, "w+") 
        self.fileWrite.truncate(0) #clear the file
        self.fileAnnouncements = "announcements" + roomID + ".txt"
        self.fileAnno =  open(self.fileAnnouncements, "w+")
        self.fileAnno.truncate(0) #clear the file
        self.userDict = {}
    
    def addUser(self, user): #this function will add a user to the room
        self.userDict[user.name] = user
    
    def removeUser(self, user): #this function will remove a user from the room
        del self.userDict[user.name]
        if len(self.userDict) == 0: #if the room is empty, remove the room
            user.session.removeRoom(user.roomID)
            return
        if len(self.userDict) == 1: #if there is only one user left, grant them control
            for user in self.userDict:
                user.privilege = 1
                self.announcementClear()
                self.printMessage("User " + user.name + " has been granted control of the file")
                self.fileAnno.flush()
            return
        
    def swapPrivilege(self): #this function will swap the privilege of the users in the room
        for user in self.userDict: 
            if self.userDict[user].privilege == 0: #if the user does not have privilege, grant them privilege
                self.userDict[user].privilege = 1
            else: #if the user does have privilege, remove their privilege
                self.userDict[user].privilege = 0

    def printMessage(self, message): #this function will print a message to the announcement file
        self.fileAnno.write(message)

    def announcementClear(self): #this function will clear the announcement file
        self.fileAnno.truncate(0)
    
    def getPartner(self, user): #this function will return the partner of the user but is not currently used
        for user in self.userDict:
            if user != user:
                return user
    def writeChar(self, char, user): #this function will write a character to the file
        if user.privilege == 1:
            if char == "\x1b":
                char = readchar.readchar()
                if char == "[": 
                    char = readchar.readchar()
                    if char == "D": #left arrow
                        if(self.fileWrite.tell() == 0): #if the cursor is at the beginning of the file, do nothing
                            return
                        self.fileWrite.seek(self.fileWrite.tell() - 1)
                        return
                    if char == "C": #right arrow
                        if(self.fileWrite.tell() == self.fileWrite.seek(0,2)):
                            return
                        self.fileWrite.seek(self.fileWrite.tell() + 1)
                        return
            if ord(char) == 8 or ord(char) == 127: #backspace or delete
                if(self.fileWrite.tell() == 0): #if the cursor is at the beginning of the file, do nothing
                    return
                if self.fileWrite.tell() != self.fileWrite.seek(0,2): #if the cursor is not at the end of the file, don't delete
                    return
                self.fileWrite.seek(self.fileWrite.tell() - 1) #move the cursor back one
                self.fileWrite.truncate() #delete the character
                self.fileWrite.flush()  #flush the file
                return
            self.fileWrite.write(char)
            self.fileWrite.flush()
        else:
            self.announcementClear()
            self.printMessage("User " + user.name + " has attempted to write to the file, but does not have the privilege")
            self.fileAnno.flush()
#the following code defines the class that will be used to create the individual users        
class User:
   
    def __init__(self, name, roomID, PairCoding): #this function will initialize the user
        self.name = name
        self.roomID = roomID
        self.privilege = 0
        self.room = None
        self.session = PairCoding

    def userConnect(self): #this function will connect the user to the session
        if self.session.roomExists(self.roomID): #check if the room already exists
            self.room = self.session.getRoom(self.roomID)
            if len(self.room.userDict) == 2: #check if the room is full
                print("Room is full")
                return
            self.privilege = 0
            self.room.addUser(self)
        else: #if the room does not exist, create it
            self.session.addRoom(self.roomID)
            self.room = self.session.getRoom(self.roomID)
            self.privilege = 1
            self.room.addUser(self)
    
    def userDisconnect(self): #this function will disconnect the user from the session
        self.room.removeUser(self)
    
    def requestSwap(self): #this function will request to swap privilege
        if self.privilege == 1: #if the user has privilege, relinquish it
            self.room.swapPrivilege()
            self.room.announcementClear()
            self.room.printMessage("user " + self.name + " has relinquished control") # to user " + self.room.getPartner(self).name)
            self.room.fileAnno.flush()
        else:  #if the user does not have privilege, request it
            self.room.announcementClear()
            self.room.printMessage("User " + self.name + " has requested to swap, press the ~ button to swap")
            self.room.fileAnno.flush()

    def writeChar(self, char): #this function will write a character to the file
        self.room.writeChar(char, self)

    def userLoop(self): #this function will be the loop that the user sit in waiting for input
        while True:
            #get a character from the user
            command  = readchar.readchar()
            if command == "=":
                self.requestSwap()
            elif command == "`":
                self.userDisconnect()
                break
            else:
                self.writeChar(command)
    

if __name__ == "__main__": #this is the main function
    #create an object of the class
    PairCoding = PairSession()
    #create a user
    user1 = User(sys.argv[1], sys.argv[2], PairCoding)
    #connect the user to the room then start the loop for that user on a different thread
    user1.userConnect()

    URL = "http://127.0.0.1:5000/users"

    PARAMS = {
        'name': sys.argv[1],
        'roomID': sys.argv[2]
    }

    headers = {"Content-Type": "application/json; charset=utf-8"}

    r = requests.post(url = URL, headers = headers, json = PARAMS)
    

    if sys.argv[3] == "0": #for demonstration purposes, the user can be given privilege using the command line
        user1.privilege = 0
    
    threading.Thread(target=user1.userLoop).start()


