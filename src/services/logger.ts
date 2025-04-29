export const logger = { 
  /* TODO: queue & POST */ 
  eventQueue: [] as any[],
  
  logEvent: (eventType: string, eventData: any) => {
    const event = {
      timestamp: new Date().toISOString(),
      type: eventType,
      data: eventData
    };
    
    logger.eventQueue.push(event);
    console.log(`Logged event: ${eventType}`, eventData);
    
    // TODO: Implement batch sending of events
  },
  
  sendEvents: async () => {
    // TODO: Implement sending events to server
    if (logger.eventQueue.length === 0) return;
    
    console.log(`Sending ${logger.eventQueue.length} events to server`);
    // Clear queue after sending
    logger.eventQueue = [];
  }
};
