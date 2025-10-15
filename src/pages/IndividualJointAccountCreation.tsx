import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  User,
  Users,
  CreditCard,
  FileText,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Building2,
  IdCard,
  Shield,
} from "lucide-react";

// Form validation schema
const accountFormSchema = z.object({
  // Step 1: Member Info
  memberAccountName: z.string().trim().min(2, "Member account name is required").max(100),
  memberCategory: z.string().min(1, "Please select member category"),
  memberId: z.string().optional(), // Auto-generated
  receiptCode: z.string().optional(),
  
  // Step 2: Personal Details
  title: z.string().min(1, "Please select title"),
  gender: z.string().min(1, "Please select gender"),
  firstName: z.string().trim().min(2, "First name is required").max(50),
  middleName: z.string().trim().max(50).optional(),
  surname: z.string().trim().min(2, "Surname is required").max(50),
  shortName: z.string().trim().max(50).optional(),
  fullName: z.string().trim().max(100).optional(),
  preferredName: z.string().trim().max(50).optional(),
  alias: z.string().trim().max(50).optional(),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  country: z.string().min(1, "Please select country"),
  maritalStatus: z.string().min(1, "Please select marital status"),
  preferredLanguage: z.string().min(1, "Please select preferred language"),
  minor: z.string().default("No"),
  guardianId: z.string().optional(),
  guardianType: z.string().optional(),
  personWithDisability: z.string().default("No"),
  personWithDisabilityType: z.string().optional(),
  staffIndicator: z.string().default("No"),
  staffId: z.string().optional(),
  occupation: z.string().trim().max(100).optional(),
  otherOccupations: z.string().trim().max(200).optional(),
  resident: z.string().min(1, "Please select resident status"),
  nationality: z.string().min(1, "Please select nationality"),
  
  // Identification
  nationalId: z.string().trim().min(5, "National ID is required").max(50),
  serialNumber: z.string().trim().min(1, "Serial number is required").max(50),
  district: z.string().trim().min(1, "District is required").max(50),
  division: z.string().trim().min(1, "Division is required").max(50),
  location: z.string().trim().min(1, "Location is required").max(50),
  subLocation: z.string().trim().min(1, "Sub-location is required").max(50),
  dateIssued: z.string().min(1, "Date issued is required"),
  dateExpiry: z.string().optional(),
  kraPin: z.string().trim().min(1, "KRA Pin is required").max(20),
  
  // Other ID
  otherIdType: z.string().optional(),
  otherIssueAuthority: z.string().optional(),
  otherIdNumber: z.string().optional(),
  otherIdIssuedAt: z.string().optional(),
  otherDateIssued: z.string().optional(),
  otherDateExpiry: z.string().optional(),
  
  // Step 3: Contact Details
  phoneNumber: z.string().trim().min(10, "Phone number is required").max(20),
  mobilePhone1: z.string().trim().min(10, "Mobile phone 1 is required").max(20),
  mobilePhone2: z.string().trim().max(20).optional(),
  email: z.string().trim().email("Invalid email address").max(100),
  
  // Alert Services
  smsAlert: z.boolean().default(false),
  emailAlert: z.boolean().default(false),
  eStatement: z.boolean().default(false),
  internetBanking: z.boolean().default(false),
  mobileBanking: z.boolean().default(false),
  atmServices: z.boolean().default(false),
  
  // Step 4: Account Details 
  accountType: z.string().optional(),
  
  // Step 5: Mandate / Signatory
  mandatoryInfo: z.string().optional(),
  
  // Step 6: Documents
  documentsInfo: z.string().optional(),
  
  // Step 7: Next of Kin
  nextOfKinInfo: z.string().optional(),
  
  // Step 8: Anti Money Laundering
  amlInfo: z.string().optional(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

const IndividualJointAccountCreation = () => {
  const { toast } = useToast();
  const [accountMode, setAccountMode] = useState<"individual" | "joint">("individual");
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      memberAccountName: "",
      memberCategory: "",
      memberId: `MEM${Math.floor(Math.random() * 1000000)}`,
      receiptCode: "",
      title: "",
      gender: "",
      firstName: "",
      middleName: "",
      surname: "",
      shortName: "",
      fullName: "",
      preferredName: "",
      alias: "",
      dateOfBirth: "",
      phoneNumber: "",
      mobilePhone1: "",
      mobilePhone2: "",
      email: "",
      country: "",
      maritalStatus: "",
      preferredLanguage: "",
      minor: "No",
      guardianId: "",
      guardianType: "",
      personWithDisability: "No",
      personWithDisabilityType: "",
      staffIndicator: "No",
      staffId: "",
      occupation: "",
      otherOccupations: "",
      resident: "",
      nationality: "",
      nationalId: "",
      serialNumber: "",
      district: "",
      division: "",
      location: "",
      subLocation: "",
      dateIssued: "",
      dateExpiry: "",
      kraPin: "",
      smsAlert: false,
      emailAlert: false,
      eStatement: false,
      internetBanking: false,
      mobileBanking: false,
      atmServices: false,
    },
  });

  const onSubmit = (data: AccountFormValues) => {
    console.log("Form submitted:", data);
    toast({
      title: "Account Created Successfully",
      description: `${accountMode === "joint" ? "Joint" : "Individual"} account has been created for ${data.firstName} ${data.surname}`,
    });
  };

  const steps = [
    { number: 1, title: "Member Info", icon: IdCard },
    { number: 2, title: "Personal Details", icon: User },
    { number: 3, title: "Contact Details", icon: Phone },
    { number: 4, title: "Account Details", icon: CreditCard },
    { number: 5, title: "Mandate / Signatory", icon: FileText },
    { number: 6, title: "Documents", icon: FileText },
    { number: 7, title: "Next Of Kin", icon: Users },
    { number: 8, title: "Anti Money Laundering", icon: Shield },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader>
            <SidebarTrigger />
            <div>
              <h1 className="text-xl font-semibold">Customer & Account Creation</h1>
              <p className="text-sm text-muted-foreground">
                Individual/Joint Account Creation
              </p>
            </div>
          </AppHeader>

          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
              {/* Account Mode Selection */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Account Type Selection
                  </CardTitle>
                  <CardDescription>
                    Choose whether to create an individual or joint account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={accountMode} onValueChange={(v) => setAccountMode(v as "individual" | "joint")}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="individual" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Individual Account
                      </TabsTrigger>
                      <TabsTrigger value="joint" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Joint Account
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Progress Steps */}
              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between overflow-x-auto pb-2">
                    {steps.map((step, index) => (
                      <div key={step.number} className="flex items-center">
                        <div className="flex flex-col items-center">
                          <div
                            className={`h-12 w-12 rounded-full flex items-center justify-center border-2 transition-all ${
                              currentStep >= step.number
                                ? "bg-primary border-primary text-primary-foreground"
                                : "border-muted-foreground/30 text-muted-foreground"
                            }`}
                          >
                            <step.icon className="h-5 w-5" />
                          </div>
                          <p className="text-xs mt-2 font-medium text-center max-w-[80px]">
                            {step.title}
                          </p>
                        </div>
                        {index < steps.length - 1 && (
                          <div
                            className={`h-0.5 w-12 mx-2 transition-all ${
                              currentStep > step.number ? "bg-primary" : "bg-muted-foreground/30"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Main Form */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Step 1: Member Info */}
                  {currentStep === 1 && (
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <IdCard className="h-5 w-5 text-primary" />
                          Member Information
                        </CardTitle>
                        <CardDescription>Basic member account information</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="memberAccountName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Member Account Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter member account name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="memberCategory"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Member Category *</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="individual">Individual</SelectItem>
                                    <SelectItem value="corporate">Corporate</SelectItem>
                                    <SelectItem value="group">Group</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="memberId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Member ID</FormLabel>
                                <FormControl>
                                  <Input {...field} disabled className="bg-muted" />
                                </FormControl>
                                <FormDescription>Auto-generated</FormDescription>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="receiptCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Receipt Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter receipt code" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 2: Personal Details */}
                  {currentStep === 2 && (
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <User className="h-5 w-5 text-primary" />
                          Personal Details
                        </CardTitle>
                        <CardDescription>Complete personal information</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Basic Information */}
                        <div>
                          <h3 className="text-sm font-semibold mb-4">Basic Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField
                              control={form.control}
                              name="title"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Title *</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select title" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="mr">Mr</SelectItem>
                                      <SelectItem value="mrs">Mrs</SelectItem>
                                      <SelectItem value="ms">Ms</SelectItem>
                                      <SelectItem value="dr">Dr</SelectItem>
                                      <SelectItem value="prof">Prof</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="gender"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Gender *</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="male">Male</SelectItem>
                                      <SelectItem value="female">Female</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="dateOfBirth"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Date Of Birth *</FormLabel>
                                  <FormControl>
                                    <Input type="date" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        {/* Names */}
                        <div>
                          <h3 className="text-sm font-semibold mb-4">Name Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>First Name *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter first name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="middleName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Middle Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter middle name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="surname"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Surname *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter surname" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="shortName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Short Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter short name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="fullName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter full name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="preferredName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Preferred Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter preferred name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="alias"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Alias</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter alias" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <Separator />

                        {/* Location & Status */}
                        <div>
                          <h3 className="text-sm font-semibold mb-4">Location & Status</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField
                              control={form.control}
                              name="country"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Country *</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select country" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="kenya">Kenya</SelectItem>
                                      <SelectItem value="uganda">Uganda</SelectItem>
                                      <SelectItem value="tanzania">Tanzania</SelectItem>
                                      <SelectItem value="rwanda">Rwanda</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="nationality"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nationality *</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select nationality" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="kenyan">Kenyan</SelectItem>
                                      <SelectItem value="ugandan">Ugandan</SelectItem>
                                      <SelectItem value="tanzanian">Tanzanian</SelectItem>
                                      <SelectItem value="rwandan">Rwandan</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="maritalStatus"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Marital Status *</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="single">Single</SelectItem>
                                      <SelectItem value="married">Married</SelectItem>
                                      <SelectItem value="divorce">Divorce</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="preferredLanguage"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Preferred Language *</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select language" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="english">English</SelectItem>
                                      <SelectItem value="swahili">Swahili</SelectItem>
                                      <SelectItem value="french">French</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="resident"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Resident *</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="yes">Yes</SelectItem>
                                      <SelectItem value="no">No</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="occupation"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Occupation</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter occupation" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="otherOccupations"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Other Occupations</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter other occupations" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <Separator />

                        {/* Special Status */}
                        <div>
                          <h3 className="text-sm font-semibold mb-4">Special Status</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField
                              control={form.control}
                              name="minor"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Minor</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="yes">Yes</SelectItem>
                                      <SelectItem value="no">No</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="guardianId"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Guardian ID</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter guardian ID" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="guardianType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Guardian Type</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="parent">Parent</SelectItem>
                                      <SelectItem value="legal">Legal Guardian</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="personWithDisability"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Person With Disability</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="yes">Yes</SelectItem>
                                      <SelectItem value="no">No</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="personWithDisabilityType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Disability Type</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter disability type" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="staffIndicator"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Staff Indicator</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="yes">Yes</SelectItem>
                                      <SelectItem value="no">No</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="staffId"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Staff ID</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter staff ID" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <Separator />

                        {/* Identification Details */}
                        <div>
                          <h3 className="text-sm font-semibold mb-4">Identification Details</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField
                              control={form.control}
                              name="nationalId"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>National ID *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter national ID" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="serialNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Serial Number *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter serial number" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="kraPin"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>KRA Pin *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter KRA Pin" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="district"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>District *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter district" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="division"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Division *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter division" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="location"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Location *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter location" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="subLocation"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Sub Location *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter sub location" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="dateIssued"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Date Issued *</FormLabel>
                                  <FormControl>
                                    <Input type="date" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="dateExpiry"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Date Expiry</FormLabel>
                                  <FormControl>
                                    <Input type="date" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <Separator />

                        {/* Other ID */}
                        <div>
                          <h3 className="text-sm font-semibold mb-4">Other Type of ID</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField
                              control={form.control}
                              name="otherIdType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>ID Type</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="passport">Passport</SelectItem>
                                      <SelectItem value="drivers_license">Driver's License</SelectItem>
                                      <SelectItem value="military_id">Military ID</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="otherIssueAuthority"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Issue Authority</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter issue authority" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="otherIdNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>ID Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter ID number" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="otherIdIssuedAt"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>ID Issued At</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter location" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="otherDateIssued"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Date Issued</FormLabel>
                                  <FormControl>
                                    <Input type="date" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="otherDateExpiry"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Date Expiry</FormLabel>
                                  <FormControl>
                                    <Input type="date" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 3: Contact Details */}
                  {currentStep === 3 && (
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Phone className="h-5 w-5 text-primary" />
                          Contact Details
                        </CardTitle>
                        <CardDescription>Provide contact information and alert preferences</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number *</FormLabel>
                                <FormControl>
                                  <Input placeholder="+254 XXX XXX XXX" {...field} />
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
                                <FormLabel>Email *</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="example@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="mobilePhone1"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Mobile Phone 1 *</FormLabel>
                                <FormControl>
                                  <Input placeholder="+254 XXX XXX XXX" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="mobilePhone2"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Mobile Phone 2</FormLabel>
                                <FormControl>
                                  <Input placeholder="+254 XXX XXX XXX" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-sm font-semibold mb-4">Select Alert Service</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="smsAlert"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>SMS Alert</FormLabel>
                                  </div>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="emailAlert"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>Email Alert</FormLabel>
                                  </div>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="eStatement"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>E-Statement</FormLabel>
                                  </div>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="internetBanking"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>Internet Banking</FormLabel>
                                  </div>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="mobileBanking"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>Mobile Banking</FormLabel>
                                  </div>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="atmServices"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>ATM Services</FormLabel>
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 4: Account Details (Placeholder) */}
                  {currentStep === 4 && (
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-primary" />
                          Account Details
                        </CardTitle>
                        <CardDescription>Account-specific information</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">Account details section - To be implemented</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 5: Mandate / Signatory (Placeholder) */}
                  {currentStep === 5 && (
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          Mandate / Signatory
                        </CardTitle>
                        <CardDescription>Signatory information and mandates</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">Mandate and signatory section - To be implemented</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 6: Documents (Placeholder) */}
                  {currentStep === 6 && (
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          Documents
                        </CardTitle>
                        <CardDescription>Upload required documents</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">Documents upload section - To be implemented</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 7: Next Of Kin (Placeholder) */}
                  {currentStep === 7 && (
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-primary" />
                          Next Of Kin
                        </CardTitle>
                        <CardDescription>Emergency contact information</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">Next of kin section - To be implemented</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 8: Anti Money Laundering (Placeholder) */}
                  {currentStep === 8 && (
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-primary" />
                          Anti Money Laundering
                        </CardTitle>
                        <CardDescription>AML compliance information</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">AML section - To be implemented</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Navigation Buttons */}
                  <Card className="border-0 shadow-lg">
                    <CardContent className="pt-6">
                      <div className="flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                          disabled={currentStep === 1}
                        >
                          Previous
                        </Button>
                        {currentStep < steps.length ? (
                          <Button
                            type="button"
                            onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                          >
                            Next
                          </Button>
                        ) : (
                          <Button type="submit">
                            Submit Application
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </form>
              </Form>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default IndividualJointAccountCreation;
