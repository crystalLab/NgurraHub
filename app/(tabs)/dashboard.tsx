import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable,
  Alert,
  Modal, 
  Platform
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

// Import custom components
import MetricCard from '@/components/MetrixCard';
import AlertCard from '@/components/AlertCardProps';
import TrendChart from '@/components/TrendChart';
import Button from '@/components/Button';

export default function Dashboard() {
  const [refreshing, setRefreshing] = useState(false);
  const [showAIAlertsModal, setShowAIAlertsModal] = useState(false);

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
      priority: 'critical' as const,
      action: 'Deploy mobile screening units immediately'
    },
    {
      id: 2,
      title: 'Mental Health Service Capacity',
      description: 'Mobile Mental Health Unit at 97% capacity',
      priority: 'high' as const,
      action: 'Request additional mobile unit deployment'
    }
  ];

  // Enhanced AI Alerts data - Only critical alerts
  const aiAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Diabetes Outbreak Pattern Detected',
      message: 'AI has identified a concerning pattern: 34% increase in diabetes cases across very remote communities in the past 6 months. Pattern suggests environmental or supply chain factors.',
      confidence: 94,
      timeDetected: '2 hours ago',
      recommendations: [
        'Deploy mobile screening units to affected areas',
        'Investigate recent changes in food supply chains',
        'Increase community education programs'
      ],
      affectedCommunities: ['Tennant Creek', 'Yuendumu', 'Papunya'],
      priority: 1
    },
    {
      id: 2,
      type: 'critical',
      title: 'Mental Health Service Capacity Crisis',
      message: 'Predictive models indicate mental health services will exceed capacity by 15% within next 3 weeks. Current utilization: 97%. Seasonal depression patterns contributing factor.',
      confidence: 87,
      timeDetected: '4 hours ago',
      recommendations: [
        'Request emergency mobile mental health unit deployment',
        'Activate telehealth overflow protocols',
        'Coordinate with neighboring regions for capacity sharing'
      ],
      affectedCommunities: ['Alice Springs', 'Katherine'],
      priority: 2
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

  const handleAIAlertsPress = () => {
    setShowAIAlertsModal(true);
  };

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'critical': return '#EF4444';
      case 'warning': return '#F59E0B';
      case 'opportunity': return '#10B981';
      case 'trend': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case 'critical': return 'warning';
      case 'warning': return 'alert-circle';
      case 'opportunity': return 'trending-up';
      case 'trend': return 'analytics';
      default: return 'information-circle';
    }
  };

  const renderAIAlertsModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showAIAlertsModal}
      onRequestClose={() => setShowAIAlertsModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>AI Health Alerts</Text>
            <Pressable onPress={() => setShowAIAlertsModal(false)} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </Pressable>
          </View>
          
          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            <View style={styles.alertsSummary}>
              <Text style={styles.alertsSummaryText}>
                {aiAlerts.filter(a => a.type === 'critical' || a.type === 'warning').length} alerts require immediate attention
              </Text>
            </View>

            {aiAlerts.map((alert) => (
              <View key={alert.id} style={styles.aiAlertCard}>
                <View style={styles.aiAlertHeader}>
                  <View style={styles.aiAlertTitleRow}>
                    <Ionicons 
                      name={getAlertTypeIcon(alert.type) as any} 
                      size={18} 
                      color={getAlertTypeColor(alert.type)} 
                    />
                    <Text style={styles.aiAlertTitle}>{alert.title}</Text>
                  </View>
                  <View style={styles.aiAlertBadges}>
                    <View style={[styles.aiAlertTypeBadge, { backgroundColor: getAlertTypeColor(alert.type) }]}>
                      <Text style={styles.aiAlertTypeText}>{alert.type}</Text>
                    </View>
                    <View style={styles.aiConfidenceBadge}>
                      <Text style={styles.aiConfidenceText}>{alert.confidence}%</Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.aiAlertMessage}>{alert.message}</Text>

                <View style={styles.aiAlertMeta}>
                  <Text style={styles.aiAlertTime}>{alert.timeDetected}</Text>
                  <Text style={styles.aiAlertCommunities}>
                    Affects: {alert.affectedCommunities.join(', ')}
                  </Text>
                </View>

                <View style={styles.recommendationsSection}>
                  <Text style={styles.recommendationsTitle}>AI Recommendations:</Text>
                  {alert.recommendations.map((rec, index) => (
                    <View key={index} style={styles.recommendationItem}>
                      <Text style={styles.recommendationBullet}>•</Text>
                      <Text style={styles.recommendationText}>{rec}</Text>
                    </View>
                  ))}
                </View>

                {(alert.type === 'critical' || alert.type === 'warning') && (
                  <Pressable style={styles.takeActionButton}>
                    <Text style={styles.takeActionText}>Take Action</Text>
                    <Ionicons name="arrow-forward" size={14} color="#8B5CF6" />
                  </Pressable>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home Overview</Text>
        <Text style={styles.headerSubtitle}>AI-Powered Health Intelligence</Text>
        
        <Pressable style={styles.alertBadge} onPress={handleAIAlertsPress}>
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

      {/* Trend Chart - With proper container */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health Trends (2018-2025)</Text>
        <View style={styles.chartWrapper}>
          <TrendChart />
        </View>
      </View>

      {/* Action Buttons - Fixed alignment */}
      <View style={styles.actionSection}>
        <View style={styles.buttonWrapper}>
          <Button 
            label="Connect Health Services" 
            theme="primary"
            icon="flash"
            onPress={handleServiceConnect}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button 
            label="Refresh Data" 
            icon="refresh"
            onPress={handleRefresh}
          />
        </View>
      </View>

      {/* Footer spacing for tab bar */}
      <View style={styles.footer} />

      {renderAIAlertsModal()}
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
    paddingTop: Platform.OS === 'ios' ? 55 : 45, // Increased from 20
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
  // Chart container with clean bounds
  chartWrapper: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 0,
    marginHorizontal: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonWrapper: {
    marginVertical: 0,
  },
  footer: {
    height: 100,
  },
  // AI Alerts Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    height: '85%',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  closeButton: {
    padding: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    flex: 1,
  },
  alertsSummary: {
    backgroundColor: '#FEF3C7',
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  alertsSummaryText: {
    fontSize: 14,
    color: '#78350F',
    fontWeight: '600',
  },
  aiAlertCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  aiAlertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  aiAlertTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  aiAlertTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
    flex: 1,
  },
  aiAlertBadges: {
    flexDirection: 'row',
    gap: 6,
  },
  aiAlertTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  aiAlertTypeText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  aiConfidenceBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  aiConfidenceText: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
  },
  aiAlertMessage: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 10,
  },
  aiAlertMeta: {
    marginBottom: 12,
  },
  aiAlertTime: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  aiAlertCommunities: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  recommendationsSection: {
    marginBottom: 12,
  },
  recommendationsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  recommendationBullet: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: 'bold',
    marginRight: 8,
    marginTop: 1,
  },
  recommendationText: {
    fontSize: 12,
    color: '#4B5563',
    flex: 1,
    lineHeight: 16,
  },
  takeActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  takeActionText: {
    fontSize: 13,
    color: '#8B5CF6',
    fontWeight: '600',
    marginRight: 6,
  },
});