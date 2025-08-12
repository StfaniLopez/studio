"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bot, ChevronDown, Loader2, Send, Sparkles, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generatePathAction } from '@/lib/actions';
import type { GenerateOptimalGraduationPathsOutput } from '@/ai/flows/generate-optimal-graduation-paths';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { pendingCourses, completedCourses } from '@/lib/data';
import { cn } from '@/lib/utils';

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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
               <FormField
                control={form.control}
                name="completedCourses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Completed Courses</FormLabel>
                    <FormControl>
                       <div className="space-y-2 rounded-md border border-muted/50 p-3">
                        {completedCourses.map(course => (
                            <div key={course.code} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-sm text-muted-foreground">{course.name}</span>
                            </div>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="remainingRequirements"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Remaining Requirements</FormLabel>
                     <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button variant="outline" role="combobox" className={cn("w-full justify-between", !field.value?.length && "text-muted-foreground")}>
                                    {field.value?.length ? `${field.value.length} selected` : "Select courses"}
                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                           <Command>
                            <CommandInput placeholder="Search courses..." />
                            <CommandList>
                               <CommandEmpty>No course found.</CommandEmpty>
                               <CommandGroup>
                                    {pendingCourses.map((course) => (
                                        <CommandItem
                                            key={course.code}
                                            onSelect={() => {
                                                const selected = field.value || [];
                                                const newValue = selected.includes(course.code)
                                                    ? selected.filter((c) => c !== course.code)
                                                    : [...selected, course.code];
                                                field.onChange(newValue);
                                            }}
                                        >
                                            <Checkbox
                                                checked={field.value?.includes(course.code)}
                                                className="mr-2"
                                            />
                                            {course.name} ({course.code})
                                        </CommandItem>
                                    ))}
                               </CommandGroup>
                            </CommandList>
                           </Command>
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="desiredGraduationTimeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Graduation Timeline</FormLabel>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studentProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Profile (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us about your interests, strengths, etc." className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                Generate Path
              </Button>
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
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Optimal Graduation Path</h3>
                <p className="text-sm text-muted-foreground">Estimated Graduation: <span className="font-bold text-primary">{result.estimatedGraduationTime}</span></p>
                <div className="mt-4 grid gap-2">
                  {result.optimalPath.map((course, index) => (
                     <div key={index} className="flex items-center rounded-lg bg-secondary p-3">
                       <span className="font-mono text-sm bg-primary/10 text-primary font-semibold rounded-md px-2 py-1 mr-4">{index + 1}</span>
                       <span className="font-medium">{course}</span>
                     </div>
                  ))}
                </div>
              </div>
              <div className="border-t pt-6">
                <h3 className="font-semibold text-lg mb-2">Elective Recommendations</h3>
                <p className="text-sm text-muted-foreground mb-4">Based on your profile, here are some electives you might enjoy:</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {result.electiveRecommendations.map((elective, index) => (
                    <div key={index} className="p-3 rounded-md border bg-card hover:bg-secondary transition-colors">
                      <p className="font-medium">{elective}</p>
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
