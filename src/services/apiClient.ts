export const apiClient = { 
  /* TODO: fetch wrapper */ 
  get: async (url: string) => {
    try {
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
      });
      return await response.json();
    } catch (error) {
      console.error('API Get error:', error);
      throw error;
    }
  },
  
  post: async (url: string, data: any) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      console.error('API Post error:', error);
      throw error;
    }
  }
};
