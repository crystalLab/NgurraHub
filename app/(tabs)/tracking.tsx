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
import Button from '@/components/Button';
import InterventionCard from '@/components/InterventionCard';
import AIAnalysis from '@/components/AIAnalysis';

export default function Tracking() {
  const [selectedTab, setSelectedTab] = useState('active');
  const [showAIModal, setShowAIModal] = useState(false);

  // Sample tracking data
  const interventions = [
    {
      id: 1,
      name: 'Remote Diabetes Screening Program',
      community: 'Tennant Creek',
      startDate: '2024-01-15',
      status: 'active',
      progress: 68,
      participants: 145,
      completionRate: 82,
      outcomes: { "screened": 145, "diagnosed": 12, "referred": 8, "treated": 6 },
      connectedServices: ['Diabetes Australia Indigenous Program', 'Local Aboriginal Health Service'],
      nextMilestone: '2024-09-15',
      riskLevel: 'low'
    },
    {
      id: 2,
      name: 'Mental Health First Aid Training',
      community: 'Alice Springs',
      startDate: '2024-03-01',
      status: 'active',
      progress: 85,
      participants: 32,
      completionRate: 94,
      outcomes: { "trained": 28, "certified": 25, "active": 22, "reached": 450 },
      connectedServices: ['Mobile Mental Health Unit', 'Community Counseling Service'],
      nextMilestone: '2024-09-10',
      riskLevel: 'low'
    },
    {
      id: 3,
      name: 'Maternal Care Mobile Service',
      community: 'Yuendumu',
      startDate: '2024-02-10',
      status: 'active',
      progress: 45,
      participants: 67,
      completionRate: 89,
      outcomes: { "visits": 89, "births": 12, "complications": 1, "healthy": 11 },
      connectedServices: ['Anyinginyi Health Corporation', 'Flying Midwife Service'],
      nextMilestone: '2024-09-25',
      riskLevel: 'moderate'
    },
    {
      id: 4,
      name: 'Heart Health Community Program',
      community: 'Katherine',
      startDate: '2024-04-20',
      status: 'planning',
      progress: 15,
      participants: 12,
      completionRate: 100,
      outcomes: { "planning": 12, "recruited": 8, "trained": 3 },
      connectedServices: ['Cardiology Services'],
      nextMilestone: '2024-10-01',
      riskLevel: 'high'
    }
  ];

  const tabOptions = [
    { id: 'active', label: 'Active', icon: 'checkmark-circle', count: interventions.filter(i => i.status === 'active').length },
    { id: 'planning', label: 'Planning', icon: 'time', count: interventions.filter(i => i.status === 'planning').length },
    { id: 'completed', label: 'Completed', icon: 'checkmark-done', count: interventions.filter(i => i.status === 'completed').length },
    { id: 'all', label: 'All', icon: 'apps', count: interventions.length }
  ];

  const filteredInterventions = selectedTab === 'all' 
    ? interventions 
    : interventions.filter(intervention => intervention.status === selectedTab);

  const handleViewDetails = (intervention: any) => {
    Alert.alert(
      intervention.name,
      `View detailed analytics and progress report for ${intervention.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'View Report', 
          onPress: () => Alert.alert('Report', `Detailed report for ${intervention.name} would open here`)
        }
      ]
    );
  };

  const handleConnectService = (intervention: any) => {
    Alert.alert(
      'Connect Additional Services',
      `Connect more health services to ${intervention.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Connect', 
          onPress: () => Alert.alert('Success', 'Additional services connected successfully!')
        }
      ]
    );
  };

  const handleAIAnalysis = () => {
    setShowAIModal(true);
  };

  const closeAIModal = () => {
    setShowAIModal(false);
  };

  const renderStats = () => {
    const activeInterventions = interventions.filter(i => i.status === 'active').length;
    const totalParticipants = interventions.reduce((sum, i) => sum + i.participants, 0);
    const avgProgress = Math.round(interventions.reduce((sum, i) => sum + i.progress, 0) / interventions.length);

    return (
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{activeInterventions}</Text>
          <Text style={styles.statLabel}>Active Programs</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalParticipants}</Text>
          <Text style={styles.statLabel}>Total Participants</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{avgProgress}%</Text>
          <Text style={styles.statLabel}>Avg Progress</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Progress Tracking</Text>
        <Text style={styles.headerSubtitle}>
          Live Intervention Monitoring & AI Analytics
        </Text>
      </View>

      {/* Stats Overview */}
      {renderStats()}

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabOptions.map((tab) => (
            <Pressable
              key={tab.id}
              style={[
                styles.tab,
                selectedTab === tab.id && styles.tabActive
              ]}
              onPress={() => setSelectedTab(tab.id)}
            >
              <Ionicons 
                name={tab.icon as keyof typeof Ionicons.glyphMap} 
                size={16} 
                color={selectedTab === tab.id ? '#FFFFFF' : '#6B7280'} 
              />
              <Text style={[
                styles.tabText,
                selectedTab === tab.id && styles.tabTextActive
              ]}>
                {tab.label}
              </Text>
              <View style={[
                styles.tabBadge,
                selectedTab === tab.id ? styles.tabBadgeActive : styles.tabBadgeInactive
              ]}>
                <Text style={[
                  styles.tabBadgeText,
                  selectedTab === tab.id ? styles.tabBadgeTextActive : styles.tabBadgeTextInactive
                ]}>
                  {tab.count}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Interventions List */}
      <ScrollView style={styles.interventionsList}>
        {filteredInterventions.length > 0 ? (
          <>
            <View style={styles.listHeader}>
              <Text style={styles.resultCount}>
                {filteredInterventions.length} intervention{filteredInterventions.length !== 1 ? 's' : ''} found
              </Text>
              <Pressable style={styles.sortButton}>
                <Ionicons name="funnel" size={16} color="#8B5CF6" />
                <Text style={styles.sortText}>Sort</Text>
              </Pressable>
            </View>

            {filteredInterventions.map((intervention) => (
              <InterventionCard
                key={intervention.id}
                intervention={intervention}
                onViewDetails={() => handleViewDetails(intervention)}
                onConnect={() => handleConnectService(intervention)}
              />
            ))}
          </>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="document-text" size={48} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>No interventions found</Text>
            <Text style={styles.emptySubtitle}>
              No interventions match the selected status
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Button
          label="Export Progress Report"
          icon="download"
          onPress={() => Alert.alert('Export', 'Progress report would be exported')}
        />
        <View style={styles.actionRow}>
          <View style={styles.actionButton}>
            <Button
              label="Schedule Review"
              icon="calendar"
              onPress={() => Alert.alert('Calendar', 'Review meeting would be scheduled')}
            />
          </View>
          <View style={styles.actionButton}>
            <Button
              label="AI Analysis"
              icon="analytics"
              theme="primary"
              onPress={handleAIAnalysis}
            />
          </View>
        </View>
      </View>

      {/* AI Analysis Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAIModal}
        onRequestClose={closeAIModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>AI Analysis Dashboard</Text>
              <Pressable onPress={closeAIModal} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </Pressable>
            </View>
            
            <View style={styles.aiContainer}>
              <AIAnalysis />
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  tabContainer: {
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 9,
    paddingVertical: 9,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tabActive: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  tabText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
    marginRight: 8,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  tabBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  tabBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  tabBadgeInactive: {
    backgroundColor: '#F3F4F6',
  },
  tabBadgeText: {
    fontSize: 11, 
    fontWeight: 'bold',
  },
  tabBadgeTextActive: {
    color: '#FFFFFF',
  },
  tabBadgeTextInactive: {
    color: '#6B7280',
  },
  interventionsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  resultCount: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    paddingVertical: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sortText: {
    fontSize: 12,
    color: '#8B5CF6',
    marginLeft: 4,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  quickActions: {
    backgroundColor: 'white',
    paddingHorizontal: 20, 
    paddingVertical: 2,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 2,
  },
  actionButton: {
    flex: 1,
  },

  // Modal Styles
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
  padding: 8,
  backgroundColor: '#F3F4F6',
  borderRadius: 20,
  width: 32,
  height: 32,
  alignItems: 'center',
  justifyContent: 'center',
},
aiContainer: {
  flex: 1,
},
});