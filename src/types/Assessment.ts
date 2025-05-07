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

export interface SmartMCQuestion {
  id: string;
  type: 'smartMC';
  prompt: string;
  choices: { id: string; label: string; isCorrect: boolean }[];
}

export interface MicroTaskQuestion {
  id: string;
  type: 'microTask';
  prompt: string;
  /** URL of an SVG or PNG drag canvas, or null for default grid */
  canvas?: string | null;
  /** correct drop targets if needed */
  targets?: { id: string; x: number; y: number }[];
}

export interface ReasonChoiceQuestion {
  id: string;
  type: 'reasonChoice';
  prompt: string;
  options: { id: string; icon: string; label: string }[];
}

export interface ErrorAnalysisQuestion {
  id: string;
  type: 'errorAnalysis';
  /** image or SVG of the worked example */
  workUrl: string;
  /** list of selectable error-types */
  errorTypes: { id: string; label: string }[];
}

export type Question =
  | SmartMCQuestion
  | MicroTaskQuestion
  | ReasonChoiceQuestion
  | ErrorAnalysisQuestion;
