import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable,
  Modal,
  Alert, 
  Platform
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Button from '@/components/Button';
import HealthIndicatorCard, { HealthIndicator } from '@/components/HealthIndicatorCard';
import InterventionCard from '@/components/InterventionCard';

export default function HealthOutcomes() {
  const [selectedIndicator, setSelectedIndicator] = useState<HealthIndicator | null>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);

  // Sample health data
  const healthIndicators: HealthIndicator[] = [
    {
      id: 1,
      measure: 'Life Expectancy',
      indigenous: 71.6,
      nonIndigenous: 80.2,
      gap: -8.6,
      trend: 'improving',
      priority: 'high',
      riskLevel: 'moderate',
      affectedPopulation: 81000,
      interventions: [
        {
          id: 1,
          name: 'Chronic Disease Management',
          status: 'active',
          progress: 65,
          participants: 234,
          urgency: 'medium'
        }
      ]
    },
    {
      id: 2,
      measure: 'Diabetes Prevalence',
      indigenous: 8.4,
      nonIndigenous: 4.2,
      gap: 4.2,
      trend: 'worsening',
      priority: 'critical',
      riskLevel: 'severe',
      affectedPopulation: 39648,
      interventions: [
        {
          id: 4,
          name: 'Diabetes Prevention Program',
          status: 'urgent',
          progress: 15,
          participants: 298,
          urgency: 'critical'
        }
      ]
    },
    {
      id: 3,
      measure: 'Mental Health',
      indigenous: 23.1,
      nonIndigenous: 16.8,
      gap: 6.3,
      trend: 'stable',
      priority: 'high',
      riskLevel: 'high',
      affectedPopulation: 59472,
      interventions: [
        {
          id: 3,
          name: 'Community Mental Health Program',
          status: 'active',
          progress: 35,
          participants: 156,
          urgency: 'high'
        }
      ]
    },
    {
      id: 4,
      measure: 'Cardiovascular Disease',
      indigenous: 12.8,
      nonIndigenous: 7.1,
      gap: 5.7,
      trend: 'improving',
      priority: 'high',
      riskLevel: 'moderate',
      affectedPopulation: 53808,
      interventions: [
        {
          id: 6,
          name: 'Heart Health Screening',
          status: 'active',
          progress: 78,
          participants: 445,
          urgency: 'medium'
        }
      ]
    }
  ];

  const handleConnectServices = (indicator: HealthIndicator) => {
    setSelectedIndicator(indicator);
    setShowServiceModal(true);
  };

  const handleServiceConnection = (serviceType: string) => {
    setShowServiceModal(false);
    Alert.alert(
      'Service Connected',
      `Successfully connected to ${serviceType} for ${selectedIndicator?.measure}`,
      [{ text: 'OK', style: 'default' }]
    );
  };



  const renderServiceModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showServiceModal}
      onRequestClose={() => setShowServiceModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Connect Health Services</Text>
            <Pressable onPress={() => setShowServiceModal(false)}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </Pressable>
          </View>
          
          {selectedIndicator && (
            <View style={styles.modalBody}>
              <Text style={styles.selectedMeasure}>
                Finding services for: {selectedIndicator.measure}
              </Text>
              <Text style={styles.measureDetails}>
                Priority: {selectedIndicator.priority} • Gap: {Math.abs(selectedIndicator.gap)}
                {selectedIndicator.measure.includes('Expectancy') ? ' years' : '%'}
              </Text>
              
              <View style={styles.serviceOptions}>
                <Pressable 
                  style={styles.serviceOption}
                  onPress={() => handleServiceConnection('Royal Flying Doctor Service')}
                >
                  <View style={styles.serviceHeader}>
                    <Ionicons name="airplane" size={20} color="#8B5CF6" />
                    <Text style={styles.serviceName}>Royal Flying Doctor Service</Text>
                  </View>
                  <Text style={styles.serviceType}>Mobile Health • Remote Areas</Text>
                  <View style={styles.serviceStats}>
                    <Text style={styles.serviceStat}>85% capacity</Text>
                    <Text style={styles.serviceStat}>2-3 days wait</Text>
                  </View>
                </Pressable>
                
                <Pressable 
                  style={styles.serviceOption}
                  onPress={() => handleServiceConnection('Community Health Center')}
                >
                  <View style={styles.serviceHeader}>
                    <Ionicons name="medical" size={20} color="#10B981" />
                    <Text style={styles.serviceName}>Community Health Center</Text>
                  </View>
                  <Text style={styles.serviceType}>Primary Care • Urban/Regional</Text>
                  <View style={styles.serviceStats}>
                    <Text style={styles.serviceStat}>90% capacity</Text>
                    <Text style={styles.serviceStat}>1-2 days wait</Text>
                  </View>
                </Pressable>
                
                <Pressable 
                  style={styles.serviceOption}
                  onPress={() => handleServiceConnection('Indigenous Health Service')}
                >
                  <View style={styles.serviceHeader}>
                    <Ionicons name="people" size={20} color="#F59E0B" />
                    <Text style={styles.serviceName}>Indigenous Health Service</Text>
                  </View>
                  <Text style={styles.serviceType}>Community Controlled • All Areas</Text>
                  <View style={styles.serviceStats}>
                    <Text style={styles.serviceStat}>60% capacity</Text>
                    <Text style={styles.serviceStat}>1-2 weeks wait</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Health Outcomes</Text>
        <Text style={styles.headerSubtitle}>
          Tier 1: Health Status & Outcomes with AI Analysis
        </Text>
      </View>

      {/* Health Indicators */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Health Indicators</Text>
        {healthIndicators.map((indicator) => (
          <HealthIndicatorCard
            key={indicator.id}
            indicator={indicator}
            onConnectServices={() => handleConnectServices(indicator)}
          />
        ))}
      </View>

      {/* AI Insights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Health Insights</Text>
        <View style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <Ionicons name="bulb" size={20} color="#F59E0B" />
            <Text style={styles.insightTitle}>Critical Recommendation</Text>
          </View>
          <Text style={styles.insightText}>
            Diabetes prevalence showing concerning upward trend. Immediate intervention 
            with mobile screening units recommended for very remote communities.
          </Text>
          <View style={styles.insightFooter}>
            <Text style={styles.confidenceText}>AI Confidence: 94%</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionSection}>
        <Button 
          label="View All Interventions" 
          icon="list"
          onPress={() => Alert.alert('Navigation', 'Would navigate to tracking screen')}
        />
        <Button 
          label="Export Health Report" 
          icon="download"
          theme="secondary"
          onPress={() => Alert.alert('Export', 'Health report would be exported')}
        />
      </View>

      {renderServiceModal()}
      
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
    paddingTop: Platform.OS === 'ios' ? 50 : 50, // Increased from 20
    paddingBottom: 40,
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
  insightCard: {
    backgroundColor: '#FEF3C7',
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    borderRadius: 12,
    padding: 16,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92400E',
    marginLeft: 8,
  },
  insightText: {
    fontSize: 14,
    color: '#78350F',
    lineHeight: 20,
    marginBottom: 12,
  },
  insightFooter: {
    alignItems: 'flex-end',
  },
  confidenceText: {
    fontSize: 12,
    color: '#92400E',
    fontWeight: '600',
  },
  actionSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  // Modal styles
  // Modal styles
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
  height: '70%',
  paddingHorizontal: 20,
  paddingTop: 20,
  paddingBottom: 20,
},
modalHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 20,
},
modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#1F2937',
},
modalBody: {
  flex: 1,
},
  selectedMeasure: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 5,
  },
  measureDetails: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  serviceOptions: {
    gap: 12,
  },
  serviceOption: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
    flex: 1,
  },
  serviceType: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  serviceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceStat: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  footer: {
    height: 100,
  },
});