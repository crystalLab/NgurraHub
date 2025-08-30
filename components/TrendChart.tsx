import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

type DataPoint = {
  year: number;
  lifeExpectancy: number;
  education: number;
  employment: number;
};

export default function TrendChart() {
  // Sample data - in real app this would be passed as props
  const data: DataPoint[] = [
    { year: 2018, lifeExpectancy: 70.8, education: 60, employment: 45 },
    { year: 2019, lifeExpectancy: 71.0, education: 62, employment: 46 },
    { year: 2020, lifeExpectancy: 71.2, education: 63, employment: 44 },
    { year: 2021, lifeExpectancy: 71.4, education: 65, employment: 47 },
    { year: 2022, lifeExpectancy: 71.6, education: 67, employment: 48 },
    { year: 2023, lifeExpectancy: 72.1, education: 69, employment: 50 },
    { year: 2024, lifeExpectancy: 72.8, education: 71, employment: 53 },
    { year: 2025, lifeExpectancy: 73.4, education: 74, employment: 56 },
  ];

  const chartWidth = width - 40;
  const chartHeight = 200;
  
  // Simple visualization using basic shapes
  const renderSimpleChart = () => {
    const years = data.map(d => d.year);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    const yearRange = maxYear - minYear;
    
    const lifeExpValues = data.map(d => d.lifeExpectancy);
    const educationValues = data.map(d => d.education);
    const employmentValues = data.map(d => d.employment);
    
    const maxValue = Math.max(...lifeExpValues, ...educationValues, ...employmentValues);
    const minValue = Math.min(...lifeExpValues, ...educationValues, ...employmentValues);
    const valueRange = maxValue - minValue;
    
    return (
      <View style={[styles.chartContainer, { width: chartWidth, height: chartHeight }]}>
        {/* Chart background */}
        <View style={styles.chartBackground}>
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <View 
              key={i} 
              style={[
                styles.gridLine, 
                { 
                  top: (i * chartHeight) / 4,
                  width: chartWidth - 40 
                }
              ]} 
            />
          ))}
        </View>
        
        {/* Data points visualization */}
        <View style={styles.dataContainer}>
          {data.map((point, index) => {
            const x = ((point.year - minYear) / yearRange) * (chartWidth - 80) + 40;
            const lifeY = chartHeight - 40 - ((point.lifeExpectancy - minValue) / valueRange) * (chartHeight - 80);
            const eduY = chartHeight - 40 - ((point.education - minValue) / valueRange) * (chartHeight - 80);
            const empY = chartHeight - 40 - ((point.employment - minValue) / valueRange) * (chartHeight - 80);
            
            return (
              <View key={index}>
                {/* Life Expectancy Point */}
                <View 
                  style={[
                    styles.dataPoint, 
                    { 
                      left: x - 3, 
                      top: lifeY - 3,
                      backgroundColor: '#8B5CF6' 
                    }
                  ]} 
                />
                {/* Education Point */}
                <View 
                  style={[
                    styles.dataPoint, 
                    { 
                      left: x - 3, 
                      top: eduY - 3,
                      backgroundColor: '#06B6D4' 
                    }
                  ]} 
                />
                {/* Employment Point */}
                <View 
                  style={[
                    styles.dataPoint, 
                    { 
                      left: x - 3, 
                      top: empY - 3,
                      backgroundColor: '#10B981' 
                    }
                  ]} 
                />
              </View>
            );
          })}
        </View>
        
        {/* X-axis labels */}
        <View style={styles.xAxisContainer}>
          {data.filter((_, i) => i % 2 === 0).map((point, index) => {
            const x = ((point.year - minYear) / yearRange) * (chartWidth - 80) + 40;
            return (
              <Text 
                key={point.year} 
                style={[
                  styles.axisLabel, 
                  { 
                    position: 'absolute',
                    left: x - 15,
                    top: chartHeight - 20 
                  }
                ]}
              >
                {point.year}
              </Text>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderSimpleChart()}
      
      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#8B5CF6' }]} />
          <Text style={styles.legendText}>Life Expectancy</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#06B6D4' }]} />
          <Text style={styles.legendText}>Education %</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#10B981' }]} />
          <Text style={styles.legendText}>Employment %</Text>
        </View>
      </View>
      
      <Text style={styles.footnote}>
        * Predictions based on current intervention success rates
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  chartContainer: {
    position: 'relative',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 16,
  },
  chartBackground: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
  },
  gridLine: {
    position: 'absolute',
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dataContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  dataPoint: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  xAxisContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  axisLabel: {
    fontSize: 10,
    color: '#6B7280',
    width: 30,
    textAlign: 'center',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#6B7280',
  },
  footnote: {
    fontSize: 10,
    color: '#9CA3AF',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});