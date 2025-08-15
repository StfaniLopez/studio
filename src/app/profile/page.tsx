"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';

export default function ProfilePage() {
  const { user, loading, updateUserProfile } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Protect the route
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setPhotoURL(user.photoURL || '');
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Only update if there are changes
      if (displayName !== user?.displayName || photoURL !== user?.photoURL) {
        await updateUserProfile(displayName, photoURL);
        setSuccess('Profile updated successfully!');
        setIsEditing(false); // Exit editing mode on success
      } else {
        setSuccess('No changes detected.');
        setIsEditing(false); // Exit editing mode if no changes
      }
    } catch (err: any) {
      setError(`Failed to update profile: ${err.message}`);
    }
  };

  // Optional: Add logic here to handle photo file upload and get a URL
  // This requires Firebase Storage setup and integration.
  // For simplicity, this example only updates the photoURL string directly.
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload here if using Firebase Storage
    // For now, let's assume you're pasting a URL for simplicity
    // const file = e.target.files?.[0];
    // if (file) {
    //   // Upload file to Firebase Storage and get URL
    //   // Then setPhotoURL(downloadURL);
    // }
    // Example: setting URL from input (if you add a text input for photo URL)
    // setPhotoURL(e.target.value);
    setError('Photo upload functionality is not fully implemented in this example.');
  };

  if (loading || !user) {
    return <div>Loading profile...</div>; // Or a loading spinner
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">User Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              {user.photoURL ? (
                <AvatarImage src={user.photoURL} alt={user.displayName || 'User Avatar'} />
              ) : (
                <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                  {user.displayName ? user.displayName.charAt(0) : '?'}
                </AvatarFallback>
              )}
            </Avatar>
            {!isEditing ? (
              <>
                <div className="text-center">
                  <p className="text-xl font-semibold text-foreground">{user.displayName || 'No Name Set'}</p>
                  <p className="text-muted-foreground">{user.email}</p>
                  {user.metadata?.creationTime && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Joined: {format(new Date(user.metadata.creationTime), 'PPP')}
                    </p>
                  )}
                  {/* Add Academic Progress display here if applicable */}
                  {/* <p className="text-muted-foreground mt-2">Academic Progress: XX%</p> */}
                </div>
                <Button onClick={() => setIsEditing(true)} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Edit Profile
                </Button>
              </>
            ) : (
              <form onSubmit={handleUpdateProfile} className="grid gap-4 w-full">
                 <div className="grid gap-2">
                  <Label htmlFor="name" className="text-foreground">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="input-field" // Apply global input styles
                  />
                </div>
                {/* Optional: Input for Photo URL or File Upload */}
                {/*
                <div className="grid gap-2">
                  <Label htmlFor="photo" className="text-foreground">Photo URL</Label>
                   <Input
                    id="photo"
                    type="text"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="input-field"
                  />
                   </div>
                 */}

                {error && <p className="text-destructive text-sm">{error}</p>}
                {success && <p className="text-green-600 text-sm">{success}</p>}

                <div className="flex gap-2">
                   <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1">
                    Save Changes
                  </Button>
                   <Button type="button" variant="secondary" onClick={() => { setIsEditing(false); setError(''); setSuccess(''); setDisplayName(user?.displayName || ''); setPhotoURL(user?.photoURL || ''); }} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}