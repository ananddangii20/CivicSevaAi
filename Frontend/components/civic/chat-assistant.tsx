"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Send, Mic, Shield, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage?: "en" | "hi";
}

export function ChatAssistant({
  isOpen,
  onClose,
  currentLanguage = "en",
}: ChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const content = {
    en: {
      title: "CivicSeva Assistant",
      subtitle: "How can I help you today?",
      placeholder: "Type your message...",
      send: "Send",
      voice: "Voice input",
      greeting:
        "Hello! I'm your civic assistant. I can help you report issues, find government schemes, or answer questions about public services. What would you like to do?",
      quickReplies: [
        "Report a Problem",
        "Find Schemes",
        "Track Complaint",
        "Get Help",
      ],
      waterResponse:
        "I understand you're facing a water-related issue. Let me help you report this. Can you tell me more about the problem? For example: no water supply, dirty water, leaking pipe, or water logging?",
      roadResponse:
        "I can help you report a road issue. Please describe the problem: potholes, damaged road, waterlogging, or traffic signal issue?",
      genericResponse:
        "Thank you for your message. I'll help you with that. Could you provide more details so I can assist you better?",
    },
    hi: {
      title: "जनसेवा AI सहायक",
      subtitle: "मैं आज आपकी कैसे मदद कर सकता हूं?",
      placeholder: "अपना संदेश टाइप करें...",
      send: "भेजें",
      voice: "आवाज़ इनपुट",
      greeting:
        "नमस्ते! मैं आपका नागरिक सहायक हूं। मैं समस्याओं की रिपोर्ट करने, सरकारी योजनाएं खोजने, या सार्वजनिक सेवाओं के बारे में प्रश्नों का उत्तर देने में आपकी मदद कर सकता हूं। आप क्या करना चाहेंगे?",
      quickReplies: ["समस्या रिपोर्ट करें", "योजनाएं खोजें", "शिकायत ट्रैक करें", "मदद लें"],
      waterResponse:
        "मैं समझता हूं कि आप पानी से संबंधित समस्या का सामना कर रहे हैं। मैं इसकी रिपोर्ट करने में आपकी मदद करता हूं।",
      roadResponse:
        "मैं सड़क की समस्या की रिपोर्ट करने में आपकी मदद कर सकता हूं। कृपया समस्या बताएं।",
      genericResponse:
        "आपके संदेश के लिए धन्यवाद। मैं इसमें आपकी मदद करूंगा। कृपया अधिक जानकारी दें।",
    },
  };

  const t = content[currentLanguage];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add initial greeting
      setMessages([
        {
          id: "greeting",
          content: t.greeting,
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length, t.greeting]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response = t.genericResponse;

      if (
        lowerInput.includes("water") ||
        lowerInput.includes("पानी") ||
        lowerInput.includes("jal")
      ) {
        response = t.waterResponse;
      } else if (
        lowerInput.includes("road") ||
        lowerInput.includes("सड़क") ||
        lowerInput.includes("pothole")
      ) {
        response = t.roadResponse;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
    setTimeout(() => handleSend(), 100);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input simulation
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setInput(currentLanguage === "en" ? "I have a water problem" : "मुझे पानी की समस्या है");
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-20 right-4 z-50 flex h-[500px] w-[calc(100vw-32px)] max-w-md flex-col overflow-hidden shadow-2xl md:bottom-24 md:right-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-primary p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-primary-foreground">{t.title}</h3>
            <p className="text-xs text-primary-foreground/80">{t.subtitle}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-primary-foreground hover:bg-primary-foreground/20"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  message.role === "user"
                    ? "bg-secondary"
                    : "bg-primary"
                )}
              >
                {message.role === "user" ? (
                  <User className="h-4 w-4 text-secondary-foreground" />
                ) : (
                  <Shield className="h-4 w-4 text-primary-foreground" />
                )}
              </div>
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                )}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-secondary px-4 py-3">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Typing...</span>
              </div>
            </div>
          )}

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {t.quickReplies.map((reply) => (
                <Button
                  key={reply}
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs bg-transparent"
                  onClick={() => handleQuickReply(reply)}
                >
                  {reply}
                </Button>
              ))}
            </div>
          )}

          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "shrink-0 rounded-full",
              isListening && "bg-destructive text-destructive-foreground animate-pulse"
            )}
            onClick={handleVoiceInput}
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.placeholder}
            className="rounded-full"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button
            size="icon"
            className="shrink-0 rounded-full"
            onClick={handleSend}
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
