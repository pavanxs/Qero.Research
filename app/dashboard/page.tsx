"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  Download,
  TrendingUp,
  Users,
  DollarSign,
  FileText,
  Star,
  Calendar,
  Activity,
  Brain,
  Zap,
  Trophy,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Clock,
  MessageSquare,
  Share2,
  Settings,
  Plus,
  Filter,
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  Award,
  Gem,
  Crown,
  Medal,
  ThumbsUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Lightbulb
} from "lucide-react";

interface DashboardDocument {
  id: string;
  title: string;
  price: string;
  status: 'published' | 'draft' | 'featured' | 'scheduled';
  category: string;
  views: number;
  downloads: number;
  revenue: string;
  rating: number;
  reviews: number;
  uploadDate: string;
  lastModified: string;
  featured: boolean;
  collaborators: number;
}

interface ActivityItem {
  id: string;
  type: 'upload' | 'sale' | 'view' | 'download' | 'review';
  description: string;
  amount?: string;
  timestamp: string;
  icon: any;
}

const mockDocuments: DashboardDocument[] = [
  {
    id: '1',
    title: 'Advanced Machine Learning Research Paper',
    price: '2.5 FIL',
    status: 'published',
    category: 'Academic',
    views: 1247,
    downloads: 89,
    revenue: '225.0 FIL',
    rating: 4.8,
    reviews: 23,
    uploadDate: '2024-01-15',
    lastModified: '2024-01-18',
    featured: true,
    collaborators: 2
  },
  {
    id: '2',
    title: 'Corporate Contract Template Suite',
    price: '5.0 FIL',
    status: 'published',
    category: 'Legal',
    views: 892,
    downloads: 156,
    revenue: '780.0 FIL',
    rating: 4.9,
    reviews: 45,
    uploadDate: '2024-01-14',
    lastModified: '2024-01-17',
    featured: false,
    collaborators: 3
  },
  {
    id: '3',
    title: 'Medical Research Data Analysis',
    price: '3.2 FIL',
    status: 'draft',
    category: 'Medical',
    views: 345,
    downloads: 12,
    revenue: '38.4 FIL',
    rating: 4.5,
    reviews: 8,
    uploadDate: '2024-01-13',
    lastModified: '2024-01-16',
    featured: false,
    collaborators: 1
  },
  {
    id: '4',
    title: 'Blockchain Architecture Whitepaper',
    price: '1.8 FIL',
    status: 'featured',
    category: 'Technical',
    views: 2156,
    downloads: 278,
    revenue: '500.4 FIL',
    rating: 4.7,
    reviews: 67,
    uploadDate: '2024-01-12',
    lastModified: '2024-01-15',
    featured: true,
    collaborators: 4
  },
  {
    id: '5',
    title: 'Sustainable Energy Market Report 2024',
    price: '4.5 FIL',
    status: 'scheduled',
    category: 'Business',
    views: 756,
    downloads: 43,
    revenue: '193.5 FIL',
    rating: 4.6,
    reviews: 31,
    uploadDate: '2024-01-11',
    lastModified: '2024-01-14',
    featured: false,
    collaborators: 2
  }
];

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'sale',
    description: 'Document "Advanced Machine Learning Research Paper" was purchased',
    amount: '2.5 FIL',
    timestamp: '2 minutes ago',
    icon: DollarSign
  },
  {
    id: '2',
    type: 'download',
    description: 'Document "Corporate Contract Template Suite" was downloaded',
    timestamp: '15 minutes ago',
    icon: Download
  },
  {
    id: '3',
    type: 'review',
    description: 'New 5-star review on "Blockchain Architecture Whitepaper"',
    timestamp: '1 hour ago',
    icon: Star
  },
  {
    id: '4',
    type: 'upload',
    description: 'Document "Sustainable Energy Market Report 2024" scheduled for publication',
    timestamp: '2 hours ago',
    icon: FileText
  },
  {
    id: '5',
    type: 'view',
    description: '50 new views on your documents today',
    timestamp: '4 hours ago',
    icon: Eye
  }
];

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const totalDocuments = mockDocuments.length;
  const totalRevenue = mockDocuments.reduce((sum, doc) => sum + parseFloat(doc.revenue), 0);
  const totalViews = mockDocuments.reduce((sum, doc) => sum + doc.views, 0);
  const totalDownloads = mockDocuments.reduce((sum, doc) => sum + doc.downloads, 0);
  const avgRating = (mockDocuments.reduce((sum, doc) => sum + doc.rating, 0) / mockDocuments.length).toFixed(1);

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Qero Research Dashboard</h1>
            <p className="text-lg text-muted-foreground">Comprehensive overview of your document marketplace performance</p>
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
              Share Report
            </Button>
              </div>
            </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Documents</p>
                  <p className="text-3xl font-bold">{totalDocuments}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <ChevronUp className="h-3 w-3 mr-1" />
                    +12% from last month
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
                  <p className="text-3xl font-bold">{totalRevenue.toFixed(1)} FIL</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <ChevronUp className="h-3 w-3 mr-1" />
                    +23% from last month
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
                  <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                  <p className="text-3xl font-bold">{totalViews.toLocaleString()}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <ChevronUp className="h-3 w-3 mr-1" />
                    +18% from last month
                  </p>
                </div>
                <Eye className="h-8 w-8 text-muted-foreground" />
            </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                  <p className="text-3xl font-bold">{avgRating}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <ChevronUp className="h-3 w-3 mr-1" />
                    +0.3 from last month
                  </p>
                </div>
                <Star className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
            </div>

        {/* Quick Actions & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg border">
                    <div className="p-2 rounded-full bg-muted">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                    {activity.amount && (
                      <Badge variant="secondary">{activity.amount}</Badge>
                    )}
            </div>
                );
              })}
            </CardContent>
          </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                <TrendingUp className="h-4 w-4" />
                <AlertTitle>Trending Category</AlertTitle>
                    <AlertDescription>
                  Medical research papers are trending. Consider uploading more content in this category.
                    </AlertDescription>
                  </Alert>

                  <Alert>
                <Target className="h-4 w-4" />
                <AlertTitle>Pricing Opportunity</AlertTitle>
                    <AlertDescription>
                  Your documents are priced 15% below market average. Consider increasing prices.
                    </AlertDescription>
                  </Alert>

                  <Alert>
                <Users className="h-4 w-4" />
                <AlertTitle>Collaborator Request</AlertTitle>
                    <AlertDescription>
                  3 researchers want to collaborate on your featured documents.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Your document marketplace performance</CardDescription>
              </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Revenue Goal Progress</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Document Quality Score</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Market Visibility</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Documents</CardTitle>
                  <CardDescription>Highest revenue generators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockDocuments.slice(0, 5).map((doc, index) => (
                    <div key={doc.id} className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium truncate">{doc.title}</p>
                        <p className="text-xs text-muted-foreground">{doc.views} views • {doc.revenue} earned</p>
                      </div>
                      <Badge variant="secondary">{doc.rating}★</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Link href="/upload">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload New Document
                </Button>
              </Link>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{doc.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {doc.collaborators} collaborators • {doc.uploadDate}
                        </div>
                      </div>
            </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{doc.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              doc.status === 'published' ? 'default' :
                              doc.status === 'featured' ? 'secondary' :
                              doc.status === 'draft' ? 'outline' : 'secondary'
                            }
                          >
                            {doc.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{doc.views.toLocaleString()}</TableCell>
                        <TableCell className="font-medium">{doc.revenue}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{doc.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Detailed earnings breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-lg">
                      <p className="text-2xl font-bold">{totalDownloads}</p>
                      <p className="text-sm text-muted-foreground">Total Downloads</p>
          </div>
                    <div className="text-center p-4 rounded-lg">
                      <p className="text-2xl font-bold">{mockDocuments.reduce((sum, doc) => sum + doc.reviews, 0)}</p>
                      <p className="text-sm text-muted-foreground">Total Reviews</p>
          </div>
        </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium">Revenue by Category</h4>
                    {['Academic', 'Legal', 'Business', 'Technical', 'Medical'].map(category => {
                      const categoryDocs = mockDocuments.filter(doc => doc.category === category);
                      const categoryRevenue = categoryDocs.reduce((sum, doc) => sum + parseFloat(doc.revenue), 0);
                      const percentage = (categoryRevenue / totalRevenue) * 100;

                      return (
                        <div key={category} className="flex items-center justify-between">
                          <span className="text-sm">{category}</span>
                      <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary"
                                style={{ width: `${percentage}%` }}
                              ></div>
                        </div>
                            <span className="text-sm font-medium w-16 text-right">
                              {categoryRevenue.toFixed(1)} FIL
                            </span>
                      </div>
                    </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Conversion Rate</span>
                      <span className="text-sm font-medium">12.5%</span>
                    </div>
                    <Progress value={12.5} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Session Duration</span>
                      <span className="text-sm font-medium">4m 32s</span>
                    </div>
                    <Progress value={68} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Bounce Rate</span>
                      <span className="text-sm font-medium">23.4%</span>
                    </div>
                    <Progress value={76.6} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">User Satisfaction</span>
                      <span className="text-sm font-medium">4.7/5</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Collaborations Tab */}
          <TabsContent value="collaborations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Collaborators</CardTitle>
                  <CardDescription>People working on your documents</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: 'Dr. Sarah Chen', role: 'Co-Author', documents: 2, avatar: 'SC' },
                    { name: 'Legal Team Alpha', role: 'Review Team', documents: 1, avatar: 'LT' },
                    { name: 'Research Assistant', role: 'Editor', documents: 3, avatar: 'RA' },
                    { name: 'Dr. Michael Johnson', role: 'Peer Reviewer', documents: 1, avatar: 'MJ' }
                  ].map((collaborator, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                      <Avatar>
                        <AvatarFallback>{collaborator.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{collaborator.name}</p>
                        <p className="text-sm text-muted-foreground">{collaborator.role} • {collaborator.documents} documents</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Collaboration Requests</CardTitle>
                  <CardDescription>Pending collaboration invitations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Prof. Emily Davis</p>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Interested in collaborating on your AI research paper for additional analysis.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm">Accept</Button>
                      <Button variant="outline" size="sm">Decline</Button>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Tech Review Team</p>
                      <Badge variant="secondary">Pending</Badge>
                        </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Would like to provide technical review for your blockchain whitepaper.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm">Accept</Button>
                      <Button variant="outline" size="sm">Decline</Button>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
