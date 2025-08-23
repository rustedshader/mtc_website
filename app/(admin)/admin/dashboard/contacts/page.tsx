"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CheckCircle2, XCircle } from "lucide-react";

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  resolved: boolean;
  createdAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingContact, setUpdatingContact] = useState<number | null>(null);

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/admin/contacts");
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const markAsResolved = async (contactId: number, resolved: boolean) => {
    setUpdatingContact(contactId);
    try {
      const response = await fetch("/api/admin/contacts", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contactId, resolved }),
      });

      if (!response.ok) {
        throw new Error("Failed to update contact");
      }

      // Refresh contacts list
      await fetchContacts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update contact");
    } finally {
      setUpdatingContact(null);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-8">Error: {error}</div>;
  }

  const unresolvedContacts = contacts.filter((contact) => !contact.resolved);
  const resolvedContacts = contacts.filter((contact) => contact.resolved);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contact Submissions</h1>
        <div className="flex gap-2">
          <Badge variant="outline">
            {unresolvedContacts.length} Unresolved
          </Badge>
          <Badge variant="secondary">{resolvedContacts.length} Resolved</Badge>
        </div>
      </div>

      {/* Unresolved Contacts */}
      {unresolvedContacts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-orange-700">
            Unresolved Contacts
          </h2>
          <div className="grid gap-6">
            {unresolvedContacts.map((contact) => (
              <Card key={contact.id} className="border-orange-200">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{contact.subject}</span>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="text-orange-800 border-orange-300"
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Unresolved
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {format(new Date(contact.createdAt), "PPP")}
                      </span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>
                      <strong>From:</strong> {contact.name} ({contact.email})
                    </p>
                    <p className="whitespace-pre-wrap">{contact.message}</p>
                    <Button
                      onClick={() => markAsResolved(contact.id, true)}
                      disabled={updatingContact === contact.id}
                      className="w-full"
                    >
                      {updatingContact === contact.id
                        ? "Updating..."
                        : "Mark as Resolved"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Resolved Contacts */}
      {resolvedContacts.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-green-700">
            Resolved Contacts
          </h2>
          <div className="grid gap-6">
            {resolvedContacts.map((contact) => (
              <Card key={contact.id} className="border-green-200 opacity-75">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{contact.subject}</span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Resolved
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {format(new Date(contact.createdAt), "PPP")}
                      </span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>
                      <strong>From:</strong> {contact.name} ({contact.email})
                    </p>
                    <p className="whitespace-pre-wrap">{contact.message}</p>
                    <Button
                      variant="outline"
                      onClick={() => markAsResolved(contact.id, false)}
                      disabled={updatingContact === contact.id}
                      className="w-full"
                    >
                      {updatingContact === contact.id
                        ? "Updating..."
                        : "Mark as Unresolved"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {contacts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No contact submissions found.</p>
        </div>
      )}
    </div>
  );
}
