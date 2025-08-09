"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Search, 
  Filter, 
  Send,
  Paperclip,
  MoreHorizontal,
  Star,
  DollarSign,
  MessageSquare,
  Clock,
  Check,
  CheckCheck,
  Phone,
  Video,
  Smile,
  FileText,
  Image,
  X,
  Download,
  Eye
} from "lucide-react"

// Sample conversation data
const conversations = [
  {
    id: "1",
    seller: {
      name: "Rahul Sharma Productions",
      avatar: "R",
      rating: 4.9,
      totalContent: 15
    },
    lastMessage: "Thank you for your interest in INDIA'S BIGGEST FOODIE. I can offer you a 10% discount for exclusive rights.",
    lastMessageTime: "2 hours ago",
    unreadCount: 2,
    status: "active",
    lastActivity: "2024-01-15"
  },
  {
    id: "2",
    seller: {
      name: "Priya Patel Films",
      avatar: "P",
      rating: 4.7,
      totalContent: 8
    },
    lastMessage: "I've reviewed your offer for VINA के वो सात दिन. Let me get back to you by tomorrow.",
    lastMessageTime: "1 day ago",
    unreadCount: 0,
    status: "pending",
    lastActivity: "2024-01-14"
  },
  {
    id: "3",
    seller: {
      name: "Amit Kumar Studios",
      avatar: "A",
      rating: 4.8,
      totalContent: 12
    },
    lastMessage: "The licensing terms for I-POP ICONS have been updated. Please review the new contract.",
    lastMessageTime: "3 days ago",
    unreadCount: 1,
    status: "active",
    lastActivity: "2024-01-12"
  },
  {
    id: "4",
    seller: {
      name: "Neha Singh Productions",
      avatar: "N",
      rating: 4.5,
      totalContent: 6
    },
    lastMessage: "Your offer has been accepted! Please proceed with the payment to complete the transaction.",
    lastMessageTime: "1 week ago",
    unreadCount: 0,
    status: "completed",
    lastActivity: "2024-01-08"
  }
]

// Sample messages for selected conversation
const initialMessages = [
  {
    id: 1,
    sender: "Rahul Sharma Productions",
    message: "Hello! Thank you for your interest in INDIA'S BIGGEST FOODIE. I can offer you a 10% discount for exclusive rights.",
    timestamp: "2024-01-15 14:30",
    isRead: true,
    isSender: false,
    attachments: [] as { name: string; type: string; size: number }[]
  },
  {
    id: 2,
    sender: "You",
    message: "That sounds great! Can you send me the licensing terms and pricing details?",
    timestamp: "2024-01-15 15:00",
    isRead: true,
    isSender: true,
    attachments: [] as { name: string; type: string; size: number }[]
  },
  {
    id: 3,
    sender: "Rahul Sharma Productions",
    message: "Of course! I've attached the contract and pricing breakdown. Let me know if you have any questions.",
    timestamp: "2024-01-15 15:15",
    isRead: false,
    isSender: false,
    attachments: [
      { name: "licensing_contract.pdf", type: "pdf", size: 245760 },
      { name: "pricing_breakdown.xlsx", type: "excel", size: 51200 }
    ]
  },
  {
    id: 4,
    sender: "You",
    message: "Perfect! I'll review these documents and get back to you by tomorrow.",
    timestamp: "2024-01-15 15:30",
    isRead: true,
    isSender: true,
    attachments: [] as { name: string; type: string; size: number }[]
  }
]

