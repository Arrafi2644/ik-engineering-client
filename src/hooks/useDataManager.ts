/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState, useEffect } from 'react';
import { mockServices, mockProjects, mockTeamMembers, mockMetrics } from '@/lib/mockData';

interface AppData {
  services: any[];
  projects: any[];
  teamMembers: any[];
  metrics: any;
  settings: any;
}

export const useDataManager = () => {
  const [data, setData] = useState<AppData>({
    services: [],
    projects: [],
    teamMembers: [],
    metrics: {},
    settings: {},
  });
  const [isLoading, setIsLoading] = useState(true);

 

  const loadAllData = useCallback(() => {
    setIsLoading(true);
    try {
      const services = JSON.parse(window.localStorage.getItem('services') || JSON.stringify(mockServices));
      const projects = JSON.parse(window.localStorage.getItem('projects') || JSON.stringify(mockProjects));
      const teamMembers = JSON.parse(window.localStorage.getItem('teamMembers') || JSON.stringify(mockTeamMembers));
      const metrics = JSON.parse(window.localStorage.getItem('metrics') || JSON.stringify(mockMetrics));
      const settings = JSON.parse(window.localStorage.getItem('settings') || '{}');

      setData({
        services,
        projects,
        teamMembers,
        metrics,
        settings,
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

   // Load data on mount
  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  const resetToDefaults = useCallback(() => {
    window.localStorage.removeItem('services');
    window.localStorage.removeItem('projects');
    window.localStorage.removeItem('teamMembers');
    window.localStorage.removeItem('metrics');
    window.localStorage.removeItem('settings');
    loadAllData();
  }, [loadAllData]);

  const exportData = useCallback(() => {
    try {
      const dataToExport = {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        ...data,
      };
      
      const json = JSON.stringify(dataToExport, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ik-engineering-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Error exporting data:', error);
      return false;
    }
  }, [data]);

  const importData = useCallback((file: File) => {
    return new Promise<boolean>((resolve) => {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          const importedData = JSON.parse(e.target?.result as string);
          
          if (importedData.services) window.localStorage.setItem('services', JSON.stringify(importedData.services));
          if (importedData.projects) window.localStorage.setItem('projects', JSON.stringify(importedData.projects));
          if (importedData.teamMembers) window.localStorage.setItem('teamMembers', JSON.stringify(importedData.teamMembers));
          if (importedData.metrics) window.localStorage.setItem('metrics', JSON.stringify(importedData.metrics));
          if (importedData.settings) window.localStorage.setItem('settings', JSON.stringify(importedData.settings));
          
          loadAllData();
          resolve(true);
        };
        reader.readAsText(file);
      } catch (error) {
        console.error('Error importing data:', error);
        resolve(false);
      }
    });
  }, [loadAllData]);

  return {
    data,
    isLoading,
    loadAllData,
    resetToDefaults,
    exportData,
    importData,
  };
};
