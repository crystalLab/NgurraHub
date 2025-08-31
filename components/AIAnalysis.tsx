import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable,
  Alert,
  Dimensions 
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Button from '@/components/Button';

const { width } = Dimensions.get('window');

interface AIInsight {
  id: string;
  type: 'critical' | 'opportunity' | 'trend' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timeframe: string;
  relatedInterventions: string[];
  actionable: boolean;
}

interface PredictionData {
  intervention: string;
  currentProgress: number;
  predictedCompletion: number;
  riskFactors: string[];
  recommendations: string[];
}

export default function AIAnalysis() {
  const [selectedCategory, setSelectedCategory] = useState('overview');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Sample AI insights data
  const aiInsights: AIInsight[] = [
    {
      id: '1',
      type: 'critical',
      title: 'Mental Health Program Engagement Drop',
      description: 'Alice Springs Mental Health First Aid Training shows 15% decrease in engagement over past 2 weeks. Pattern suggests need for cultural adaptation.',
      confidence: 92,
      impact: 'high',
      timeframe: 'Immediate action needed',
      relatedInterventions: ['Mental Health First Aid Training'],
      actionable: true
    },
    {
      id: '2',
      type: 'opportunity',
      title: 'Diabetes Screening Success Pattern',
      description: 'Tennant Creek diabetes screening shows exceptional completion rates (82%). Model suggests replicating approach in Katherine and Yuendumu.',
      confidence: 88,
      impact: 'high',
      timeframe: 'Next 30 days',
      relatedInterventions: ['Remote Diabetes Screening Program'],
      actionable: true
    },
    {
      id: '3',
      type: 'trend',
      title: 'Seasonal Participation Patterns',
      description: 'AI detects 23% higher engagement in maternal care during cooler months. Suggests scheduling intensive programs for May-August.',
      confidence: 76,
      impact: 'medium',
      timeframe: 'Strategic planning',
      relatedInterventions: ['Maternal Care Mobile Service'],
      actionable: false
    },
    {
      id: '4',
      type: 'recommendation',
      title: 'Resource Optimization',
      description: 'Cross-program analysis suggests sharing mental health resources between Alice Springs and Katherine could improve efficiency by 34%.',
      confidence: 84,
      impact: 'medium',
      timeframe: 'Next 60 days',
      relatedInterventions: ['Mental Health First Aid Training', 'Heart Health Community Program'],
      actionable: true
    }
  ];

  const predictions: PredictionData[] = [
    {
      intervention: 'Remote Diabetes Screening',
      currentProgress: 68,
      predictedCompletion: 89,
      riskFactors: ['Weather delays', 'Transport issues'],
      recommendations: ['Add backup screening dates', 'Partner with local transport']
    },
    {
      intervention: 'Mental Health Training',
      currentProgress: 85,
      predictedCompletion: 96,
      riskFactors: ['Staff turnover'],
      recommendations: ['Implement mentorship program', 'Create retention incentives']
    },
    {
      intervention: 'Maternal Care Service',
      currentProgress: 45,
      predictedCompletion: 72,
      riskFactors: ['Seasonal access', 'Cultural barriers'],
      recommendations: ['Enhance cultural protocols', 'Improve all-weather access']
    }
  ];

  const categories = [
    { id: 'overview', label: 'Overview', icon: 'analytics' },
    { id: 'insights', label: 'Insights', icon: 'bulb' },
    { id: 'predictions', label: 'Predictions', icon: 'trending-up' },
    { id: 'recommendations', label: 'Actions', icon: 'checkmark-circle' }
  ];

  const runNewAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setLastUpdated(new Date());
      Alert.alert('Analysis Complete', 'New AI insights have been generated based on latest data.');
    }, 3000);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'critical': return 'warning';
      case 'opportunity': return 'trending-up';
      case 'trend': return 'analytics';
      case 'recommendation': return 'bulb';
      default: return 'information-circle';
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'critical': return '#EF4444';
      case 'opportunity': return '#10B981';
      case 'trend': return '#F59E0B';
      case 'recommendation': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const renderOverview = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>AI Analysis Overview</Text>
      
      <View style={styles.overviewCards}>
        <View style={styles.overviewCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="scan" size={20} color="#8B5CF6" />
            <Text style={styles.cardTitle}>Data Points Analyzed</Text>
          </View>
          <Text style={styles.cardValue}>2,847</Text>
          <Text style={styles.cardSubtext}>Across 4 interventions</Text>
        </View>
        
        <View style={styles.overviewCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="analytics" size={20} color="#10B981" />
            <Text style={styles.cardTitle}>AI Confidence</Text>
          </View>
          <Text style={styles.cardValue}>87%</Text>
          <Text style={styles.cardSubtext}>Average accuracy</Text>
        </View>
        
        <View style={styles.overviewCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="flash" size={20} color="#F59E0B" />
            <Text style={styles.cardTitle}>Action Items</Text>
          </View>
          <Text style={styles.cardValue}>3</Text>
          <Text style={styles.cardSubtext}>Require immediate attention</Text>
        </View>
      </View>

      <View style={styles.lastUpdated}>
        <Ionicons name="time" size={14} color="#6B7280" />
        <Text style={styles.lastUpdatedText}>
          Last updated: {lastUpdated.toLocaleDateString()} at {lastUpdated.toLocaleTimeString()}
        </Text>
      </View>

      <View style={styles.runAnalysisContainer}>
        <Pressable 
          style={[styles.analyzeButton, isAnalyzing && styles.analyzeButtonDisabled]} 
          onPress={runNewAnalysis}
          disabled={isAnalyzing}
        >
          <Ionicons 
            name={isAnalyzing ? "hourglass" : "refresh"} 
            size={16} 
            color="white" 
          />
          <Text style={styles.analyzeButtonText}>
            {isAnalyzing ? 'Analyzing...' : 'Run New Analysis'}
          </Text>
        </Pressable>
      </View>
    </View>
  );

  const renderInsights = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>AI Insights</Text>
      {aiInsights.map((insight) => (
        <View key={insight.id} style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <View style={styles.insightTitleRow}>
              <Ionicons 
                name={getInsightIcon(insight.type) as any} 
                size={18} 
                color={getInsightColor(insight.type)} 
              />
              <Text style={styles.insightTitle}>{insight.title}</Text>
            </View>
            <View style={styles.insightBadges}>
              <View style={[styles.impactBadge, { backgroundColor: getImpactColor(insight.impact) }]}>
                <Text style={styles.badgeText}>{insight.impact}</Text>
              </View>
              <View style={styles.confidenceBadge}>
                <Text style={styles.confidenceText}>{insight.confidence}%</Text>
              </View>
            </View>
          </View>
          
          <Text style={styles.insightDescription}>{insight.description}</Text>
          
          <View style={styles.insightFooter}>
            <Text style={styles.timeframeText}>{insight.timeframe}</Text>
            {insight.actionable && (
              <Pressable style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Take Action</Text>
                <Ionicons name="arrow-forward" size={14} color="#8B5CF6" />
              </Pressable>
            )}
          </View>
        </View>
      ))}
    </View>
  );

  const renderPredictions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Predictive Analytics</Text>
      {predictions.map((prediction, index) => (
        <View key={index} style={styles.predictionCard}>
          <Text style={styles.predictionTitle}>{prediction.intervention}</Text>
          
          <View style={styles.progressComparison}>
            <View style={styles.progressItem}>
              <Text style={styles.progressLabel}>Current Progress</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${prediction.currentProgress}%`, backgroundColor: '#8B5CF6' }]} />
              </View>
              <Text style={styles.progressValue}>{prediction.currentProgress}%</Text>
            </View>
            
            <View style={styles.progressItem}>
              <Text style={styles.progressLabel}>Predicted Completion</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${prediction.predictedCompletion}%`, backgroundColor: '#10B981' }]} />
              </View>
              <Text style={styles.progressValue}>{prediction.predictedCompletion}%</Text>
            </View>
          </View>
          
          <View style={styles.riskSection}>
            <Text style={styles.riskTitle}>Risk Factors</Text>
            {prediction.riskFactors.map((risk, riskIndex) => (
              <View key={riskIndex} style={styles.riskItem}>
                <Ionicons name="warning" size={14} color="#F59E0B" />
                <Text style={styles.riskText}>{risk}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );

  const renderRecommendations = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Actionable Recommendations</Text>
      {aiInsights
        .filter(insight => insight.actionable)
        .map((insight) => (
          <View key={insight.id} style={styles.recommendationCard}>
            <View style={styles.recommendationHeader}>
              <Ionicons name="checkmark-circle" size={18} color="#8B5CF6" />
              <Text style={styles.recommendationTitle}>{insight.title}</Text>
            </View>
            <Text style={styles.recommendationDesc}>{insight.description}</Text>
            <View style={styles.recommendationActions}>
              <Pressable style={styles.primaryAction}>
                <Text style={styles.primaryActionText}>Implement Now</Text>
              </Pressable>
              <Pressable style={styles.secondaryAction}>
                <Text style={styles.secondaryActionText}>Schedule Later</Text>
              </Pressable>
            </View>
          </View>
        ))}
    </View>
  );

  const renderContent = () => {
    switch (selectedCategory) {
      case 'overview': return renderOverview();
      case 'insights': return renderInsights();
      case 'predictions': return renderPredictions();
      case 'recommendations': return renderRecommendations();
      default: return renderOverview();
    }
  };

  return (
    <View style={styles.container}>
      {/* Category Navigation */}
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <Pressable
              key={category.id}
              style={[
                styles.categoryTab,
                selectedCategory === category.id && styles.categoryTabActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Ionicons 
                name={category.icon as any} 
                size={16} 
                color={selectedCategory === category.id ? '#FFFFFF' : '#6B7280'} 
              />
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive
              ]}>
                {category.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderContent()}
        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  categoryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryTabActive: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  categoryText: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 6,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  overviewCards: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  overviewCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
    fontWeight: '500',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  cardSubtext: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  lastUpdated: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  lastUpdatedText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  runAnalysisContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  analyzeButton: {
    backgroundColor: '#8B5CF6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
  },
  analyzeButtonDisabled: {
    opacity: 0.6,
  },
  analyzeButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 5,
  },
  insightCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  insightTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  insightTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
    flex: 1,
  },
  insightBadges: {
    flexDirection: 'row',
    gap: 6,
  },
  impactBadge: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
  },
  confidenceBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
  },
  confidenceText: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
  },
  insightDescription: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  insightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeframeText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '500',
    marginRight: 4,
  },
  predictionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  predictionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  progressComparison: {
    marginBottom: 12,
  },
  progressItem: {
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 2,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
  },
  riskSection: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 10,
  },
  riskTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
  },
  riskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  riskText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
  },
  recommendationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recommendationTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  recommendationDesc: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  recommendationActions: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryAction: {
    flex: 1,
    backgroundColor: '#8B5CF6',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryActionText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  secondaryAction: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryActionText: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '600',
  },
  footer: {
    height: 20,
  },
  quickActions: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
});