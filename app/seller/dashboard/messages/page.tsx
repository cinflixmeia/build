"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// Cleaned unused UI imports after aligning layout
import { 
  Search, 
  Send, 
  MoreHorizontal,
  MessageSquare,
  Plus,
  DollarSign,
  Paperclip,
  Image,
  FileText,
  X,
  Check,
  CheckCheck,
  Smile,
  Filter,
  Star,
  
  Download
} from "lucide-react"

// Enhanced conversations data with offers
const conversations = [
  {
    id: "1",
    buyer: "Netflix",
    lastMessage: "We're very interested in your Apollo 11 documentary. Can we discuss licensing terms?",
    timestamp: "2 hours ago",
    unread: 2,
    avatar: "N",
    status: "online",
    hasActiveOffer: true,
    offerStatus: "pending"
  },
  {
    id: "2",
    buyer: "Amazon Prime",
    lastMessage: "Thank you for the counter offer. We'll review and get back to you.",
    timestamp: "1 day ago",
    unread: 0,
    avatar: "A",
    status: "offline",
    hasActiveOffer: true,
    offerStatus: "countered"
  },
  {
    id: "3",
    buyer: "Hulu",
    lastMessage: "The Beyonce & Jay-Z documentary looks perfect for our platform.",
    timestamp: "3 days ago",
    unread: 1,
    avatar: "H",
    status: "online",
    hasActiveOffer: false,
    offerStatus: null
  },
  {
    id: "4",
    buyer: "Disney+",
    lastMessage: "We've reviewed your content and would like to proceed with the deal.",
    timestamp: "1 week ago",
    unread: 0,
    avatar: "D",
    status: "offline",
    hasActiveOffer: true,
    offerStatus: "accepted"
  },
  {
    id: "5",
    buyer: "HBO Max",
    lastMessage: "Unfortunately, we'll have to pass on this opportunity.",
    timestamp: "2 weeks ago",
    unread: 0,
    avatar: "H",
    status: "offline",
    hasActiveOffer: true,
    offerStatus: "rejected"
  }
]

// Enhanced messages with reactions and attachments
const initialMessages = [
  {
    id: "1",
    sender: "Netflix",
    message: "Hi! We're very interested in your Apollo 11 documentary. Can we discuss licensing terms?",
    timestamp: "2 hours ago",
    isBuyer: true,
    reactions: [],
    attachments: [] as { name: string; type: string; size: number }[]
  },
  {
    id: "2",
    sender: "You",
    message: "Hello! Thank you for your interest. I'd be happy to discuss licensing terms. What specific rights are you looking for?",
    timestamp: "1 hour ago",
    isBuyer: false,
    reactions: [{ type: "👍", count: 1 }],
    attachments: [] as { name: string; type: string; size: number }[]
  },
  {
    id: "3",
    sender: "Netflix",
    message: "We're looking for exclusive streaming rights for North America for 2 years. What's your asking price?",
    timestamp: "30 minutes ago",
    isBuyer: true,
    reactions: [],
    attachments: [] as { name: string; type: string; size: number }[]
  },
  {
    id: "4",
    sender: "You",
    message: "For exclusive North American rights for 2 years, I'm asking $1,200. This includes all streaming platforms under the Netflix umbrella.",
    timestamp: "15 minutes ago",
    isBuyer: false,
    reactions: [],
    attachments: [] as { name: string; type: string; size: number }[]
  }
]

// Removed unused offerCards after simplifying layout

const statusColors = {
  pending: "bg-yellow-500",
  accepted: "bg-green-500",
  rejected: "bg-red-500",
  countered: "bg-blue-500"
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState("1")
  const [searchTerm, setSearchTerm] = useState("")
  const [newMessage, setNewMessage] = useState("")
  // Removed unused modals/panels for consistency with buyer UI
  const [filterStatus, setFilterStatus] = useState("all")
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState(() => {
    if (typeof window === 'undefined') return initialMessages
    try {
      const stored = localStorage.getItem('seller_messages')
      return stored ? JSON.parse(stored) : initialMessages
    } catch {
      return initialMessages
    }
  })
  const [attachments, setAttachments] = useState<File[]>([])
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false)
  const [flags, setFlags] = useState<{ enable_messages?: boolean } | null>(null)

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

  // Removed offer form state from messages page (handled elsewhere)

  const filteredConversations = useMemo(() => {
    return conversations.filter(conversation => {
      const matchesSearch = conversation.buyer.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === "all" || 
        (filterStatus === "with-offers" && conversation.hasActiveOffer) ||
        (filterStatus === "pending" && conversation.offerStatus === "pending")
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, filterStatus])

  const currentConversation = conversations.find(c => c.id === selectedConversation)

  useEffect(() => {
    try { localStorage.setItem('seller_messages', JSON.stringify(messages)) } catch {}
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() || attachments.length > 0) {
      const newMsg = {
        id: Date.now().toString(),
        sender: "You",
        message: newMessage,
        timestamp: "Just now",
        isBuyer: false,
        reactions: [],
        attachments: attachments.map(file => ({
          name: file.name,
          type: file.type,
          size: file.size
        }))
      }
      
      setMessages((prev: any[]) => [...prev, newMsg])
      setNewMessage("")
      setAttachments([])
    }
  }

  // Removed create offer handler

  const handleReaction = (messageId: string, reaction: string) => {
    setMessages((prev: Array<any>) => prev.map((msg: any) => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions.find((r: any) => r.type === reaction)
        if (existingReaction) {
          return {
            ...msg,
            reactions: msg.reactions.map((r: any) => 
              r.type === reaction ? { ...r, count: r.count + 1 } : r
            )
          }
        } else {
          return {
            ...msg,
            reactions: [...msg.reactions, { type: reaction, count: 1 }]
          }
        }
      }
      return msg
    }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setAttachments(prev => [...prev, ...files])
    setShowAttachmentMenu(false)
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
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
          <p className="text-muted-foreground">Communicate with buyers and manage offers</p>
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
                  placeholder="Search buyers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-sm"
              >
                <option value="all">All</option>
                <option value="with-offers">With Offers</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 max-h-[500px] overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedConversation === conversation.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {conversation.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm truncate">{conversation.buyer}</h4>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs">4.8</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                        {conversation.unread > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {conversation.unread}
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
          {currentConversation ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {currentConversation.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{currentConversation.buyer}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span>{currentConversation?.offerStatus === 'accepted' ? '5.0' : '4.8'}</span>
                        </div>
                        <span>•</span>
                        <span>{currentConversation?.hasActiveOffer ? 'Active deal' : 'No active deal'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" aria-label="More options">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message: any) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isBuyer ? "justify-start" : "justify-end"}`}
                    >
                      <div className={`max-w-[70%] ${message.isBuyer ? "order-2" : "order-1"}`}>
                        <div className={`p-3 rounded-lg ${
                          message.isBuyer 
                            ? "bg-muted" 
                            : "bg-primary text-primary-foreground"
                        }`}>
                          <p className="text-sm">{message.message}</p>
                          
                          {/* Attachments */}
                          {message.attachments.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {message.attachments.map((attachment: any, index: number) => (
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
                          {!message.isBuyer && (
                            <div className="flex items-center gap-1">
                              {message.reactions.length > 0 ? (
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
                  <input
                    id="seller-attachment-input"
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button variant="ghost" size="icon" aria-label="Attach files" onClick={() => document.getElementById('seller-attachment-input')?.click()} disabled={flags?.enable_messages === false}>
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
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
                <p className="text-muted-foreground">Choose a buyer to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
} 