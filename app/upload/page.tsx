"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { Trash2, Edit, Upload, X, Search, Filter, Download, Share2, Copy, Eye, Users, BarChart3, Settings, Zap, Brain, Clock, TrendingUp, Star, Tag, FileText, Image, Video, Music, Archive, Link, Calendar as CalendarIcon, Bell, Shield, Globe, Lock, Unlock, Plus, Minus, Refresh, Save, Cloud, Database, Cpu, Wifi, Battery, Volume2, Mic, Camera, MapPin, Navigation, Car, Plane, Train, Bus, Bike, Walk, Coffee, Book, Gamepad2, Trophy, Award, Medal, Crown, Gem, Diamond, Heart, ThumbsUp, ThumbsDown, Smile, Frown, Laugh, Angry, Sad, Happy, Confused, Surprised, Cool, Fire, Ice, Sun, Moon, Star as StarIcon, CloudRain, Snowflake, Wind, Zap as ZapIcon, Grid3X3, Lightbulb, DollarSign, MessageSquare } from "lucide-react";

interface DocumentForm {
  id: string;
  title: string;
  description: string;
  price: string;
  file: File | null;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  progress: number;
  category: string;
  tags: string[];
  scheduledDate?: string;
  watermark: boolean;
  accessLevel: 'public' | 'private' | 'premium';
}

interface UploadedDocument {
  id: string;
  title: string;
  description: string;
  price: string;
  uploadDate: string;
  status: 'published' | 'draft' | 'scheduled' | 'featured';
  fileSize: string;
  category: string;
  tags: string[];
  views: number;
  downloads: number;
  revenue: string;
  rating: number;
  reviews: number;
  collaborators: string[];
  versions: number;
  lastModified: string;
  featured: boolean;
  scheduledDate?: string;
  accessLevel: 'public' | 'private' | 'premium';
  aiSuggestions: string[];
}

const categories = ['Academic', 'Legal', 'Business', 'Technical', 'Medical', 'Creative', 'Personal', 'Other'];
const accessLevels = ['public', 'private', 'premium'];

