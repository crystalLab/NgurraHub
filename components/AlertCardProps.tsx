import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface AlertData {
  id: number;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low' | string;
  action: string;
}

interface AlertCardProps {
  alert: AlertData;
  onConnect: () => void;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert, onConnect }) => {
  const getPriorityConfig = () => {
    switch (alert.priority) {
      case 'critical':
        return {
          backgroundColor: '#FEF2F2',
          borderColor: '#EF4444',
          iconColor: '#EF4444',
          icon: 'warning' as const,
          badgeColor: '#DC2626',
          badgeText: '#FFFFFF'
        };
      case 'high':
        return {
          backgroundColor: '#FFFBEB',
          borderColor: '#F59E0B',
          iconColor: '#F59E0B',
          icon: 'alert-circle' as const,
          badgeColor: '#D97706',
          badgeText: '#FFFFFF'
        };
      case 'medium':
        return {
          backgroundColor: '#EFF6FF',
          borderColor: '#3B82F6',
          iconColor: '#3B82F6',
          icon: 'information-circle' as const,
          badgeColor: '#2563EB',
          badgeText: '#FFFFFF'
        };
      default:
        return {
          backgroundColor: '#F3F4F6',
          borderColor: '#6B7280',
          iconColor: '#6B7280',
          icon: 'checkmark-circle' as const,
          badgeColor: '#4B5563',
          badgeText: '#FFFFFF'
        };
    }
  };

  const config = getPriorityConfig();

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: config.backgroundColor,
        borderColor: config.borderColor 
      }
    ]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons 
            name={config.icon} 
            size={20} 
            color={config.iconColor} 
          />
          <Text style={styles.title}>{alert.title}</Text>
        </View>
        <View style={[
          styles.priorityBadge, 
          { backgroundColor: config.badgeColor }
        ]}>
          <Text style={[
            styles.priorityText, 
            { color: config.badgeText }
          ]}>
            {alert.priority.toUpperCase()}
          </Text>
        </View>
      </View>

      <Text style={styles.description}>
        {alert.description}
      </Text>

      <View style={styles.actionContainer}>
        <Text style={styles.actionLabel}>Recommended Action:</Text>
        <Text style={styles.actionText}>
          {alert.action}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable 
          style={[styles.connectButton, { backgroundColor: config.borderColor }]}
          onPress={onConnect}
        >
          <Ionicons name="flash" size={16} color="white" />
          <Text style={styles.connectButtonText}>
            AI Connect Services
          </Text>
        </Pressable>

        <Pressable style={styles.detailsButton}>
          <Text style={[styles.detailsButtonText, { color: config.borderColor }]}>
            View Details
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 8,
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  actionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  actionText: {
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  connectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  connectButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  detailsButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AlertCard;