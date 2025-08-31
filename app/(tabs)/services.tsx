import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable,
  TextInput,
  Alert, 
  Platform
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Button from '@/components/Button';
import ServiceCard from '@/components/ServiceCard';

export default function Services() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  // Sample services data
  const availableServices = [
    {
      id: 'rfd001',
      name: 'Royal Flying Doctor Service',
      type: 'Mobile Health',
      coverage: ['Remote', 'Very Remote'],
      specialties: ['Emergency Care', 'Primary Care', 'Chronic Disease'],
      phone: '1800 625 800',
      capacity: 85,
      availableSlots: 12,
      waitTime: '2-3 days',
      culturalScore: 78,
      responseTime: '4 hours',
      successRate: 94,
      currentLoad: 'moderate',
      status: 'available'
    },
    {
      id: 'ahs001',
      name: 'Anyinginyi Health Aboriginal Corporation',
      type: 'Community Controlled',
      coverage: ['Regional', 'Remote'],
      specialties: ['Primary Care', 'Mental Health', 'Social Services'],
      phone: '08 8962 4000',
      capacity: 60,
      availableSlots: 8,
      waitTime: '1-2 weeks',
      culturalScore: 95,
      responseTime: '24 hours',
      successRate: 89,
      currentLoad: 'high',
      status: 'limited'
    },
    {
      id: 'mhu001',
      name: 'Mobile Mental Health Unit',
      type: 'Specialist Service',
      coverage: ['All'],
      specialties: ['Mental Health', 'Counseling', 'Crisis Support'],
      phone: '13 11 14',
      capacity: 40,
      availableSlots: 3,
      waitTime: '1 week',
      culturalScore: 72,
      responseTime: '2 hours',
      successRate: 91,
      currentLoad: 'critical',
      status: 'urgent'
    },
    {
      id: 'dia001',
      name: 'Diabetes Australia Indigenous Program',
      type: 'Disease-Specific',
      coverage: ['Urban', 'Regional'],
      specialties: ['Diabetes Management', 'Education', 'Nutrition'],
      phone: '1300 136 588',
      capacity: 75,
      availableSlots: 15,
      waitTime: '3-5 days',
      culturalScore: 88,
      responseTime: '12 hours',
      successRate: 87,
      currentLoad: 'low',
      status: 'available'
    }
  ];

  const filterOptions = [
    { id: 'all', label: 'All Services', icon: 'apps' },
    { id: 'available', label: 'Available', icon: 'checkmark-circle' },
    { id: 'urgent', label: 'Urgent', icon: 'warning' },
    { id: 'emergency', label: 'Emergency', icon: 'medical' }
  ];

  const filteredServices = availableServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.specialties.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
                         service.status === selectedFilter ||
                         (selectedFilter === 'emergency' && service.specialties.includes('Emergency Care'));
    
    return matchesSearch && matchesFilter;
  });

  const handleServiceConnect = (service) => {
    Alert.alert(
      'Connect to Service',
      `Would you like to connect to ${service.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Connect', 
          style: 'default',
          onPress: () => {
            Alert.alert('Success', `Connected to ${service.name} successfully!`);
          }
        }
      ]
    );
  };

  const handleEmergencyCall = () => {
    Alert.alert(
      'Emergency Services',
      'Call emergency services now?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call Now', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Calling', 'Emergency services contacted');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Health Services</Text>
        <Text style={styles.headerSubtitle}>
          AI-Powered Service Connection Hub
        </Text>
        
        {/* Emergency Button */}
        <Pressable style={styles.emergencyButton} onPress={handleEmergencyCall}>
          <Ionicons name="warning" size={16} color="#FFFFFF" />
          <Text style={styles.emergencyText}>Emergency: Call Now</Text>
        </Pressable>
      </View>

      {/* Search and Filters */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search services, specialties..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
          {filterOptions.map((filter) => (
            <Pressable
              key={filter.id}
              style={[
                styles.filterChip,
                selectedFilter === filter.id && styles.filterChipActive
              ]}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <Ionicons 
                name={filter.icon as any} 
                size={16} 
                color={selectedFilter === filter.id ? '#FFFFFF' : '#6B7280'} 
              />
              <Text style={[
                styles.filterText,
                selectedFilter === filter.id && styles.filterTextActive
              ]}>
                {filter.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Services List */}
      <ScrollView style={styles.servicesList}>
        {filteredServices.length > 0 ? (
          <>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsCount}>
                {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
              </Text>
              <Pressable onPress={() => setRefreshing(!refreshing)}>
                <Ionicons name="refresh" size={20} color="#8B5CF6" />
              </Pressable>
            </View>
            
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onConnect={() => handleServiceConnect(service)}
              />
            ))}
          </>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={48} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>No services found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your search or filter criteria
            </Text>
            <Button
              label="Clear Filters"
              icon="close"
              onPress={() => {
                setSearchQuery('');
                setSelectedFilter('all');
              }}
            />
          </View>
        )}
      </ScrollView>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <View style={styles.quickActionRow}>
          <Pressable style={styles.quickActionButton} onPress={handleEmergencyCall}>
            <Ionicons name="call" size={20} color="#EF4444" />
            <Text style={styles.quickActionText}>Emergency</Text>
          </Pressable>
          
          <Pressable style={styles.quickActionButton}>
            <Ionicons name="chatbubble" size={20} color="#8B5CF6" />
            <Text style={styles.quickActionText}>Live Chat</Text>
          </Pressable>
          
          <Pressable style={styles.quickActionButton}>
            <Ionicons name="calendar" size={20} color="#10B981" />
            <Text style={styles.quickActionText}>Book Appointment</Text>
          </Pressable>
          
          <Pressable style={styles.quickActionButton}>
            <Ionicons name="help-circle" size={20} color="#F59E0B" />
            <Text style={styles.quickActionText}>Help</Text>
          </Pressable>
        </View>
      </View>
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
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28, // Reduced from 28
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4, // Reduced from 5
  },
  headerSubtitle: {
    fontSize: 16, // Reduced from 16
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 10, // Reduced from 15
  },
  emergencyButton: {
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14, // Reduced from 16
    paddingVertical: 9, // Reduced from 10
    borderRadius: 19, // Reduced from 20
    alignSelf: 'flex-start',
  },
  emergencyText: {
    color: 'white',
    fontSize: 14, // Reduced from 14
    fontWeight: '600',
    marginLeft: 5, // Reduced from 6
  },
  searchSection: {
    paddingHorizontal: 10,  //Reduce from 20
    paddingVertical: 10,  //Reduce from 20
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 18, //reduce from 16
    paddingVertical: 9,  //reduce from 12
    marginBottom: 12, //reduce from 16
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 15, //reduce from 16
    marginLeft: 12, //reduce from 12
    color: '#1F2937',
  },
  filtersContainer: {
    flexDirection: 'row',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8, //reduce from 8
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterChipActive: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  filterText: {
    fontSize: 14, //reduce from 14
    color: '#6B7280',
    marginLeft: 6,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  servicesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 15, //reduce from 16
    color: '#6B7280',
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
    marginBottom: 24,
    paddingHorizontal: 32,
    lineHeight: 20,
  },
  quickActions: {
    backgroundColor: 'white',
    paddingHorizontal: 20, 
    paddingVertical: 12, //reduced from 16
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  quickActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickActionButton: {
    alignItems: 'center',
    padding: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    fontWeight: '500',
  },
});