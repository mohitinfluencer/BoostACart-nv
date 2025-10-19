import { useState, useEffect } from 'react';
import { Store, Lead, WidgetSettings } from '../types';
import { SupabaseService } from '../services/supabaseService';
import { generateInitialData } from '../utils/dataGenerator';
import { useAuth } from './useAuth';

export const useSupabase = () => {
  const { user } = useAuth();
  const [stores, setStores] = useState<Store[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

  // Check if Supabase is configured
  const checkSupabaseConnection = () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    return !!(supabaseUrl && supabaseKey);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (checkSupabaseConnection()) {
          // Try to load from Supabase
          try {
            const [storesData, leadsData] = await Promise.all([
              SupabaseService.getStores(user?.id),
              SupabaseService.getLeads()
            ]);
            setStores(storesData);
            setLeads(leadsData);
            setIsSupabaseConnected(true);
          } catch (supabaseError) {
            console.warn('Supabase connection failed, using demo data:', supabaseError);
            // Fall back to demo data
            const { stores: demoStores, leads: demoLeads } = generateInitialData();
            setStores(demoStores);
            setLeads(demoLeads);
            setIsSupabaseConnected(false);
          }
        } else {
          // Use demo data when Supabase is not configured
          const { stores: demoStores, leads: demoLeads } = generateInitialData();
          setStores(demoStores);
          setLeads(demoLeads);
          setIsSupabaseConnected(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        // Fall back to demo data on any error
        const { stores: demoStores, leads: demoLeads } = generateInitialData();
        setStores(demoStores);
        setLeads(demoLeads);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  const updateStoreWidget = async (storeId: string, widgetSettings: Partial<WidgetSettings>) => {
    try {
      if (isSupabaseConnected) {
        await SupabaseService.updateWidgetSettings(storeId, widgetSettings);
      }
      
      // Update local state
      setStores(prev => prev.map(store => 
        store.id === storeId 
          ? { ...store, widgetSettings: { ...store.widgetSettings, ...widgetSettings } }
          : store
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update widget settings');
    }
  };

  const addLead = async (lead: Omit<Lead, 'id' | 'timestamp'>) => {
    try {
      // Log product detection for backend processing
      console.log('Processing lead with detected product:', {
        product: lead.product,
        variantId: lead.variantId,
        quantity: lead.quantity,
        sourceUrl: lead.sourceUrl,
        customerInfo: { name: lead.name, phone: lead.phone }
      });
      
      let newLead: Lead;
      
      if (isSupabaseConnected) {
        newLead = await SupabaseService.addLead(lead);
      } else {
        // Demo mode - create lead locally
        newLead = {
          ...lead,
          id: Date.now().toString(),
          timestamp: new Date().toISOString()
        };
      }
      
      setLeads(prev => [newLead, ...prev]);
      
      // Update store's lead count
      setStores(prev => prev.map(store => 
        store.id === lead.storeId 
          ? { 
              ...store, 
              totalLeads: store.totalLeads + 1,
              leadsThisMonth: store.leadsThisMonth + 1,
              remainingLeads: Math.max(0, store.remainingLeads - 1)
            }
          : store
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add lead');
    }
  };

  return {
    stores,
    leads,
    loading,
    error,
    isSupabaseConnected,
    updateStoreWidget,
    addLead
  };
};
