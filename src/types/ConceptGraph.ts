export interface Node {
  /* TODO */
  id: string;
  label: string;
  description?: string;
  type: 'concept' | 'skill' | 'topic';
  difficulty?: number;
  prerequisites?: string[];
}

export interface Edge {
  /* TODO */
  id: string;
  source: string;
  target: string;
  type: 'requires' | 'leads_to' | 'related';
  strength?: number;
}
