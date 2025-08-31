import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable 
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Intervention {
  id: number;
  name: string;
  status: string;
  progress: number;
  participants: number;
  urgency: string;
}

export interface HealthIndicator {
  id: number;
  measure: string;
  indigenous: number;
  nonIndigenous: number;
  gap: number;
  trend: 'improving' | 'worsening' | 'stable';
  priority: 'low' | 'medium' | 'high' | 'critical';
  riskLevel: 'low' | 'moderate' | 'high' | 'severe';
  affectedPopulation: number;
  interventions: Intervention[];
}

interface HealthIndicatorCardProps {
  indicator: HealthIndicator;
  onConnectServices: () => void;
}

export default function HealthIndicatorCard({ indicator, onConnectServices }: HealthIndicatorCardProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return 'trending-up';
      case 'worsening': return 'trending-down';
      case 'stable': return 'remove';
      default: return 'help';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving': return '#10B981';
      case 'worsening': return '#EF4444';
      case 'stable': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#F97316';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return '#10B981';
      case 'moderate': return '#F59E0B';
      case 'high': return '#F97316';
      case 'severe': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return '#10B981';
    if (progress >= 50) return '#F59E0B';
    if (progress >= 25) return '#F97316';
    return '#EF4444';
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const getGapDisplay = () => {
    const absGap = Math.abs(indicator.gap);
    const unit = indicator.measure.includes('Expectancy') ? ' years' : '%';
    return `${absGap}${unit}`;
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <Text style={styles.measureTitle}>{indicator.measure}</Text>
          <View style={styles.badgeRow}>
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(indicator.priority) }]}>
              <Text style={styles.badgeText}>
                {indicator.priority.charAt(0).toUpperCase() + indicator.priority.slice(1)} Priority
              </Text>
            </View>
            <View style={[styles.riskBadge, { backgroundColor: getRiskColor(indicator.riskLevel) }]}>
              <Text style={styles.badgeText}>
                {indicator.riskLevel.charAt(0).toUpperCase() + indicator.riskLevel.slice(1)} Risk
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.trendContainer}>
          <Ionicons 
            name={getTrendIcon(indicator.trend) as any} 
            size={24} 
            color={getTrendColor(indicator.trend)} 
          />
          <Text style={[styles.trendText, { color: getTrendColor(indicator.trend) }]}>
            {indicator.trend.charAt(0).toUpperCase() + indicator.trend.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statColumn}>
          <Text style={styles.statLabel}>Indigenous</Text>
          <Text style={styles.statValue}>
            {indicator.indigenous}
            {indicator.measure.includes('Expectancy') ? ' years' : '%'}
          </Text>
        </View>
        
        <View style={styles.statColumn}>
          <Text style={styles.statLabel}>Non-Indigenous</Text>
          <Text style={styles.statValue}>
            {indicator.nonIndigenous}
            {indicator.measure.includes('Expectancy') ? ' years' : '%'}
          </Text>
        </View>
        
        <View style={styles.statColumn}>
          <Text style={styles.statLabel}>Gap</Text>
          <Text style={[styles.statValue, styles.gapValue]}>
            {getGapDisplay()}
          </Text>
        </View>
      </View>

      <View style={styles.populationInfo}>
        <Ionicons name="people" size={16} color="#6B7280" />
        <Text style={styles.populationText}>
          Affected Population: {formatNumber(indicator.affectedPopulation)}
        </Text>
      </View>

      {indicator.interventions.length > 0 && (
        <View style={styles.interventionsSection}>
          <Text style={styles.interventionsTitle}>Active Interventions</Text>
          {indicator.interventions.map((intervention) => (
            <View key={intervention.id} style={styles.interventionItem}>
              <View style={styles.interventionHeader}>
                <View style={styles.interventionInfo}>
                  <Text style={styles.interventionName}>{intervention.name}</Text>
                  <Text style={styles.interventionDetails}>
                    {intervention.participants} participants • {intervention.status}
                  </Text>
                </View>
                <View style={[
                  styles.urgencyBadge, 
                  { backgroundColor: intervention.urgency === 'critical' ? '#EF4444' : 
                                    intervention.urgency === 'high' ? '#F97316' : '#F59E0B' }
                ]}>
                  <Text style={styles.urgencyText}>
                    {intervention.urgency}
                  </Text>
                </View>
              </View>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[
                    styles.progressFill, 
                    { 
                      width: `${intervention.progress}%`,
                      backgroundColor: getProgressColor(intervention.progress)
                    }
                  ]} />
                </View>
                <Text style={styles.progressText}>{intervention.progress}%</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      <View style={styles.cardFooter}>
        <Pressable style={styles.connectButton} onPress={onConnectServices}>
          <Ionicons name="link" size={16} color="white" />
          <Text style={styles.connectText}>Connect Services</Text>
        </Pressable>
        
        <View style={styles.actionButtons}>
          <Pressable style={styles.actionButton}>
            <Ionicons name="analytics" size={16} color="#8B5CF6" />
          </Pressable>
          <Pressable style={styles.actionButton}>
            <Ionicons name="share" size={16} color="#8B5CF6" />
          </Pressable>
          <Pressable style={styles.actionButton}>
            <Ionicons name="bookmark" size={16} color="#8B5CF6" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    paddingBottom: 12,
  },
  headerLeft: {
    flex: 1,
  },
  measureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
  trendContainer: {
    alignItems: 'center',
    marginLeft: 16,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    marginHorizontal: 16,
    borderRadius: 12,
  },
  statColumn: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  gapValue: {
    color: '#EF4444',
  },
  populationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  populationText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
    fontWeight: '500',
  },
  interventionsSection: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  interventionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  interventionItem: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  interventionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  interventionInfo: {
    flex: 1,
  },
  interventionName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  interventionDetails: {
    fontSize: 12,
    color: '#6B7280',
  },
  urgencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginLeft: 8,
  },
  urgencyText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    minWidth: 32,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  connectButton: {
    backgroundColor: '#8B5CF6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  connectText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});