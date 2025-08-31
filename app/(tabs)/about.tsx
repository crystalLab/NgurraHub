import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable,
  Linking,
  Alert 
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Button from '@/components/Button';

export default function About() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleOpenURL = async (url: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open link');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to open link');
    }
  };

  const infoSections = [
    {
      id: 'about',
      title: 'About NgurraHub',
      icon: 'information-circle' as keyof typeof Ionicons.glyphMap,
      content: `The NgurraHub Data Insight & Action Platform is an AI-powered mobile application designed to support evidence-based decision making for improving Indigenous health and wellbeing outcomes in Australia.

This platform utilizes the Indigenous Health Performance Framework to provide real-time analytics, predictive insights, and smart service connections to help close the gap in health outcomes between Indigenous and non-Indigenous Australians.`
    },
    {
      id: 'features',
      title: 'Key Features',
      icon: 'star' as keyof typeof Ionicons.glyphMap,
      content: `• Real-time health analytics and monitoring
• AI-powered service matching and connections
• Predictive outcome modeling
• Live intervention progress tracking
• Community-level risk assessment
• Evidence-based action recommendations
• Cultural responsiveness scoring
• Emergency service quick-connect`
    },
    {
      id: 'framework',
      title: 'Indigenous Health Performance Framework',
      icon: 'medical' as keyof typeof Ionicons.glyphMap,
      content: `This app is built on the Indigenous Health Performance Framework (HPF), which consists of 68 measures across three domains:

Tier 1: Health status and outcomes
Tier 2: Determinants of health
Tier 3: Health system performance

The HPF provides a comprehensive view of Indigenous health and guides evidence-based policy and program development.`
    },
    {
      id: 'data',
      title: 'Data Sources',
      icon: 'analytics' as keyof typeof Ionicons.glyphMap,
      content: `Data is sourced from authoritative organizations including:

• Australian Institute of Health and Welfare (AIHW)
• Australian Bureau of Statistics (ABS)
• National Aboriginal Community Controlled Health Organisation (NACCHO)
• Department of Health and Aged Care
• Real-time service provider APIs`
    }
  ];

  const quickLinks = [
    {
      title: 'Indigenous HPF Website',
      subtitle: 'Official framework documentation',
      url: 'https://www.indigenoushpf.gov.au/',
      icon: 'globe' as keyof typeof Ionicons.glyphMap
    },
    {
      title: 'AIHW Indigenous Health',
      subtitle: 'Health statistics and reports',
      url: 'https://www.aihw.gov.au/reports-data/population-groups/indigenous-australians',
      icon: 'document-text' as keyof typeof Ionicons.glyphMap
    },
    {
      title: 'Closing the Gap',
      subtitle: 'Government strategy information',
      url: 'https://www.closingthegap.gov.au/',
      icon: 'link' as keyof typeof Ionicons.glyphMap
    }
  ];

  const appStats = [
    { label: 'Version', value: '1.0.0' },
    { label: 'Last Updated', value: 'August 2025' },
    { label: 'Data Sources', value: '5+' },
    { label: 'Health Measures', value: '68' }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Ionicons name="medical" size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.headerTitle}>NgurraHub</Text>
          <Text style={styles.headerSubtitle}>Mobile Health Analytics Platform</Text>
        </View>
      </View>

      {/* App Statistics */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>App Information</Text>
        <View style={styles.statsGrid}>
          {appStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Information Sections */}
      <View style={styles.infoSection}>
        {infoSections.map((section) => (
          <View key={section.id} style={styles.infoCard}>
            <Pressable
              style={styles.infoHeader}
              onPress={() => toggleSection(section.id)}
            >
              <View style={styles.infoTitleRow}>
                <Ionicons name={section.icon} size={20} color="#8B5CF6" />
                <Text style={styles.infoTitle}>{section.title}</Text>
              </View>
              <Ionicons 
                name={expandedSection === section.id ? 'chevron-up' : 'chevron-down'} 
                size={20} 
                color="#6B7280" 
              />
            </Pressable>
            
            {expandedSection === section.id && (
              <View style={styles.infoContent}>
                <Text style={styles.infoText}>{section.content}</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Quick Links */}
      <View style={styles.linksSection}>
        <Text style={styles.sectionTitle}>Quick Links</Text>
        {quickLinks.map((link, index) => (
          <Pressable 
            key={index} 
            style={styles.linkCard}
            onPress={() => handleOpenURL(link.url)}
          >
            <View style={styles.linkIcon}>
              <Ionicons name={link.icon} size={20} color="#8B5CF6" />
            </View>
            <View style={styles.linkContent}>
              <Text style={styles.linkTitle}>{link.title}</Text>
              <Text style={styles.linkSubtitle}>{link.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </Pressable>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <Button
          label="Contact Support"
          icon="mail"
          onPress={() => Alert.alert('Support', 'Contact support feature would open here')}
        />
        
        <Button
          label="Privacy Policy"
          icon="shield-checkmark"
          onPress={() => Alert.alert('Privacy', 'Privacy policy would be displayed here')}
        />
        
        <Button
          label="Terms of Service"
          icon="document-text"
          onPress={() => Alert.alert('Terms', 'Terms of service would be displayed here')}
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          This platform supports evidence-based decision making to close the gap in Indigenous health and wellbeing outcomes.
        </Text>
        
        <View style={styles.brandingSection}>
          <Text style={styles.brandingText}>Built with ❤️ for Indigenous Communities</Text>
          <Text style={styles.versionText}>Version 1.0.0 • August 2024</Text>
        </View>
      </View>

      {/* Bottom spacing for tab bar */}
      <View style={styles.bottomSpacing} />
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
    paddingTop: 40,
    paddingBottom: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logoSection: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  infoTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  infoContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  infoText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    paddingTop: 16,
  },
  linksSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  linkCard: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  linkIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  linkContent: {
    flex: 1,
  },
  linkTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  linkSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  actionSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
  brandingSection: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 16,
  },
  brandingText: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '500',
    marginBottom: 4,
  },
  versionText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  bottomSpacing: {
    height: 100,
  },
});