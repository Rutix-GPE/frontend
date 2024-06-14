export interface ExpirationInfo {
  date: string; // La date en format string
  timezone_type: number;
  timezone: string;
}

export interface User {
id:number
username: string,
role: string,
creationDate: string,
updatedDate: string,
}
