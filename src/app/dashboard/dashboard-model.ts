export class Candidate {
    candidateDetails: CandidateDetails;
    status: ICandidateStatus[];
    currentStatus: ICandidateCurrentStatus;
    nextAction: ICandidateCurrentStatus[];
    _id: string;
    constructor(param) {
        const employee = {
            candidateDetails: new CandidateDetails(param.candidateDetails),
            status: param.status || [],
            currentStatus: param.currentStatus,
            nextAction: param.nextAction,
            _id: param._id || '',
        };
        return employee;
    }
}

 class CandidateDetails {
     name: ICandidateName;
     dob: string;
     gender: string;
     email: string;
     mobile: string;
     doj: string;
     designation: ICandidateDesignation;
     profileStakeholder: IProfileStakeHolder;
     constructor(param) {
         const candidateDetails = {
            name: param.name || {},
            dob: param.dob || '',
            gender: param.gender || '',
            email: param.email || '',
            mobile: param.mobie || '',
            doj: param.doj || '',
            designation: param.designation || {},
            profileStakeholder: param.profileStakeholder || {},
         };
         return candidateDetails;
     }

}

interface IProfileStakeHolder {
    name: string;
    email: string;
}

interface ICandidateStatus {
    _id?: string;
    date: string;
    action: string;
    actionName: string;
    createdBy: string;
}

interface ICandidateName{
    firstName: string,
    middleName: string,
    lastName: string,
    fullName: string,
}

interface ICandidateDesignation {
    _id?: string;
    id?: string,
    name: string,
}

interface ICandidateCurrentStatus {
    _id?: string;
    documentstobeuploaded: any[];
    previousActionId: string;
    candidateType: string;
    name: string;
    value: string;
    actionId: string;
    description: string;
    screenId: string;
    compulsory?: boolean;
}

