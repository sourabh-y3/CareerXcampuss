'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getPersonalizedCourseRecommendations, PersonalizedCourseRecommendationsOutput } from '@/ai/flows/personalized-course-recommendations';
import { Rocket, Sparkles, AlertTriangle, GitMerge, GraduationCap, Briefcase } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function RoadmapSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
            <div className="space-y-4 pl-16">
                 <Skeleton className="h-10 w-full" />
                 <Skeleton className="h-10 w-full" />
                 <Skeleton className="h-10 w-full" />
            </div>
        </div>
    );
}

function RoadmapDisplay({ recommendations }: { recommendations: PersonalizedCourseRecommendationsOutput }) {
    const icons = [<GraduationCap />, <Briefcase />, <GitMerge />];
    
    return (
        <div className="space-y-8">
            <div>
                <h3 className="font-headline text-2xl">Your Recommended Courses</h3>
                <p className="text-muted-foreground">{recommendations.reasoning}</p>
            </div>
            
            <div className="relative pl-8">
                <div className="absolute left-0 top-0 h-full w-0.5 bg-primary/20" />
                {recommendations.recommendedCourses.map((course, index) => (
                    <div key={index} className="relative mb-8 flex items-start">
                        <div className="absolute left-[-16px] top-1 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            {icons[index % icons.length]}
                        </div>
                        <div className="ml-8 w-full">
                            <Card className="bg-background/80">
                                <CardHeader>
                                    <CardTitle className="font-headline">{course}</CardTitle>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function RoadmapContent() {
  const searchParams = useSearchParams();
  const [recommendations, setRecommendations] = useState<PersonalizedCourseRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasQuizData = searchParams.has('interests') && searchParams.has('goals');

  useEffect(() => {
    if (hasQuizData) {
      handleGetRecommendations();
    }
  }, [searchParams]);

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    const aptitudeScores: Record<string, number> = {};
    const interests = searchParams.get('interests')?.split(',') || [];
    const studentGoals = searchParams.get('goals') || '';

    searchParams.forEach((value, key) => {
      if (key !== 'interests' && key !== 'goals') {
        // A simple scoring mechanism for the example
        const scoreMap: { [key: string]: number } = {
            'Very Confident': 5, 'Somewhat Confident': 4, 'Neutral': 3, 'Not Confident': 2, 'I avoid it': 1,
            'Physics': 5, 'Chemistry': 5, 'Biology': 5, 'Computer Science': 5, 'None of them': 1,
            'Excellent': 5, 'Good': 4, 'Average': 3, 'Needs Improvement': 2, 'Weak': 1,
            'Almost always in a team': 5, 'Mostly in a team': 4, 'A balance of both': 3, 'Mostly independently': 2, 'Almost always independently': 1,
            'Follow a structured, logical approach': 5, 'Brainstorm creative, unconventional solutions': 5, 'Analyze data to find an answer': 5, 'Collaborate with others to find a solution': 4, 'Experiment and see what works': 3,
            'A busy, fast-paced office': 4, 'A quiet, focused lab or studio': 4, 'Outdoors or on the move': 4, 'A collaborative, open workspace': 4, 'Working from home': 3,
        };
        aptitudeScores[key] = scoreMap[value] || 0;
      }
    });

    try {
      const result = await getPersonalizedCourseRecommendations({
        aptitudeScores,
        interests,
        studentGoals,
      });
      setRecommendations(result);
    } catch (err) {
      setError('Failed to generate recommendations. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Your Personalized Career Roadmap</CardTitle>
        <CardDescription>Based on your quiz results, here is a potential path for your future.</CardDescription>
      </CardHeader>
      <CardContent className="min-h-[400px]">
        {isLoading && <RoadmapSkeleton />}
        {error && (
            <div className="flex flex-col items-center justify-center text-center text-destructive">
                <AlertTriangle className="size-12" />
                <p className="mt-4 font-semibold">{error}</p>
            </div>
        )}
        {recommendations && <RoadmapDisplay recommendations={recommendations} />}
        {!isLoading && !recommendations && !error && (
          <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Rocket className="size-8 text-primary" />
            </div>
            <h3 className="mt-6 font-headline text-xl font-semibold">Ready to discover your future?</h3>
            <p className="mt-2 max-w-sm text-muted-foreground">
              Complete the aptitude quiz to generate your personalized career roadmap, or click the button below if you've already finished.
            </p>
            <Button onClick={handleGetRecommendations} disabled={!hasQuizData} className="mt-6">
              <Sparkles className="mr-2 size-4" /> Generate My Roadmap
            </Button>
            {!hasQuizData && <p className="mt-2 text-xs text-muted-foreground">Please complete the quiz first.</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function RoadmapPage() {
    return (
        <Suspense fallback={<RoadmapSkeleton />}>
            <RoadmapContent />
        </Suspense>
    )
}
