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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
  Plus,
  X,
  Hash,
  Receipt,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Eye,
  DollarSign,
  TrendingUp,
  ArrowDown,
  ArrowUp,
} from "lucide-react";

// Form validation schema
const personSchema = z.object({
  // Personal Details
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
  
  // Contact Details
  phoneNumber: z.string().trim().min(10, "Phone number is required").max(20),
  mobilePhone1: z.string().trim().min(10, "Mobile phone 1 is required").max(20),
  email: z.string().trim().email("Invalid email address").max(100),
  
  // Alert Services
  smsAlert: z.boolean().default(false),
  emailAlert: z.boolean().default(false),
  eStatement: z.boolean().default(false),
  internetBanking: z.boolean().default(false),
  mobileBanking: z.boolean().default(false),
  atmServices: z.boolean().default(false),
});

const accountFormSchema = z.object({
  // Step 1: Member Info
  memberAccountName: z.string().trim().min(2, "Member account name is required").max(100),
  memberCategory: z.string().min(1, "Please select member category"),
  memberId: z.string().optional(), // Auto-generated
  receiptCode: z.string().optional(),
  
  // Persons
  persons: z.array(personSchema).min(1, "At least one person is required").refine((persons) => {
    // For joint accounts, require at least 2 persons
    // This will be validated at submit time based on accountMode
    return true; // We'll handle this in the component logic
  }),
  
  // Step 3: Account Details 
  memberClassification: z.string().min(1, "Please select member classification"),
  productGroup: z.string().optional(),
  productSubGroup: z.string().optional(),
  currency: z.string().optional(),
  customerSegment: z.string().default("10 - PERSONAL  BANKING"),
  subCustomerSegment: z.string().default("1001 - INDIVIDUALS"),
  sector: z.string().default("80 - PERSONAL"),
  subSector: z.string().default("0509 - HIGH NET WORTH INDIVIDUALS"),
  documentRequiredType: z.string().default("IDD - PERSONAL SAVINGS / CURRENT ACCOUNT"),
  introductorySource: z.string().default("2016060 - YUKU VOKER"),
  relationManager: z.string().min(1, "Relation manager is required").default("X000 - UNASSIGNED"),
  
  // Step 4: Mandate / Signatory
  accountMandate: z.string().min(1, "Please select account mandate"),
  signatories: z.array(z.object({
    userStatus: z.string().default("New"),
    signatory: z.string().optional(),
    relationNo: z.string().optional(),
    firstName: z.string().optional(),
    surname: z.string().optional(),
    signatoryLevels: z.string().optional(),
    approveLimit: z.string().optional(),
    signatureImageCapture: z.string().default("IMAGE / SIGNATURE CAPTURE"),
    photoUrl: z.string().optional(),
    signatureUrl: z.string().optional(),
  })).min(1, "At least one signatory is required"),
  
  // Step 5: Documents
  documentsInfo: z.string().optional(),
  
  // Step 6: Next of Kin
  nextOfKin: z.array(z.object({
    fullName: z.string().trim().min(2, "Full name is required").max(100),
    relationship: z.string().min(1, "Relationship is required"),
    idType: z.string().min(1, "ID type is required"),
    idNumber: z.string().trim().min(5, "ID number is required").max(20),
    expiryDate: z.string().optional(),
    address: z.string().trim().min(10, "Address is required").max(200),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    percentageShared: z.string().min(1, "Percentage shared is required"),
    phoneNumber: z.string().trim().min(10, "Phone number is required").max(20),
  })).min(1, "At least one next of kin is required"),
  
  // Step 7: Anti Money Laundering
  sourceOfWealth: z.object({
    code: z.string().min(1, "Please select source of wealth"),
    description: z.string().min(1, "Please select source of wealth"),
    wealthValue: z.string().min(1, "Wealth value is required"),
  }),
  transactionTypes: z.array(z.object({
    code: z.string(),
    description: z.string(),
    checked: z.boolean(),
  })).default([]),
  sourceOfFunds: z.array(z.object({
    code: z.string(),
    description: z.string(),
    checked: z.boolean(),
  })).default([]),
  noOfWithdrawalPerMonth: z.string().optional(),
  amtWithdrawalsPerMonth: z.string().optional(),
  noOfDepositsPerMonth: z.string().min(1, "Number of deposits per month is required"),
  amountDepositsPerMonth: z.string().min(1, "Amount of deposits per month is required"),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

const IndividualJointAccountCreation = () => {
  const { toast } = useToast();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isAccountModeLocked, setIsAccountModeLocked] = useState(false);
  const [accountMode, setAccountMode] = useState<"individual" | "joint">("individual");

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      memberAccountName: "",
      memberCategory: "",
      memberId: `MEM${Math.floor(Math.random() * 1000000)}`,
      receiptCode: "",
      memberClassification: "",
      productGroup: "",
      productSubGroup: "",
      currency: "",
      customerSegment: "10 - PERSONAL  BANKING",
      subCustomerSegment: "1001 - INDIVIDUALS",
      sector: "80 - PERSONAL",
      subSector: "0509 - HIGH NET WORTH INDIVIDUALS",
      documentRequiredType: "IDD - PERSONAL SAVINGS / CURRENT ACCOUNT",
      introductorySource: "2016060 - YUKU VOKER",
      relationManager: "X000 - UNASSIGNED",
      accountMandate: "",
      signatories: [{
        userStatus: "New",
        signatory: "",
        relationNo: "",
        firstName: "",
        surname: "",
        signatoryLevels: "",
        approveLimit: "",
        signatureImageCapture: "IMAGE / SIGNATURE CAPTURE",
        photoUrl: "",
        signatureUrl: "",
      }],
      documentsInfo: "",
      nextOfKin: [{
        fullName: "",
        relationship: "",
        idType: "",
        idNumber: "",
        expiryDate: "",
        address: "",
        dateOfBirth: "",
        percentageShared: "",
        phoneNumber: "",
      }],
      sourceOfWealth: {
        code: "",
        description: "",
        wealthValue: "",
      },
      transactionTypes: [
        { code: "002", description: "INWARD TRANSFERS", checked: false },
      ],
      sourceOfFunds: [
        { code: "001", description: "SALARY", checked: false },
        { code: "002", description: "BUSINESS", checked: false },
        { code: "003", description: "INVESTMENT", checked: false },
        { code: "004", description: "INHERITANCE", checked: false },
        { code: "005", description: "OTHER", checked: false },
      ],
      noOfWithdrawalPerMonth: "",
      amtWithdrawalsPerMonth: "",
      noOfDepositsPerMonth: "",
      amountDepositsPerMonth: "",
      persons: [{
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
        otherIdType: "",
        otherIssueAuthority: "",
        otherIdNumber: "",
        otherIdIssuedAt: "",
        otherDateIssued: "",
        otherDateExpiry: "",
      }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "persons",
  });

  // Auto-set member category based on account mode
  useEffect(() => {
    form.setValue("memberCategory", accountMode);
  }, [accountMode, form]);

  // Ensure minimum persons based on account mode
  useEffect(() => {
    const targetLength = accountMode === "individual" ? 1 : 2;

    if (fields.length < targetLength) {
      // Add missing persons
      const personsToAdd = targetLength - fields.length;
      for (let i = 0; i < personsToAdd; i++) {
        append({
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
          otherIdType: "",
          otherIssueAuthority: "",
          otherIdNumber: "",
          otherIdIssuedAt: "",
          otherDateIssued: "",
          otherDateExpiry: "",
        });
      }
    } else if (fields.length > targetLength) {
      // Remove extra persons (keep only the first targetLength persons)
      const personsToRemove = fields.length - targetLength;
      for (let i = 0; i < personsToRemove; i++) {
        remove(targetLength); // Remove from the end
      }
    }
  }, [accountMode]); // Only depend on accountMode to avoid infinite loops

  const onSubmit = (data: AccountFormValues) => {
    console.log("onSubmit called with data:", data);
    console.log("Form state:", form.formState);
    console.log("Form errors:", form.formState.errors);
    console.log("Current step:", currentStep);
    console.log("Account mode:", accountMode);

    // Validate number of persons based on account mode
    if (accountMode === "individual" && data.persons.length !== 1) {
      toast({
        title: "Validation Error",
        description: "Individual accounts must have exactly one person.",
        variant: "destructive",
      });
      return;
    }
    if (accountMode === "joint" && data.persons.length < 2) {
      toast({
        title: "Validation Error",
        description: "Joint accounts must have at least two persons.",
        variant: "destructive",
      });
      return;
    }

    console.log("Validation passed, showing confirmation dialog");
    // Show confirmation dialog instead of direct submission
    setShowConfirmDialog(true);
  };

  const isAMLStepComplete = () => {
    const values = form.getValues();
    return (
      values.sourceOfWealth?.code &&
      values.sourceOfWealth?.wealthValue &&
      values.noOfDepositsPerMonth &&
      values.amountDepositsPerMonth
    );
  };

  const handleConfirmSubmit = (data: AccountFormValues) => {
    console.log("Form submitted:", data);
    toast({
      title: "Account Created Successfully",
      description: `${accountMode === "joint" ? "Joint" : "Individual"} account has been created for ${data.persons[0].firstName} ${data.persons[0].surname}`,
    });
    setShowConfirmDialog(false);
  };

  const steps = [
    { number: 1, title: "Member Info", icon: IdCard },
    { number: 2, title: "Personal & Contact Details", icon: User },
    { number: 3, title: "Account Details", icon: CreditCard },
    { number: 4, title: "Mandate / Signatory", icon: FileText },
    { number: 5, title: "Documents", icon: FileText },
    { number: 6, title: "Next Of Kin", icon: Users },
    { number: 7, title: "Anti Money Laundering", icon: Shield },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader>
            <SidebarTrigger />
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
              <h1 className="text-lg sm:text-xl font-semibold truncate">Customer & Account Creation</h1>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                Individual/Joint Account Creation
              </p>
            </div>
          </AppHeader>

          <main className="flex-1 p-3 sm:p-6 overflow-auto">
            <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6 animate-fade-in">
              {/* Account Mode Selection */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    Account Type Selection
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Choose whether to create an individual or joint account
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Tabs value={accountMode} onValueChange={(v) => currentStep === 1 && setAccountMode(v as "individual" | "joint")}>
                    <TabsList className="grid w-full grid-cols-2 h-10 sm:h-11">
                      <TabsTrigger value="individual" className="flex items-center gap-2 text-xs sm:text-sm" disabled={currentStep > 1}>
                        <User className="h-3 w-3 sm:h-4 sm:w-4" />
                        Individual Account
                      </TabsTrigger>
                      <TabsTrigger value="joint" className="flex items-center gap-2 text-xs sm:text-sm" disabled={currentStep > 1}>
                        <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                        Joint Account
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Progress Steps */}
              <Card className="border-0 shadow-lg">
                <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                  {/* Progress Bar */}
                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">Progress</span>
                      <span className="text-sm font-medium text-primary">{Math.round((currentStep / steps.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${(currentStep / steps.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between overflow-x-auto pb-2 scrollbar-hide gap-1 sm:gap-2">
                    {steps.map((step, index) => (
                      <div key={step.number} className="flex items-center flex-shrink-0">
                        <div className="flex flex-col items-center">
                          <div
                            className={`h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center border-2 transition-all ${
                              currentStep >= step.number
                                ? "bg-primary border-primary text-primary-foreground"
                                : "border-muted-foreground/30 text-muted-foreground"
                            }`}
                          >
                            <step.icon className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                          </div>
                          <p className="text-xs mt-1 sm:mt-2 font-medium text-center max-w-[50px] sm:max-w-[60px] md:max-w-[80px] leading-tight">
                            {step.title}
                          </p>
                        </div>
                        {index < steps.length - 1 && (
                          <div
                            className={`h-0.5 w-6 sm:w-8 md:w-12 mx-0.5 sm:mx-1 md:mx-2 transition-all ${
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
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-card via-card to-muted/5">
                      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-border/50 pb-3 sm:pb-6 px-4 sm:px-6">
                        <CardTitle className="flex items-center gap-3 text-base sm:text-lg">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <IdCard className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                          </div>
                          Member Information
                        </CardTitle>
                        <CardDescription className="text-sm">
                          Basic member account information and account type selection
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                          <FormField
                            control={form.control}
                            name="memberAccountName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                  <IdCard className="h-4 w-4 text-primary/70" />
                                  Member Account Name *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter member account name"
                                    {...field}
                                    className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-10 sm:h-11 text-sm sm:text-base"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="memberCategory"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                  <Users className="h-4 w-4 text-primary/70" />
                                  Member Category *
                                </FormLabel>
                                <Select onValueChange={field.onChange} value={field.value} disabled>
                                  <FormControl>
                                    <SelectTrigger className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-10 sm:h-11">
                                      <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="individual">Individual</SelectItem>
                                    <SelectItem value="joint">Joint</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="memberId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                  <Hash className="h-4 w-4 text-primary/70" />
                                  Member ID
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    disabled
                                    className="bg-muted/50 border-2 border-muted/30 text-muted-foreground cursor-not-allowed h-10 sm:h-11"
                                  />
                                </FormControl>
                                <FormDescription className="text-xs text-muted-foreground">Auto-generated</FormDescription>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="receiptCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                  <Receipt className="h-4 w-4 text-primary/70" />
                                  Receipt Code
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter receipt code"
                                    {...field}
                                    className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-10 sm:h-11 text-sm sm:text-base"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 2: Personal & Contact Details */}
                  {currentStep === 2 && (
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-card via-card to-muted/5">
                      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-border/50 pb-3 sm:pb-6 px-4 sm:px-6">
                        <CardTitle className="flex items-center gap-3 text-base sm:text-lg">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                          </div>
                          Personal & Contact Details
                        </CardTitle>
                        <CardDescription className="text-sm">
                          Complete personal information and contact details
                          {accountMode === "joint" && ` - ${fields.length} persons added`}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                        {fields.map((field, index) => (
                          <Card key={field.id} className="border-2 border-dashed border-muted-foreground/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-card via-card to-muted/10 animate-in fade-in-50 slide-in-from-bottom-4">
                            <CardHeader className="pb-3 sm:pb-4 bg-gradient-to-r from-primary/8 via-primary/5 to-transparent border-b border-border/50 hover:from-primary/12 hover:via-primary/8 hover:to-primary/3 transition-all duration-300 px-4 sm:px-6">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-200 hover:scale-110">
                                    <User className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <CardTitle className="text-sm sm:text-base md:text-lg font-semibold text-foreground flex items-center gap-2 flex-wrap">
                                      Person {index + 1}
                                      <Badge variant="secondary" className="text-xs">
                                        {accountMode === "individual" && "Primary"}
                                        {accountMode === "joint" && index === 0 && "Primary"}
                                        {accountMode === "joint" && index > 0 && "Joint"}
                                      </Badge>
                                    </CardTitle>
                                    <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                                      Complete all required information for this account holder
                                    </CardDescription>
                                  </div>
                                </div>
                                {accountMode === "joint" && fields.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => remove(index)}
                                    className="text-destructive hover:text-destructive border-destructive/30 hover:border-destructive/50 hover:bg-destructive/5 transition-all duration-200 hover:scale-105 shadow-sm self-start sm:self-center"
                                  >
                                    <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                    Remove
                                  </Button>
                                )}
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                              {/* Basic Information */}
                              <div className="space-y-3 sm:space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300 delay-100">
                                <div className="flex items-center gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-border/40 hover:border-primary/30 transition-colors duration-200">
                                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 flex items-center justify-center ring-2 ring-blue-200/50 dark:ring-blue-800/50 hover:ring-blue-300/70 dark:hover:ring-blue-700/70 transition-all duration-200 hover:scale-105">
                                    <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                  </div>
                                  <h4 className="text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Basic Information</h4>
                                  <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-primary/20 to-transparent"></div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                                  <FormField
                                    control={form.control}
                                    name={`persons.${index}.title`}
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
                                    name={`persons.${index}.gender`}
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
                                    name={`persons.${index}.dateOfBirth`}
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
                              <div className="space-y-3 sm:space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300 delay-200">
                                <div className="flex items-center gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-border/40 hover:border-primary/30 transition-colors duration-200">
                                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 flex items-center justify-center ring-2 ring-green-200/50 dark:ring-green-800/50 hover:ring-green-300/70 dark:hover:ring-green-700/70 transition-all duration-200 hover:scale-105">
                                    <IdCard className="h-4 w-4 text-green-600 dark:text-green-400" />
                                  </div>
                                  <h4 className="text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">Name Information</h4>
                                  <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-primary/20 to-transparent"></div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                                  <FormField
                                    control={form.control}
                                    name={`persons.${index}.firstName`}
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
                                    name={`persons.${index}.middleName`}
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
                                    name={`persons.${index}.surname`}
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
                                    name={`persons.${index}.shortName`}
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
                                    name={`persons.${index}.fullName`}
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
                                    name={`persons.${index}.preferredName`}
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
                                    name={`persons.${index}.alias`}
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

                              {/* Contact Details */}
                              <div className="space-y-3 sm:space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300 delay-300">
                                <div className="flex items-center gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-border/40 hover:border-primary/30 transition-colors duration-200">
                                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 flex items-center justify-center ring-2 ring-purple-200/50 dark:ring-purple-800/50 hover:ring-purple-300/70 dark:hover:ring-purple-700/70 transition-all duration-200 hover:scale-105">
                                    <Phone className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                  </div>
                                  <h4 className="text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">Contact Information</h4>
                                  <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-primary/20 to-transparent"></div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                                  <FormField
                                    control={form.control}
                                    name={`persons.${index}.phoneNumber`}
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
                                    name={`persons.${index}.email`}
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
                                    name={`persons.${index}.mobilePhone1`}
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
                                </div>
                              </div>

                              <Separator />

                              {/* Location & Status */}
                              <div className="space-y-3 sm:space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300 delay-400">
                                <div className="flex items-center gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-border/40 hover:border-primary/30 transition-colors duration-200">
                                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 flex items-center justify-center ring-2 ring-orange-200/50 dark:ring-orange-800/50 hover:ring-orange-300/70 dark:hover:ring-orange-700/70 transition-all duration-200 hover:scale-105">
                                    <MapPin className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                  </div>
                                  <h4 className="text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">Location & Status</h4>
                                  <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-primary/20 to-transparent"></div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                                  <FormField
                                    control={form.control}
                                    name={`persons.${index}.country`}
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
                                    name={`persons.${index}.nationality`}
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
                                    name={`persons.${index}.maritalStatus`}
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
                                    name={`persons.${index}.preferredLanguage`}
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
                                    name={`persons.${index}.resident`}
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
                                    name={`persons.${index}.occupation`}
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
                                    name={`persons.${index}.otherOccupations`}
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
                              <div className="space-y-3 sm:space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300 delay-500">
                                <div className="flex items-center gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-border/40 hover:border-primary/30 transition-colors duration-200">
                                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/50 flex items-center justify-center ring-2 ring-amber-200/50 dark:ring-amber-800/50 hover:ring-amber-300/70 dark:hover:ring-amber-700/70 transition-all duration-200 hover:scale-105">
                                    <Shield className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                  </div>
                                  <h4 className="text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">Special Status</h4>
                                  <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-primary/20 to-transparent"></div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                                  <FormField
                                    control={form.control}
                                    name={`persons.${index}.minor`}
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
                                    name={`persons.${index}.guardianId`}
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
                                    name={`persons.${index}.guardianType`}
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
                                    name={`persons.${index}.personWithDisability`}
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
                                    name={`persons.${index}.personWithDisabilityType`}
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
                                    name={`persons.${index}.staffIndicator`}
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
                                    name={`persons.${index}.staffId`}
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
                              <div className="space-y-3 sm:space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300 delay-600">
                                <div className="flex items-center gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-border/40 hover:border-primary/30 transition-colors duration-200">
                                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/50 flex items-center justify-center ring-2 ring-red-200/50 dark:ring-red-800/50 hover:ring-red-300/70 dark:hover:ring-red-700/70 transition-all duration-200 hover:scale-105">
                                    <IdCard className="h-4 w-4 text-red-600 dark:text-red-400" />
                                  </div>
                                  <h4 className="text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Identification Details</h4>
                                  <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-primary/20 to-transparent"></div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                                  <FormField
                                    control={form.control}
                                    name={`persons.${index}.nationalId`}
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
                                    name={`persons.${index}.serialNumber`}
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
                                    name={`persons.${index}.kraPin`}
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
                                    name={`persons.${index}.district`}
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
                                    name={`persons.${index}.division`}
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
                                    name={`persons.${index}.location`}
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
                                    name={`persons.${index}.subLocation`}
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
                                    name={`persons.${index}.dateIssued`}
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
                                    name={`persons.${index}.dateExpiry`}
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
                              <div className="space-y-3 sm:space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300 delay-700">
                                <div className="flex items-center gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-border/40 hover:border-primary/30 transition-colors duration-200">
                                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/50 dark:to-indigo-900/50 flex items-center justify-center ring-2 ring-indigo-200/50 dark:ring-indigo-800/50 hover:ring-indigo-300/70 dark:hover:ring-indigo-700/70 transition-all duration-200 hover:scale-105">
                                    <FileText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                  </div>
                                  <h4 className="text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">Other Type of ID</h4>
                                  <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-primary/20 to-transparent"></div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                                  <FormField
                                    control={form.control}
                                    name={`persons.${index}.otherIdType`}
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
                                    name={`persons.${index}.otherIssueAuthority`}
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
                                    name={`persons.${index}.otherIdNumber`}
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
                                    name={`persons.${index}.otherIdIssuedAt`}
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
                                    name={`persons.${index}.otherDateIssued`}
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
                                    name={`persons.${index}.otherDateExpiry`}
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

                              {/* Alert Services */}
                              <div className="space-y-3 sm:space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300 delay-1000">
                                <div className="flex items-center gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-border/40 hover:border-primary/30 transition-colors duration-200">
                                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950/50 dark:to-teal-900/50 flex items-center justify-center ring-2 ring-teal-200/50 dark:ring-teal-800/50 hover:ring-teal-300/70 dark:hover:ring-teal-700/70 transition-all duration-200 hover:scale-105">
                                    <Mail className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                                  </div>
                                  <h4 className="text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">Alert Services</h4>
                                  <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-primary/20 to-transparent"></div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                  <FormField
                                    control={form.control}
                                    name={`persons.${index}.smsAlert`}
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
                                    name={`persons.${index}.emailAlert`}
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
                                    name={`persons.${index}.eStatement`}
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
                                    name={`persons.${index}.internetBanking`}
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
                                    name={`persons.${index}.mobileBanking`}
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
                                    name={`persons.${index}.atmServices`}
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
                        ))}

                        {/* Add Person Button for Joint Accounts */}
                        {accountMode === "joint" && (
                          <div className="flex justify-center pt-3 sm:pt-4 animate-in fade-in-50 slide-in-from-bottom-4 duration-500 delay-300">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => append({
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
                                otherIdType: "",
                                otherIssueAuthority: "",
                                otherIdNumber: "",
                                otherIdIssuedAt: "",
                                otherDateIssued: "",
                                otherDateExpiry: "",
                              })}
                              className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-primary/10 via-primary/8 to-primary/10 hover:from-primary/20 hover:via-primary/15 hover:to-primary/20 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 hover:shadow-lg group w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3"
                            >
                              <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-primary/20 group-hover:bg-primary/30 flex items-center justify-center transition-colors duration-200">
                                <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-primary group-hover:scale-110 transition-transform duration-200" />
                              </div>
                              <span className="font-medium text-sm sm:text-base">Add Joint Account Holder</span>
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 3: Account Details */}
                  {currentStep === 3 && (
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-card via-card to-muted/5">
                      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-border/50 pb-3 sm:pb-6 px-4 sm:px-6">
                        <CardTitle className="flex items-center gap-3 text-base sm:text-lg">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                          </div>
                          Account Details
                        </CardTitle>
                        <CardDescription className="text-sm">
                          Select the appropriate member type and category
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                          <FormField
                            control={form.control}
                            name="memberClassification"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                  <Users className="h-4 w-4 text-primary/70" />
                                  Member Classification *
                                </FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20">
                                      <SelectValue placeholder="Select member classification" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="member">Member</SelectItem>
                                    <SelectItem value="non-member">Non-member</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                              </FormItem>
                            )}
                          />

                          {/* Non-member specific fields */}
                          {form.watch("memberClassification") === "non-member" && (
                            <>
                              <FormField
                                control={form.control}
                                name="productGroup"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                      <Building2 className="h-4 w-4 text-primary/70" />
                                      Product Group
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                      <FormControl>
                                        <SelectTrigger className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20">
                                          <SelectValue placeholder="Select product group" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="2 - SAVINGS ACCOUNT">2 - SAVINGS ACCOUNT</SelectItem>
                                        <SelectItem value="3 - CURRENT ACCOUNT">3 - CURRENT ACCOUNT</SelectItem>
                                        <SelectItem value="4 - FIXED DEPOSIT">4 - FIXED DEPOSIT</SelectItem>
                                        <SelectItem value="5 - LOAN ACCOUNT">5 - LOAN ACCOUNT</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage className="text-red-500 text-sm mt-1" />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="productSubGroup"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                      <Building2 className="h-4 w-4 text-primary/70" />
                                      Product Sub Group
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                      <FormControl>
                                        <SelectTrigger className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20">
                                          <SelectValue placeholder="Select product sub group" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="SIB SUSU SAVINGS - 3 MONTH">SIB SUSU SAVINGS - 3 MONTH</SelectItem>
                                        <SelectItem value="SIB SUSU SAVINGS - 6 MONTH">SIB SUSU SAVINGS - 6 MONTH</SelectItem>
                                        <SelectItem value="REGULAR SAVINGS">REGULAR SAVINGS</SelectItem>
                                        <SelectItem value="HIGH INTEREST SAVINGS">HIGH INTEREST SAVINGS</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage className="text-red-500 text-sm mt-1" />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="currency"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                      <Building2 className="h-4 w-4 text-primary/70" />
                                      Currency
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                      <FormControl>
                                        <SelectTrigger className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20">
                                          <SelectValue placeholder="Select currency" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="840 - US DOLLAR">840 - US DOLLAR</SelectItem>
                                        <SelectItem value="404 - KENYAN SHILLING">404 - KENYAN SHILLING</SelectItem>
                                        <SelectItem value="826 - BRITISH POUND">826 - BRITISH POUND</SelectItem>
                                        <SelectItem value="978 - EURO">978 - EURO</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage className="text-red-500 text-sm mt-1" />
                                  </FormItem>
                                )}
                              />
                            </>
                          )}

                          {/* Common fields for both Member and Non-member */}
                          <FormField
                            control={form.control}
                            name="customerSegment"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                  <Building2 className="h-4 w-4 text-primary/70" />
                                  Customer Segment
                                </FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20">
                                      <SelectValue placeholder="Select customer segment" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="10 - PERSONAL  BANKING">10 - PERSONAL BANKING</SelectItem>
                                    <SelectItem value="20 - BUSINESS BANKING">20 - BUSINESS BANKING</SelectItem>
                                    <SelectItem value="30 - CORPORATE BANKING">30 - CORPORATE BANKING</SelectItem>
                                    <SelectItem value="40 - INSTITUTIONAL BANKING">40 - INSTITUTIONAL BANKING</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="subCustomerSegment"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                  <Building2 className="h-4 w-4 text-primary/70" />
                                  Sub Customer Segment
                                </FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20">
                                      <SelectValue placeholder="Select sub customer segment" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="1001 - INDIVIDUALS">1001 - INDIVIDUALS</SelectItem>
                                    <SelectItem value="1002 - SMALL BUSINESS">1002 - SMALL BUSINESS</SelectItem>
                                    <SelectItem value="1003 - MEDIUM BUSINESS">1003 - MEDIUM BUSINESS</SelectItem>
                                    <SelectItem value="1004 - LARGE BUSINESS">1004 - LARGE BUSINESS</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="sector"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                  <Building2 className="h-4 w-4 text-primary/70" />
                                  Sector
                                </FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20">
                                      <SelectValue placeholder="Select sector" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="80 - PERSONAL">80 - PERSONAL</SelectItem>
                                    <SelectItem value="81 - COMMERCIAL">81 - COMMERCIAL</SelectItem>
                                    <SelectItem value="82 - AGRICULTURE">82 - AGRICULTURE</SelectItem>
                                    <SelectItem value="83 - MANUFACTURING">83 - MANUFACTURING</SelectItem>
                                    <SelectItem value="84 - SERVICES">84 - SERVICES</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="subSector"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                  <Building2 className="h-4 w-4 text-primary/70" />
                                  Sub Sector
                                </FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20">
                                      <SelectValue placeholder="Select sub sector" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="0509 - HIGH NET WORTH INDIVIDUALS">0509 - HIGH NET WORTH INDIVIDUALS</SelectItem>
                                    <SelectItem value="0510 - MASS AFFLUENT">0510 - MASS AFFLUENT</SelectItem>
                                    <SelectItem value="0511 - MASS MARKET">0511 - MASS MARKET</SelectItem>
                                    <SelectItem value="0512 - YOUTH">0512 - YOUTH</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="documentRequiredType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-primary/70" />
                                  Document Required Type
                                </FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20">
                                      <SelectValue placeholder="Select document type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="IDD - PERSONAL SAVINGS / CURRENT ACCOUNT">IDD - PERSONAL SAVINGS / CURRENT ACCOUNT</SelectItem>
                                    <SelectItem value="IDD - BUSINESS CURRENT ACCOUNT">IDD - BUSINESS CURRENT ACCOUNT</SelectItem>
                                    <SelectItem value="IDD - FIXED DEPOSIT ACCOUNT">IDD - FIXED DEPOSIT ACCOUNT</SelectItem>
                                    <SelectItem value="IDD - LOAN ACCOUNT">IDD - LOAN ACCOUNT</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="introductorySource"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                  <User className="h-4 w-4 text-primary/70" />
                                  Introductory Source
                                </FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20">
                                      <SelectValue placeholder="Select introductory source" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="2016060 - YUKU VOKER">2016060 - YUKU VOKER</SelectItem>
                                    <SelectItem value="2016061 - EXISTING CUSTOMER">2016061 - EXISTING CUSTOMER</SelectItem>
                                    <SelectItem value="2016062 - STAFF REFERRAL">2016062 - STAFF REFERRAL</SelectItem>
                                    <SelectItem value="2016063 - WALK-IN">2016063 - WALK-IN</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="relationManager"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                  <User className="h-4 w-4 text-primary/70" />
                                  Relation Manager *
                                </FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20">
                                      <SelectValue placeholder="Select relation manager" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="X000 - UNASSIGNED">X000 - UNASSIGNED</SelectItem>
                                    <SelectItem value="RM001 - JOHN DOE">RM001 - JOHN DOE</SelectItem>
                                    <SelectItem value="RM002 - JANE SMITH">RM002 - JANE SMITH</SelectItem>
                                    <SelectItem value="RM003 - BOB JOHNSON">RM003 - BOB JOHNSON</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage className="text-red-500 text-sm mt-1" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 4: Mandate / Signatory */}
                  {currentStep === 4 && (
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-card via-card to-muted/5">
                      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-border/50 pb-3 sm:pb-6 px-4 sm:px-6">
                        <CardTitle className="flex items-center gap-3 text-base sm:text-lg">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                          </div>
                          Mandate / Signatory
                        </CardTitle>
                        <CardDescription className="text-sm">
                          Define account mandate and manage authorized signatories
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                        {/* Account Mandate Section */}
                        <div className="space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300 delay-100">
                          <div className="flex items-center gap-3 pb-3 border-b border-border/40 hover:border-primary/30 transition-colors duration-200">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 flex items-center justify-center ring-2 ring-blue-200/50 dark:ring-blue-800/50 hover:ring-blue-300/70 dark:hover:ring-blue-700/70 transition-all duration-200 hover:scale-105">
                              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h4 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Account Mandate</h4>
                            <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-primary/20 to-transparent"></div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <FormField
                              control={form.control}
                              name="accountMandate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-primary/70" />
                                    Account Mandate *
                                  </FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-12">
                                        <SelectValue placeholder="Select account mandate" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="001 - SOLE SIGNATORY">001 - SOLE SIGNATORY</SelectItem>
                                      <SelectItem value="002 - JOINT SIGNATORY">002 - JOINT SIGNATORY</SelectItem>
                                      <SelectItem value="003 - ANY TWO SIGNATORIES">003 - ANY TWO SIGNATORIES</SelectItem>
                                      <SelectItem value="004 - ANY ONE SIGNATORY">004 - ANY ONE SIGNATORY</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage className="text-red-500 text-sm mt-1" />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        {/* Signatories Section */}
                        <div className="space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300 delay-200">
                          <div className="flex items-center gap-3 pb-3 border-b border-border/40 hover:border-primary/30 transition-colors duration-200">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 flex items-center justify-center ring-2 ring-green-200/50 dark:ring-green-800/50 hover:ring-green-300/70 dark:hover:ring-green-700/70 transition-all duration-200 hover:scale-105">
                              <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <h4 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">Authorized Signatories</h4>
                            <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-primary/20 to-transparent"></div>
                          </div>

                          {/* Add Signatory Button */}
                          <div className="flex justify-center pt-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                const currentSignatories = form.getValues("signatories");
                                form.setValue("signatories", [
                                  ...currentSignatories,
                                  {
                                    userStatus: "New",
                                    signatory: "",
                                    relationNo: "",
                                    firstName: "",
                                    surname: "",
                                    signatoryLevels: "",
                                    approveLimit: "",
                                    signatureImageCapture: "IMAGE / SIGNATURE CAPTURE",
                                    photoUrl: "",
                                    signatureUrl: "",
                                  }
                                ]);
                              }}
                              className="flex items-center gap-3 bg-gradient-to-r from-primary/10 via-primary/8 to-primary/10 hover:from-primary/20 hover:via-primary/15 hover:to-primary/20 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 hover:shadow-lg group px-6 py-3"
                            >
                              <div className="h-6 w-6 rounded-full bg-primary/20 group-hover:bg-primary/30 flex items-center justify-center transition-colors duration-200">
                                <Plus className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-200" />
                              </div>
                              <span className="font-medium text-sm sm:text-base">Add New Signatory</span>
                            </Button>
                          </div>

                          {/* Signatory Cards */}
                          <div className="space-y-4">
                            {form.watch("signatories").map((signatory, index) => (
                              <Card key={index} className="border-2 border-dashed border-muted-foreground/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-card via-card to-muted/10 animate-in fade-in-50 slide-in-from-bottom-4">
                                <CardHeader className="pb-4 bg-gradient-to-r from-primary/8 via-primary/5 to-transparent border-b border-border/50 hover:from-primary/12 hover:via-primary/8 hover:to-primary/3 transition-all duration-300">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-200 hover:scale-110">
                                        <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <CardTitle className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2 flex-wrap">
                                          Signatory {index + 1}
                                          <Badge variant="secondary" className="text-xs">
                                            {signatory.userStatus || "New"}
                                          </Badge>
                                        </CardTitle>
                                        <CardDescription className="text-sm text-muted-foreground">
                                          Authorized signatory details and permissions
                                        </CardDescription>
                                      </div>
                                    </div>
                                    {form.watch("signatories").length > 1 && (
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          const currentSignatories = form.getValues("signatories");
                                          const newSignatories = currentSignatories.filter((_, i) => i !== index);
                                          form.setValue("signatories", newSignatories);
                                        }}
                                        className="text-destructive hover:text-destructive border-destructive/30 hover:border-destructive/50 hover:bg-destructive/5 transition-all duration-200 hover:scale-105 shadow-sm self-start sm:self-center"
                                      >
                                        <X className="h-4 w-4 mr-1" />
                                        Remove
                                      </Button>
                                    )}
                                  </div>
                                </CardHeader>
                                <CardContent className="space-y-6 p-4 sm:p-6">
                                  {/* Basic Information */}
                                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                    <FormField
                                      control={form.control}
                                      name={`signatories.${index}.signatory`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel className="text-sm font-medium">Signatory ID</FormLabel>
                                          <FormControl>
                                            <Input
                                              {...field}
                                              placeholder="Enter signatory ID"
                                              className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-11"
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />

                                    <FormField
                                      control={form.control}
                                      name={`signatories.${index}.relationNo`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel className="text-sm font-medium">Relation Number</FormLabel>
                                          <FormControl>
                                            <Input
                                              {...field}
                                              placeholder="Enter relation number"
                                              className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-11"
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />

                                    <FormField
                                      control={form.control}
                                      name={`signatories.${index}.firstName`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel className="text-sm font-medium">First Name *</FormLabel>
                                          <FormControl>
                                            <Input
                                              {...field}
                                              placeholder="Enter first name"
                                              className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-11"
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />

                                    <FormField
                                      control={form.control}
                                      name={`signatories.${index}.surname`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel className="text-sm font-medium">Surname *</FormLabel>
                                          <FormControl>
                                            <Input
                                              {...field}
                                              placeholder="Enter surname"
                                              className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-11"
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />

                                    <FormField
                                      control={form.control}
                                      name={`signatories.${index}.signatoryLevels`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel className="text-sm font-medium">Signatory Level</FormLabel>
                                          <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                              <SelectTrigger className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-11">
                                                <SelectValue placeholder="Select level" />
                                              </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                              <SelectItem value="LEVEL 1">LEVEL 1</SelectItem>
                                              <SelectItem value="LEVEL 2">LEVEL 2</SelectItem>
                                              <SelectItem value="LEVEL 3">LEVEL 3</SelectItem>
                                              <SelectItem value="LEVEL 4">LEVEL 4</SelectItem>
                                            </SelectContent>
                                          </Select>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />

                                    <FormField
                                      control={form.control}
                                      name={`signatories.${index}.approveLimit`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel className="text-sm font-medium">Approval Limit</FormLabel>
                                          <FormControl>
                                            <Input
                                              {...field}
                                              placeholder="Enter limit"
                                              type="number"
                                              className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-11"
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>

                                  {/* Document Management */}
                                  <Separator />

                                  <div className="space-y-4">
                                    <h5 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-primary" />
                                      Document Management
                                    </h5>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <FormLabel className="text-sm font-medium">Photo & Signature</FormLabel>
                                        <FormField
                                          control={form.control}
                                          name={`signatories.${index}.signatureImageCapture`}
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormControl>
                                                <Input
                                                  {...field}
                                                  className="bg-muted/50 border-2 border-muted/30 text-muted-foreground cursor-not-allowed h-11"
                                                  disabled
                                                />
                                              </FormControl>
                                              <FormDescription className="text-xs text-muted-foreground">
                                                System managed field
                                              </FormDescription>
                                            </FormItem>
                                          )}
                                        />
                                      </div>

                                      <div className="space-y-2">
                                        <FormLabel className="text-sm font-medium">Document Actions</FormLabel>
                                        <div className="flex gap-2">
                                          <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                              toast({
                                                title: "Photo View",
                                                description: "Photo viewing functionality would open here",
                                              });
                                            }}
                                            className="flex items-center gap-2 hover:scale-105 transition-all duration-200 flex-1 h-11"
                                          >
                                            <Eye className="h-4 w-4" />
                                            View Photo
                                          </Button>
                                          <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                              toast({
                                                title: "Signature View",
                                                description: "Signature viewing functionality would open here",
                                              });
                                            }}
                                            className="flex items-center gap-2 hover:scale-105 transition-all duration-200 flex-1 h-11"
                                          >
                                            <Eye className="h-4 w-4" />
                                            View Signature
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>

                          {form.watch("signatories").length === 0 && (
                            <div className="text-center py-12">
                              <div className="h-16 w-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4">
                                <Users className="h-8 w-8 text-muted-foreground" />
                              </div>
                              <h3 className="text-lg font-semibold text-muted-foreground mb-2">No Signatories Added</h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                Add at least one authorized signatory to continue with the account creation process.
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 5: Documents */}
                  {currentStep === 5 && (
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-card via-card to-muted/5">
                      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-border/50 pb-3 sm:pb-6 px-4 sm:px-6">
                        <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-base sm:text-lg font-semibold truncate">Add Documents</div>
                            <div className="text-xs sm:text-sm text-muted-foreground">Manage and upload required account opening documents</div>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                        {/* Documents Table */}
                        <div className="space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300 delay-100">
                          <div className="flex items-center gap-3 pb-3 border-b border-border/40 hover:border-primary/30 transition-colors duration-200">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 flex items-center justify-center ring-2 ring-blue-200/50 dark:ring-blue-800/50 hover:ring-blue-300/70 dark:hover:ring-blue-700/70 transition-all duration-200 hover:scale-105">
                              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h4 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Required Documents</h4>
                            <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-primary/20 to-transparent"></div>
                          </div>

                          <div className="overflow-x-auto border rounded-lg bg-card shadow-sm -mx-2 sm:mx-0 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                            <div className="min-w-0 sm:min-w-[650px] md:min-w-[700px]">
                              <table className="w-full">
                                <thead className="bg-muted/50">
                                  <tr>
                                    <th className="px-1 sm:px-2 md:px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider sticky top-0 bg-muted/50 z-10">
                                      <Checkbox className="h-3 w-3 sm:h-4 sm:w-4" />
                                    </th>
                                    <th className="px-1 sm:px-2 md:px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider sticky top-0 bg-muted/50 z-10">S/No</th>
                                    <th className="px-1 sm:px-2 md:px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider sticky top-0 bg-muted/50 z-10">Description</th>
                                    <th className="px-1 sm:px-2 md:px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider sticky top-0 bg-muted/50 z-10">Doc. Code</th>
                                    <th className="px-1 sm:px-2 md:px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider sticky top-0 bg-muted/50 z-10">Document No</th>
                                    <th className="px-1 sm:px-2 md:px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider sticky top-0 bg-muted/50 z-10">Doc Date</th>
                                    <th className="px-1 sm:px-2 md:px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider sticky top-0 bg-muted/50 z-10">Mandate</th>
                                    <th className="px-1 sm:px-2 md:px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider sticky top-0 bg-muted/50 z-10">Received Date</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                  {/* Row 2: PROOF OF ADDRESS */}
                                  <tr className="hover:bg-muted/30 transition-colors">
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <Checkbox className="h-3 w-3 sm:h-4 sm:w-4" />
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2 text-xs sm:text-sm font-medium">2</td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <div className="flex items-center gap-1 sm:gap-2">
                                        <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-primary/70 flex-shrink-0" />
                                        <span className="text-xs sm:text-sm font-medium truncate max-w-[120px] sm:max-w-none">PROOF OF ADDRESS</span>
                                      </div>
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2 text-xs sm:text-sm">586</td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <Input
                                        placeholder="Enter document number"
                                        className="w-20 sm:w-24 md:w-32 h-6 sm:h-7 md:h-8 text-xs sm:text-sm border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                      />
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <Input
                                        type="date"
                                        className="w-20 sm:w-24 md:w-32 h-6 sm:h-7 md:h-8 text-xs sm:text-sm border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                      />
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <Select defaultValue="N">
                                        <SelectTrigger className="w-10 sm:w-12 md:w-16 h-6 sm:h-7 md:h-8 text-xs sm:text-sm border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Y">Y</SelectItem>
                                          <SelectItem value="N">N</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <Input
                                        type="date"
                                        className="w-20 sm:w-24 md:w-32 h-6 sm:h-7 md:h-8 text-xs sm:text-sm border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                      />
                                    </td>
                                  </tr>

                                  {/* Row 3: COPY OF SIGNATORY(S) PHOTO ID */}
                                  <tr className="hover:bg-muted/30 transition-colors">
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <Checkbox className="h-3 w-3 sm:h-4 sm:w-4" />
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2 text-xs sm:text-sm font-medium">3</td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <div className="flex items-center gap-1 sm:gap-2">
                                        <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-primary/70 flex-shrink-0" />
                                        <span className="text-xs sm:text-sm font-medium truncate max-w-[120px] sm:max-w-none">COPY OF SIGNATORY(S) PHOTO ID</span>
                                      </div>
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2 text-xs sm:text-sm">587</td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <Input
                                        placeholder="Enter document number"
                                        className="w-20 sm:w-24 md:w-32 h-6 sm:h-7 md:h-8 text-xs sm:text-sm border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                      />
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <Input
                                        type="date"
                                        className="w-20 sm:w-24 md:w-32 h-6 sm:h-7 md:h-8 text-xs sm:text-sm border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                      />
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <Select defaultValue="N">
                                        <SelectTrigger className="w-10 sm:w-12 md:w-16 h-6 sm:h-7 md:h-8 text-xs sm:text-sm border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Y">Y</SelectItem>
                                          <SelectItem value="N">N</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <Input
                                        type="date"
                                        className="w-20 sm:w-24 md:w-32 h-6 sm:h-7 md:h-8 text-xs sm:text-sm border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                      />
                                    </td>
                                  </tr>

                                  {/* Row 5: ACCUITY SEARCH RESULTS */}
                                  <tr className="hover:bg-muted/30 transition-colors">
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <Checkbox className="h-3 w-3 sm:h-4 sm:w-4" />
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2 text-xs sm:text-sm font-medium">5</td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <div className="flex items-center gap-1 sm:gap-2">
                                        <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-primary/70 flex-shrink-0" />
                                        <span className="text-xs sm:text-sm font-medium truncate max-w-[120px] sm:max-w-none">ACCUITY SEARCH RESULTS</span>
                                      </div>
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2 text-xs sm:text-sm">500</td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <Input
                                        placeholder="Enter document number"
                                        className="w-20 sm:w-24 md:w-32 h-6 sm:h-7 md:h-8 text-xs sm:text-sm border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                      />
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <Input
                                        type="date"
                                        className="w-20 sm:w-24 md:w-32 h-6 sm:h-7 md:h-8 text-xs sm:text-sm border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                      />
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <Select defaultValue="N">
                                        <SelectTrigger className="w-10 sm:w-12 md:w-16 h-6 sm:h-7 md:h-8 text-xs sm:text-sm border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Y">Y</SelectItem>
                                          <SelectItem value="N">N</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <Input
                                        type="date"
                                        className="w-20 sm:w-24 md:w-32 h-6 sm:h-7 md:h-8 text-xs sm:text-sm border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                      />
                                    </td>
                                  </tr>

                                  {/* Row 6: COMPLETED APPLICATION FORM */}
                                  <tr className="hover:bg-muted/30 transition-colors">
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <Checkbox className="h-3 w-3 sm:h-4 sm:w-4" />
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2 text-xs sm:text-sm font-medium">6</td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <div className="flex items-center gap-1 sm:gap-2">
                                        <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-primary/70 flex-shrink-0" />
                                        <span className="text-xs sm:text-sm font-medium truncate max-w-[120px] sm:max-w-none">COMPLETED APPLICATION FORM</span>
                                      </div>
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2 text-xs sm:text-sm">138</td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <Input
                                        placeholder="Enter document number"
                                        className="w-20 sm:w-24 md:w-32 h-6 sm:h-7 md:h-8 text-xs sm:text-sm border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                      />
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <Input
                                        type="date"
                                        className="w-20 sm:w-24 md:w-32 h-6 sm:h-7 md:h-8 text-xs sm:text-sm border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                      />
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <Select defaultValue="N">
                                        <SelectTrigger className="w-10 sm:w-12 md:w-16 h-6 sm:h-7 md:h-8 text-xs sm:text-sm border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Y">Y</SelectItem>
                                          <SelectItem value="N">N</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <Input
                                        type="date"
                                        className="w-20 sm:w-24 md:w-32 h-6 sm:h-7 md:h-8 text-xs sm:text-sm border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* Pagination Info */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm text-muted-foreground bg-muted/30 px-3 sm:px-4 py-3 rounded-lg gap-2 sm:gap-4">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                              <span>Showing 1-4 of 4 items</span>
                              <span className="font-medium">Total Records: 4</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" disabled className="h-7 sm:h-8 px-2 sm:px-3 text-xs">
                                Previous
                              </Button>
                              <Button variant="outline" size="sm" disabled className="h-7 sm:h-8 px-2 sm:px-3 text-xs">
                                Next
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Document Upload Actions */}
                        <div className="space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300 delay-200">
                          <div className="flex items-center gap-3 pb-3 border-b border-border/40 hover:border-primary/30 transition-colors duration-200">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 flex items-center justify-center ring-2 ring-green-200/50 dark:ring-green-800/50 hover:ring-green-300/70 dark:hover:ring-green-700/70 transition-all duration-200 hover:scale-105">
                              <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <h4 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">Document Management</h4>
                            <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-primary/20 to-transparent"></div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            <Button
                              type="button"
                              variant="outline"
                              className="flex items-center justify-center gap-2 sm:gap-3 h-10 sm:h-12 hover:scale-105 transition-all duration-200 border-2 border-primary/20 hover:border-primary/40 text-sm"
                              onClick={() => {
                                toast({
                                  title: "Upload Documents",
                                  description: "Document upload functionality would open here",
                                });
                              }}
                            >
                              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                              Upload Documents
                            </Button>

                            <Button
                              type="button"
                              variant="outline"
                              className="flex items-center justify-center gap-2 sm:gap-3 h-10 sm:h-12 hover:scale-105 transition-all duration-200 border-2 border-primary/20 hover:border-primary/40 text-sm"
                              onClick={() => {
                                toast({
                                  title: "View Documents",
                                  description: "Document viewer would open here",
                                });
                              }}
                            >
                              <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                              View Documents
                            </Button>

                            <Button
                              type="button"
                              variant="outline"
                              className="flex items-center justify-center gap-2 sm:gap-3 h-10 sm:h-12 hover:scale-105 transition-all duration-200 border-2 border-primary/20 hover:border-primary/40 text-sm sm:col-span-2 lg:col-span-1"
                              onClick={() => {
                                toast({
                                  title: "Document Status",
                                  description: "Document verification status would be shown here",
                                });
                              }}
                            >
                              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                              Check Status
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 6: Next Of Kin */}
                  {currentStep === 6 && (
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-card via-card to-muted/5">
                      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-border/50 pb-3 sm:pb-6 px-4 sm:px-6">
                        <CardTitle className="flex items-center gap-3 text-base sm:text-lg">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                          </div>
                          Next Of Kin
                        </CardTitle>
                        <CardDescription className="text-sm">
                          Add emergency contact and next of kin information
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                        {/* Next of Kin Form */}
                        <div className="space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300 delay-100">
                          <div className="flex items-center gap-3 pb-3 border-b border-border/40 hover:border-primary/30 transition-colors duration-200">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 flex items-center justify-center ring-2 ring-blue-200/50 dark:ring-blue-800/50 hover:ring-blue-300/70 dark:hover:ring-blue-700/70 transition-all duration-200 hover:scale-105">
                              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h4 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Emergency Contact Details</h4>
                            <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-primary/20 to-transparent"></div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            <FormField
                              control={form.control}
                              name="nextOfKin.0.fullName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                    <User className="h-4 w-4 text-primary/70" />
                                    Full Name
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter full name"
                                      {...field}
                                      className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-11"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500 text-sm mt-1" />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="nextOfKin.0.relationship"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                    <Users className="h-4 w-4 text-primary/70" />
                                    Relationship *
                                  </FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-11">
                                        <SelectValue placeholder="Select relationship" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="spouse">Spouse</SelectItem>
                                      <SelectItem value="parent">Parent</SelectItem>
                                      <SelectItem value="child">Child</SelectItem>
                                      <SelectItem value="sibling">Sibling</SelectItem>
                                      <SelectItem value="relative">Relative</SelectItem>
                                      <SelectItem value="friend">Friend</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage className="text-red-500 text-sm mt-1" />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="nextOfKin.0.idType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                    <IdCard className="h-4 w-4 text-primary/70" />
                                    ID Type *
                                  </FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-11">
                                        <SelectValue placeholder="Select ID type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="national_id">National ID</SelectItem>
                                      <SelectItem value="passport">Passport</SelectItem>
                                      <SelectItem value="drivers_license">Driver's License</SelectItem>
                                      <SelectItem value="military_id">Military ID</SelectItem>
                                      <SelectItem value="birth_certificate">Birth Certificate</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage className="text-red-500 text-sm mt-1" />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="nextOfKin.0.idNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                    <Hash className="h-4 w-4 text-primary/70" />
                                    ID Number *
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter ID number"
                                      {...field}
                                      className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-11"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500 text-sm mt-1" />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="nextOfKin.0.expiryDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-primary/70" />
                                    Expiry Date *
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="date"
                                      placeholder="dd-mm-yyyy"
                                      {...field}
                                      className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-11"
                                    />
                                  </FormControl>
                                  <FormDescription className="text-xs text-muted-foreground">Format: dd-mm-yyyy</FormDescription>
                                  <FormMessage className="text-red-500 text-sm mt-1" />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="nextOfKin.0.address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-primary/70" />
                                    Address *
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter full address"
                                      {...field}
                                      className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-11"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500 text-sm mt-1" />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="nextOfKin.0.dateOfBirth"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-primary/70" />
                                    Date of Birth *
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="date"
                                      placeholder="dd-mm-yyyy"
                                      {...field}
                                      className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-11"
                                    />
                                  </FormControl>
                                  <FormDescription className="text-xs text-muted-foreground">Format: dd-mm-yyyy</FormDescription>
                                  <FormMessage className="text-red-500 text-sm mt-1" />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="nextOfKin.0.percentageShared"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                    <Hash className="h-4 w-4 text-primary/70" />
                                    Percentage Shared *
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="0"
                                      min="0"
                                      max="100"
                                      {...field}
                                      className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-11"
                                    />
                                  </FormControl>
                                  <FormDescription className="text-xs text-muted-foreground">Percentage (0-100)</FormDescription>
                                  <FormMessage className="text-red-500 text-sm mt-1" />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="nextOfKin.0.phoneNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-primary/70" />
                                    Phone Number *
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="+254"
                                      {...field}
                                      className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-11"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500 text-sm mt-1" />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        {/* Add Next of Kin Button */}
                        <div className="flex justify-center pt-4 animate-in fade-in-50 slide-in-from-bottom-4 duration-500 delay-200">
                          <Button
                            type="button"
                            onClick={() => {
                              toast({
                                title: "Next of Kin Added",
                                description: "Emergency contact information has been saved successfully",
                              });
                            }}
                            className="flex items-center gap-3 bg-gradient-to-r from-primary/10 via-primary/8 to-primary/10 hover:from-primary/20 hover:via-primary/15 hover:to-primary/20 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 hover:shadow-lg group px-8 py-3"
                          >
                            <div className="h-6 w-6 rounded-full bg-primary/20 group-hover:bg-primary/30 flex items-center justify-center transition-colors duration-200">
                              <Plus className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-200" />
                            </div>
                            <span className="font-medium text-sm sm:text-base">Add Next of Kin</span>
                          </Button>
                        </div>

                        {/* Next of Kin Management */}
                        <div className="space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300 delay-300">
                          <div className="flex items-center gap-3 pb-3 border-b border-border/40 hover:border-primary/30 transition-colors duration-200">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 flex items-center justify-center ring-2 ring-green-200/50 dark:ring-green-800/50 hover:ring-green-300/70 dark:hover:ring-green-700/70 transition-all duration-200 hover:scale-105">
                              <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <h4 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">Added Contacts</h4>
                            <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-primary/20 to-transparent"></div>
                          </div>

                          {/* Placeholder for added contacts - would show a list/table of added next of kin */}
                          <div className="text-center py-8">
                            <div className="h-12 w-12 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-3">
                              <Users className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              No emergency contacts added yet. Click "Add Next of Kin" to add emergency contact information.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 7: Anti Money Laundering */}
                  {currentStep === 7 && (
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-card via-card to-muted/5">
                      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-border/50 pb-3 sm:pb-6 px-4 sm:px-6">
                        <CardTitle className="flex items-center gap-3 text-base sm:text-lg">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                          </div>
                          Anti Money Laundering
                        </CardTitle>
                        <CardDescription className="text-sm">
                          Complete AML compliance information for regulatory requirements
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                        {/* Source of Wealth Section */}
                        <div className="space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300 delay-100">
                          <div className="flex items-center gap-3 pb-3 border-b border-border/40 hover:border-primary/30 transition-colors duration-200">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 flex items-center justify-center ring-2 ring-blue-200/50 dark:ring-blue-800/50 hover:ring-blue-300/70 dark:hover:ring-blue-700/70 transition-all duration-200 hover:scale-105">
                              <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h4 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Source of Wealth</h4>
                            <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-primary/20 to-transparent"></div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <FormField
                              control={form.control}
                              name="sourceOfWealth.code"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                    <Hash className="h-4 w-4 text-primary/70" />
                                    Wealth Code *
                                  </FormLabel>
                                  <Select onValueChange={(value) => {
                                    field.onChange(value);
                                    // Auto-set description based on code
                                    const descriptions = {
                                      "001": "SALARY",
                                      "002": "BUSINESS",
                                      "003": "INVESTMENT",
                                      "004": "INHERITANCE",
                                      "005": "OTHER"
                                    };
                                    form.setValue("sourceOfWealth.description", descriptions[value as keyof typeof descriptions] || "");
                                  }} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-12">
                                        <SelectValue placeholder="Select wealth source" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="001">001 - SALARY</SelectItem>
                                      <SelectItem value="002">002 - BUSINESS</SelectItem>
                                      <SelectItem value="003">003 - INVESTMENT</SelectItem>
                                      <SelectItem value="004">004 - INHERITANCE</SelectItem>
                                      <SelectItem value="005">005 - OTHER</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage className="text-red-500 text-sm mt-1" />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="sourceOfWealth.description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-primary/70" />
                                    Description
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Auto-filled based on code"
                                      {...field}
                                      readOnly
                                      className="bg-muted/50 border-2 border-muted/30 text-muted-foreground cursor-not-allowed h-12"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500 text-sm mt-1" />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="sourceOfWealth.wealthValue"
                              render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                  <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                    <DollarSign className="h-4 w-4 text-primary/70" />
                                    Wealth Value *
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter wealth value"
                                      {...field}
                                      className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-12"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500 text-sm mt-1" />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        {/* Transaction Types Section */}
                        <div className="space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300 delay-200">
                          <div className="flex items-center gap-3 pb-3 border-b border-border/40 hover:border-primary/30 transition-colors duration-200">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 flex items-center justify-center ring-2 ring-green-200/50 dark:ring-green-800/50 hover:ring-green-300/70 dark:hover:ring-green-700/70 transition-all duration-200 hover:scale-105">
                              <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <h4 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">Transaction Types</h4>
                            <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-primary/20 to-transparent"></div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                              { code: "001", description: "CASH DEPOSITS" },
                              { code: "002", description: "INWARD TRANSFERS" },
                              { code: "003", description: "CHEQUE DEPOSITS" },
                              { code: "004", description: "ATM DEPOSITS" },
                              { code: "005", description: "OTHER DEPOSITS" },
                            ].map((transactionType) => (
                              <FormField
                                key={transactionType.code}
                                control={form.control}
                                name={`transactionTypes.${transactionType.code === "001" ? 0 : transactionType.code === "002" ? 1 : transactionType.code === "003" ? 2 : transactionType.code === "004" ? 3 : 4}.checked`}
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                      <FormLabel className="text-sm font-medium">
                                        {transactionType.code} - {transactionType.description}
                                      </FormLabel>
                                    </div>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Source of Funds Section */}
                        <div className="space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300 delay-300">
                          <div className="flex items-center gap-3 pb-3 border-b border-border/40 hover:border-primary/30 transition-colors duration-200">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 flex items-center justify-center ring-2 ring-purple-200/50 dark:ring-purple-800/50 hover:ring-purple-300/70 dark:hover:ring-purple-700/70 transition-all duration-200 hover:scale-105">
                              <Building2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h4 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">Source of Funds</h4>
                            <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-primary/20 to-transparent"></div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                              { code: "001", description: "SALARY" },
                              { code: "002", description: "BUSINESS" },
                              { code: "003", description: "INVESTMENT" },
                              { code: "004", description: "INHERITANCE" },
                              { code: "005", description: "OTHER" },
                            ].map((fundSource) => (
                              <FormField
                                key={fundSource.code}
                                control={form.control}
                                name={`sourceOfFunds.${fundSource.code === "001" ? 0 : fundSource.code === "002" ? 1 : fundSource.code === "003" ? 2 : fundSource.code === "004" ? 3 : 4}.checked`}
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                      <FormLabel className="text-sm font-medium">
                                        {fundSource.code} - {fundSource.description}
                                      </FormLabel>
                                    </div>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Other Details Section */}
                        <div className="space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300 delay-400">
                          <div className="flex items-center gap-3 pb-3 border-b border-border/40 hover:border-primary/30 transition-colors duration-200">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 flex items-center justify-center ring-2 ring-orange-200/50 dark:ring-orange-800/50 hover:ring-orange-300/70 dark:hover:ring-orange-700/70 transition-all duration-200 hover:scale-105">
                              <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <h4 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">Other Details</h4>
                            <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-primary/20 to-transparent"></div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            <FormField
                              control={form.control}
                              name="noOfWithdrawalPerMonth"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                    <ArrowDown className="h-4 w-4 text-primary/70" />
                                    Withdrawals/Month
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="0"
                                      min="0"
                                      {...field}
                                      className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-12"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500 text-sm mt-1" />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="amtWithdrawalsPerMonth"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                    <DollarSign className="h-4 w-4 text-primary/70" />
                                    Withdrawal Amount
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="0.00"
                                      min="0"
                                      step="0.01"
                                      {...field}
                                      className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-12"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500 text-sm mt-1" />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="noOfDepositsPerMonth"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                    <ArrowUp className="h-4 w-4 text-primary/70" />
                                    Deposits/Month *
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="0"
                                      min="1"
                                      {...field}
                                      className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-12"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500 text-sm mt-1" />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="amountDepositsPerMonth"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                                    <DollarSign className="h-4 w-4 text-primary/70" />
                                    Deposit Amount *
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="0.00"
                                      min="0.01"
                                      step="0.01"
                                      {...field}
                                      className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-12"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500 text-sm mt-1" />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Navigation Buttons */}
                  <Card className="border-0 shadow-xl bg-gradient-to-r from-card via-card to-muted/10 animate-in fade-in-50 slide-in-from-bottom-4 duration-500 delay-200">
                    <CardContent className="pt-3 sm:pt-6 px-4 sm:px-6">
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                          disabled={currentStep === 1}
                          className="flex items-center gap-2 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto h-10 sm:h-11 px-4 sm:px-6"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Previous
                        </Button>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 px-3 sm:px-4 py-2 rounded-full">
                          <span className="font-medium">Step {currentStep} of {steps.length}</span>
                        </div>
                        {currentStep < steps.length ? (
                          <Button
                            type="button"
                            onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                            className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto h-10 sm:h-11 px-4 sm:px-6"
                          >
                            Next
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            disabled={!(currentStep === 7 && isAMLStepComplete())}
                            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto h-10 sm:h-11 px-4 sm:px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <CheckCircle className="h-4 w-4" />
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

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader className="space-y-2 sm:space-y-3">
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              Please Confirm Your Details
            </DialogTitle>
            <DialogDescription className="text-sm">
              Please review the information below before submitting your account creation request.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-3 sm:px-4 py-2 text-left font-semibold text-xs sm:text-sm">Field</th>
                      <th className="px-3 sm:px-4 py-2 text-left font-semibold text-xs sm:text-sm">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm">Account Type</td>
                      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{accountMode === "individual" ? "I - INDIVIDUAL" : "J - JOINT"}</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm">Customer Name</td>
                      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{form.getValues("persons.0.firstName")} {form.getValues("persons.0.surname")}</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm">Currency</td>
                      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{form.getValues("currency") || "Not specified"}</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm">Sector</td>
                      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{form.getValues("sector")}</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm">Member Type</td>
                      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{form.getValues("memberClassification") === "member" ? "M - MEMBER" : "N - NON-MEMBER"}</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm">Member Account Name</td>
                      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{form.getValues("memberAccountName")}</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm">Customer Segment</td>
                      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{form.getValues("customerSegment")}</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm">Relation Manager</td>
                      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{form.getValues("relationManager")}</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm">Account Mandate</td>
                      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{form.getValues("accountMandate")}</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm">Source of Wealth</td>
                      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{form.getValues("sourceOfWealth.description") || "Not specified"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              className="flex items-center gap-2 w-full sm:w-auto h-10 sm:h-11 px-4 sm:px-6"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => handleConfirmSubmit(form.getValues())}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 w-full sm:w-auto h-10 sm:h-11 px-4 sm:px-6"
            >
              <CheckCircle className="h-4 w-4" />
              Confirm & Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default IndividualJointAccountCreation;
