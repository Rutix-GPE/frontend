export interface Tasks {
  id?: number;
  name: string;
  description: string;
  taskDate: string;
  taskTime: string;
  status: string;
  creationDate?: string;
  updatedDate?: string;
  category?: string | null;
  user: string;
  color?: string;
  isEditing?: boolean;
}
