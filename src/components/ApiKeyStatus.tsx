import { Badge } from "@/components/ui/badge"

export default function ApiKeyStatus() {
  const apiKey = process.env.GEMINI_API_KEY;
  const isConfigured = apiKey && apiKey.length > 0;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Gemini API:</span>
      {isConfigured ? (
        <Badge variant="default" className="bg-green-500 hover:bg-green-600">Active</Badge>
      ) : (
        <Badge variant="destructive">Not Configured</Badge>
      )}
    </div>
  )
}
