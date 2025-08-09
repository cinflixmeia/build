"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Bell,
  Shield,
  CreditCard,
  Download,
  Upload,
  Trash2,
  Edit,
  Save,
  X,
  Camera,
  Settings,
  Lock,
  Eye,
  EyeOff,
  Film,
  DollarSign,
  FileText
} from "lucide-react"

export default function SellerSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [profileData, setProfileData] = useState({
    name: "Rahul Sharma",
    email: "rahul@sharmaproductions.com",
    phone: "+91 98765 43210",
    company: "Rahul Sharma Productions",
    website: "www.sharmaproductions.com",
    location: "Mumbai, India",
    bio: "Leading producer of reality TV and documentary content with a focus on food and travel shows. Specialized in creating engaging content for global audiences.",
    specializations: ["Reality TV", "Documentary", "Food", "Travel"]
  })

  const [preferences, setPreferences] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    privacy: {
      profileVisible: true,
      showContentHistory: true,
      allowMessages: true
    },
    content: {
      preferredGenres: ["Reality TV", "Documentary", "Food"],
      minBudget: 5000,
      preferredRegions: ["India", "Global"]
    }
  })

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Here you would typically save to backend
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    // Reset form data
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation */}
        <Card className="lg:col-span-1">
          <CardContent className="p-4">
            <nav className="space-y-2">
              {[
                { id: "profile", label: "Profile", icon: User },
                { id: "preferences", label: "Preferences", icon: Settings },
                { id: "notifications", label: "Notifications", icon: Bell },
                { id: "security", label: "Security", icon: Shield },
                { id: "billing", label: "Billing", icon: CreditCard },
                { id: "data", label: "Data & Privacy", icon: Lock }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Profile Settings</CardTitle>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" onClick={handleCancelEdit}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                      RS
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{profileData.name}</h3>
                    <p className="text-sm text-muted-foreground">{profileData.email}</p>
                    {isEditing && (
                      <Button variant="outline" size="sm" className="mt-2">
                        <Camera className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                    )}
                  </div>
                </div>

                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <Input
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Company</label>
                    <Input
                      value={profileData.company}
                      onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Website</label>
                    <Input
                      value={profileData.website}
                      onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <Input
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Bio</label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      disabled={!isEditing}
                      className="mt-1 w-full p-3 border border-border rounded-md bg-background resize-none"
                      rows={3}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Specializations</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profileData.specializations.map((spec, index) => (
                        <Badge key={index} variant="secondary">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "preferences" && (
            <Card>
              <CardHeader>
                <CardTitle>Content Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Content Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Reality TV", "Documentary", "Food", "Travel", "Drama", "Comedy", "Action", "Thriller"].map((genre) => (
                      <Badge
                        key={genre}
                        variant={preferences.content.preferredGenres.includes(genre) ? "default" : "outline"}
                        className="cursor-pointer"
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Minimum Budget</h4>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Min Budget:</span>
                    <Input
                      type="number"
                      value={preferences.content.minBudget}
                      onChange={(e) => setPreferences({
                        ...preferences,
                        content: {...preferences.content, minBudget: parseInt(e.target.value)}
                      })}
                      className="w-32"
                    />
                    <span className="text-sm text-muted-foreground">USD</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Target Regions</h4>
                  <div className="flex flex-wrap gap-2">
                    {["India", "Global", "North America", "Europe", "Asia Pacific"].map((region) => (
                      <Badge
                        key={region}
                        variant={preferences.content.preferredRegions.includes(region) ? "default" : "outline"}
                        className="cursor-pointer"
                      >
                        {region}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Button
                    variant={preferences.notifications.email ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreferences({
                      ...preferences,
                      notifications: {...preferences.notifications, email: !preferences.notifications.email}
                    })}
                  >
                    {preferences.notifications.email ? "Enabled" : "Disabled"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive push notifications</p>
                  </div>
                  <Button
                    variant={preferences.notifications.push ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreferences({
                      ...preferences,
                      notifications: {...preferences.notifications, push: !preferences.notifications.push}
                    })}
                  >
                    {preferences.notifications.push ? "Enabled" : "Disabled"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive SMS alerts</p>
                  </div>
                  <Button
                    variant={preferences.notifications.sms ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreferences({
                      ...preferences,
                      notifications: {...preferences.notifications, sms: !preferences.notifications.sms}
                    })}
                  >
                    {preferences.notifications.sms ? "Enabled" : "Disabled"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Change Password</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Current Password</label>
                      <div className="relative mt-1">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter current password"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">New Password</label>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Confirm New Password</label>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        className="mt-1"
                      />
                    </div>
                    <Button>Update Password</Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable 2FA
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "billing" && (
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Payment Methods</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5" />
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/25</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    <Button variant="outline">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Revenue History</h4>
                  <div className="space-y-2">
                    {[
                      { date: "2024-01-15", amount: "$12,000", description: "INDIA'S BIGGEST FOODIE" },
                      { date: "2024-01-10", amount: "$8,500", description: "VINA के वो सात दिन" },
                      { date: "2024-01-05", amount: "$15,000", description: "I-POP ICONS" }
                    ].map((revenue, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{revenue.description}</p>
                          <p className="text-sm text-muted-foreground">{revenue.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">{revenue.amount}</p>
                          <Button variant="ghost" size="sm">Download</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "data" && (
            <Card>
              <CardHeader>
                <CardTitle>Data & Privacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Privacy Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Profile Visibility</h5>
                        <p className="text-sm text-muted-foreground">Allow buyers to see your profile</p>
                      </div>
                      <Button
                        variant={preferences.privacy.profileVisible ? "default" : "outline"}
                        size="sm"
                      >
                        {preferences.privacy.profileVisible ? "Public" : "Private"}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Content History</h5>
                        <p className="text-sm text-muted-foreground">Show content history to buyers</p>
                      </div>
                      <Button
                        variant={preferences.privacy.showContentHistory ? "default" : "outline"}
                        size="sm"
                      >
                        {preferences.privacy.showContentHistory ? "Visible" : "Hidden"}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Allow Messages</h5>
                        <p className="text-sm text-muted-foreground">Allow buyers to message you</p>
                      </div>
                      <Button
                        variant={preferences.privacy.allowMessages ? "default" : "outline"}
                        size="sm"
                      >
                        {preferences.privacy.allowMessages ? "Enabled" : "Disabled"}
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Data Management</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Download My Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
} 