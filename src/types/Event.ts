export interface Event {
  /* TODO */
  id: string;
  type: EventType;
  timestamp: string;
  userId: string;
  sessionId: string;
  data: any;
}

export type EventType = 
  | 'page_view'
  | 'question_view'
  | 'question_submit'
  | 'hint_request'
  | 'assessment_start'
  | 'assessment_complete'
  | 'error';
