export interface Assessment {
  /* TODO */
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'archived';
}

export interface Question {
  id: string;
  type: 'smartMC' | 'microTask' | 'openEnded';
  content: string;
  options?: string[];
  correctAnswer?: string | string[];
  hints?: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}
