export class Complaint {
    
    complaintID: number;
    electionID: number;
    complaintNumber: string;
    statusCode: string;
    countyCode: string;
    categoryID: number;
    priorityID: number;
    assignedStaffUID: string;
    assignedStaff: string;
    name: string;
    phone: string;
    address: string;
    city: string;
    stateCode: string;
    zip: string;
    takenBy: string;
    stationNumber: string;
    detailedMessage: string;
    actionMessage: string;
    faxComments: string;
    createdDate: string;
    assignedDate: string;
    resolvedDate: string;
    complaintNumSeq: number;
    reviewedBy: string;
    language: string;
    voted: number;
    namePoll: string;
    addressPoll: string;
    cityPoll: string;
    stateCodePoll: string;
    zipPoll: string;
    email: string;
    rowsReturned: number;

  

    
    constructor(    complaintID: number, electionID: number, complaintNumber: string, statusCode: string, countyCode: string, categoryID: number, priorityID: number, assignedStaffUID: string,assignedStaff:string, name: string, phone: string, address: string, city: string, stateCode: string, zip: string, takenBy: string, stationNumber: string, detailedMessage: string, actionMessage: string, faxComments: string, createdDate: string, assignedDate: string, resolvedDate: string, complaintNumSeq: number, reviewedBy: string,language:string, voted:number,namePoll: string,addressPoll: string,cityPoll: string,stateCodePoll: string,zipPoll: string, email: string, rowsReturned: number) 
    {            
        this.complaintID = complaintID;
        this.electionID = electionID;
        this.complaintNumber = complaintNumber;
        this.statusCode = statusCode;
        this.countyCode = countyCode;
        this.categoryID = categoryID;
        this.priorityID = priorityID;
        this.assignedStaffUID = assignedStaffUID;
        this.assignedStaff = assignedStaff;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.stateCode = stateCode;
        this.zip = zip;
        this.takenBy = takenBy;
        this.stationNumber = stationNumber;
        this.detailedMessage = detailedMessage;
        this.actionMessage = actionMessage;
        this.faxComments = faxComments;
        this.createdDate = createdDate;
        this.assignedDate = assignedDate;
        this.resolvedDate = resolvedDate;
        this.complaintNumSeq = complaintNumSeq;
        this.reviewedBy = reviewedBy;
       
        this.language = language;
        this.voted = voted;
        this.namePoll =      namePoll;
        this.addressPoll =   addressPoll;
        this.cityPoll =      cityPoll;
        this.stateCodePoll = stateCodePoll;
        this.zipPoll =       zipPoll;
        this.email =         email;
        this.rowsReturned = rowsReturned;
         }
         
}
