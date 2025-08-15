"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// You would need to implement your own theme context and logic
// For demonstration, we'll use a simple state and apply classes
type Theme = 'light' | 'dark';

export default function SettingsPage() {
  const { user, loading, updatePassword } = useAuth();
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const [emailNotifications, setEmailNotifications] = useState(true); // Placeholder for notification preference
  const [theme, setTheme] = useState<Theme>('light'); // Placeholder for theme

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Apply theme class to body (basic example)
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark' : '';
  }, [theme]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword !== confirmNewPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    if (newPassword.length < 6) { // Firebase default minimum password length
        setPasswordError('New password must be at least 6 characters long.');
        return;
    }

    try {
        // Note: Firebase `updatePassword` requires recent reauthentication.
        // A more robust implementation would handle reauthentication before allowing password change.
        // For simplicity here, we directly call updatePassword, which might fail if not recently authenticated.
        if (user) {
           await updatePassword(newPassword);
           setPasswordSuccess('Password updated successfully!');
           setCurrentPassword('');
           setNewPassword('');
           setConfirmNewPassword('');
        }
    } catch (error: any) {
        // Handle specific Firebase errors (e.g., auth/requires-recent-login)
        setPasswordError(`Error changing password: ${error.message}`);
    }
  };

  const handleNotificationToggle = (checked: boolean) => {
    setEmailNotifications(checked);
    // Implement logic to save notification preference to Firestore
    console.log('Email notifications toggled:', checked);
  };

  const handleThemeChange = (value: string) => {
    setTheme(value as Theme);
    // Implement logic to save theme preference to Firestore
    console.log('Theme changed to:', value);
  };

  if (loading || !user) {
    return <div>Loading settings...</div>; // Or a loading spinner
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center py-8 px-4">
      <div className="mx-auto grid w-full max-w-3xl gap-6">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>

        {/* Change Password Section */}
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your account password.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="grid gap-4">
               {/* Firebase updatePassword typically doesn't require the old password in the API call,
                   but you might ask for it in the UI for user experience/validation.
                   However, reauthentication is the standard secure way in Firebase.
                   Including current password field for UI, but logic relies on Firebase reauth context.
               */}
               {/*
               <div className="grid gap-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                  />
               </div>
                */}
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                <Input
                  id="confirm-new-password"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </div>
              {passwordError && <p className="text-destructive text-sm">{passwordError}</p>}
              {passwordSuccess && <p className="text-green-500 text-sm">{passwordSuccess}</p>}
              <Button type="submit">Update Password</Button>
            </form>
          </CardContent>
        </Card>

        {/* Notification Preferences Section */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Manage your email notification settings.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="email-notifications">Receive email notifications</Label>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={handleNotificationToggle}
              />
            </div>
            {/* Add more notification settings here if needed */}
          </CardContent>
        </Card>

        {/* Theme Preference Section */}
         <Card>
          <CardHeader>
            <CardTitle>Theme</CardTitle>
            <CardDescription>Select your preferred application theme.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
               <Label htmlFor="theme-select">Select Theme</Label>
                <Select value={theme} onValueChange={handleThemeChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
            </div>
          </CardContent>
        </Card>

        {/* Add other settings sections as needed */}

      </div>
    </div>
  );
}