export default function UploadPage() {
  const [documents, setDocuments] = useState<DocumentForm[]>([]);
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocument[]>([
    {
      id: '1',
      title: 'Advanced Machine Learning Research Paper',
      description: 'Comprehensive analysis of deep learning algorithms and their applications in modern AI systems, including neural networks, convolutional models, and reinforcement learning techniques.',
      price: '2.5',
      uploadDate: '2024-01-15',
      status: 'published',
      fileSize: '15.7 MB',
      category: 'Academic',
      tags: ['AI', 'Machine Learning', 'Deep Learning', 'Research', 'Neural Networks'],
      views: 1247,
      downloads: 89,
      revenue: '225.0 FIL',
      rating: 4.8,
      reviews: 23,
      collaborators: ['Dr. Smith', 'Prof. Johnson'],
      versions: 3,
      lastModified: '2024-01-18',
      featured: true,
      accessLevel: 'premium',
      aiSuggestions: ['Add more citations', 'Include methodology section', 'Consider adding code samples']
    },
    {
      id: '2',
      title: 'Corporate Contract Template Suite',
      description: 'Complete set of legal templates for business agreements and partnerships, including NDA, service contracts, and intellectual property agreements.',
      price: '5.0',
      uploadDate: '2024-01-14',
      status: 'published',
      fileSize: '8.2 MB',
      category: 'Legal',
      tags: ['Contracts', 'Business', 'Legal', 'Templates', 'Corporate'],
      views: 892,
      downloads: 156,
      revenue: '780.0 FIL',
      rating: 4.9,
      reviews: 45,
      collaborators: ['Legal Team A', 'Compliance Dept'],
      versions: 5,
      lastModified: '2024-01-17',
      featured: false,
      accessLevel: 'premium',
      aiSuggestions: ['Update clause references', 'Add digital signature fields', 'Include jurisdiction options']
    },
    {
      id: '3',
      title: 'Medical Research Data Analysis',
      description: 'Statistical analysis of clinical trial data for pharmaceutical research, including patient demographics, treatment efficacy, and side effect analysis.',
      price: '3.2',
      uploadDate: '2024-01-13',
      status: 'draft',
      fileSize: '25.1 MB',
      category: 'Medical',
      tags: ['Clinical Trials', 'Statistics', 'Pharmaceutical', 'Research', 'Data Analysis'],
      views: 345,
      downloads: 12,
      revenue: '38.4 FIL',
      rating: 4.5,
      reviews: 8,
      collaborators: ['Dr. Chen', 'Research Team'],
      versions: 2,
      lastModified: '2024-01-16',
      featured: false,
      accessLevel: 'private',
      aiSuggestions: ['Add data visualization', 'Include methodology details', 'Add statistical significance tests']
    },
    {
      id: '4',
      title: 'Blockchain Architecture Whitepaper',
      description: 'Technical deep-dive into decentralized system design and implementation, covering consensus mechanisms, smart contracts, and scalability solutions.',
      price: '1.8',
      uploadDate: '2024-01-12',
      status: 'featured',
      fileSize: '12.4 MB',
      category: 'Technical',
      tags: ['Blockchain', 'Decentralized', 'Architecture', 'Web3', 'Smart Contracts'],
      views: 2156,
      downloads: 278,
      revenue: '500.4 FIL',
      rating: 4.7,
      reviews: 67,
      collaborators: ['Dev Team Alpha', 'Crypto Experts'],
      versions: 4,
      lastModified: '2024-01-15',
      featured: true,
      accessLevel: 'public',
      aiSuggestions: ['Add security analysis', 'Include performance benchmarks', 'Add implementation examples']
    },
    {
      id: '5',
      title: 'Sustainable Energy Market Report 2024',
      description: 'Comprehensive market analysis of renewable energy sector, including solar, wind, and battery storage technologies with global market trends.',
      price: '4.5',
      uploadDate: '2024-01-11',
      status: 'scheduled',
      fileSize: '18.9 MB',
      category: 'Business',
      tags: ['Energy', 'Sustainable', 'Market Research', 'Renewable', 'Solar'],
      views: 756,
      downloads: 43,
      revenue: '193.5 FIL',
      rating: 4.6,
      reviews: 31,
      collaborators: ['Market Research Team', 'Energy Analysts'],
      versions: 2,
      lastModified: '2024-01-14',
      featured: false,
      scheduledDate: '2024-01-20',
      accessLevel: 'premium',
      aiSuggestions: ['Add regional analysis', 'Include competitor landscape', 'Update with latest data']
    },
    {
      id: '6',
      title: 'Creative Writing Workshop Materials',
      description: 'Complete workshop package with exercises, prompts, and techniques for developing creative writing skills across fiction, poetry, and screenwriting.',
      price: '1.2',
      uploadDate: '2024-01-10',
      status: 'published',
      fileSize: '6.3 MB',
      category: 'Creative',
      tags: ['Writing', 'Creative', 'Workshop', 'Fiction', 'Poetry'],
      views: 1893,
      downloads: 234,
      revenue: '280.8 FIL',
      rating: 4.9,
      reviews: 89,
      collaborators: ['Writing Instructors', 'Creative Team'],
      versions: 3,
      lastModified: '2024-01-13',
      featured: false,
      accessLevel: 'public',
      aiSuggestions: ['Add video examples', 'Include peer review templates', 'Add advanced exercises']
    }
  ]);
  const [editingDoc, setEditingDoc] = useState<UploadedDocument | null>(null);

  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('uploadDate');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const filteredDocs = uploadedDocs.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'title': return a.title.localeCompare(b.title);
      case 'uploadDate': return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      case 'views': return b.views - a.views;
      case 'revenue': return parseFloat(b.revenue) - parseFloat(a.revenue);
      case 'rating': return b.rating - a.rating;
      default: return 0;
    }
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newDocs = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      title: file.name.replace('.pdf', ''),
      description: '',
      price: '0.1',
      file,
      status: 'pending' as const,
      progress: 0,
      category: 'Other',
      tags: [],
      watermark: false,
      accessLevel: 'public' as const
    }));
    setDocuments(prev => [...prev, ...newDocs]);
  };

  const updateDocument = (id: string, field: keyof DocumentForm, value: any) => {
    setDocuments(prev => prev.map(doc =>
      doc.id === id ? { ...doc, [field]: value } : doc
    ));
  };

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const toggleSelectDoc = (id: string) => {
    setSelectedDocs(prev =>
      prev.includes(id) ? prev.filter(docId => docId !== id) : [...prev, id]
    );
  };

  const bulkDelete = () => {
    setUploadedDocs(prev => prev.filter(doc => !selectedDocs.includes(doc.id)));
    setSelectedDocs([]);
  };

  const bulkPublish = () => {
    setUploadedDocs(prev => prev.map(doc =>
      selectedDocs.includes(doc.id) ? { ...doc, status: 'published' as const } : doc
    ));
    setSelectedDocs([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate upload process
    for (const doc of documents) {
      if (doc.title && doc.description && doc.price && doc.file) {
        updateDocument(doc.id, 'status', 'uploading');
        // Simulate progress
        for (let i = 0; i <= 100; i += 10) {
          setTimeout(() => {
            updateDocument(doc.id, 'progress', i);
          }, i * 50);
        }
        setTimeout(() => {
          updateDocument(doc.id, 'status', 'completed');
          // Add to uploaded docs
          const newUploadedDoc: UploadedDocument = {
            id: doc.id,
            title: doc.title,
            description: doc.description,
            price: doc.price,
            uploadDate: new Date().toISOString().split('T')[0],
            status: 'published',
            fileSize: `${(doc.file.size / 1024 / 1024).toFixed(1)} MB`
          };
          setUploadedDocs(prev => [...prev, newUploadedDoc]);
          removeDocument(doc.id);
        }, 1000);
      }
    }
  };

  const deleteUploadedDoc = (id: string) => {
    setUploadedDocs(prev => prev.filter(doc => doc.id !== id));
  };

  const updateUploadedDoc = (doc: UploadedDocument) => {
    setUploadedDocs(prev => prev.map(d => d.id === doc.id ? doc : d));
    setEditingDoc(null);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Total Documents</p>
                  <p className="text-3xl font-bold">{uploadedDocs.length}</p>
                </div>
                <FileText className="h-8 w-8" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Total Revenue</p>
                  <p className="text-3xl font-bold">
                    {uploadedDocs.reduce((sum, doc) => sum + parseFloat(doc.revenue), 0).toFixed(1)} FIL
                  </p>
                </div>
                <Gem className="h-8 w-8" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Total Views</p>
                  <p className="text-3xl font-bold">
                    {uploadedDocs.reduce((sum, doc) => sum + doc.views, 0).toLocaleString()}
                  </p>
                </div>
                <Eye className="h-8 w-8" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Avg Rating</p>
                  <p className="text-3xl font-bold">
                    {(uploadedDocs.reduce((sum, doc) => sum + doc.rating, 0) / uploadedDocs.length).toFixed(1)}
                  </p>
                </div>
                <Star className="h-8 w-8" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Advanced Document Management</h1>
          <p className="text-lg">Upload, organize, and monetize your knowledge with AI-powered features</p>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="manage">Manage</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
            <TabsTrigger value="ai">AI Assistant</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg">
                    <div className="w-2 h-2 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Document uploaded successfully</p>
                      <p className="text-xs">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg">
                    <div className="w-2 h-2 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New download: ML Research Paper</p>
                      <p className="text-xs">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg">
                    <div className="w-2 h-2 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">AI suggestions generated</p>
                      <p className="text-xs">1 hour ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Top Performing Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {uploadedDocs.slice(0, 3).map((doc, index) => (
                    <div key={doc.id} className="flex items-center gap-3 p-3 rounded-lg">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium truncate">{doc.title}</p>
                        <p className="text-xs">{doc.views} views • {doc.revenue} FIL earned</p>
                      </div>
                      <Badge variant="secondary">{doc.rating}★</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Multiple Documents
                  </CardTitle>
                  <CardDescription>Advanced upload with AI-powered metadata suggestions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Select Files
                      </Label>
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        multiple
                        onChange={handleFileSelect}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Link className="h-4 w-4" />
                        Import from URL
                      </Label>
                      <Input placeholder="https://example.com/document.pdf" />
                    </div>
                  </div>

                  <Accordion type="single" collapsible>
                    <AccordionItem value="advanced">
                      <AccordionTrigger>Advanced Upload Options</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Default Category</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map(cat => (
                                  <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Access Level</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select access level" />
                              </SelectTrigger>
                              <SelectContent>
                                {accessLevels.map(level => (
                                  <SelectItem key={level} value={level}>{level}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="watermark" />
                          <Label htmlFor="watermark">Add watermark to documents</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="ai-suggestions" defaultChecked />
                          <Label htmlFor="ai-suggestions">Enable AI suggestions</Label>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {documents.length > 0 && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-4 max-h-96 overflow-y-auto border rounded-lg p-4">
                        {documents.map((doc) => (
                          <Card key={doc.id} className="p-4">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5" />
                                <div>
                                  <div className="font-medium">{doc.file?.name}</div>
                                  <div className="text-sm">
                                    {(doc.file?.size || 0) / 1024 / 1024 > 1 ?
                                      `${((doc.file?.size || 0) / 1024 / 1024).toFixed(1)} MB` :
                                      `${((doc.file?.size || 0) / 1024).toFixed(1)} KB`}
                                  </div>
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeDocument(doc.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                              <div>
                                <Label>Title</Label>
                                <Input
                                  value={doc.title}
                                  onChange={(e) => updateDocument(doc.id, 'title', e.target.value)}
                                  placeholder="Document title"
                                  required
                                />
                              </div>
                              <div>
                                <Label>Price (FIL)</Label>
                                <Input
                                  type="number"
                                  value={doc.price}
                                  onChange={(e) => updateDocument(doc.id, 'price', e.target.value)}
                                  placeholder="0.1"
                                  required
                                />
                              </div>
                              <div>
                                <Label>Category</Label>
                                <Select value={doc.category} onValueChange={(value) => updateDocument(doc.id, 'category', value)}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {categories.map(cat => (
                                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label>Access Level</Label>
                                <Select value={doc.accessLevel} onValueChange={(value) => updateDocument(doc.id, 'accessLevel', value as any)}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {accessLevels.map(level => (
                                      <SelectItem key={level} value={level}>{level}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            {doc.status === 'uploading' && (
                              <div className="mt-4">
                                <Progress value={doc.progress} className="h-2" />
                                <p className="text-sm mt-1 flex items-center gap-2">
                                  <Cloud className="h-4 w-4" />
                                  Uploading to Filecoin... {doc.progress}%
                                </p>
                              </div>
                            )}
                          </Card>
                        ))}
                      </div>

                      <div className="flex gap-4">
                        <Button type="submit" className="flex-1" disabled={!documents.some(doc => doc.title && doc.description && doc.price)}>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload All Documents
                        </Button>
                        <Button type="button" variant="outline">
                          <Save className="h-4 w-4 mr-2" />
                          Save as Draft
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg">
                    <p className="text-sm font-medium">Smart Categorization</p>
                    <p className="text-xs">AI will automatically categorize your documents</p>
                  </div>
                  <div className="p-3 rounded-lg">
                    <p className="text-sm font-medium">Price Optimization</p>
                    <p className="text-xs">Get AI recommendations for optimal pricing</p>
                  </div>
                  <div className="p-3 rounded-lg">
                    <p className="text-sm font-medium">SEO Enhancement</p>
                    <p className="text-xs">AI will suggest keywords for better discoverability</p>
                  </div>
                  <div className="p-3 rounded-lg">
                    <p className="text-sm font-medium">Content Analysis</p>
                    <p className="text-xs">Get insights about document quality and completeness</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Manage Tab */}
          <TabsContent value="manage" className="space-y-6">
            {/* Bulk Actions */}
            {selectedDocs.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox checked={true} />
                      <span>{selectedDocs.length} documents selected</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" onClick={bulkPublish}>
                        <Upload className="h-4 w-4 mr-2" />
                        Publish All
                      </Button>
                      <Button size="sm" variant="destructive" onClick={bulkDelete}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete All
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Filters and Search */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                    <Input
                      placeholder="Search documents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
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
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uploadDate">Upload Date</SelectItem>
                      <SelectItem value="title">Title</SelectItem>
                      <SelectItem value="views">Views</SelectItem>
                      <SelectItem value="revenue">Revenue</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents Display */}
            {viewMode === 'list' ? (
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox />
                        </TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDocs.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedDocs.includes(doc.id)}
                              onCheckedChange={() => toggleSelectDoc(doc.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5" />
                              <div>
                                <div className="font-medium">{doc.title}</div>
                                <div className="text-sm">{doc.fileSize}</div>
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
                          <TableCell className="font-medium">{doc.revenue} FIL</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400" />
                              <span className="text-sm font-medium">{doc.rating}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" onClick={() => setEditingDoc(doc)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Edit Document</DialogTitle>
                                    <DialogDescription>Update document details and settings</DialogDescription>
                                  </DialogHeader>
                                  {editingDoc && (
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label>Title</Label>
                                          <Input
                                            value={editingDoc.title}
                                            onChange={(e) => setEditingDoc({ ...editingDoc, title: e.target.value })}
                                          />
                                        </div>
                                        <div>
                                          <Label>Price (FIL)</Label>
                                          <Input
                                            type="number"
                                            value={editingDoc.price}
                                            onChange={(e) => setEditingDoc({ ...editingDoc, price: e.target.value })}
                                          />
                                        </div>
                                      </div>
                                      <div>
                                        <Label>Description</Label>
                                        <Textarea
                                          value={editingDoc.description}
                                          onChange={(e) => setEditingDoc({ ...editingDoc, description: e.target.value })}
                                        />
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label>Category</Label>
                                          <Select value={editingDoc.category} onValueChange={(value) => setEditingDoc({ ...editingDoc, category: value })}>
                                            <SelectTrigger>
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {categories.map(cat => (
                                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div>
                                          <Label>Access Level</Label>
                                          <Select value={editingDoc.accessLevel} onValueChange={(value) => setEditingDoc({ ...editingDoc, accessLevel: value as any })}>
                                            <SelectTrigger>
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {accessLevels.map(level => (
                                                <SelectItem key={level} value={level}>{level}</SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Switch
                                          checked={editingDoc.featured}
                                          onCheckedChange={(checked) => setEditingDoc({ ...editingDoc, featured: checked })}
                                        />
                                        <Label>Featured Document</Label>
                                      </div>
                                    </div>
                                  )}
                                  <DialogFooter>
                                    <Button onClick={() => editingDoc && updateUploadedDoc(editingDoc)}>
                                      Save Changes
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Document</AlertDialogTitle>
                                    <AlertDescription>
                                      Are you sure you want to delete "{doc.title}"? This action cannot be undone.
                                    </AlertDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => deleteUploadedDoc(doc.id)}>
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocs.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <Checkbox
                          checked={selectedDocs.includes(doc.id)}
                          onCheckedChange={() => toggleSelectDoc(doc.id)}
                        />
                        <Badge variant={doc.status === 'published' ? 'default' : 'secondary'}>
                          {doc.status}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-3 mb-4">
                        <FileText className="h-8 w-8" />
                        <div>
                          <h3 className="font-semibold text-lg leading-tight">{doc.title}</h3>
                          <p className="text-sm">{doc.category}</p>
                        </div>
                      </div>

                      <p className="text-sm mb-4 line-clamp-2">{doc.description}</p>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{doc.views}</div>
                          <div className="text-xs">Views</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{doc.revenue}</div>
                          <div className="text-xs">FIL Earned</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400" />
                          <span className="text-sm font-medium">{doc.rating}</span>
                          <span className="text-sm">({doc.reviews})</span>
                        </div>
                        <div className="text-lg font-bold">{doc.price} FIL</div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Track your earnings over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Total Revenue</p>
                        <p className="text-2xl font-bold">
                          {uploadedDocs.reduce((sum, doc) => sum + parseFloat(doc.revenue), 0).toFixed(1)} FIL
                        </p>
                      </div>
                      <Gem className="h-8 w-8" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 rounded-lg">
                        <p className="text-2xl font-bold">
                          {uploadedDocs.reduce((sum, doc) => sum + doc.views, 0)}
                        </p>
                        <p className="text-sm">Total Views</p>
                      </div>
                      <div className="text-center p-3 rounded-lg">
                        <p className="text-2xl font-bold">
                          {uploadedDocs.reduce((sum, doc) => sum + doc.downloads, 0)}
                        </p>
                        <p className="text-sm">Total Downloads</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Document performance overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {uploadedDocs.slice(0, 5).map((doc) => (
                      <div key={doc.id} className="flex items-center gap-3">
                        <div className="flex-1">
                          <p className="text-sm font-medium truncate">{doc.title}</p>
                          <div className="flex items-center gap-2 text-xs">
                            <span>{doc.views} views</span>
                            <span>•</span>
                            <span>{doc.downloads} downloads</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{doc.revenue} FIL</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400" />
                            <span className="text-xs">{doc.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Collaboration Tab */}
          <TabsContent value="collaboration" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Collaborators</CardTitle>
                  <CardDescription>People you've shared documents with</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {uploadedDocs.flatMap(doc => doc.collaborators).slice(0, 5).map((collaborator, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold">
                        {collaborator.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{collaborator}</p>
                        <p className="text-sm">Collaborator</p>
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
                  <CardTitle>Shared Documents</CardTitle>
                  <CardDescription>Documents shared with collaborators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {uploadedDocs.filter(doc => doc.collaborators.length > 0).map((doc) => (
                    <div key={doc.id} className="p-3 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="h-5 w-5" />
                        <div className="flex-1">
                          <p className="font-medium">{doc.title}</p>
                          <p className="text-sm">Shared with {doc.collaborators.length} people</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {doc.collaborators.map((collab, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {collab}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Assistant Tab */}
          <TabsContent value="ai" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI Document Assistant
                  </CardTitle>
                  <CardDescription>Get AI-powered insights and suggestions for your documents</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Zap className="h-5 w-5" />
                        <h3 className="font-semibold">Smart Summarization</h3>
                      </div>
                      <p className="text-sm mb-3">
                        AI will automatically generate summaries for your documents to improve discoverability.
                      </p>
                      <Button size="sm">Generate Summaries</Button>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Tag className="h-5 w-5" />
                        <h3 className="font-semibold">Keyword Extraction</h3>
                      </div>
                      <p className="text-sm mb-3">
                        Automatically identify and tag relevant keywords from your document content.
                      </p>
                      <Button size="sm">Extract Keywords</Button>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <TrendingUp className="h-5 w-5" />
                        <h3 className="font-semibold">Content Optimization</h3>
                      </div>
                      <p className="text-sm mb-3">
                        Get AI recommendations to improve your document's appeal and conversion rate.
                      </p>
                      <Button size="sm">Optimize Content</Button>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Shield className="h-5 w-5" />
                        <h3 className="font-semibold">Quality Analysis</h3>
                      </div>
                      <p className="text-sm mb-3">
                        Comprehensive analysis of document quality, completeness, and market potential.
                      </p>
                      <Button size="sm">Analyze Quality</Button>
                    </Card>
                  </div>

                  <Card className="p-4">
                    <h3 className="font-semibold mb-3">AI Suggestions for Your Documents</h3>
                    <div className="space-y-3">
                      {uploadedDocs.slice(0, 3).map((doc) => (
                        <div key={doc.id} className="p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="h-4 w-4" />
                            <span className="font-medium text-sm">{doc.title}</span>
                          </div>
                          <div className="space-y-2">
                            {doc.aiSuggestions.map((suggestion, index) => (
                              <div key={index} className="flex items-start gap-2 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="">{suggestion}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Insights</CardTitle>
                  <CardDescription>Smart recommendations for your documents</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4" />
                      <span className="font-medium text-sm">Trending Topics</span>
                    </div>
                    <p className="text-sm">AI, Blockchain, and Machine Learning are currently hot topics in your category.</p>
                  </div>

                  <div className="p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-medium text-sm">Pricing Insights</span>
                    </div>
                    <p className="text-sm">Documents in your price range (0.1-1 FIL) have 40% higher conversion rates.</p>
                  </div>

                  <div className="p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4" />
                      <span className="font-medium text-sm">Audience Analysis</span>
                    </div>
                    <p className="text-sm">Your documents appeal to researchers and tech professionals aged 25-45.</p>
                  </div>

                  <div className="p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium text-sm">Optimal Timing</span>
                    </div>
                    <p className="text-sm">Upload between 2-4 PM EST for maximum visibility and engagement.</p>
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
