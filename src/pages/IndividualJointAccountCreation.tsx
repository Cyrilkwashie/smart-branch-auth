import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
} from "lucide-react";

// Form validation schema
const accountFormSchema = z.object({
  accountType: z.string().min(1, "Please select an account type"),
  accountCategory: z.string().min(1, "Please select an account category"),
  firstName: z.string().trim().min(2, "First name must be at least 2 characters").max(50),
  middleName: z.string().trim().max(50).optional(),
  lastName: z.string().trim().min(2, "Last name must be at least 2 characters").max(50),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Please select gender"),
  nationality: z.string().trim().min(2, "Nationality is required").max(50),
  idType: z.string().min(1, "Please select ID type"),
  idNumber: z.string().trim().min(5, "ID number must be at least 5 characters").max(50),
  phoneNumber: z.string().trim().min(10, "Phone number must be at least 10 characters").max(20),
  email: z.string().trim().email("Invalid email address").max(100),
  residentialAddress: z.string().trim().min(10, "Address must be at least 10 characters").max(200),
  city: z.string().trim().min(2, "City is required").max(50),
  region: z.string().trim().min(2, "Region is required").max(50),
  occupation: z.string().trim().min(2, "Occupation is required").max(100),
  employer: z.string().trim().max(100).optional(),
  monthlyIncome: z.string().min(1, "Please select income range"),
  sourceOfFunds: z.string().trim().min(2, "Source of funds is required").max(200),
  initialDeposit: z.string().trim().min(1, "Initial deposit amount is required"),
});

// Joint account holder schema
const jointHolderSchema = z.object({
  firstName: z.string().trim().min(2, "First name must be at least 2 characters").max(50),
  lastName: z.string().trim().min(2, "Last name must be at least 2 characters").max(50),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  idType: z.string().min(1, "Please select ID type"),
  idNumber: z.string().trim().min(5, "ID number must be at least 5 characters").max(50),
  phoneNumber: z.string().trim().min(10, "Phone number must be at least 10 characters").max(20),
  email: z.string().trim().email("Invalid email address").max(100),
  relationship: z.string().min(1, "Please specify relationship"),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;
type JointHolderValues = z.infer<typeof jointHolderSchema>;

const IndividualJointAccountCreation = () => {
  const { toast } = useToast();
  const [accountMode, setAccountMode] = useState<"individual" | "joint">("individual");
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      accountType: "",
      accountCategory: "",
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      nationality: "",
      idType: "",
      idNumber: "",
      phoneNumber: "",
      email: "",
      residentialAddress: "",
      city: "",
      region: "",
      occupation: "",
      employer: "",
      monthlyIncome: "",
      sourceOfFunds: "",
      initialDeposit: "",
    },
  });

  const jointHolderForm = useForm<JointHolderValues>({
    resolver: zodResolver(jointHolderSchema),
  });

  const onSubmit = (data: AccountFormValues) => {
    console.log("Form submitted:", data);
    toast({
      title: "Account Created Successfully",
      description: `${accountMode === "joint" ? "Joint" : "Individual"} account has been created for ${data.firstName} ${data.lastName}`,
    });
  };

  const steps = [
    { number: 1, title: "Account Type", icon: CreditCard },
    { number: 2, title: "Personal Information", icon: User },
    { number: 3, title: "Contact Details", icon: Phone },
    { number: 4, title: "Employment & Financial", icon: Building2 },
    { number: 5, title: "Review & Submit", icon: FileText },
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
                  <div className="flex items-center justify-between">
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
                            className={`h-0.5 w-16 mx-2 transition-all ${
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
                  {/* Step 1: Account Type */}
                  {currentStep === 1 && (
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle>Account Type & Category</CardTitle>
                        <CardDescription>Select the type of account to create</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="accountType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Account Type *</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select account type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="savings">Savings Account</SelectItem>
                                    <SelectItem value="current">Current Account</SelectItem>
                                    <SelectItem value="fixed">Fixed Deposit</SelectItem>
                                    <SelectItem value="call">Call Account</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="accountCategory"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Account Category *</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="standard">Standard</SelectItem>
                                    <SelectItem value="premium">Premium</SelectItem>
                                    <SelectItem value="gold">Gold</SelectItem>
                                    <SelectItem value="platinum">Platinum</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 2: Personal Information */}
                  {currentStep === 2 && (
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <User className="h-5 w-5 text-primary" />
                          Personal Information
                        </CardTitle>
                        <CardDescription>
                          Enter the primary account holder's personal details
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
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
                                  <Input placeholder="Enter middle name (optional)" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter last name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <FormField
                            control={form.control}
                            name="dateOfBirth"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Date of Birth *</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
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
                            name="nationality"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nationality *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter nationality" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <Separator />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="idType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ID Type *</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select ID type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="national_id">National ID</SelectItem>
                                    <SelectItem value="passport">Passport</SelectItem>
                                    <SelectItem value="drivers_license">Driver's License</SelectItem>
                                    <SelectItem value="voters_id">Voter's ID</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="idNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ID Number *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter ID number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
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
                          Contact Information
                        </CardTitle>
                        <CardDescription>Provide contact and address details</CardDescription>
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
                                  <Input placeholder="+233 XX XXX XXXX" {...field} />
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
                                <FormLabel>Email Address *</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="example@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="residentialAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Residential Address *</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Enter full residential address"
                                  className="min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter city" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="region"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Region/State *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter region" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 4: Employment & Financial */}
                  {currentStep === 4 && (
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-primary" />
                          Employment & Financial Information
                        </CardTitle>
                        <CardDescription>Provide employment and income details</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="occupation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Occupation *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter occupation" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="employer"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Employer Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter employer name (optional)" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="monthlyIncome"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Monthly Income Range *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select income range" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="below_1000">Below ₵1,000</SelectItem>
                                  <SelectItem value="1000_5000">₵1,000 - ₵5,000</SelectItem>
                                  <SelectItem value="5000_10000">₵5,000 - ₵10,000</SelectItem>
                                  <SelectItem value="10000_20000">₵10,000 - ₵20,000</SelectItem>
                                  <SelectItem value="above_20000">Above ₵20,000</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="sourceOfFunds"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Source of Funds *</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Describe the source of funds for this account"
                                  className="min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="initialDeposit"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Initial Deposit Amount *</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="Enter amount in GHS" {...field} />
                              </FormControl>
                              <FormDescription>
                                Minimum initial deposit: ₵100
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 5: Review */}
                  {currentStep === 5 && (
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          Review & Submit
                        </CardTitle>
                        <CardDescription>
                          Review all information before submitting
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-semibold mb-3">Personal Information</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Name:</span>
                                <span className="font-medium">
                                  {form.watch("firstName")} {form.watch("middleName")} {form.watch("lastName")}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Date of Birth:</span>
                                <span className="font-medium">{form.watch("dateOfBirth")}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Gender:</span>
                                <span className="font-medium">{form.watch("gender")}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Nationality:</span>
                                <span className="font-medium">{form.watch("nationality")}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold mb-3">Account Details</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Account Type:</span>
                                <Badge>{form.watch("accountType")}</Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Category:</span>
                                <Badge variant="outline">{form.watch("accountCategory")}</Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Initial Deposit:</span>
                                <span className="font-medium">₵{form.watch("initialDeposit")}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            By submitting this form, you confirm that all information provided is accurate and complete.
                            The account will be created pending verification of submitted documents.
                          </p>
                        </div>
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

                        {currentStep < 5 ? (
                          <Button
                            type="button"
                            onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                          >
                            Next Step
                          </Button>
                        ) : (
                          <Button type="submit">
                            Create Account
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
