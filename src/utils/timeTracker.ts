export function timeTracker() {
  // TODO: start/stop timestamps, compute hesitation gaps, etc.
  
  const startTime = Date.now();
  let intervals: {start: number, end: number}[] = [];
  let isRunning = false;
  let currentStart: number | null = null;
  
  return {
    start: () => {
      if (!isRunning) {
        currentStart = Date.now();
        isRunning = true;
      }
    },
    
    pause: () => {
      if (isRunning && currentStart !== null) {
        intervals.push({
          start: currentStart,
          end: Date.now()
        });
        isRunning = false;
        currentStart = null;
      }
    },
    
    stop: () => {
      if (isRunning && currentStart !== null) {
        intervals.push({
          start: currentStart,
          end: Date.now()
        });
      }
      
      const totalTime = Date.now() - startTime;
      const activeTime = intervals.reduce((sum, interval) => 
        sum + (interval.end - interval.start), 0);
      const hesitationTime = totalTime - activeTime;
      
      return {
        totalTime,
        activeTime,
        hesitationTime,
        intervals,
        hesitationRatio: hesitationTime / totalTime
      };
    },
    
    reset: () => {
      intervals = [];
      isRunning = false;
      currentStart = null;
    }
  };
}
