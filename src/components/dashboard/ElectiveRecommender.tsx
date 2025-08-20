"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lightbulb, Loader2, Send, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { recommendElectivesAction } from '@/lib/actions';
import type { RecommendElectivesBasedOnProfileOutput } from '@/ai/flows/recommend-electives-based-on-profile';

const formSchema = z.object({
  academicHistory: z.string().min(10, 'Please provide more details about your academic history.'),
  interests: z.string().min(10, 'Please describe your interests.'),
  careerGoals: z.string().min(10, 'Please outline your career goals.'),
});

export default function ElectiveRecommender() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendElectivesBasedOnProfileOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      academicHistory: 'Completed courses in Computer Science with high grades in data structures and algorithms. Lower grades in theoretical math courses.',
      interests: 'Enjoys hackathons, building side projects, reading sci-fi, and gaming.',
      careerGoals: 'Aspiring to become a Machine Learning Engineer at a top tech company or a research scientist in AI.',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const response = await recommendElectivesAction(values);
      if (response) {
        setResult(response);
      } else {
        throw new Error('No response from AI');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error Recommending Electives",
        description: "Could not get recommendations. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Get Elective Recommendations</CardTitle>
          <CardDescription>
            Discover electives tailored to your profile, interests, and career ambitions.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="bg-muted -mx-6 px-6 py-4">
                <FormField
                  control={form.control}
                  name="academicHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg text-muted-foreground w-full">Academic History</FormLabel>
                      <div className="pt-4">
                        <FormControl>
                          <Textarea placeholder="e.g., Courses taken, grades, strengths..." className="resize-none bg-card" {...field} rows={4} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-muted -mx-6 px-6 py-4">
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg text-muted-foreground w-full">Interests & Hobbies</FormLabel>
                      <div className="pt-4">
                        <FormControl>
                          <Textarea placeholder="e.g., Hackathons, painting, chess..." className="resize-none bg-card" {...field} rows={4} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-muted -mx-6 px-6 py-4">
                <FormField
                  control={form.control}
                  name="careerGoals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg text-muted-foreground w-full">Career Goals</FormLabel>
                      <div className="pt-4">
                        <FormControl>
                          <Textarea placeholder="e.g., Software Engineer, UX Designer..." className="resize-none bg-card" {...field} rows={4} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="px-6 pb-6 pt-4">
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                  Get Recommendations
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="lg:col-span-2">
        {loading && (
          <Card className="flex h-full min-h-[500px] items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Lightbulb className="mx-auto h-12 w-12 animate-pulse" />
              <p className="mt-4 font-semibold">Finding your perfect match...</p>
              <p className="text-sm">Analyzing your profile to suggest electives.</p>
            </div>
          </Card>
        )}
        {result && (
          <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2"><Sparkles className="text-primary" /> AI-Powered Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-semibold text-lg mb-4">Recommended Electives</h3>
                     <div className="grid gap-3 sm:grid-cols-2">
                        {result.electiveRecommendations.map((elective, index) => (
                            <div key={index} className="p-4 rounded-md border bg-card hover:bg-secondary transition-colors shadow-sm hover:shadow-md cursor-pointer">
                                <p className="font-medium text-primary">{elective}</p>
                            </div>
                        ))}
                    </div>
                </div>
                 <div className="border-t pt-6">
                     <h3 className="font-semibold text-lg mb-2">Reasoning</h3>
                     <p className="text-sm text-muted-foreground leading-relaxed">{result.reasoning}</p>
                 </div>
            </CardContent>
            <CardFooter>
                 <p className="text-xs text-muted-foreground">Always double-check course availability and prerequisites with your advisor.</p>
            </CardFooter>
          </Card>
        )}
         {!loading && !result && (
            <Card className="flex h-full min-h-[500px] items-center justify-center border-dashed">
                <div className="text-center text-muted-foreground">
                    <Lightbulb className="mx-auto h-12 w-12" />
                    <p className="mt-4 font-semibold">Unlock your potential</p>
                    <p className="text-sm">Tell us about yourself to find electives you'll love.</p>
                </div>
            </Card>
        )}
      </div>
    </div>
  );
}
