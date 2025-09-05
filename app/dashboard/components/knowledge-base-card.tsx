"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, FileText, HardDrive, Calendar, MoreHorizontal, CheckCircle, Loader2, XCircle } from "lucide-react";

interface KnowledgeBase {
  id: string;
  name: string;
  documents: number;
  size: string;
  lastUpdated: string;
  status: "synced" | "syncing" | "error";
  type: string;
}

interface KnowledgeBaseCardProps {
  knowledgeBase: KnowledgeBase;
  onView?: (kb: KnowledgeBase) => void;
  onSync?: (kb: KnowledgeBase) => void;
  onConfigure?: (kb: KnowledgeBase) => void;
}

const statusIcons = {
  synced: CheckCircle,
  syncing: Loader2,
  error: XCircle
};

const statusColors = {
  synced: "text-green-600",
  syncing: "text-blue-600",
  error: "text-red-600"
};

const statusBadgeVariants = {
  synced: "default" as const,
  syncing: "secondary" as const,
  error: "destructive" as const
};

export function KnowledgeBaseCard({
  knowledgeBase,
  onView,
  onSync,
  onConfigure
}: KnowledgeBaseCardProps) {
  const StatusIcon = statusIcons[knowledgeBase.status];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Database className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{knowledgeBase.name}</CardTitle>
              <CardDescription>{knowledgeBase.type}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusIcon className={`h-4 w-4 ${statusColors[knowledgeBase.status]} ${
              knowledgeBase.status === 'syncing' ? 'animate-spin' : ''
            }`} />
            <Badge variant={statusBadgeVariants[knowledgeBase.status]} className="text-xs">
              {knowledgeBase.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{knowledgeBase.documents.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Documents</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{knowledgeBase.size}</p>
              <p className="text-xs text-muted-foreground">Size</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          Last updated: {knowledgeBase.lastUpdated}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onView?.(knowledgeBase)}
          >
            View Details
          </Button>
          {knowledgeBase.status === 'error' && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onSync?.(knowledgeBase)}
            >
              Retry Sync
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onConfigure?.(knowledgeBase)}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}



