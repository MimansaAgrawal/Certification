export class LaptopDetails {
  systemType: string;
  softwareInstalled: string[];

  constructor(systemType: string, softwareInstalled: string[]) {
    this.systemType = systemType;
    this.softwareInstalled = softwareInstalled;
  }
}
