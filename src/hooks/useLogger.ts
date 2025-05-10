import { logger } from '../services/logger';

export interface LoggerHook {
  logEvent: (eventType: string, eventData: any) => void;
  sendEvents: () => Promise<void>;
}

/**
 * Hook for logging events throughout the app
 */
export function useLogger(): LoggerHook {
  // Simply wrap the logger service methods for now
  return {
    logEvent: (eventType: string, eventData: any) => {
      logger.logEvent(eventType, eventData);
    },
    
    sendEvents: async () => {
      await logger.sendEvents();
    }
  };
}
