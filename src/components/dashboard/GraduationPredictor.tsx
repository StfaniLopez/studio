"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BarChart, Loader2, Send, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { predictGraduationAction } from '@/lib/actions';
import type { PredictGraduationTimeOutput } from '@/ai/flows/predict-graduation-time';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  completedCredits: z.coerce.number().min(0, 'Credits must be non-negative.'),
  totalCreditsRequired: z.coerce.number().min(1, 'Total credits must be positive.'),
  plannedCourses: z.string().min(1, 'Please list planned courses.'),
  averageGpa: z.coerce.number().min(0).max(4, 'GPA must be between 0 and 4.'),
  historicalGraduationData: z.string().min(1, 'Please provide historical data.'),
});

export default function GraduationPredictor() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictGraduationTimeOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      completedCredits: 60,
      totalCreditsRequired: 120,
      plannedCourses: 'Fall 2025: CS401 (3 credits), CS402 (3 credits). Spring 2026: CS499 (6 credits).',
      averageGpa: 3.5,
      historicalGraduationData: 'For computer science majors, average graduation time is 4.5 years. 80% of students with GPA > 3.0 graduate within 5 years.',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const response = await predictGraduationAction(values);
      if (response) {
        setResult(response);
      } else {
        throw new Error('No response from AI');
      }
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="completedCredits" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Completed Credits</FormLabel>
                      <FormControl><Input type="number" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField control={form.control} name="totalCreditsRequired" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Credits</FormLabel>
                      <FormControl><Input type="number" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField control={form.control} name="averageGpa" render={({ field }) => (
                <FormItem>
                  <FormLabel>Average GPA</FormLabel>
                  <FormControl><Input type="number" step="0.1" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="plannedCourses" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Planned Courses</FormLabel>
                    <FormControl><Textarea placeholder="List future courses and credits..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
              )} />
              <FormField control={form.control} name="historicalGraduationData" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Historical Data</FormLabel>
                    <FormControl><Textarea placeholder="Provide summary of graduation rates..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
              )} />
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
