import { useCallback } from 'react';

type MetricEvent = {
    category: string;
    action: string;
    label?: string;
    value?: number;
    metadata?: Record<string, any>;
};

export const useMetrics = () => {
    const hasConsent = useCallback(() => {
        return localStorage.getItem('gp-consent') === 'true';
    }, []);

    const trackEvent = useCallback((event: MetricEvent) => {
        if (!hasConsent()) {
            console.log('[Metrics Restricted] No consent given for event:', event.action);
            return;
        }

        // In a real app, this would send data to an analytics endpoint (e.g., Mixpanel, PostHog, or custom API)
        console.log(`[Metrics Tracked] ${event.category} > ${event.action}`, {
            ...event,
            timestamp: new Date().toISOString(),
            url: window.location.href,
        });

        // Simulate persistence to a local "metrics" queue for demonstration
        const existingMetrics = JSON.parse(localStorage.getItem('gp-metrics') || '[]');
        existingMetrics.push({
            ...event,
            timestamp: new Date().toISOString(),
        });
        localStorage.setItem('gp-metrics', JSON.stringify(existingMetrics.slice(-50))); // Keep last 50
    }, [hasConsent]);

    const trackPageView = useCallback((pageName: string) => {
        trackEvent({
            category: 'Navigation',
            action: 'Page View',
            label: pageName,
        });
    }, [trackEvent]);

    return {
        trackEvent,
        trackPageView,
        hasConsent,
    };
};
