export class CurrentStatus {
  previousActionId: number;
  documentstobeuploaded: any[];
  candidateType: string;
  name: string;
  value: string;
  actionId: number;
  description: string;

  constructor(previousActionId: number, documentstobeuploaded: any[],
              candidateType: string, name: string, value: string, actionId: number, description: string) {
    this.previousActionId = previousActionId;
    this.documentstobeuploaded = documentstobeuploaded;
    this.candidateType = candidateType;
    this.name = name;
    this.value = value;
    this.actionId = actionId;
    this.description = description;
  }
}
