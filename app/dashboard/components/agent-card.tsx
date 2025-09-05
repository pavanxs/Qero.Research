"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, Eye, Settings, CheckCircle, Clock, Zap, XCircle } from "lucide-react";

interface AIAgent {
  id: string;
  name: string;
  type: string;
  status: "active" | "idle" | "training" | "error";
  knowledgeBase: string;
  queriesProcessed: number;
  accuracy: number;
  lastActivity: string;
  avatar?: string;
}

interface AgentCardProps {
  agent: AIAgent;
  onView?: (agent: AIAgent) => void;
  onConfigure?: (agent: AIAgent) => void;
}

const statusIcons = {
  active: CheckCircle,
  idle: Clock,
  training: Zap,
  error: XCircle
};

const statusColors = {
  active: "text-green-600",
  idle: "text-yellow-600",
  training: "text-blue-600",
  error: "text-red-600"
};

const statusBadgeVariants = {
  active: "default" as const,
  idle: "secondary" as const,
  training: "default" as const,
  error: "destructive" as const
};

export function AgentCard({ agent, onView, onConfigure }: AgentCardProps) {
  const StatusIcon = statusIcons[agent.status];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={agent.avatar} alt={agent.name} />
              <AvatarFallback className="bg-primary/10">
                <Brain className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{agent.name}</CardTitle>
              <CardDescription>{agent.type}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusIcon className={`h-4 w-4 ${statusColors[agent.status]}`} />
            <Badge variant={statusBadgeVariants[agent.status]} className="text-xs">
              {agent.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Knowledge Base: <span className="text-foreground font-medium">{agent.knowledgeBase}</span>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Queries Processed</span>
            <span className="text-sm font-medium">{agent.queriesProcessed.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Accuracy</span>
            <span className="text-sm font-medium">{agent.accuracy}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Last Activity</span>
            <span className="text-sm font-medium">{agent.lastActivity}</span>
          </div>
        </div>

        <Progress value={agent.accuracy} className="h-2" />

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onView?.(agent)}
          >
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onConfigure?.(agent)}
          >
            <Settings className="h-3 w-3 mr-1" />
            Configure
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


