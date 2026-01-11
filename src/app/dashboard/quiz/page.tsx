'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Lightbulb, Rocket, Sparkles } from 'lucide-react';
import { quizData } from '@/lib/quiz-data';

const formSchema = z.object({
  aptitude: z.record(z.string()),
  interests: z.array(z.string()).min(1, 'Please select at least one interest.'),
  goals: z.string().min(10, 'Please describe your goals in at least 10 characters.'),
});

type FormData = z.infer<typeof formSchema>;

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aptitude: {},
      interests: [],
      goals: '',
    },
  });

  const totalSteps = quizData.length + 2; // aptitude sections + interests + goals

  const handleNext = async () => {
    let isValid = true;
    if (step < quizData.length) {
      // Validate current aptitude section
      const section = quizData[step];
      isValid = await form.trigger(section.questions.map(q => `aptitude.${q.id}`) as any);
    } else if (step === quizData.length) {
      // Validate interests
      isValid = await form.trigger('interests');
    }

    if (isValid) {
      setStep(prev => prev + 1);
      setProgress(((step + 1) / totalSteps) * 100);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    setProgress(((step - 1) / totalSteps) * 100);
  };

  function onSubmit(data: FormData) {
    console.log(data);
    // Here you would typically save the data and then navigate
    // to the roadmap page. We'll pass the data via query params for this example.
    const queryString = new URLSearchParams({
      ...data.aptitude,
      interests: data.interests.join(','),
      goals: data.goals,
    }).toString();

    router.push(`/dashboard/roadmap?${queryString}`);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="font-headline text-2xl">Discover Your Path</CardTitle>
            {step > 0 && <Button variant="ghost" size="sm" onClick={handleBack}><ArrowLeft className="mr-2 size-4"/> Back</Button>}
        </div>
        <CardDescription>This short quiz will help us understand your strengths and aspirations.</CardDescription>
        <Progress value={progress} className="mt-4" />
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="min-h-[400px]">
            {/* Aptitude Questions */}
            {step < quizData.length && (
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-headline text-xl"><Lightbulb className="text-primary"/> {quizData[step].section}</h3>
                <div className="space-y-6">
                  {quizData[step].questions.map(q => (
                    <FormField
                      key={q.id}
                      control={form.control}
                      name={`aptitude.${q.id}` as any}
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>{q.question}</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              {q.options.map(option => (
                                <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value={option} />
                                  </FormControl>
                                  <FormLabel className="font-normal">{option}</FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Interests Section */}
            {step === quizData.length && (
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-headline text-xl"><Sparkles className="text-primary"/> Your Interests</h3>
                <p className="mb-4 text-muted-foreground">Select all that apply.</p>
                <FormField
                  control={form.control}
                  name="interests"
                  render={() => (
                    <FormItem>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {['Technology', 'Healthcare', 'Arts & Design', 'Business', 'Science & Research', 'Writing', 'Building/Fixing Things', 'Helping Others'].map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name="interests"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), item])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Goals Section */}
            {step === quizData.length + 1 && (
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-headline text-xl"><Rocket className="text-primary"/> Your Goals</h3>
                <p className="mb-4 text-muted-foreground">Briefly describe your career aspirations and what you hope to achieve.</p>
                <FormField
                  control={form.control}
                  name="goals"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., I want to work in a creative field, solve complex problems, and have a good work-life balance..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </CardContent>
          <CardFooter>
            {step < totalSteps - 1 && (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            )}
            {step === totalSteps - 1 && (
              <Button type="submit">
                Get My Recommendations
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
