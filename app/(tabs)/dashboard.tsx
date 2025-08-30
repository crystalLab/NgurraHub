import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable,
  Alert 
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

// Import custom components
import MetricCard from '@/components/MetrixCard';
import AlertCard from '@/components/AlertCardProps';
import InterventionCard from '@/components/InterventionCard';
import TrendChart from '@/components/TrendChart';
import Button from '@/components/Button';

export default function Dashboard() {
  const [refreshing, setRefreshing] = useState(false);

  // Sample data - in real app this would come from API
  const keyMetrics = [
    {
      id: 1,
      title: 'Total Indigenous Population',
      value: '944,000',
      subtitle: '+2.1% from last year',
      color: '#8B5CF6',
      icon: 'people' as keyof typeof Ionicons.glyphMap,
      trend: 'up' as const
    },
    {
      id: 2,
      title: 'Life Expectancy Gap',
      value: '8.6 years',
      subtitle: 'Gap to close',
      color: '#EF4444',
      icon: 'heart' as keyof typeof Ionicons.glyphMap,
      trend: 'down' as const
    },
    {
      id: 3,
      title: 'Education Completion',
      value: '65%',
      subtitle: 'Target: 85%',
      color: '#10B981',
      icon: 'school' as keyof typeof Ionicons.glyphMap,
      trend: 'up' as const
    },
    {
      id: 4,
      title: 'Employment Rate',
      value: '48%',
      subtitle: 'Target: 70%',
      color: '#F59E0B',
      icon: 'briefcase' as keyof typeof Ionicons.glyphMap,
      trend: 'stable' as const
    }
  ];

  const criticalAlerts = [
    {
      id: 1,
      title: 'Diabetes Crisis in Very Remote Communities',
      description: '34% increase in diabetes cases over 6 months',
      priority: 'critical',
      action: 'Deploy mobile screening units immediately'
    },
    {
      id: 2,
      title: 'Mental Health Service Capacity',
      description: 'Mobile Mental Health Unit at 97% capacity',
      priority: 'high',
      action: 'Request additional mobile unit deployment'
    }
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('Success', 'Data refreshed successfully');
    }, 2000);
  };

  const handleServiceConnect = () => {
    Alert.alert(
      'Service Connection', 
      'This would open the service matching system'
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Closing the Gap</Text>
        <Text style={styles.headerSubtitle}>AI-Powered Health Intelligence</Text>
        
        <Pressable style={styles.alertBadge} onPress={() => Alert.alert('AI Alerts', '2 critical alerts require attention')}>
          <Ionicons name="notifications" size={16} color="#EF4444" />
          <Text style={styles.alertText}>2 AI Alerts</Text>
        </Pressable>
      </View>

      {/* Key Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Health Metrics</Text>
        <View style={styles.metricsGrid}>
          {keyMetrics.map((metric) => (
            <MetricCard 
              key={metric.id} 
              metric={metric} 
            />
          ))}
        </View>
      </View>

      {/* Critical Alerts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Critical Health Gaps</Text>
        {criticalAlerts.map((alert) => (
          <AlertCard 
            key={alert.id} 
            alert={alert} 
            onConnect={handleServiceConnect}
          />
        ))}
      </View>

      {/* Trend Chart */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health Trends (2018-2025)</Text>
        <TrendChart />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <Button 
          label="Connect Health Services" 
          theme="primary"
          onPress={handleServiceConnect}
        />
        <View style={styles.buttonSpacing} />
        <Button 
          label="Refresh Data" 
          onPress={handleRefresh}
        />
      </View>

      {/* Footer spacing for tab bar */}
      <View style={styles.footer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 15,
  },
  alertBadge: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  alertText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  buttonSpacing: {
    height: 15,
  },
  footer: {
    height: 100, // Space for tab bar
  },
});