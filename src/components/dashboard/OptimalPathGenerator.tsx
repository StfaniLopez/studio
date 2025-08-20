"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bot, Loader2, Send, Sparkles, CheckCircle, Lightbulb, BookOpen, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generatePathAction } from '@/lib/actions';
import type { GenerateOptimalGraduationPathsOutput } from '@/ai/flows/generate-optimal-graduation-paths';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { pendingCourses, completedCourses, allCourses as allCourseData } from '@/lib/data';
import { Separator } from '../ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const formSchema = z.object({
  completedCourses: z.string().min(1, 'Please list completed courses.'),
  remainingRequirements: z.array(z.string()).min(1, 'Please select at least one course.'),
  desiredGraduationTimeline: z.string().min(1, 'Please provide a desired timeline.'),
  studentProfile: z.string().optional(),
});

const timelineOptions = [
    "Fall 2025",
    "Spring 2026",
    "Fall 2026",
    "Spring 2027",
    "Fall 2027"
];

// Create a map for easy course lookup
const courseMap = new Map(allCourseData.map(course => [course.code, course.name]));

export default function OptimalPathGenerator() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateOptimalGraduationPathsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      completedCourses: completedCourses.map(c => c.code).join(', '),
      remainingRequirements: ['CS240', 'CS300', 'MATH202'],
      desiredGraduationTimeline: 'Spring 2026',
      studentProfile: 'Student interested in AI and machine learning, with strong programming skills.',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const response = await generatePathAction({
        completedCourses: values.completedCourses.split(',').map(s => s.trim()),
        remainingRequirements: values.remainingRequirements,
        desiredGraduationTimeline: values.desiredGraduationTimeline,
        studentProfile: values.studentProfile,
      });
      if (response) {
        setResult(response);
      } else {
        throw new Error('No response from AI');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error Generating Path",
        description: "Could not generate the optimal path. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Generate Optimal Path</CardTitle>
          <CardDescription>
            Let AI craft the most efficient path to your graduation. Fill in your details below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                 <div className="bg-muted px-6 py-2">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1" className="border-b-0">
                        <AccordionTrigger className="hover:no-underline p-0 font-semibold text-foreground">
                          Completed Courses
                        </AccordionTrigger>
                        <AccordionContent className="bg-card p-4 rounded-md mt-2">
                          <div className="space-y-2 pt-2">
                            {completedCourses.map(course => (
                                <div key={course.code} className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="text-sm text-muted-foreground">{course.name} ({course.code})</span>
                                </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                </div>
                
                <div className="space-y-4">
                    <div className="bg-muted px-6 py-3">
                      <div className="flex items-center justify-between">
                         <FormLabel className="font-semibold text-foreground">Remaining Requirements</FormLabel>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Select the courses you still need to complete.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                    </div>
                    <div className="px-6">
                        <FormField
                        control={form.control}
                        name="remainingRequirements"
                        render={({ field }) => (
                            <FormItem>
                            <div className="space-y-4">
                                {pendingCourses.map((course) => (
                                <FormField
                                    key={course.code}
                                    control={form.control}
                                    name="remainingRequirements"
                                    render={({ field }) => {
                                    return (
                                        <FormItem
                                        key={course.code}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                        <FormControl>
                                            <Checkbox
                                            checked={field.value?.includes(course.code)}
                                            onCheckedChange={(checked) => {
                                                return checked
                                                ? field.onChange([...field.value, course.code])
                                                : field.onChange(
                                                    field.value?.filter(
                                                        (value) => value !== course.code
                                                    )
                                                    );
                                            }}
                                            />
                                        </FormControl>
                                        <FormLabel className="font-normal leading-relaxed">
                                            {course.name} ({course.code})
                                        </FormLabel>
                                        </FormItem>
                                    );
                                    }}
                                />
                                ))}
                            </div>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                </div>

                <FormField
                  control={form.control}
                  name="desiredGraduationTimeline"
                  render={({ field }) => (
                    <FormItem>
                      <div className="bg-muted px-6 py-3">
                        <FormLabel className="font-semibold text-foreground">Desired Graduation Timeline</FormLabel>
                      </div>
                      <div className="px-6 pt-4">
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a semester" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {timelineOptions.map(option => (
                                    <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="studentProfile"
                  render={({ field }) => (
                    <FormItem>
                        <div className="bg-muted px-6 py-3">
                          <FormLabel className="font-semibold text-foreground">Student Profile (Optional)</FormLabel>
                        </div>
                        <div className="px-6 pt-4">
                          <FormControl>
                            <Textarea placeholder="Tell us about your interests, strengths, etc." className="resize-none" {...field} />
                          </FormControl>
                          <FormDescription>
                              Provide a brief summary of your academic interests, strengths, or career goals to get better elective recommendations.
                          </FormDescription>
                        </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="px-6 pb-6">
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                  Generate Path
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
              <Bot className="mx-auto h-12 w-12 animate-pulse" />
              <p className="mt-4 font-semibold">AI is thinking...</p>
              <p className="text-sm">Crafting your personalized graduation plan.</p>
            </div>
          </Card>
        )}
        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Sparkles className="text-primary" /> AI-Generated Results</CardTitle>
              <CardDescription>Estimated Graduation: <span className="font-bold text-primary">{result.estimatedGraduationTime}</span></CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="flex items-center gap-2 font-semibold text-lg mb-4"><BookOpen className="h-5 w-5" />Optimal Graduation Path</h3>
                <div className="space-y-4">
                  {result.optimalPath.map((courseCode, index) => {
                    const courseName = courseMap.get(courseCode);
                    return (
                     <div key={index} className="flex items-start rounded-lg bg-secondary p-4">
                       <span className="font-mono text-sm bg-primary/10 text-primary font-semibold rounded-md px-2.5 py-1 mr-4">{index + 1}</span>
                       <div className="flex-1">
                        <p className="font-medium">{courseName ? `${courseName} (${courseCode})` : courseCode}</p>
                       </div>
                     </div>
                    );
                  })}
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="flex items-center gap-2 font-semibold text-lg mb-4"><Lightbulb className="h-5 w-5" />Elective Recommendations</h3>
                 <p className="text-sm text-muted-foreground mb-4">Based on your profile, here are some electives you might enjoy:</p>
                 <div className="space-y-4">
                  {result.electiveRecommendations.map((elective, index) => (
                    <div key={index} className="p-4 rounded-lg border bg-card hover:bg-secondary/80 transition-colors">
                      <p className="font-medium text-primary">{elective.name} ({elective.code})</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
             <CardFooter>
                <p className="text-xs text-muted-foreground">This is an AI-generated recommendation. Always consult with your academic advisor.</p>
            </CardFooter>
          </Card>
        )}
        {!loading && !result && (
            <Card className="flex h-full min-h-[500px] items-center justify-center border-dashed">
                <div className="text-center text-muted-foreground">
                    <Bot className="mx-auto h-12 w-12" />
                    <p className="mt-4 font-semibold">Your path awaits</p>
                    <p className="text-sm">Fill out the form to see your optimal path to graduation.</p>
                </div>
            </Card>
        )}
      </div>
    </div>
  );
}
