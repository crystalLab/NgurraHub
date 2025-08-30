import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type MetricCardProps = {
  metric: {
    id: number;
    title: string;
    value: string;
    subtitle: string;
    color: string;
    icon: keyof typeof Ionicons.glyphMap; // This ensures valid icon names
    trend: 'up' | 'down' | 'stable';
  };
};

export default function MetricCard({ metric }: MetricCardProps) {
  const getTrendIcon = (): keyof typeof Ionicons.glyphMap => {
    switch (metric.trend) {
      case 'up':
        return 'trending-up';
      case 'down':
        return 'trending-down';
      default:
        return 'remove';
    }
  };

  const getTrendColor = () => {
    switch (metric.trend) {
      case 'up':
        return '#10B981';
      case 'down':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  return (
    <View style={[styles.card, { borderLeftColor: metric.color }]}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: metric.color + '20' }]}>
          <Ionicons 
            name={metric.icon} 
            size={24} 
            color={metric.color} 
          />
        </View>
        <Ionicons 
          name={getTrendIcon()} 
          size={16} 
          color={getTrendColor()} 
        />
      </View>
      
      <Text style={styles.title} numberOfLines={2}>
        {metric.title}
      </Text>
      
      <Text style={styles.value}>
        {metric.value}
      </Text>
      
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>
          {metric.subtitle}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
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
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 18,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitleContainer: {
    marginTop: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    lineHeight: 16,
  },
});