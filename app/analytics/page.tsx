"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  FileText,
  Eye,
  Download,
  Star,
  Calendar,
  Activity,
  Brain,
  Zap,
  Target,
  PieChart,
  LineChart,
  Clock,
  MessageSquare,
  Share2,
  Settings,
  Filter,
  Search,
  ChevronUp,
  ChevronDown,
  Award,
  Gem,
  Crown,
  Medal,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Lightbulb,
  Globe,
  Shield,
  Database,
  Cpu,
  Server
} from "lucide-react";

interface AnalyticsData {
  totalUsers: number;
  totalDocuments: number;
  totalRevenue: number;
  totalTransactions: number;
  growthRate: number;
  topCategories: Array<{
    name: string;
    documents: number;
    revenue: number;
    growth: number;
  }>;
  userActivity: Array<{
    date: string;
    users: number;
    documents: number;
    revenue: number;
  }>;
  topDocuments: Array<{
    id: string;
    title: string;
    author: string;
    views: number;
    downloads: number;
    revenue: number;
    rating: number;
  }>;
  platformHealth: {
    uptime: number;
    responseTime: number;
    storageUsed: number;
    apiCalls: number;
  };
  aiInsights: Array<{
    type: 'trend' | 'opportunity' | 'warning';
    title: string;
    description: string;
    impact: 'high' | 'medium' | 'low';
  }>;
}

