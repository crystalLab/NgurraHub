import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface InterventionData {
  id: number;
  name: string;
  community: string;
  startDate: string;
  status: 'active' | 'planning' | 'completed' | 'paused';
  progress: number;
  participants: number;
  completionRate?: number;
  outcomes?: { [key: string]: number };
  connectedServices?: string[];
  nextMilestone?: string;
  riskLevel?: 'low' | 'moderate' | 'high' | 'critical';
}

interface InterventionCardProps {
  intervention: InterventionData;
  onViewDetails?: () => void;
  onConnect?: () => void;
}

const InterventionCard: React.FC<InterventionCardProps> = ({ 
  intervention, 
  onViewDetails, 
  onConnect 
}) => {
  const getStatusConfig = () => {
    switch (intervention.status) {
      case 'active':
        return {
          backgroundColor: '#D1FAE5',
          textColor: '#065F46',
          icon: 'checkmark-circle' as const
        };
      case 'planning':
        return {
          backgroundColor: '#DBEAFE',
          textColor: '#1E40AF',
          icon: 'time' as const
        };
      case 'completed':
        return {
          backgroundColor: '#D1FAE5',
          textColor: '#065F46',
          icon: 'checkmark-done' as const
        };
      case 'paused':
        return {
          backgroundColor: '#FEE2E2',
          textColor: '#991B1B',
          icon: 'pause' as const
        };
      default:
        return {
          backgroundColor: '#F3F4F6',
          textColor: '#374151',
          icon: 'help-circle' as const
        };
    }
  };

  const getRiskColor = () => {
    switch (intervention.riskLevel) {
      case 'critical':
        return '#EF4444';
      case 'high':
        return '#F59E0B';
      case 'moderate':
        return '#3B82F6';
      case 'low':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={styles.interventionName}>{intervention.name}</Text>
          <Text style={styles.communityText}>
            {intervention.community} • Started {intervention.startDate}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusConfig.backgroundColor }]}>
          <Ionicons 
            name={statusConfig.icon} 
            size={12} 
            color={statusConfig.textColor} 
          />
          <Text style={[styles.statusText, { color: statusConfig.textColor }]}>
            {intervention.status.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Progress Section */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Overall Progress</Text>
          <Text style={styles.progressValue}>{intervention.progress}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { 
                width: `${intervention.progress}%`,
                backgroundColor: intervention.progress >= 70 ? '#10B981' : 
                                intervention.progress >= 40 ? '#F59E0B' : '#EF4444'
              }
            ]} 
          />
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{intervention.participants}</Text>
          <Text style={styles.statLabel}>Participants</Text>
        </View>
        
        {intervention.completionRate && (
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{intervention.completionRate}%</Text>
            <Text style={styles.statLabel}>Completion</Text>
          </View>
        )}
        
        {intervention.riskLevel && (
          <View style={styles.statItem}>
            <View style={styles.riskIndicator}>
              <View style={[styles.riskDot, { backgroundColor: getRiskColor() }]} />
              <Text style={[styles.statValue, { color: getRiskColor() }]}>
                {intervention.riskLevel}
              </Text>
            </View>
            <Text style={styles.statLabel}>Risk Level</Text>
          </View>
        )}
      </View>

      {/* Outcomes Section */}
      {intervention.outcomes && (
        <View style={styles.outcomesSection}>
          <Text style={styles.sectionTitle}>Key Outcomes</Text>
          <View style={styles.outcomesGrid}>
            {Object.entries(intervention.outcomes).slice(0, 4).map(([key, value]) => (
              <View key={key} style={styles.outcomeItem}>
                <Text style={styles.outcomeValue}>{value}</Text>
                <Text style={styles.outcomeLabel}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Connected Services */}
      {intervention.connectedServices && intervention.connectedServices.length > 0 && (
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Connected Services</Text>
          <View style={styles.servicesList}>
            {intervention.connectedServices.slice(0, 2).map((service, index) => (
              <View key={index} style={styles.serviceTag}>
                <Ionicons name="medical" size={12} color="#10B981" />
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
            {intervention.connectedServices.length > 2 && (
              <Text style={styles.moreServices}>
                +{intervention.connectedServices.length - 2} more
              </Text>
            )}
          </View>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <Pressable 
          style={styles.primaryButton}
          onPress={onViewDetails}
        >
          <Ionicons name="eye" size={16} color="white" />
          <Text style={styles.primaryButtonText}>View Details</Text>
        </Pressable>
        
        {onConnect && (
          <Pressable 
            style={styles.secondaryButton}
            onPress={onConnect}
          >
            <Ionicons name="add-circle" size={16} color="#8B5CF6" />
            <Text style={styles.secondaryButtonText}>Add Services</Text>
          </Pressable>
        )}
      </View>

      {/* Next Milestone */}
      {intervention.nextMilestone && (
        <View style={styles.milestoneSection}>
          <Ionicons name="flag" size={14} color="#6B7280" />
          <Text style={styles.milestoneText}>
            Next milestone: {intervention.nextMilestone}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleSection: {
    flex: 1,
    marginRight: 12,
  },
  interventionName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  communityText: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  riskIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  riskDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  outcomesSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  outcomesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  outcomeItem: {
    width: '50%',
    paddingRight: 8,
    marginBottom: 8,
  },
  outcomeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  outcomeLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  servicesSection: {
    marginBottom: 16,
  },
  servicesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  serviceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  serviceText: {
    fontSize: 11,
    color: '#065F46',
    marginLeft: 4,
    fontWeight: '500',
  },
  moreServices: {
    fontSize: 11,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  actionSection: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  milestoneSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  milestoneText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 8,
  },
});

export default InterventionCard;