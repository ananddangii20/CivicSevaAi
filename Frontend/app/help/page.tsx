"use client";

import React from "react"

import { useState } from "react";
import { CivicLayout } from "@/components/civic/civic-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FileText,
  Shield,
  AlertCircle,
  Scale,
  Phone,
  Mail,
  MessageSquare,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Headphones,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Guide {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  steps: {
    title: string;
    description: string;
  }[];
}

const guides: Guide[] = [
  {
    id: "file-complaint",
    title: "How to File a Civic Complaint",
    description:
      "Learn the step-by-step process to report civic issues effectively",
    icon: FileText,
    steps: [
      {
        title: "Select the Problem Type",
        description:
          "Choose from categories like Water, Roads, Electricity, Sanitation, etc. This helps route your complaint to the right department.",
      },
      {
        title: "Describe the Issue",
        description:
          "Provide a clear description of the problem. Include details like when it started, how severe it is, and how many people are affected.",
      },
      {
        title: "Add Photos (Recommended)",
        description:
          "Upload photos or videos of the issue. Visual evidence helps authorities understand and prioritize your complaint.",
      },
      {
        title: "Provide Location",
        description:
          "Enter the exact location or landmark. You can also use auto-detect to share your current location.",
      },
      {
        title: "Review and Submit",
        description:
          "Check all details before submitting. You'll receive a Complaint ID to track the status.",
      },
    ],
  },
  {
    id: "rti",
    title: "How to File an RTI Application",
    description:
      "Right to Information - Access information from public authorities",
    icon: Shield,
    steps: [
      {
        title: "Identify the Department",
        description:
          "Determine which government department or public authority holds the information you need.",
      },
      {
        title: "Draft Your Application",
        description:
          "Write a clear request specifying exactly what information you need. Be specific with dates, names, and details.",
      },
      {
        title: "Pay the Fee",
        description:
          "Pay Rs. 10 for Central Government RTIs or as per state rules. BPL card holders are exempt.",
      },
      {
        title: "Submit the Application",
        description:
          "Submit online at rtionline.gov.in or by post/in-person to the PIO (Public Information Officer) of the department.",
      },
      {
        title: "Track and Appeal",
        description:
          "Response must be given within 30 days. If unsatisfied, you can file an appeal with the First Appellate Authority.",
      },
    ],
  },
  {
    id: "citizen-rights",
    title: "Know Your Citizen Rights",
    description: "Understanding your fundamental rights as a citizen",
    icon: Scale,
    steps: [
      {
        title: "Right to Information",
        description:
          "Every citizen has the right to access information from government bodies under the RTI Act, 2005.",
      },
      {
        title: "Right to Basic Services",
        description:
          "Citizens have the right to essential services like water, electricity, roads, and sanitation from local bodies.",
      },
      {
        title: "Right to Grievance Redressal",
        description:
          "Every government department must have a grievance redressal mechanism. Complaints must be addressed within specified timelines.",
      },
      {
        title: "Right to Public Hearing",
        description:
          "Citizens can participate in Gram Sabhas, Ward meetings, and public hearings on development projects.",
      },
      {
        title: "Right to Service Delivery",
        description:
          "Many states have Right to Service Acts ensuring time-bound delivery of government services.",
      },
    ],
  },
  {
    id: "complaint-ignored",
    title: "What to Do If Complaint is Ignored",
    description: "Escalation steps when your complaint is not addressed",
    icon: AlertCircle,
    steps: [
      {
        title: "Wait for Standard Time",
        description:
          "Most departments have 15-30 days to respond. Check the specific timeline for your complaint type.",
      },
      {
        title: "Send a Reminder",
        description:
          "Send a written reminder referencing your Complaint ID. Keep a copy for your records.",
      },
      {
        title: "Escalate to Higher Authority",
        description:
          "If no response, escalate to the department head or District Collector's office.",
      },
      {
        title: "File RTI for Status",
        description:
          "File an RTI asking for the status of your complaint and reasons for delay.",
      },
      {
        title: "Approach Lokayukta/Ombudsman",
        description:
          "As a last resort, approach the Lokayukta or state ombudsman for grievance redressal.",
      },
    ],
  },
];

