import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import {View} from 'react-native';
import Button from '@/components/Button';

import { useState } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';


export default function Overview() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCommunity, setSelectedCommunity] = useState('all');
  const [timeRange, setTimeRange] = useState('5years');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIntervention, setSelectedIntervention] = useState(null);
  const [showServiceMatcher, setShowServiceMatcher] = useState(false);
  const [selectedMeasure, setSelectedMeasure] = useState(null);


  const tabs = [
    { id: 'overview', label: 'Dashboard Overview' },
    { id: 'tier1', label: 'Health Outcomes'},
    { id: 'tier2', label: 'Determinants'},
    { id: 'tier3', label: 'System Performance' },
    { id: 'community', label: 'Community Analysis' },
    { id: 'actions', label: 'Action Plans'},
    { id: 'services', label: 'Service Connections'},
    { id: 'tracking', label: 'Progress Tracking'}];


}