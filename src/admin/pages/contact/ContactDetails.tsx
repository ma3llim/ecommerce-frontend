import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContactApi } from "@/admin/api/Contact.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLoader from "@/components/common/PageLoader";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ContactDetails = () => {
    const navigate = useNavigate();
    const { contactId } = useParams<{ contactId: string }>();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["admin-contact", contactId],
        queryFn: () => ContactApi.getContactDetails(contactId!),
        enabled: Boolean(contactId),
    });

    const contact = data?.data;

    if (isLoading) {
        return <PageLoader />;
    }

    if (isError || !contact) {
        return (
            <div className="flex min-h-96 flex-col items-center justify-center text-center">
                <h1 className="text-2xl font-bold">Contact message not found</h1>
                <p className="mt-2 text-muted-foreground">We couldn't load this contact message.</p>

                <Button className="mt-5">
                    <Link to="/admin/contacts">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Contacts
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Contact Details</h1>

                <p className="mt-1 text-muted-foreground">View the contact message details.</p>
            </div>

            <Card>
                <CardContent className="space-y-5 pt-6">
                    <div className="space-y-2">
                        <Label>Name</Label>

                        <div className="rounded-md border bg-muted/30 px-3 py-2 text-sm">
                            {contact.firstName} {contact.lastName}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Email</Label>
                        <div className="rounded-md border bg-muted/30 px-3 py-2 text-sm">{contact.email}</div>
                    </div>

                    <div className="space-y-2">
                        <Label>Subject</Label>
                        <div className="rounded-md border bg-muted/30 px-3 py-2 text-sm">{contact.subject}</div>
                    </div>
                    <div className="space-y-2">
                        <Label>Message</Label>
                        <Textarea value={contact.message} readOnly className="min-h-40 resize-none" />
                    </div>
                    <div className="flex justify-end pt-2">
                        <Button type="button" variant="outline" onClick={() => navigate("/admin/contacts/contact-listing")}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Contacts
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ContactDetails;
