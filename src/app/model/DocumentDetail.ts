export class DocumentDetail {
  docId: string;
  value: string;
  filename: string;
  verified: boolean;
  reject: boolean;
  reason: string;

  constructor(docId: string, value: string, filename: string, verified: boolean, reject: boolean, reason: string) {
    this.docId = docId;
    this.value = value;
    this.filename = filename;
    this.verified = verified;
    this.reject = reject;
    this.reason = reason;
  }
}
