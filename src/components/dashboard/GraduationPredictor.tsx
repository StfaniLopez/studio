"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BarChart, Info, Loader2, Send, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { predictGraduationAction } from '@/lib/actions';
import type { PredictGraduationTimeOutput } from '@/ai/flows/predict-graduation-time';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const formSchema = z.object({
  // The form now just manages a set of boolean checkboxes.
  // We can define them here to ensure type safety.
  includeCompletedCredits: z.boolean().default(true),
  includeTotalCredits: z.boolean().default(true),
  includeAverageGpa: z.boolean().default(true),
  includePlannedCourses: z.boolean().default(true),
  includeHistoricalData: z.boolean().default(true),
  showLineChart: z.boolean().default(false), // Optional: for chart visualization
});

type FormValues = z.infer<typeof formSchema>;

// Define titles, descriptions, and corresponding form field names
const checkboxOptions: { id: keyof FormValues; title: string; description: string }[] = [
  { id: 'includeCompletedCredits', title: 'Include Completed Credits', description: 'The number of credits you have completed so far.' },
  { id: 'includeTotalCredits', title: 'Include Total Credits Required', description: 'The total number of credits required for your degree.' },
  { id: 'includeAverageGpa', title: 'Include Average GPA', description: 'Your current Grade Point Average (GPA).' },
  { id: 'includePlannedCourses', title: 'Include Planned Courses', description: 'A list of your planned future courses and their credits.' },
  { id: 'includeHistoricalData', title: 'Include Historical Data', description: 'A summary of historical graduation trends or data relevant to your situation.' },
  { id: 'showLineChart', title: 'Show Line Chart', description: 'Visualize the predicted graduation timeline with a line chart.' },
];

export default function GraduationPredictor() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictGraduationTimeOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      includeCompletedCredits: true,
      includeTotalCredits: true,
      includeAverageGpa: true,
      includePlannedCourses: true,
      includeHistoricalData: true,
      showLineChart: false,
    },
  });

  // This function is a placeholder for what would happen on submit.
  // The actual prediction logic is commented out to focus on the UI.
  async function onSubmit(values: FormValues) {
    setLoading(true);
    setResult(null);

    // This is where you would normally call the prediction action.
    // For now, we'll just log the selected values.
    console.log('Selected options for prediction:', values);

    // Example of how you *would* use this:
    try {
      // You would construct the input for your AI action based on the selected checkboxes.
      // For this example, we'll use placeholder data.
      const response = await predictGraduationAction({
          completedCredits: 114, // from data
          totalCreditsRequired: 143, // from data
          plannedCourses: "CS450 (3 credits), ENG301 (3 credits)", // constructed based on user data
          averageGpa: 3.7, // from data
          historicalGraduationData: "Students in this major typically graduate in 4 to 5 years." // from a service or data
      });

      if (response) {
        setResult(response);
      } else {
        throw new Error('No response from AI');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error Predicting Graduation',
        description: 'Could not get a prediction. Please try again.',
      });
    } finally {
      setLoading(false);
    }
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
  };

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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormLabel>Check the options to include in the prediction:</FormLabel>
                <TooltipProvider>
                  {checkboxOptions.map((option) => (
                    <FormField
                      key={option.id}
                      control={form.control}
                      name={option.id}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-sm">
                              {option.title}
                            </FormLabel>
                          </div>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{option.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </FormItem>
                      )}
                    />
                  ))}
                </TooltipProvider>
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
              <div className="text-center p-6 bg-secondary/30 rounded-lg">
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