const faqs = [
  {
    question: "How long does it take to resolve a complaint?",
    answer:
      "Resolution time varies by issue type. Simple issues may be resolved in 3-7 days, while complex ones can take 15-30 days. You can track progress through the My Complaints section.",
  },
  {
    question: "Can I file a complaint anonymously?",
    answer:
      "While you can report issues, providing contact details helps authorities update you on progress. Your personal information is kept confidential as per privacy policy.",
  },
  {
    question: "What if I don't have supporting documents?",
    answer:
      "While documents and photos strengthen your complaint, they are not mandatory. Describe the issue as clearly as possible.",
  },
  {
    question: "How do I check eligibility for government schemes?",
    answer:
      "Use our Schemes Finder feature. Answer simple questions about your age, occupation, and income to find schemes you may qualify for.",
  },
  {
    question: "Can I file multiple complaints at once?",
    answer:
      "Yes, you can file separate complaints for different issues. Each complaint gets a unique ID for tracking.",
  },
  {
    question: "Is this service available in my language?",
    answer:
      "Currently we support English and Hindi. More regional languages will be added soon. You can switch languages from the header.",
  },
];

export default function HelpPage() {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  return (
    <CivicLayout>
      <div className="mx-auto max-w-4xl px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Help & Guides
          </h1>
          <p className="mt-1 text-muted-foreground">
            Learn how to use civic services and know your rights
          </p>
        </div>

        {selectedGuide ? (
          /* Guide Detail View */
          <div>
            <Button
              variant="ghost"
              className="mb-4 gap-2"
              onClick={() => setSelectedGuide(null)}
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
              Back to Guides
            </Button>

            <Card>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
                    <selectedGuide.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      {selectedGuide.title}
                    </h2>
                    <p className="text-muted-foreground">
                      {selectedGuide.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {selectedGuide.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                          {idx + 1}
                        </div>
                        {idx < selectedGuide.steps.length - 1 && (
                          <div className="h-full w-0.5 bg-border" />
                        )}
                      </div>
                      <div className="pb-6">
                        <h3 className="font-semibold text-foreground">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            {/* Guides Grid */}
            <section className="mb-8">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                <BookOpen className="h-5 w-5 text-primary" />
                Step-by-Step Guides
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {guides.map((guide) => (
                  <Card
                    key={guide.id}
                    className="cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5"
                    onClick={() => setSelectedGuide(guide)}
                  >
                    <CardContent className="flex items-start gap-4 p-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <guide.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-card-foreground">
                          {guide.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {guide.description}
                        </p>
                        <span className="mt-2 inline-flex items-center text-sm font-medium text-primary">
                          Read Guide
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section className="mb-8">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                <HelpCircle className="h-5 w-5 text-primary" />
                Frequently Asked Questions
              </h2>
              <Card>
                <CardContent className="p-4">
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, idx) => (
                      <AccordionItem key={idx} value={`faq-${idx}`}>
                        <AccordionTrigger className="text-left text-base">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </section>

            {/* Contact Support */}
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                <Headphones className="h-5 w-5 text-primary" />
                Need More Help?
              </h2>
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <p className="mb-4 text-muted-foreground">
                    Our support team is here to help you with any questions or
                    issues.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Button variant="outline" className="h-auto gap-3 p-4 bg-transparent" asChild>
                      <Link href="tel:1800-xxx-xxxx">
                        <Phone className="h-5 w-5 text-primary" />
                        <div className="text-left">
                          <span className="block text-sm font-medium">
                            Helpline
                          </span>
                          <span className="text-xs text-muted-foreground">
                            1800-XXX-XXXX
                          </span>
                        </div>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-auto gap-3 p-4 bg-transparent" asChild>
                      <Link href="mailto:support@civicseva.ai">
                        <Mail className="h-5 w-5 text-primary" />
                        <div className="text-left">
                          <span className="block text-sm font-medium">
                            Email
                          </span>
                          <span className="text-xs text-muted-foreground">
                            support@civicseva.ai
                          </span>
                        </div>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-auto gap-3 p-4 bg-transparent" asChild>
                      <Link href="/chat">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        <div className="text-left">
                          <span className="block text-sm font-medium">
                            Live Chat
                          </span>
                          <span className="text-xs text-muted-foreground">
                            24/7 Available
                          </span>
                        </div>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>
          </>
        )}
      </div>
    </CivicLayout>
  );
}