export default function BuyerMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<any>(conversations[0])
  const [messages, setMessages] = useState(initialMessages)
  const [newConvos, setNewConvos] = useState<any[]>([])
  const [flags, setFlags] = useState<{ enable_messages?: boolean } | null>(null)
  useEffect(() => {
    try {
      const raw = localStorage.getItem('buyer_new_conversations')
      const arr = raw ? JSON.parse(raw) : []
      setNewConvos(arr)
      if (arr.length > 0) {
        // Prepend a synthetic conversation using the first new item
        const c = arr[arr.length - 1]
        const synthetic = {
          id: 'new-' + c.id,
          seller: { name: c.sellerName, avatar: c.sellerName?.[0] || 'S', rating: 4.7, totalContent: 0 },
          lastMessage: c.message,
          lastMessageTime: 'Just now',
          unreadCount: 1,
          status: 'active',
          lastActivity: c.createdAt
        }
        conversations.unshift(synthetic as any)
        setSelectedConversation(synthetic)
        // Clear queue after consuming latest
        localStorage.setItem('buyer_new_conversations', JSON.stringify([]))
      }
    } catch {}
  }, [])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  useEffect(() => {
    try {
      const raw = localStorage.getItem('admin_flags')
      if (raw) {
        const arr = JSON.parse(raw) as Array<{ key: string; enabled: boolean }>
        const obj: any = {}
        arr.forEach(f => { obj[f.key] = f.enabled })
        setFlags(obj)
      }
    } catch {}
  }, [])

  const filteredConversations = conversations.filter(conversation => {
    const matchesSearch = conversation.seller.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || conversation.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: messages.length + 1,
      sender: "You",
      message: newMessage,
      timestamp: new Date().toLocaleString(),
      isRead: false,
      isSender: true,
      attachments: [] as { name: string; type: string; size: number }[]
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Communicate with sellers and manage offers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <MessageSquare className="h-4 w-4 mr-2" />
            New Message
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 h-[70vh]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search sellers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-sm"
              >
                <option value="All">All</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 max-h-[500px] overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedConversation?.id === conversation.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {conversation.seller.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm truncate">{conversation.seller.name}</h4>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs">{conversation.seller.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">{conversation.lastMessageTime}</span>
                        {conversation.unreadCount > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 flex flex-col min-h-[50vh]">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {selectedConversation.seller.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedConversation.seller.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span>{selectedConversation.seller.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{selectedConversation.seller.totalContent} content</span>
                      </div>
                    </div>
                  </div>
                   <div className="flex items-center gap-2">
                     <Button variant="ghost" size="icon" aria-label="Start voice call">
                       <Phone className="h-4 w-4" />
                     </Button>
                     <Button variant="ghost" size="icon" aria-label="Start video call">
                       <Video className="h-4 w-4" />
                     </Button>
                     <Button variant="ghost" size="icon" aria-label="More options">
                       <MoreHorizontal className="h-4 w-4" />
                     </Button>
                   </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSender ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${message.isSender ? 'order-2' : 'order-1'}`}>
                        <div className={`p-3 rounded-lg ${
                          message.isSender 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}>
                          <p className="text-sm">{message.message}</p>
                          
                          {/* Attachments */}
                          {message.attachments.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {message.attachments.map((attachment, index) => (
                                <div key={index} className="flex items-center gap-2 p-2 bg-background/50 rounded">
                                  <FileText className="h-4 w-4" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs truncate">{attachment.name}</p>
                                    <p className="text-xs text-muted-foreground">{formatFileSize(attachment.size)}</p>
                                  </div>
                                  <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <Download className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                          {message.isSender && (
                            <div className="flex items-center gap-1">
                              {message.isRead ? (
                                <CheckCheck className="h-3 w-3 text-blue-500" />
                              ) : (
                                <Check className="h-3 w-3 text-muted-foreground" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Message Input */}
              <div className="p-3 sm:p-4 border-t sticky bottom-0 bg-background">
                 <div className="flex gap-2">
                   <input id="buyer-attachment-input" type="file" multiple className="hidden" onChange={() => {}} />
                   <Button variant="ghost" size="icon" aria-label="Attach files" onClick={() => document.getElementById('buyer-attachment-input')?.click()} disabled={flags?.enable_messages === false}>
                     <Paperclip className="h-4 w-4" />
                   </Button>
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                    disabled={flags?.enable_messages === false}
                  />
                   <Button onClick={handleSendMessage} aria-label="Send message" disabled={flags?.enable_messages === false}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                {flags?.enable_messages === false && (
                  <p className="text-xs text-muted-foreground mt-2">Messaging is disabled by admin</p>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">Choose a seller to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
} 