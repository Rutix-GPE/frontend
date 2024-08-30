export interface Question {
  id: number;
  name: string;
  content: string;
  type: string;
  choices?: string[];
  page: number;
  creationDate?: Date;
  updatedDate?: Date;
}
