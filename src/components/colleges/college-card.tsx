import Image from 'next/image';
import Link from 'next/link';
import type { College } from '@/lib/college-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, IndianRupee, Briefcase } from 'lucide-react';

export function CollegeCard({ college }: { college: College }) {
  return (
    <Card className="flex flex-col overflow-hidden transition-transform duration-200 hover:scale-[1.02] hover:shadow-xl">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Image
          src={college.logoUrl}
          alt={`${college.name} Logo`}
          width={60}
          height={60}
          className="rounded-lg border object-contain"
          data-ai-hint="university logo"
        />
        <div className="flex-grow">
          <CardTitle className="font-headline text-lg leading-tight">
            <Link href="#" className="hover:underline">
              {college.name}
            </Link>
          </CardTitle>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            <span>{college.location}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <Badge variant={college.type === 'Government' ? 'secondary' : 'outline'}>
          {college.type}
        </Badge>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <IndianRupee className="size-4 text-muted-foreground" />
            <span>
              Avg. Fees: <span className="font-semibold">₹{college.fees.toLocaleString()}/year</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="size-4 text-muted-foreground" />
            <span>
              Avg. Placement: <span className="font-semibold">₹{college.avgPlacement.toLocaleString()} LPA</span>
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" variant="outline" asChild>
          <Link href="#">View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
