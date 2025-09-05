"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Star,
  Eye,
  Download,
  Share2,
  Heart,
  MessageSquare,
  BookOpen,
  Users,
  Calendar,
  FileText,
  Award,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Copy,
  ExternalLink,
  Quote,
  Link as LinkIcon,
  ChevronLeft,
  Zap,
  Brain,
  TrendingUp,
  Target,
  Gem,
  Crown,
  Medal,
  CheckCircle,
  Clock,
  User,
  Mail,
  MapPin,
  GraduationCap,
  Building,
  Bookmark,
  BookmarkCheck,
  ArrowLeft
} from "lucide-react";

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

interface RelatedDocument {
  id: string;
  title: string;
  author: string;
  rating: number;
  price: string;
  category: string;
}

export default function DocumentDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedAccessLevel, setSelectedAccessLevel] = useState("full");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  // Enhanced mock data
  const document = {
    id,
    title: "Advanced Machine Learning Research Paper",
    description: "Comprehensive analysis of deep learning algorithms and their applications in modern AI systems, including neural networks, convolutional models, and reinforcement learning techniques with empirical studies and performance benchmarks.",
    price: "2.5",
    category: "Academic",
    subcategory: "Computer Science",
    tags: ["AI", "Machine Learning", "Deep Learning", "Neural Networks", "Research"],
    author: {
      name: "Dr. Sarah Chen",
      credentials: "PhD in Computer Science, MIT",
      institution: "Stanford University",
      publications: 47,
      followers: 1250,
      rating: 4.9,
      avatar: "/api/placeholder/100/100"
    },
    stats: {
      views: 1247,
      downloads: 89,
      reviews: 23,
      citations: 45,
      shares: 78,
      bookmarks: 156
    },
    ratings: {
      overall: 4.8,
      content: 4.9,
      accuracy: 4.7,
      presentation: 4.8,
      usefulness: 4.9
    },
    fileInfo: {
      size: "15.7 MB",
      pages: 47,
      format: "PDF",
      language: "English",
      lastUpdated: "2024-01-18",
      version: "2.1"
    },
    aiInsights: {
      relevanceScore: 95,
      trending: true,
      demandLevel: "High",
      targetAudience: "Researchers, Students, AI Practitioners",
      keywords: ["Neural Networks", "Deep Learning", "AI Research", "Performance Benchmarks"],
      similarDocuments: 23
    },
    pricing: {
      full: "2.5 USDFC",
      preview: "0.5 USDFC",
      summary: "0.2 USDFC",
      citations: "Free"
    }
  };

  const reviews: Review[] = [
    {
      id: "1",
      author: "Prof. Michael Johnson",
      rating: 5,
      comment: "Exceptionally well-researched paper with comprehensive empirical analysis. The methodology section is particularly thorough.",
      date: "2024-01-20",
      helpful: 12,
      verified: true
    },
    {
      id: "2",
      author: "Dr. Emily Rodriguez",
      rating: 5,
      comment: "Outstanding contribution to the field. The performance benchmarks are exactly what I've been looking for in my research.",
      date: "2024-01-18",
      helpful: 8,
      verified: true
    },
    {
      id: "3",
      author: "Research Student",
      rating: 4,
      comment: "Very informative paper. Would appreciate more detailed implementation examples in future works.",
      date: "2024-01-15",
      helpful: 5,
      verified: false
    }
  ];

  const relatedDocuments: RelatedDocument[] = [
    {
      id: "2",
      title: "Deep Learning Optimization Techniques",
      author: "Dr. James Wilson",
      rating: 4.7,
      price: "1.8 USDFC",
      category: "Technical"
    },
    {
      id: "3",
      title: "Neural Network Architectures Survey",
      author: "Prof. Lisa Chen",
      rating: 4.9,
      price: "3.2 USDFC",
      category: "Academic"
    },
    {
      id: "4",
      title: "AI Ethics and Bias in Machine Learning",
      author: "Dr. Robert Taylor",
      rating: 4.6,
      price: "2.1 USDFC",
      category: "Academic"
    }
  ];

  const handlePurchase = (accessLevel: string) => {
    // Integrate with Filecoin Pay
    console.log("Purchasing document:", id, "Access level:", accessLevel);
  };

  const handleShare = () => {
    navigator.share?.({
      title: document.title,
      text: document.description,
      url: window.location.href
    });
  };

  const handleReviewSubmit = () => {
    console.log("Submitting review:", { rating: reviewRating, text: reviewText });
    setReviewText("");
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Document Header */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{document.category}</Badge>
                      {document.aiInsights.trending && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Trending
                        </Badge>
                      )}
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        AI Score: {document.aiInsights.relevanceScore}%
                      </Badge>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">{document.title}</h1>
                    <p className="text-lg text-muted-foreground mb-6">{document.description}</p>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 mb-6">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={document.author.avatar} />
                        <AvatarFallback>{document.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-semibold">{document.author.name}</h3>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Award className="h-3 w-3" />
                            {document.author.rating}★
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{document.author.credentials}</p>
                        <p className="text-sm text-muted-foreground">{document.author.institution}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {document.author.publications} publications
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {document.author.followers} followers
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{document.stats.views.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Views</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{document.stats.downloads}</div>
                        <div className="text-xs text-muted-foreground">Downloads</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{document.stats.reviews}</div>
                        <div className="text-xs text-muted-foreground">Reviews</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{document.stats.citations}</div>
                        <div className="text-xs text-muted-foreground">Citations</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{document.stats.shares}</div>
                        <div className="text-xs text-muted-foreground">Shares</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{document.stats.bookmarks}</div>
                        <div className="text-xs text-muted-foreground">Bookmarks</div>
                      </div>
                    </div>

                    {/* Rating Overview */}
                    <div className="flex items-center gap-6 mb-6">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${
                                star <= Math.floor(document.ratings.overall)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-2xl font-bold">{document.ratings.overall}</span>
                        <span className="text-sm text-muted-foreground">({document.stats.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {document.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Purchase Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-3 block">Access Level</label>
                    <Select value={selectedAccessLevel} onValueChange={setSelectedAccessLevel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Full Access - {document.pricing.full} USDFC
                          </div>
                        </SelectItem>
                        <SelectItem value="preview">
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            Preview Access - {document.pricing.preview} USDFC
                          </div>
                        </SelectItem>
                        <SelectItem value="summary">
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            AI Summary - {document.pricing.summary} USDFC
                          </div>
                        </SelectItem>
                        <SelectItem value="citations">
                          <div className="flex items-center gap-2">
                            <Quote className="h-4 w-4" />
                            Citations - {document.pricing.citations}
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end gap-2">
                    <Button
                      onClick={() => handlePurchase(selectedAccessLevel)}
                      className="flex-1"
                      size="lg"
                    >
                      <Gem className="h-4 w-4 mr-2" />
                      Purchase for {document.pricing[selectedAccessLevel as keyof typeof document.pricing]} USDFC
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => setIsBookmarked(!isBookmarked)}>
                      {isBookmarked ? (
                        <BookmarkCheck className="h-4 w-4" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 mt-6 pt-6 border-t">
                  <Button variant="outline" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                  <Button variant="outline">
                    <Quote className="h-4 w-4 mr-2" />
                    Cite
                  </Button>
                  <Button variant="outline">
                    <Flag className="h-4 w-4 mr-2" />
                    Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Document Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="citations">Citations</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Document Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">File Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">File Size:</span>
                            <span>{document.fileInfo.size}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Pages:</span>
                            <span>{document.fileInfo.pages}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Format:</span>
                            <span>{document.fileInfo.format}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Language:</span>
                            <span>{document.fileInfo.language}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Last Updated:</span>
                            <span>{document.fileInfo.lastUpdated}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Version:</span>
                            <span>{document.fileInfo.version}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">AI Insights</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Relevance Score</span>
                            <div className="flex items-center gap-2">
                              <Progress value={document.aiInsights.relevanceScore} className="w-16 h-2" />
                              <span className="text-sm font-medium">{document.aiInsights.relevanceScore}%</span>
                            </div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Demand Level:</span>
                            <Badge variant="secondary">{document.aiInsights.demandLevel}</Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Target Audience:</span>
                            <span className="text-right">{document.aiInsights.targetAudience}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Similar Documents:</span>
                            <span>{document.aiInsights.similarDocuments}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preview Tab */}
              <TabsContent value="preview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Document Preview
                    </CardTitle>
                    <CardDescription>
                      AI-generated preview and key sections from the document
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <Brain className="h-4 w-4" />
                      <AlertTitle>AI-Generated Preview</AlertTitle>
                      <AlertDescription>
                        This preview was generated using advanced AI to show the most relevant sections of the document.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Abstract</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          This comprehensive research paper explores the latest advancements in deep learning algorithms,
                          with a particular focus on neural network architectures and their practical applications in modern AI systems.
                          The study provides empirical analysis of various optimization techniques and performance benchmarks across different domains.
                        </p>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-semibold mb-2">Key Findings</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Convolutional neural networks show 23% improved accuracy on image classification tasks</li>
                          <li>• Transformer-based architectures outperform traditional RNNs by 31% on sequence tasks</li>
                          <li>• Hybrid approaches combining CNN and RNN achieve optimal performance across multiple domains</li>
                          <li>• Performance scaling follows power-law relationships with model size and data volume</li>
                        </ul>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-semibold mb-2">Methodology Highlights</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          The research methodology employs rigorous statistical analysis and controlled experiments
                          across multiple benchmark datasets including ImageNet, GLUE, and custom domain-specific corpora.
                          Performance metrics include accuracy, F1-score, computational efficiency, and memory usage.
                        </p>
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm text-center">
                        🔒 Full document access requires purchase. Preview shows approximately 15% of total content.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reviews & Ratings</CardTitle>
                    <CardDescription>
                      What readers are saying about this document
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Rating Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-4">Rating Breakdown</h4>
                        <div className="space-y-2">
                          {Object.entries(document.ratings).map(([category, rating]) => (
                            <div key={category} className="flex items-center justify-between text-sm">
                              <span className="capitalize">{category}:</span>
                              <div className="flex items-center gap-2">
                                <Progress value={(rating / 5) * 100} className="w-16 h-2" />
                                <span className="font-medium">{rating}/5</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-4">Write a Review</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm">Rating</label>
                            <div className="flex items-center gap-1 mt-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-5 w-5 cursor-pointer ${
                                    star <= reviewRating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                  onClick={() => setReviewRating(star)}
                                />
                              ))}
                            </div>
                          </div>
                          <Textarea
                            placeholder="Share your thoughts about this document..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                          />
                          <Button onClick={handleReviewSubmit} disabled={!reviewText.trim()}>
                            Submit Review
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Recent Reviews</h4>
                      {reviews.map((review) => (
                        <Card key={review.id}>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <Avatar>
                                <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-medium">{review.author}</span>
                                  {review.verified && (
                                    <Badge variant="secondary" className="text-xs">
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      Verified Purchase
                                    </Badge>
                                  )}
                                  <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`h-4 w-4 ${
                                          star <= review.rating
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                  <span>{review.date}</span>
                                  <Button variant="ghost" size="sm" className="h-auto p-1">
                                    <ThumbsUp className="h-3 w-3 mr-1" />
                                    {review.helpful} helpful
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Citations Tab */}
              <TabsContent value="citations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Citation Information</CardTitle>
                    <CardDescription>
                      Cite this document in your research
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">APA Format</h4>
                        <div className="bg-muted p-3 rounded text-sm font-mono">
                          Chen, S. (2024). Advanced machine learning research paper. Qero Research.
                          https://qeroresearch.com/document/{id}
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          <Copy className="h-4 w-4 mr-2" />
                          Copy APA
                        </Button>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">MLA Format</h4>
                        <div className="bg-muted p-3 rounded text-sm font-mono">
                          Chen, Sarah. "Advanced Machine Learning Research Paper." Qero Research, 2024.
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          <Copy className="h-4 w-4 mr-2" />
                          Copy MLA
                        </Button>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">BibTeX Format</h4>
                        <div className="bg-muted p-3 rounded text-sm font-mono">
                          @article&#123;chen2024ml,<br/>
                          &nbsp;&nbsp;title=&#123;Advanced Machine Learning Research Paper&#125;,<br/>
                          &nbsp;&nbsp;author=&#123;Chen, Sarah&#125;,<br/>
                          &nbsp;&nbsp;journal=&#123;Qero Research&#125;,<br/>
                          &nbsp;&nbsp;year=&#123;2024&#125;<br/>
                          &#125;
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          <Copy className="h-4 w-4 mr-2" />
                          Copy BibTeX
                        </Button>
                      </div>
                    </div>

                    <Alert>
                      <Quote className="h-4 w-4" />
                      <AlertTitle>Responsible Citation</AlertTitle>
                      <AlertDescription>
                        Please cite this document appropriately in your academic or professional work.
                        Proper attribution helps support the research community.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Related Documents</CardTitle>
                <CardDescription>You might also like</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedDocuments.map((doc) => (
                  <div key={doc.id} className="flex gap-3 p-3 rounded-lg border">
                    <FileText className="h-8 w-8 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2">{doc.title}</h4>
                      <p className="text-xs text-muted-foreground mb-1">{doc.author}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs ml-1">{doc.rating}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">{doc.category}</Badge>
                      </div>
                      <p className="text-sm font-medium mt-1">{doc.price} FIL</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Document Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Document Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">{document.stats.views}</div>
                    <div className="text-xs text-muted-foreground">Views</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{document.stats.downloads}</div>
                    <div className="text-xs text-muted-foreground">Downloads</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{document.stats.shares}</div>
                    <div className="text-xs text-muted-foreground">Shares</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{document.stats.bookmarks}</div>
                    <div className="text-xs text-muted-foreground">Bookmarks</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Author Card */}
            <Card>
              <CardHeader>
                <CardTitle>About the Author</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <Avatar className="h-16 w-16 mx-auto mb-4">
                    <AvatarImage src={document.author.avatar} />
                    <AvatarFallback>{document.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h4 className="font-semibold">{document.author.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{document.author.credentials}</p>
                  <p className="text-sm text-muted-foreground mb-4">{document.author.institution}</p>

                  <div className="grid grid-cols-2 gap-4 text-center mb-4">
                    <div>
                      <div className="text-lg font-bold">{document.author.publications}</div>
                      <div className="text-xs text-muted-foreground">Publications</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{document.author.followers}</div>
                      <div className="text-xs text-muted-foreground">Followers</div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <User className="h-4 w-4 mr-2" />
                    Follow Author
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