const mockAnalytics: AnalyticsData = {
  totalUsers: 1247,
  totalDocuments: 342,
  totalRevenue: 15680.5,
  totalTransactions: 892,
  growthRate: 23.5,
  topCategories: [
    { name: 'Academic', documents: 145, revenue: 8450.2, growth: 31.2 },
    { name: 'Legal', documents: 89, revenue: 6230.1, growth: 18.7 },
    { name: 'Technical', documents: 67, revenue: 4120.8, growth: 25.4 },
    { name: 'Business', documents: 41, revenue: 2879.4, growth: 15.9 }
  ],
  userActivity: [
    { date: '2024-01-15', users: 1247, documents: 342, revenue: 15680.5 },
    { date: '2024-01-14', users: 1189, documents: 328, revenue: 14230.2 },
    { date: '2024-01-13', users: 1156, documents: 315, revenue: 13890.7 },
    { date: '2024-01-12', users: 1123, documents: 298, revenue: 12980.3 },
    { date: '2024-01-11', users: 1089, documents: 285, revenue: 12150.8 }
  ],
  topDocuments: [
    {
      id: '1',
      title: 'Advanced Machine Learning Research Paper',
      author: 'Dr. Sarah Chen',
      views: 1247,
      downloads: 89,
      revenue: 2250.5,
      rating: 4.8
    },
    {
      id: '2',
      title: 'Corporate Contract Template Suite',
      author: 'Legal Team Alpha',
      views: 892,
      downloads: 156,
      revenue: 3900.0,
      rating: 4.9
    },
    {
      id: '3',
      title: 'Blockchain Architecture Whitepaper',
      author: 'Crypto Expert',
      views: 2156,
      downloads: 278,
      revenue: 3342.2,
      rating: 4.7
    }
  ],
  platformHealth: {
    uptime: 99.8,
    responseTime: 145,
    storageUsed: 2.4,
    apiCalls: 45620
  },
  aiInsights: [
    {
      type: 'trend',
      title: 'AI Research Surge',
      description: 'Documents related to AI and machine learning are experiencing 45% higher engagement',
      impact: 'high'
    },
    {
      type: 'opportunity',
      title: 'Legal Templates Demand',
      description: 'Legal document templates are underexplored - potential for 30% revenue growth',
      impact: 'medium'
    },
    {
      type: 'warning',
      title: 'Storage Capacity Warning',
      description: 'Storage utilization at 85% - consider scaling infrastructure',
      impact: 'high'
    }
  ]
};

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const getGrowthIndicator = (growth: number) => {
    return growth > 0 ? (
      <div className="flex items-center text-green-600">
        <ChevronUp className="h-3 w-3 mr-1" />
        +{growth}%
      </div>
    ) : (
      <div className="flex items-center text-red-600">
        <ChevronDown className="h-3 w-3 mr-1" />
        {growth}%
      </div>
    );
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Analytics Dashboard</h1>
            <p className="text-lg text-muted-foreground">Comprehensive platform insights and performance metrics</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">24 Hours</SelectItem>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold">{mockAnalytics.totalUsers.toLocaleString()}</p>
                  {getGrowthIndicator(mockAnalytics.growthRate)}
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Documents</p>
                  <p className="text-3xl font-bold">{mockAnalytics.totalDocuments}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <ChevronUp className="h-3 w-3 mr-1" />
                    +18 from last month
                  </p>
                </div>
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-3xl font-bold">{mockAnalytics.totalRevenue.toFixed(1)} FIL</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <ChevronUp className="h-3 w-3 mr-1" />
                    +{mockAnalytics.growthRate}% from last month
                  </p>
                </div>
                <Gem className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Transactions</p>
                  <p className="text-3xl font-bold">{mockAnalytics.totalTransactions}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <ChevronUp className="h-3 w-3 mr-1" />
                    +12 from last week
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Category Performance
                  </CardTitle>
                  <CardDescription>Revenue and growth by document category</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockAnalytics.topCategories.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{category.name}</span>
                        <div className="text-right">
                          <div className="text-sm font-bold">{category.revenue.toFixed(1)} FIL</div>
                          <div className="text-xs text-muted-foreground">{category.documents} documents</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Progress value={75} className="flex-1 h-2" />
                        <div className="text-xs text-green-600">
                          +{category.growth}%
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Latest platform activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockAnalytics.userActivity.slice(0, 5).map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg border">
                      <div className="p-2 rounded-full bg-muted">
                        <Activity className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.date}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.users} users • {activity.documents} documents • {activity.revenue.toFixed(1)} FIL
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Insights & Recommendations
                </CardTitle>
                <CardDescription>Smart recommendations for platform optimization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mockAnalytics.aiInsights.map((insight, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${getImpactColor(insight.impact)}`}>
                      <div className="flex items-center gap-2 mb-2">
                        {insight.type === 'trend' && <TrendingUp className="h-4 w-4" />}
                        {insight.type === 'opportunity' && <Target className="h-4 w-4" />}
                        {insight.type === 'warning' && <AlertTriangle className="h-4 w-4" />}
                        <span className="font-medium text-sm">{insight.title}</span>
                      </div>
                      <p className="text-sm">{insight.description}</p>
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {insight.impact} impact
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search documents..."
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="views">Views</SelectItem>
                    <SelectItem value="downloads">Downloads</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAnalytics.topDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{doc.title}</div>
                              <div className="text-sm text-muted-foreground">ID: {doc.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{doc.author}</TableCell>
                        <TableCell>{doc.views.toLocaleString()}</TableCell>
                        <TableCell>{doc.downloads}</TableCell>
                        <TableCell className="font-medium">{doc.revenue.toFixed(1)} FIL</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{doc.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            High
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Demographics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{mockAnalytics.totalUsers}</div>
                    <div className="text-sm text-muted-foreground">Total Registered Users</div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Researchers</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />

                    <div className="flex justify-between text-sm">
                      <span>Students</span>
                      <span className="font-medium">22%</span>
                    </div>
                    <Progress value={22} className="h-2" />

                    <div className="flex justify-between text-sm">
                      <span>Professionals</span>
                      <span className="font-medium">10%</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Daily Active Users</span>
                      <span className="text-sm font-medium">89</span>
                    </div>
                    <Progress value={89} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Weekly Active Users</span>
                      <span className="text-sm font-medium">456</span>
                    </div>
                    <Progress value={78} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Monthly Active Users</span>
                      <span className="text-sm font-medium">892</span>
                    </div>
                    <Progress value={71} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Contributors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: 'Dr. Sarah Chen', documents: 12, followers: 1250 },
                    { name: 'Legal Team Alpha', documents: 8, followers: 892 },
                    { name: 'Research Assistant', documents: 15, followers: 756 }
                  ].map((user, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.documents} docs • {user.followers} followers
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        #{index + 1}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                  <CardDescription>Revenue sources and trends</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Full Access Sales</span>
                      <span className="text-sm font-medium">12,450.2 FIL</span>
                    </div>
                    <Progress value={79} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Preview Access</span>
                      <span className="text-sm font-medium">3,120.5 FIL</span>
                    </div>
                    <Progress value={20} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">AI Summaries</span>
                      <span className="text-sm font-medium">1,109.8 FIL</span>
                    </div>
                    <Progress value={7} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>Monthly revenue progression</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockAnalytics.userActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{activity.date}</span>
                      <div className="text-right">
                        <div className="text-sm font-medium">{activity.revenue.toFixed(1)} FIL</div>
                        <div className="text-xs text-muted-foreground">{activity.documents} documents</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    Platform Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{mockAnalytics.platformHealth.uptime}%</div>
                      <div className="text-xs text-muted-foreground">Uptime</div>
                    </div>
                    <div className="text-center p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{mockAnalytics.platformHealth.responseTime}ms</div>
                      <div className="text-xs text-muted-foreground">Avg Response</div>
                    </div>
                    <div className="text-center p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{mockAnalytics.platformHealth.storageUsed}TB</div>
                      <div className="text-xs text-muted-foreground">Storage Used</div>
                    </div>
                    <div className="text-center p-4 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{mockAnalytics.platformHealth.apiCalls.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">API Calls</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security & Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Security Score</span>
                      <span className="text-sm font-medium">98/100</span>
                    </div>
                    <Progress value={98} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Data Encryption</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm">GDPR Compliant</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Backup Status</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>All Systems Operational</AlertTitle>
                  <AlertDescription>
                    Platform is running smoothly with 99.8% uptime and normal response times.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Storage Capacity Warning</AlertTitle>
                  <AlertDescription>
                    Storage utilization is at 85%. Consider scaling infrastructure within the next 30 days.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertTitle>Performance Optimization</AlertTitle>
                  <AlertDescription>
                    AI system has optimized query performance by 15% this week.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}



