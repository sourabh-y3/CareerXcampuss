'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const profileFormSchema = z.object({
  fullName: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  email: z.string().email(),
  phone: z.string().optional(),
  emailNotifications: z.boolean().default(false).optional(),
  smsNotifications: z.boolean().default(false).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  fullName: 'Alex Doe',
  email: 'alex.doe@example.com',
  emailNotifications: true,
  smsNotifications: false,
};

export default function ProfilePage() {
  const avatar = PlaceHolderImages.find(p => p.id === 'user-avatar-1') || {
    imageUrl: 'https://picsum.photos/seed/avatar1/100/100',
    imageHint: 'person portrait',
  };
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been saved.',
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Profile</CardTitle>
        <CardDescription>Manage your account settings and personal information.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={avatar.imageUrl} data-ai-hint={avatar.imageHint} />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <Button type="button" variant="outline">Change Photo</Button>
            </div>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} readOnly />
                  </FormControl>
                  <FormDescription>
                    Your email address is used for logging in and cannot be changed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+91 12345 67890" {...field} />
                  </FormControl>
                  <FormDescription>
                    Used for SMS notifications about deadlines.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <h3 className="mb-4 text-lg font-medium">Notifications</h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="emailNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Email notifications</FormLabel>
                        <FormDescription>
                          Receive emails about deadlines and recommendations.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="smsNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">SMS notifications</FormLabel>
                        <FormDescription>
                          Get text messages for important admission deadlines.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <Button type="submit">Update profile</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
