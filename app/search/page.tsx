"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Filter, Star, Eye, Download, FileText, Brain, TrendingUp, Clock, Users, DollarSign, Tag, Calendar as CalendarIcon, SlidersHorizontal, Save, Share2 } from "lucide-react";

interface Document {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  rating: number;
  reviews: number;
  views: number;
  downloads: number;
  uploadDate: string;
  fileSize: string;
  tags: string[];
  author: string;
  featured: boolean;
  aiRelevance: number;
}

interface SavedSearch {
  id: string;
  name: string;
  query: string;
  filters: any;
  createdAt: string;
}

const categories = ['Academic', 'Legal', 'Business', 'Technical', 'Medical', 'Creative', 'Personal', 'Other'];
const fileTypes = ['PDF', 'DOC', 'DOCX', 'TXT', 'PPT', 'PPTX'];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Document[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);

  // Advanced Filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const mockResults: Document[] = [
    {
      id: "1",
      title: "Advanced Machine Learning Research Paper",
      description: "Comprehensive analysis of deep learning algorithms and their applications in modern AI systems, including neural networks, convolutional models, and reinforcement learning techniques.",
      price: "2.5",
      category: "Academic",
      rating: 4.8,
      reviews: 23,
      views: 1247,
      downloads: 89,
      uploadDate: "2024-01-15",
      fileSize: "15.7 MB",
      tags: ["AI", "Machine Learning", "Deep Learning", "Research"],
      author: "Dr. Sarah Chen",
      featured: true,
      aiRelevance: 95
    },
    {
      id: "2",
      title: "Corporate Contract Template Suite",
      description: "Complete set of legal templates for business agreements and partnerships, including NDA, service contracts, and intellectual property agreements.",
      price: "5.0",
      category: "Legal",
      rating: 4.9,
      reviews: 45,
      views: 892,
      downloads: 156,
      uploadDate: "2024-01-14",
      fileSize: "8.2 MB",
      tags: ["Contracts", "Business", "Legal", "Templates"],
      author: "Legal Team Alpha",
      featured: false,
      aiRelevance: 87
    },
    {
      id: "3",
      title: "Blockchain Architecture Whitepaper",
      description: "Technical deep-dive into decentralized system design and implementation, covering consensus mechanisms, smart contracts, and scalability solutions.",
      price: "1.8",
      category: "Technical",
      rating: 4.7,
      reviews: 67,
      views: 2156,
      downloads: 278,
      uploadDate: "2024-01-12",
      fileSize: "12.4 MB",
      tags: ["Blockchain", "Decentralized", "Architecture", "Web3"],
      author: "Crypto Expert",
      featured: true,
      aiRelevance: 92
    }
  ];

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate AI-powered semantic search
    setTimeout(() => {
      let filtered = mockResults.filter(doc => {
        const matchesQuery = query === "" ||
          doc.title.toLowerCase().includes(query.toLowerCase()) ||
          doc.description.toLowerCase().includes(query.toLowerCase()) ||
          doc.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));

        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(doc.category);
        const matchesPrice = parseFloat(doc.price) >= priceRange[0] && parseFloat(doc.price) <= priceRange[1];
        const matchesRating = doc.rating >= minRating;

        return matchesQuery && matchesCategory && matchesPrice && matchesRating;
      });

      // Sort results
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'relevance': return b.aiRelevance - a.aiRelevance;
          case 'price-low': return parseFloat(a.price) - parseFloat(b.price);
          case 'price-high': return parseFloat(b.price) - parseFloat(a.price);
          case 'rating': return b.rating - a.rating;
          case 'newest': return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
          case 'popular': return b.views - a.views;
          default: return 0;
        }
      });

      setResults(filtered);
      setIsSearching(false);
    }, 1000);
  };

  const saveSearch = () => {
    const newSavedSearch: SavedSearch = {
      id: Date.now().toString(),
      name: `Search: ${query || 'Advanced Search'}`,
      query,
      filters: { selectedCategories, priceRange, minRating, sortBy },
      createdAt: new Date().toISOString()
    };
    setSavedSearches(prev => [...prev, newSavedSearch]);
  };

  const applySavedSearch = (saved: SavedSearch) => {
    setQuery(saved.query);
    setSelectedCategories(saved.filters.selectedCategories);
    setPriceRange(saved.filters.priceRange);
    setMinRating(saved.filters.minRating);
    setSortBy(saved.filters.sortBy);
    handleSearch();
  };

  useEffect(() => {
    if (query) {
      const timeoutId = setTimeout(handleSearch, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [query, selectedCategories, priceRange, minRating]);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold">Advanced Document Search</h1>
          <p className="text-lg">Discover valuable documents with AI-powered semantic search</p>
        </div>

        {/* Main Search Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Categories */}
                <div>
                  <Label className="text-sm font-medium">Categories</Label>
                  <div className="space-y-2 mt-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCategories(prev => [...prev, category]);
                            } else {
                              setSelectedCategories(prev => prev.filter(c => c !== category));
                            }
                          }}
                        />
                        <Label htmlFor={category} className="text-sm">{category}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Price Range */}
                <div>
                  <Label className="text-sm font-medium">Price Range (FIL)</Label>
                  <div className="mt-4">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={10}
                      min={0}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs mt-2">
                      <span>{priceRange[0]} FIL</span>
                      <span>{priceRange[1]} FIL</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Minimum Rating */}
                <div>
                  <Label className="text-sm font-medium">Minimum Rating</Label>
                  <Select value={minRating.toString()} onValueChange={(value) => setMinRating(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any Rating</SelectItem>
                      <SelectItem value="3">3+ Stars</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg">
                  <p className="text-sm font-medium">Trending Topics</p>
                  <p className="text-xs mt-1">AI, Blockchain, and Machine Learning are hot right now</p>
                </div>
                <div className="p-3 rounded-lg">
                  <p className="text-sm font-medium">Popular Searches</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <Badge variant="secondary" className="text-xs">Research Papers</Badge>
                    <Badge variant="secondary" className="text-xs">Legal Templates</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search Bar */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search documents with AI-powered semantic understanding..."
                      className="pl-10 h-12 text-lg"
                    />
                  </div>
                  <Button onClick={handleSearch} size="lg" disabled={isSearching}>
                    {isSearching ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="h-5 w-5 mr-2" />
                        Search
                      </>
                    )}
                  </Button>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-4 mt-4">
                  <Button variant="outline" size="sm" onClick={saveSearch}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Search
                  </Button>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">AI Relevance</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
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
                      <div className="grid grid-cols-2 gap-0.5">
                        <div className="w-2 h-2 bg-current"></div>
                        <div className="w-2 h-2 bg-current"></div>
                        <div className="w-2 h-2 bg-current"></div>
                        <div className="w-2 h-2 bg-current"></div>
                      </div>
                    </Button>
                  </div>
                </div>

                {/* Saved Searches */}
                {savedSearches.length > 0 && (
                  <div className="mt-4">
                    <Label className="text-sm font-medium">Saved Searches</Label>
                    <div className="flex gap-2 mt-2 overflow-x-auto">
                      {savedSearches.map(saved => (
                        <Button
                          key={saved.id}
                          variant="outline"
                          size="sm"
                          onClick={() => applySavedSearch(saved)}
                          className="whitespace-nowrap"
                        >
                          {saved.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Search Results */}
            {results.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Found {results.length} results
                  </p>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Brain className="h-3 w-3" />
                    AI-Powered Search
                  </Badge>
                </div>

                {viewMode === 'list' ? (
                  <div className="space-y-4">
                    {results.map((doc) => (
                      <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-xl font-semibold">{doc.title}</h3>
                                {doc.featured && <Badge variant="default">Featured</Badge>}
                              </div>
                              <p className="text-muted-foreground mb-3 line-clamp-2">{doc.description}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                <span className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {doc.author}
                                </span>
                                <span className="flex items-center gap-1">
                                  <CalendarIcon className="h-4 w-4" />
                                  {doc.uploadDate}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Eye className="h-4 w-4" />
                                  {doc.views}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Download className="h-4 w-4" />
                                  {doc.downloads}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {doc.tags.map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="text-right ml-4">
                              <div className="text-2xl font-bold mb-2">{doc.price} FIL</div>
                              <div className="flex items-center gap-1 mb-2">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{doc.rating}</span>
                                <span className="text-sm text-muted-foreground">({doc.reviews})</span>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-1" />
                                  Preview
                                </Button>
                                <Link href={`/document/${doc.id}`}>
                                  <Button size="sm">Purchase</Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t">
                            <Badge variant="secondary">{doc.category}</Badge>
                            <div className="text-sm text-muted-foreground">
                              AI Relevance: {doc.aiRelevance}%
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {results.map((doc) => (
                      <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <Badge variant="outline">{doc.category}</Badge>
                            {doc.featured && <Badge variant="default">Featured</Badge>}
                          </div>
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{doc.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{doc.description}</p>
                          <div className="flex items-center gap-1 mb-3">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{doc.rating}</span>
                            <span className="text-sm text-muted-foreground">({doc.reviews})</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-xl font-bold">{doc.price} FIL</div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Link href={`/document/${doc.id}`}>
                                <Button size="sm">Purchase</Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* No Results */}
            {results.length === 0 && !isSearching && query && (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">No documents found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search terms or filters to find more results.
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={() => setSelectedCategories([])}>
                      Clear Filters
                    </Button>
                    <Button>
                      Browse All Documents
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Initial State */}
            {!query && results.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-xl font-semibold mb-2">Start your search</h3>
                  <p className="text-muted-foreground">
                    Use the search bar above to find valuable documents with AI-powered semantic search.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
