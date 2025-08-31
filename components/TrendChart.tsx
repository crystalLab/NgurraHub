import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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

  // Use flexible dimensions instead of fixed screen width
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
      <View style={[styles.chartContainer, { height: chartHeight }]}>
        {/* Chart background */}
        <View style={styles.chartBackground}>
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <View 
              key={i} 
              style={[
                styles.gridLine, 
                { 
                  top: (i * (chartHeight - 60)) / 4,
                }
              ]} 
            />
          ))}
        </View>

        {/* Y-axis labels */}
        <View style={styles.yAxisContainer}>
          {[0, 1, 2, 3, 4].map(i => {
            const value = minValue + ((maxValue - minValue) * (4 - i)) / 4;
            const displayValue = value > 50 ? Math.round(value) + '%' : Math.round(value) + 'y';
            return (
              <View
                key={i}
                style={[
                  styles.yAxisLabelContainer,
                  { 
                    top: (i * (chartHeight - 60)) / 4 - 8,
                  }
                ]}
              >
                <Text style={styles.yAxisLabel}>
                  {Math.round(value)}
                </Text>
              </View>
            );
          })}
        </View>
        
        {/* Data points visualization */}
        <View style={styles.dataContainer}>
          {data.map((point, index) => {
            // Use percentage-based positioning instead of fixed width
            const xPercent = ((point.year - minYear) / yearRange) * 100;
            const lifeY = (chartHeight - 60) - ((point.lifeExpectancy - minValue) / valueRange) * (chartHeight - 80);
            const eduY = (chartHeight - 60) - ((point.education - minValue) / valueRange) * (chartHeight - 80);
            const empY = (chartHeight - 60) - ((point.employment - minValue) / valueRange) * (chartHeight - 80);
            
            return (
              <View key={index}>
                {/* Life Expectancy Point */}
                <View 
                  style={[
                    styles.dataPoint, 
                    { 
                      left: `${xPercent}%`, 
                      top: lifeY,
                      backgroundColor: '#8B5CF6' 
                    }
                  ]} 
                />
                {/* Education Point */}
                <View 
                  style={[
                    styles.dataPoint, 
                    { 
                      left: `${xPercent}%`, 
                      top: eduY,
                      backgroundColor: '#06B6D4' 
                    }
                  ]} 
                />
                {/* Employment Point */}
                <View 
                  style={[
                    styles.dataPoint, 
                    { 
                      left: `${xPercent}%`, 
                      top: empY,
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
            const xPercent = ((point.year - minYear) / yearRange) * 100;
            return (
              <View
                key={point.year}
                style={[
                  styles.axisLabelContainer,
                  { 
                    left: `${xPercent}%`,
                  }
                ]}
              >
                <Text style={styles.axisLabel}>
                  {point.year}
                </Text>
              </View>
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
          <Text style={styles.legendText}>Life Expectancy %</Text>
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
    width: '100%', // Use full available width
    overflow: 'hidden', // Clip any overflow
  },
  chartBackground: {
    position: 'absolute',
    top: 20,
    left: 40, // More space for y-axis labels
    right: 20,
    bottom: 40,
  },
  gridLine: {
    position: 'absolute',
    height: 1,
    backgroundColor: '#E5E7EB',
    left: 0,
    right: 0,
  },
  dataContainer: {
    position: 'absolute',
    top: 20,
    left: 40, // Match chart background
    right: 20,
    bottom: 40,
  },
  dataPoint: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: -3, // Center the point
    marginTop: -3,
  },
  xAxisContainer: {
    position: 'absolute',
    bottom: 0,
    left: 40, // Match chart area
    right: 20,
    height: 40,
    justifyContent: 'center',
  },
  yAxisContainer: {
    position: 'absolute',
    top: 20,
    left: 0,
    width: 35, // Space for y-axis labels
    bottom: 40,
  },
  yAxisLabelContainer: {
    position: 'absolute',
    width: 35,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  yAxisLabel: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'right',
    fontWeight: '500',
  },
  axisLabelContainer: {
    position: 'absolute',
    width: 30,
    alignItems: 'center',
    marginLeft: -15, // Center the container
  },
  axisLabel: {
    fontSize: 11, // Slightly larger font
    color: '#374151', // Darker color for better visibility
    textAlign: 'center',
    fontWeight: '500',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    flexWrap: 'wrap', // Allow wrapping on smaller screens
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
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