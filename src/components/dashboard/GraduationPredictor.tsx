"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BarChart, Loader2, Send, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { predictGraduationAction } from '@/lib/actions';
import type { PredictGraduationTimeOutput } from '@/ai/flows/predict-graduation-time';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

// Placeholder for the chart component (replace with a real chart library)
const GraduationChart = ({ data }: { data: PredictGraduationTimeOutput | null }) => <div>Chart Placeholder</div>;
const formSchema = z.object({
  completedCredits: z.coerce.number().min(0, 'Credits must be non-negative.'),
  // We are removing the input fields, so these are no longer required in the schema
});

export default function GraduationPredictor() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictGraduationTimeOutput | null>(null);
  const [showChart, setShowChart] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<
    { title: string; description: string }[]
  >([]);

  // State for each checkbox
  const [includeCompletedCredits, setIncludeCompletedCredits] = useState(true);
  const [includeTotalCredits, setIncludeTotalCredits] = useState(true);
  const [includeAverageGpa, setIncludeAverageGpa] = useState(true);
  const [includePlannedCourses, setIncludePlannedCourses] = useState(true);
  const [includeHistoricalData, setIncludeHistoricalData] = useState(true);

  // Define titles and descriptions for each checkbox
  const checkboxOptions = [
  { id: 'completedCredits', title: 'Include Completed Credits', description: 'Include the number of credits you have completed so far.', state: includeCompletedCredits, setState: setIncludeCompletedCredits },
  { id: 'totalCredits', title: 'Include Total Credits', description: 'Include the total number of credits required for your degree.', state: includeTotalCredits, setState: setIncludeTotalCredits },
  { id: 'averageGpa', title: 'Include Average GPA', description: 'Include your current average GPA.', state: includeAverageGpa, setState: setIncludeAverageGpa },
  { id: 'plannedCourses', title: 'Include Planned Courses', description: 'List your planned future courses and their credits.', state: includePlannedCourses, setState: setIncludePlannedCourses },
  { id: 'historicalData', title: 'Include Historical Data', description: 'Provide a summary of historical graduation trends or data relevant to your situation.', state: includeHistoricalData, setState: setIncludeHistoricalData },
  { id: 'showLineChart', title: 'Show Line Chart', description: 'Visualize the predicted graduation timeline with a line chart.', state: showChart, setState: setShowChart },
  ];

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Instead of predicting, collect and display selected checkbox info
    const selected = checkboxOptions
      .filter(option => option.state)
      .map(option => ({
        title: option.title,
        description: option.description,
      }));

    setSelectedCheckboxes(selected);
    setResult(null); // Clear previous prediction result
    setLoading(false); // Ensure loading is false

    // The original prediction logic is commented out as per the instruction
    /*
    // ... (original prediction logic)
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error Predicting Graduation",
        description: "Could not get a prediction. Please try again.",
      });
    } finally {
      setLoading(false);
    }
    */
  }

  const getConfidenceBadgeClass = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'bg-green-500 hover:bg-green-600';
      case 'medium':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'low':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-secondary';
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Predict Your Graduation Time</CardTitle>
          <CardDescription>
            Use AI to forecast your graduation date based on current and planned progress.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Checkboxes with Descriptions */}
              <div className="space-y-4">
                {checkboxOptions.map((option) => (
                  <FormField
                    key={option.id}
                    control={form.control}
                    name={option.id as keyof z.infer<typeof formSchema>} // Type assertion, as these don't directly map to schema fields anymore
                    render={() => (
                      <FormItem className="space-y-2">
                        <FormLabel htmlFor={option.id}>{option.title}</FormLabel>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={option.state}
                            onCheckedChange={option.setState}
                            id={option.id}
                          />
                        </FormControl>
                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Select to include</p>
                      </div>
                      <FormDescription>{option.description}</FormDescription>
                    </FormItem>
                  )}
                />
                ))}
              </div>


              <Button type="submit" disabled={loading} className="w-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                Predict Graduation
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="lg:col-span-2">
         {loading && (
          <Card className="flex h-full min-h-[500px] items-center justify-center">
            <div className="text-center text-muted-foreground">
              <BarChart className="mx-auto h-12 w-12 animate-pulse" />
              <p className="mt-4 font-semibold">Analyzing the data...</p>
              <p className="text-sm">Forecasting your graduation timeline.</p>
            </div>
          </Card>
        )}
        {result && (
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Sparkles className="text-primary" /> Graduation Forecast</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="text-center p-6 bg-secondary rounded-lg">
                    <p className="text-sm text-muted-foreground">Predicted Graduation Time</p>
                    <p className="text-4xl font-bold text-primary mt-2">{result.predictedGraduationTime}</p>
                    <div className="mt-4">
                        <Badge className={getConfidenceBadgeClass(result.confidenceLevel)}>
                            Confidence: {result.confidenceLevel}
                        </Badge>
                    </div>
                </div>
                 <div className="border-t pt-6">
                     <h3 className="font-semibold text-lg mb-2">Reasoning</h3>
                     <p className="text-sm text-muted-foreground leading-relaxed">{result.reasoning}</p>
                 </div>
            </CardContent>
            <CardFooter>
                 <p className="text-xs text-muted-foreground">This prediction is based on the data provided and historical trends. It is not a guarantee.</p>
            </CardFooter>
          </Card>
        )}

        {/* Display Selected Checkbox Info */}
        {selectedCheckboxes.length > 0 && (
          <Card className="mt-6">
            <CardHeader><CardTitle>Selected Options</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {selectedCheckboxes.map((item, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  {index < selectedCheckboxes.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Chart Placeholder */}
        {!loading && result && showChart && (
          <GraduationChart data={result} />
        )}

         {!loading && !result && (
            <Card className="flex h-full min-h-[500px] items-center justify-center border-dashed">
                <div className="text-center text-muted-foreground">
                    <BarChart className="mx-auto h-12 w-12" />
                    <p className="mt-4 font-semibold">Look into your future</p>
                    <p className="text-sm">Fill out the form to get a graduation time prediction.</p>
                </div>
            </Card>
        )}
      </div>
    </div>
  );
}
