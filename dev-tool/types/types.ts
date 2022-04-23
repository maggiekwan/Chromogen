export interface Connections {
  [tabId: string]: any;
}

export interface Message {
  tabId: string;
  action: string;
  stateObj: object;
  data: any;
}
