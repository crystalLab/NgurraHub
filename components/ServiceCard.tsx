import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable 
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Service {
  id: string;
  name: string;
  type: string;
  coverage: string[];
  specialties: string[];
  phone: string;
  capacity: number;
  availableSlots: number;
  waitTime: string;
  culturalScore: number;
  responseTime: string;
  successRate: number;
  currentLoad: 'low' | 'moderate' | 'high' | 'critical';
  status: 'available' | 'limited' | 'urgent';
}

interface ServiceCardProps {
  service: Service;
  onConnect: () => void;
}

export default function ServiceCard({ service, onConnect }: ServiceCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#10B981';
      case 'limited': return '#F59E0B';
      case 'urgent': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getLoadColor = (load: string) => {
    switch (load) {
      case 'low': return '#10B981';
      case 'moderate': return '#F59E0B';
      case 'high': return '#F97316';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'Mobile Health': return 'airplane';
      case 'Community Controlled': return 'people';
      case 'Specialist Service': return 'medical';
      case 'Disease-Specific': return 'fitness';
      default: return 'medical';
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.serviceInfo}>
          <View style={styles.nameRow}>
            <Ionicons 
              name={getServiceIcon(service.type) as any} 
              size={20} 
              color="#8B5CF6" 
            />
            <Text style={styles.serviceName}>{service.name}</Text>
          </View>
          <Text style={styles.serviceType}>{service.type}</Text>
        </View>
        
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(service.status) }]}>
          <Text style={styles.statusText}>
            {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="location" size={16} color="#6B7280" />
            <Text style={styles.detailText}>
              {service.coverage.join(', ')}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time" size={16} color="#6B7280" />
            <Text style={styles.detailText}>{service.waitTime}</Text>
          </View>
        </View>

        <View style={styles.specialtiesContainer}>
          <Ionicons name="medical" size={16} color="#6B7280" />
          <Text style={styles.specialtiesText}>
            {service.specialties.join(' • ')}
          </Text>
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{service.capacity}%</Text>
            <Text style={styles.metricLabel}>Capacity</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{service.availableSlots}</Text>
            <Text style={styles.metricLabel}>Available</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{service.culturalScore}%</Text>
            <Text style={styles.metricLabel}>Cultural Score</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{service.successRate}%</Text>
            <Text style={styles.metricLabel}>Success Rate</Text>
          </View>
        </View>

        <View style={styles.loadIndicator}>
          <Text style={styles.loadLabel}>Current Load:</Text>
          <View style={styles.loadBadge}>
            <View style={[styles.loadDot, { backgroundColor: getLoadColor(service.currentLoad) }]} />
            <Text style={[styles.loadText, { color: getLoadColor(service.currentLoad) }]}>
              {service.currentLoad.charAt(0).toUpperCase() + service.currentLoad.slice(1)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.contactInfo}>
          <Ionicons name="call" size={16} color="#6B7280" />
          <Text style={styles.phoneText}>{service.phone}</Text>
        </View>
        
        <Pressable 
          style={[styles.connectButton, { opacity: service.status === 'urgent' ? 0.7 : 1 }]}
          onPress={onConnect}
        >
          <Ionicons name="link" size={16} color="white" />
          <Text style={styles.connectText}>Connect</Text>
        </Pressable>
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
  serviceInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 8,
    flex: 1,
  },
  serviceType: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  cardBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  specialtiesText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
    flex: 1,
    lineHeight: 20,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingVertical: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  loadIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  loadLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  loadBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  loadText: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
    fontWeight: '500',
  },
  connectButton: {
    backgroundColor: '#8B5CF6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  connectText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
});