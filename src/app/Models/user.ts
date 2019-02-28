export class User {
    
    userId:string;
    userName:string;
    loweredUserName:string;
    isAnonymous:string;
    lastActivityDate:string;
    userFirstName:string;
    userLastName:string;
    userPhone:string;
    active:number;

    

    constructor( userId:string,userName:string, loweredUserName:string, isAnonymous:string, lastActivityDate:string, userFirstName:string, userLastName:string, userPhone:string, active:number)
    {

        this.userId = userId;
        this.userName = userName;
        this.loweredUserName = loweredUserName;
        this.isAnonymous = isAnonymous;
        this.lastActivityDate = lastActivityDate;
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.userPhone = userPhone;
        this.active = active;
    }
}