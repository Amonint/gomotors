import { useState, useEffect, useCallback } from 'react';

interface VisitorData {
  isReturning: boolean;
  visitCount: number;
  lastVisit: string;
  preferredTopics: string[];
}

export const useChatPersonalization = () => {
  const [visitorData, setVisitorData] = useState<VisitorData>({
    isReturning: false,
    visitCount: 0,
    lastVisit: '',
    preferredTopics: []
  });

  useEffect(() => {
    // Cargar datos del visitante
    const savedData = localStorage.getItem('gomotors-visitor-data');
    const now = new Date().toISOString();

    if (savedData) {
      const parsed: VisitorData = JSON.parse(savedData);
      const updatedData = {
        ...parsed,
        isReturning: true,
        visitCount: parsed.visitCount + 1,
        lastVisit: now
      };
      setVisitorData(updatedData);
      localStorage.setItem('gomotors-visitor-data', JSON.stringify(updatedData));
    } else {
      // Primer visitante
      const newData: VisitorData = {
        isReturning: false,
        visitCount: 1,
        lastVisit: now,
        preferredTopics: []
      };
      setVisitorData(newData);
      localStorage.setItem('gomotors-visitor-data', JSON.stringify(newData));
    }
  }, []);

  const addPreferredTopic = useCallback((topic: string) => {
    setVisitorData(prev => {
      const topics = [...prev.preferredTopics];
      if (!topics.includes(topic)) {
        topics.push(topic);
      }
      const updated = { ...prev, preferredTopics: topics };
      localStorage.setItem('gomotors-visitor-data', JSON.stringify(updated));
      return updated;
    });
  }, []);


  return {
    visitorData,
    addPreferredTopic
  };
};

export default useChatPersonalization;