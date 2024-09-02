export interface Question {
  id: number;
  name: string;
  content: string;
  type: string;
  choice?: string[];
  page: number;
  creationDate?: Date;
  updatedDate?: Date;
}
