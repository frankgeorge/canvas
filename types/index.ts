export type PlaybookCategory =
  | "revenue-ops"
  | "legal"
  | "hr-ops"
  | "customer-success"
  | "finance"
  | "engineering"
  | "marketing"
  | "data-ops";

export type PlaybookComplexity = "starter" | "standard" | "advanced";

export interface PlaybookAuthor {
  name: string;
  avatar?: string;
  org?: string;
  verified?: boolean;
}

export interface PlaybookNode {
  id: string;
  type: "trigger" | "agent" | "tool" | "condition" | "output" | "transform";
  label: string;
  description?: string;
  icon?: string;
  config?: Record<string, unknown>;
}

export interface Playbook {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  category: PlaybookCategory;
  complexity: PlaybookComplexity;
  author: PlaybookAuthor;
  tags: string[];
  agentCount: number;
  stepCount: number;
  avgRuntime: string;  // e.g. "~3 min"
  timeSaved: string;   // e.g. "12 hrs/week"
  runCount: number;
  starCount: number;
  cloneCount: number;
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
  isPremium?: boolean;
  nodes?: PlaybookNode[];
  previewImage?: string;
  outcomes?: string[];
  requiredIntegrations?: string[];
}

export interface AgentNode {
  id: string;
  type: "input" | "agent" | "tool" | "router" | "output" | "memory" | "webhook";
  position: { x: number; y: number };
  data: {
    label: string;
    description?: string;
    model?: string;
    systemPrompt?: string;
    tools?: string[];
    icon?: string;
    color?: string;
    isRunning?: boolean;
    lastRun?: string;
  };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  type?: string;
  animated?: boolean;
}

export interface Workflow {
  id: string;
  title: string;
  description?: string;
  nodes: AgentNode[];
  edges: WorkflowEdge[];
  status: "draft" | "active" | "paused" | "error";
  createdAt: string;
  updatedAt: string;
  lastRunAt?: string;
  runCount?: number;
  playbookId?: string;
}

export interface DashboardMetric {
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string | number;
}
