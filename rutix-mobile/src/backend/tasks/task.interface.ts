export interface Tasks {
  id?: number;
  name: string;
  description: string;
  taskDateTime: string;
  status: string;
  creationDate?: string;
  updatedDate?: string;
  category?: string | null;
  user: string;
  color?: string;
  isEditing?: boolean;
}





