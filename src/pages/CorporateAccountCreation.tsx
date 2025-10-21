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
  DialogTrigger,
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
  Globe,
  Factory,
} from "lucide-react";

// Form validation schema for corporate accounts
const corporateFormSchema = z.object({
  // Step 1: Member Info
  registeredName: z.string().trim().min(2, "Registered name is required").max(100),
  memberCategory: z.string().default("SOLE PROPRIETORSHIP"),
  memberId: z.string().optional(), // Auto-generated
  receiptCode: z.string().optional(),

  // Step 2: Corporate Information
  countryOfRegistration: z.string().min(1, "Country of registration is required"),
  physicalAddress: z.string().trim().min(10, "Physical address is required").max(200),
  postalAddress: z.string().trim().max(200).optional(),
  plotNumber: z.string().trim().max(50).optional(),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  telephoneNumber: z.string().trim().min(10, "Telephone number is required").max(20),
  country: z.string().min(1, "Country is required"),
  email: z.string().trim().email("Invalid email address").max(100),
  preferredLanguage: z.string().min(1, "Preferred language is required"),
  descriptionOfBusiness: z.string().trim().max(500).optional(),
  townCity: z.string().trim().min(2, "Town/City is required").max(50),
  dateOfIncorporation: z.string().min(1, "Date of incorporation is required"),
  postalCode: z.string().trim().max(20).optional(),
  communicationMode: z.string().min(1, "Communication mode is required"),
  primaryPhoneNumber: z.string().trim().min(10, "Primary phone number is required").max(20),
  faxNumber: z.string().trim().max(20).optional(),
  kraPin: z.string().trim().min(1, "KRA Pin is required").max(20),
  companyRegistrationNo: z.string().trim().min(1, "Company registration number is required").max(50),
  banksSistComp: z.string().min(1, "Bank's Sist. Comp is required"),

  // Contact Personnel
  contactPersonnel: z.array(z.object({
    fullName: z.string().trim().min(2, "Full name is required").max(100),
    email: z.string().trim().email("Invalid email address").max(100),
    telephoneNumber: z.string().trim().min(10, "Telephone number is required").max(20),
  })).min(1, "At least one contact personnel is required"),

  // Associate Companies
  associateCompanies: z.array(z.object({
    associateCompany: z.string().trim().min(2, "Associate company name is required").max(100),
    address: z.string().trim().min(10, "Address is required").max(200),
  })).default([]),

  // Step 3: Account Details
  memberClassification: z.string().min(1, "Please select member classification"),
  productGroup: z.string().optional(),
  productSubGroup: z.string().optional(),
  currency: z.string().optional(),
  customerSegment: z.string().default("30 - CORPORATE BANKING"),
  subCustomerSegment: z.string().default("3001 - LARGE CORPORATES"),
  sector: z.string().default("81 - COMMERCIAL"),
  subSector: z.string().default("8101 - COMMERCIAL BANKS"),
  documentRequiredType: z.string().default("IDD - BUSINESS CURRENT ACCOUNT"),
  introductorySource: z.string().default("2016060 - YUKU VOKER"),
  relationManager: z.string().min(1, "Relation manager is required").default("X000 - UNASSIGNED"),

  // Stakeholders
  stakeholders: z.array(z.object({
    relationNo: z.string().optional(),
    relationId: z.string().optional(),
    firstName: z.string().trim().min(2, "First name is required").max(50),
    middleName: z.string().trim().max(50).optional(),
    surname: z.string().trim().min(2, "Surname is required").max(50),
    gender: z.string().min(1, "Gender is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    phoneNumber: z.string().trim().min(10, "Phone number is required").max(20),
    nationalId: z.string().trim().min(1, "National ID is required").max(20),
    mobileNumber1: z.string().trim().min(10, "Mobile number 1 is required").max(20),
    mobileNumber2: z.string().trim().max(20).optional(),
    email: z.string().trim().email("Invalid email address").max(100),
  })).default([]),

  // Step 5: Mandate / Signatory
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

  // Step 6: Documents
  documentsInfo: z.string().optional(),

  // Step 7: Anti Money Laundering
  sourceOfWealth: z.array(z.object({
    code: z.string().min(1, "Please select source of wealth"),
    description: z.string().min(1, "Please select source of wealth"),
    wealthValue: z.string().min(1, "Wealth value is required"),
  })).min(1, "At least one source of wealth is required"),
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

type CorporateFormValues = z.infer<typeof corporateFormSchema>;

const CorporateAccountCreation = () => {
  const { toast } = useToast();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showStakeholderDialog, setShowStakeholderDialog] = useState(false);
  const [stakeholderForm, setStakeholderForm] = useState({
    firstName: "",
    middleName: "",
    surname: "",
    gender: "",
    dateOfBirth: "",
    nationalId: "",
    mobileNumber1: "",
    mobileNumber2: "",
    phoneNumber: "",
    email: "",
  });
  // Helper function to get relationship requirements based on member category
  const getRelationshipRequirements = (category: string) => {
    const requirements = {
      "SOLE PROPRIETORSHIP": { count: 1, description: "1 relationship required" },
      "PARTNERSHIP": { count: 2, description: "2 relationships required (partners)" },
      "LIMITED COMPANY": { count: 3, description: "3 relationships required (directors)" },
      "NON-PROFIT ORGANIZATION": { count: 2, description: "2 relationships required (trustees)" },
      "TRUST": { count: 2, description: "2 relationships required (trustees)" },
      "COOPERATIVE": { count: 3, description: "3 relationships required (board members)" },
    };
    return requirements[category as keyof typeof requirements] || { count: 1, description: "1 relationship required" };
  };

  const form = useForm<CorporateFormValues>({
    resolver: zodResolver(corporateFormSchema),
    defaultValues: {
      registeredName: "",
      memberCategory: "SOLE PROPRIETORSHIP",
      memberId: `CORP${Math.floor(Math.random() * 1000000)}`,
      receiptCode: "",
      countryOfRegistration: "",
      physicalAddress: "",
      postalAddress: "",
      plotNumber: "",
      websiteUrl: "",
      telephoneNumber: "",
      country: "",
      email: "",
      preferredLanguage: "",
      descriptionOfBusiness: "",
      townCity: "",
      dateOfIncorporation: "",
      postalCode: "",
      communicationMode: "",
      primaryPhoneNumber: "",
      faxNumber: "",
      kraPin: "",
      companyRegistrationNo: "",
      banksSistComp: "",
      contactPersonnel: [{
        fullName: "",
        email: "",
        telephoneNumber: "",
      }],
      associateCompanies: [],
      memberClassification: "",
      productGroup: "",
      productSubGroup: "",
      currency: "",
      customerSegment: "30 - CORPORATE BANKING",
      subCustomerSegment: "3001 - LARGE CORPORATES",
      sector: "81 - COMMERCIAL",
      subSector: "8101 - COMMERCIAL BANKS",
      documentRequiredType: "IDD - BUSINESS CURRENT ACCOUNT",
      introductorySource: "2016060 - YUKU VOKER",
      relationManager: "X000 - UNASSIGNED",
      stakeholders: [],
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
      sourceOfWealth: [{
        code: "",
        description: "",
        wealthValue: "",
      }],
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
    },
  });

  const selectedCategory = form.watch("memberCategory") || "SOLE PROPRIETORSHIP";
  const relationshipInfo = getRelationshipRequirements(selectedCategory);

  const { fields: contactPersonnelFields, append: appendContactPersonnel, remove: removeContactPersonnel } = useFieldArray({
    control: form.control,
    name: "contactPersonnel",
  });

  const { fields: associateCompaniesFields, append: appendAssociateCompany, remove: removeAssociateCompany } = useFieldArray({
    control: form.control,
    name: "associateCompanies",
  });

  const { fields: sourceOfWealthFields, append: appendSourceOfWealth, remove: removeSourceOfWealth } = useFieldArray({
    control: form.control,
    name: "sourceOfWealth",
  });

  const onSubmit = (data: CorporateFormValues) => {
    console.log("Corporate form submitted:", data);
    setShowConfirmDialog(true);
  };

  const isAMLStepComplete = () => {
    const values = form.getValues();
    return (
      values.sourceOfWealth?.length > 0 &&
      values.sourceOfWealth[0]?.code &&
      values.sourceOfWealth[0]?.wealthValue &&
      values.noOfDepositsPerMonth &&
      values.amountDepositsPerMonth
    );
  };

  const handleConfirmSubmit = (data: CorporateFormValues) => {
    console.log("Corporate account created:", data);
    toast({
      title: "Corporate Account Created Successfully",
      description: `Corporate account has been created for ${data.registeredName}`,
    });
    setShowConfirmDialog(false);
  };

  const steps = [
    { number: 1, title: "Member Info", icon: IdCard },
    { number: 2, title: "Corporate Info", icon: Building2 },
    { number: 3, title: "Account Details", icon: CreditCard },
    { number: 4, title: "Stakeholder Type", icon: Users },
    { number: 5, title: "Mandate / Signatory", icon: FileText },
    { number: 6, title: "Documents", icon: FileText },
    { number: 7, title: "Anti Money Laundering", icon: Shield },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-background overflow-x-hidden">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AppHeader>
            <SidebarTrigger />
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
              <h1 className="text-base sm:text-lg md:text-xl font-semibold truncate">Customer & Account Creation</h1>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                Corporate Account Creation
              </p>
            </div>
          </AppHeader>

          <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-auto overflow-x-hidden">
            <div className="max-w-6xl mx-auto space-y-3 sm:space-y-4 md:space-y-6 animate-fade-in">
              {/* Account Type Indicator */}
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardHeader className="pb-3 sm:pb-4 md:pb-6 px-3 sm:px-4 md:px-6">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
                    <Factory className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                    <span className="truncate">Corporate Account Creation</span>
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Create a new corporate account with complete business information
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
                  <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
                    <Building2 className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base text-blue-900 dark:text-blue-100 truncate">{selectedCategory}</p>
                      <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 truncate">{relationshipInfo.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Steps */}
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardContent className="pt-3 sm:pt-4 md:pt-6 px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
                  {/* Progress Bar */}
                  <div className="mb-3 sm:mb-4 md:mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm font-medium text-muted-foreground">Progress</span>
                      <span className="text-xs sm:text-sm font-medium text-primary">{Math.round((currentStep / steps.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-1.5 sm:h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-primary/80 h-1.5 sm:h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${(currentStep / steps.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between overflow-x-auto pb-2 scrollbar-hide gap-0.5 sm:gap-1 md:gap-2 -mx-3 sm:-mx-4 md:-mx-0 px-3 sm:px-4 md:px-0">
                    {steps.map((step, index) => (
                      <div key={step.number} className="flex items-center flex-shrink-0">
                        <div className="flex flex-col items-center min-w-0">
                          <div
                            className={`h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 rounded-full flex items-center justify-center border-2 transition-all ${
                              currentStep >= step.number
                                ? "bg-primary border-primary text-primary-foreground"
                                : "border-muted-foreground/30 text-muted-foreground"
                            }`}
                          >
                            <step.icon className="h-3 w-3 sm:h-4 sm:w-4 md:h-4 md:w-4 lg:h-5 lg:w-5" />
                          </div>
                          <p className="text-[10px] sm:text-xs mt-1 sm:mt-1.5 md:mt-2 font-medium text-center max-w-[45px] sm:max-w-[55px] md:max-w-[70px] lg:max-w-[80px] leading-tight truncate">
                            {step.title.split(" ").slice(0, 2).join(" ")}
                          </p>
                        </div>
                        {index < steps.length - 1 && (
                          <div
                            className={`h-0.5 w-4 sm:w-6 md:w-8 lg:w-12 mx-0.5 sm:mx-1 md:mx-1.5 lg:mx-2 transition-all flex-shrink-0 ${
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
                      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-border/50 pb-3 sm:pb-4 md:pb-6 px-3 sm:px-4 md:px-6">
                        <CardTitle className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg">
                          <div className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <IdCard className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-primary" />
                          </div>
                          <span className="truncate">Member Information</span>
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          Basic corporate member account information
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3 sm:space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                          <FormField
                            control={form.control}
                            name="registeredName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center gap-1.5 sm:gap-2">
                                  <Building2 className="h-3 w-3 sm:h-4 sm:w-4 text-primary/70 flex-shrink-0" />
                                  <span className="truncate">Registered Name *</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter registered company name"
                                    {...field}
                                    className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-9 sm:h-10 md:h-11 text-sm"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500 text-xs sm:text-sm mt-1" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="memberCategory"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center gap-1.5 sm:gap-2">
                                  <Users className="h-3 w-3 sm:h-4 sm:w-4 text-primary/70 flex-shrink-0" />
                                  <span className="truncate">Member Category</span>
                                </FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-9 sm:h-10 md:h-11">
                                      <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="SOLE PROPRIETORSHIP">SOLE PROPRIETORSHIP</SelectItem>
                                    <SelectItem value="PARTNERSHIP">PARTNERSHIP</SelectItem>
                                    <SelectItem value="LIMITED COMPANY">LIMITED COMPANY</SelectItem>
                                    <SelectItem value="NON-PROFIT ORGANIZATION">NON-PROFIT ORGANIZATION</SelectItem>
                                    <SelectItem value="TRUST">TRUST</SelectItem>
                                    <SelectItem value="COOPERATIVE">COOPERATIVE</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormDescription className="text-[10px] sm:text-xs text-muted-foreground">{relationshipInfo.description}</FormDescription>
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

                  {/* Step 2: Corporate Information */}
                  {currentStep === 2 && (
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-card via-card to-muted/5">
                      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-border/50 pb-3 sm:pb-6 px-4 sm:px-6">
                        <CardTitle className="flex items-center gap-3 text-base sm:text-lg">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                          </div>
                          Corporate Information
                        </CardTitle>
                        <CardDescription className="text-sm">
                          Complete corporate registration and business details
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                        {/* Basic Corporate Info */}
                        <div className="space-y-3 sm:space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300 delay-100">
                          <div className="flex items-center gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-border/40 hover:border-primary/30 transition-colors duration-200">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 flex items-center justify-center ring-2 ring-blue-200/50 dark:ring-blue-800/50 hover:ring-blue-300/70 dark:hover:ring-blue-700/70 transition-all duration-200 hover:scale-105">
                              <Building2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h4 className="text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Registration Details</h4>
                            <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-primary/20 to-transparent"></div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                            <FormField
                              control={form.control}
                              name="countryOfRegistration"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Country of registration *</FormLabel>
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
                              name="companyRegistrationNo"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Company Registration No *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter registration number" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="dateOfIncorporation"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Date of Incorporation *</FormLabel>
                                  <FormControl>
                                    <Input type="date" placeholder="dd-mm-yyyy" {...field} />
                                  </FormControl>
                                  <FormDescription className="text-xs text-muted-foreground">Format: dd-mm-yyyy</FormDescription>
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
                              name="banksSistComp"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Bank's Sist. Comp *</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select option" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="No">No</SelectItem>
                                      <SelectItem value="Yes">Yes</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <Separator />

                        {/* Address Information */}
                        <div className="space-y-3 sm:space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300 delay-200">
                          <div className="flex items-center gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-border/40 hover:border-primary/30 transition-colors duration-200">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 flex items-center justify-center ring-2 ring-green-200/50 dark:ring-green-800/50 hover:ring-green-300/70 dark:hover:ring-green-700/70 transition-all duration-200 hover:scale-105">
                              <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <h4 className="text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">Address Information</h4>
                            <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-primary/20 to-transparent"></div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                            <FormField
                              control={form.control}
                              name="physicalAddress"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Physical address *</FormLabel>
                                  <FormControl>
                                    <Textarea placeholder="Enter complete physical address" {...field} rows={3} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="postalAddress"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Postal Address</FormLabel>
                                  <FormControl>
                                    <Textarea placeholder="Enter postal address" {...field} rows={3} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="plotNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Plot number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter plot number" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="townCity"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Town / City *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter town or city" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="postalCode"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Postal code</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter postal code" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <Separator />

                        {/* Contact Information */}
                        <div className="space-y-3 sm:space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300 delay-300">
                          <div className="flex items-center gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-border/40 hover:border-primary/30 transition-colors duration-200">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 flex items-center justify-center ring-2 ring-purple-200/50 dark:ring-purple-800/50 hover:ring-purple-300/70 dark:hover:ring-purple-700/70 transition-all duration-200 hover:scale-105">
                              <Phone className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h4 className="text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">Contact Information</h4>
                            <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-primary/20 to-transparent"></div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                            <FormField
                              control={form.control}
                              name="telephoneNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Telephone number *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="+254 XXX XXX XXX" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="primaryPhoneNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Primary Phone Number *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="+254 XXX XXX XXX" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="faxNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Fax number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter fax number" {...field} />
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
                                    <Input type="email" placeholder="company@example.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="websiteUrl"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Website url</FormLabel>
                                  <FormControl>
                                    <Input placeholder="https://www.company.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

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
                              name="communicationMode"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Communication Mode *</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select mode" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="Mobile">Mobile</SelectItem>
                                      <SelectItem value="Email">Email</SelectItem>
                                      <SelectItem value="SMS">SMS</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <Separator />

                        {/* Business Description */}
                        <div className="space-y-3 sm:space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300 delay-400">
                          <div className="flex items-center gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-border/40 hover:border-primary/30 transition-colors duration-200">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 flex items-center justify-center ring-2 ring-orange-200/50 dark:ring-orange-800/50 hover:ring-orange-300/70 dark:hover:ring-orange-700/70 transition-all duration-200 hover:scale-105">
                              <Globe className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                            </div>
                            <h4 className="text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">Business Description</h4>
                            <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-primary/20 to-transparent"></div>
                          </div>
                          <div className="grid grid-cols-1 gap-4">
                            <FormField
                              control={form.control}
                              name="descriptionOfBusiness"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description Of Business</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Describe the nature of your business activities..."
                                      {...field}
                                      rows={4}
                                      className="resize-none"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <Separator />

                        {/* Contact Personnel */}
                        <div className="space-y-3 sm:space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300 delay-500">
                          <div className="flex items-center gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-border/40 hover:border-primary/30 transition-colors duration-200">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950/50 dark:to-teal-900/50 flex items-center justify-center ring-2 ring-teal-200/50 dark:ring-teal-800/50 hover:ring-teal-300/70 dark:hover:ring-teal-700/70 transition-all duration-200 hover:scale-105">
                              <User className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                            </div>
                            <h4 className="text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">Contact Personnel</h4>
                            <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-primary/20 to-transparent"></div>
                          </div>

                          {contactPersonnelFields.map((field, index) => (
                            <Card key={field.id} className="border-2 border-dashed border-muted-foreground/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-card via-card to-muted/10">
                              <CardHeader className="pb-4 bg-gradient-to-r from-primary/8 via-primary/5 to-transparent border-b border-border/50">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                                      <User className="h-4 w-4 text-primary" />
                                    </div>
                                    <CardTitle className="text-sm sm:text-base">Contact Person {index + 1}</CardTitle>
                                  </div>
                                  {contactPersonnelFields.length > 1 && (
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => removeContactPersonnel(index)}
                                      className="text-destructive hover:text-destructive border-destructive/30 hover:border-destructive/50"
                                    >
                                      <X className="h-3 w-3 mr-1" />
                                      Remove
                                    </Button>
                                  )}
                                </div>
                              </CardHeader>
                              <CardContent className="space-y-4 p-4 sm:p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                  <FormField
                                    control={form.control}
                                    name={`contactPersonnel.${index}.fullName`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Full name *</FormLabel>
                                        <FormControl>
                                          <Input placeholder="Enter full name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`contactPersonnel.${index}.email`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Email *</FormLabel>
                                        <FormControl>
                                          <Input type="email" placeholder="person@company.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`contactPersonnel.${index}.telephoneNumber`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Telephone number *</FormLabel>
                                        <FormControl>
                                          <Input placeholder="+254 XXX XXX XXX" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </CardContent>
                            </Card>
                          ))}

                          <div className="flex justify-center pt-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => appendContactPersonnel({
                                fullName: "",
                                email: "",
                                telephoneNumber: "",
                              })}
                              className="flex items-center gap-2 hover:scale-105 transition-all duration-200"
                            >
                              <Plus className="h-4 w-4" />
                              Add Contact Personnel
                            </Button>
                          </div>
                        </div>

                        <Separator />

                        {/* Associate Companies */}
                        <div className="space-y-3 sm:space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300 delay-600">
                          <div className="flex items-center gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-border/40 hover:border-primary/30 transition-colors duration-200">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/50 dark:to-indigo-900/50 flex items-center justify-center ring-2 ring-indigo-200/50 dark:ring-indigo-800/50 hover:ring-indigo-300/70 dark:hover:ring-indigo-700/70 transition-all duration-200 hover:scale-105">
                              <Building2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <h4 className="text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">Associate Companies</h4>
                            <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-primary/20 to-transparent"></div>
                          </div>

                          {associateCompaniesFields.length > 0 ? (
                            <div className="space-y-4">
                              {associateCompaniesFields.map((field, index) => (
                                <Card key={field.id} className="border border-muted-foreground/20">
                                  <CardContent className="p-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end">
                                      <div className="sm:col-span-2">
                                        <FormField
                                          control={form.control}
                                          name={`associateCompanies.${index}.associateCompany`}
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel className="text-sm">Associate Company</FormLabel>
                                              <FormControl>
                                                <Input placeholder="Company name" {...field} />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                      </div>
                                      <div className="sm:col-span-2">
                                        <FormField
                                          control={form.control}
                                          name={`associateCompanies.${index}.address`}
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel className="text-sm">Address</FormLabel>
                                              <FormControl>
                                                <Input placeholder="Company address" {...field} />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                      </div>
                                      <div className="flex justify-center">
                                        <Button
                                          type="button"
                                          variant="outline"
                                          size="sm"
                                          onClick={() => removeAssociateCompany(index)}
                                          className="text-destructive hover:text-destructive border-destructive/30 hover:border-destructive/50"
                                        >
                                          <X className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-muted-foreground">
                              <Building2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                              <p>No associate companies added</p>
                            </div>
                          )}

                          <div className="flex justify-center pt-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => appendAssociateCompany({
                                associateCompany: "",
                                address: "",
                              })}
                              className="flex items-center gap-2 hover:scale-105 transition-all duration-200"
                            >
                              <Plus className="h-4 w-4" />
                              Add Associate Company
                            </Button>
                          </div>
                        </div>
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
                          Select the appropriate corporate member type and category
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
                                        <SelectItem value="CORPORATE CURRENT - KES">CORPORATE CURRENT - KES</SelectItem>
                                        <SelectItem value="CORPORATE SAVINGS - KES">CORPORATE SAVINGS - KES</SelectItem>
                                        <SelectItem value="BUSINESS CURRENT - KES">BUSINESS CURRENT - KES</SelectItem>
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
                                    <SelectItem value="30 - CORPORATE BANKING">30 - CORPORATE BANKING</SelectItem>
                                    <SelectItem value="20 - BUSINESS BANKING">20 - BUSINESS BANKING</SelectItem>
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
                                    <SelectItem value="3001 - LARGE CORPORATES">3001 - LARGE CORPORATES</SelectItem>
                                    <SelectItem value="3002 - MEDIUM CORPORATES">3002 - MEDIUM CORPORATES</SelectItem>
                                    <SelectItem value="3003 - SMALL CORPORATES">3003 - SMALL CORPORATES</SelectItem>
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
                                    <SelectItem value="8101 - COMMERCIAL BANKS">8101 - COMMERCIAL BANKS</SelectItem>
                                    <SelectItem value="8102 - RETAIL TRADE">8102 - RETAIL TRADE</SelectItem>
                                    <SelectItem value="8103 - WHOLESALE TRADE">8103 - WHOLESALE TRADE</SelectItem>
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
                                    <SelectItem value="IDD - BUSINESS CURRENT ACCOUNT">IDD - BUSINESS CURRENT ACCOUNT</SelectItem>
                                    <SelectItem value="IDD - CORPORATE CURRENT ACCOUNT">IDD - CORPORATE CURRENT ACCOUNT</SelectItem>
                                    <SelectItem value="IDD - BUSINESS SAVINGS ACCOUNT">IDD - BUSINESS SAVINGS ACCOUNT</SelectItem>
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

                  {/* Step 4: Stakeholder Management */}
                  {currentStep === 4 && (
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-card via-card to-muted/5">
                      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-border/50 pb-3 sm:pb-6 px-4 sm:px-6">
                        <CardTitle className="flex items-center gap-3 text-base sm:text-lg">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                          </div>
                          Stakeholder Management
                        </CardTitle>
                        <CardDescription className="text-sm">
                          Manage stakeholders for this corporate account
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                        {/* Stakeholders Table */}
                        <div className="space-y-4 animate-in fade-in-50 slide-in-from-left-4 duration-300 delay-200">
                          <div className="flex items-center gap-3 pb-3 border-b border-border/40 hover:border-primary/30 transition-colors duration-200">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 flex items-center justify-center ring-2 ring-green-200/50 dark:ring-green-800/50 hover:ring-green-300/70 dark:hover:ring-green-700/70 transition-all duration-200 hover:scale-105">
                              <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <h4 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">Stakeholders</h4>
                            <div className="flex-1 h-px bg-gradient-to-r from-border/50 via-primary/20 to-transparent"></div>
                          </div>

                          {form.watch("stakeholders").length > 0 ? (
                            <div className="overflow-x-auto border rounded-lg bg-card shadow-sm -mx-2 sm:mx-0 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                              <div className="min-w-0 sm:min-w-[800px] md:min-w-[900px]">
                                <table className="w-full">
                                  <thead className="bg-muted/50">
                                    <tr>
                                      <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider sticky top-0 bg-muted/50 z-10">
                                        No. of Relation
                                      </th>
                                      <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider sticky top-0 bg-muted/50 z-10">
                                        Relation ID
                                      </th>
                                      <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider sticky top-0 bg-muted/50 z-10">
                                        First Name
                                      </th>
                                      <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider sticky top-0 bg-muted/50 z-10">
                                        Middle Name
                                      </th>
                                      <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider sticky top-0 bg-muted/50 z-10">
                                        Surname
                                      </th>
                                      <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider sticky top-0 bg-muted/50 z-10">
                                        Gender
                                      </th>
                                      <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider sticky top-0 bg-muted/50 z-10">
                                        Date of Birth
                                      </th>
                                      <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider sticky top-0 bg-muted/50 z-10">
                                        Phone Number
                                      </th>
                                      <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider sticky top-0 bg-muted/50 z-10">
                                        Actions
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-border">
                                    {form.watch("stakeholders").map((stakeholder, index) => (
                                      <tr key={index} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-2 sm:px-4 py-3 text-sm font-medium">
                                          {stakeholder.relationNo || `STH${index + 1}`}
                                        </td>
                                        <td className="px-2 sm:px-4 py-3 text-sm">
                                          {stakeholder.relationId || `REL${index + 1}`}
                                        </td>
                                        <td className="px-2 sm:px-4 py-3 text-sm font-medium">
                                          {stakeholder.firstName}
                                        </td>
                                        <td className="px-2 sm:px-4 py-3 text-sm">
                                          {stakeholder.middleName || "-"}
                                        </td>
                                        <td className="px-2 sm:px-4 py-3 text-sm font-medium">
                                          {stakeholder.surname}
                                        </td>
                                        <td className="px-2 sm:px-4 py-3 text-sm">
                                          {stakeholder.gender}
                                        </td>
                                        <td className="px-2 sm:px-4 py-3 text-sm">
                                          {stakeholder.dateOfBirth}
                                        </td>
                                        <td className="px-2 sm:px-4 py-3 text-sm">
                                          {stakeholder.phoneNumber}
                                        </td>
                                        <td className="px-2 sm:px-4 py-3">
                                          <div className="flex items-center gap-2">
                                            <Button
                                              type="button"
                                              variant="outline"
                                              size="sm"
                                              onClick={() => {
                                                // Edit functionality would open modal with pre-filled data
                                                toast({
                                                  title: "Edit Stakeholder",
                                                  description: "Edit functionality would open here",
                                                });
                                              }}
                                              className="h-8 px-2"
                                            >
                                              <Eye className="h-3 w-3" />
                                            </Button>
                                            <Button
                                              type="button"
                                              variant="outline"
                                              size="sm"
                                              onClick={() => {
                                                const currentStakeholders = form.getValues("stakeholders");
                                                const newStakeholders = currentStakeholders.filter((_, i) => i !== index);
                                                form.setValue("stakeholders", newStakeholders);
                                              }}
                                              className="h-8 px-2 text-destructive hover:text-destructive border-destructive/30 hover:border-destructive/50"
                                            >
                                              <X className="h-3 w-3" />
                                            </Button>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-12 text-muted-foreground">
                              <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                              <h3 className="text-lg font-semibold mb-2">No stakeholder details added</h3>
                              <p className="text-sm mb-4">Click "Add Stakeholder" to get started</p>
                            </div>
                          )}

                          {/* Add Stakeholder Button */}
                          <div className="flex justify-center pt-4">
                            <Dialog open={showStakeholderDialog} onOpenChange={setShowStakeholderDialog}>
                              <DialogTrigger asChild>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => {
                                    setStakeholderForm({
                                      firstName: "",
                                      middleName: "",
                                      surname: "",
                                      gender: "",
                                      dateOfBirth: "",
                                      nationalId: "",
                                      mobileNumber1: "",
                                      mobileNumber2: "",
                                      phoneNumber: "",
                                      email: "",
                                    });
                                    setShowStakeholderDialog(true);
                                  }}
                                  className="flex items-center gap-3 bg-gradient-to-r from-primary/10 via-primary/8 to-primary/10 hover:from-primary/20 hover:via-primary/15 hover:to-primary/20 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 hover:shadow-lg group px-6 py-3"
                                >
                                  <div className="h-6 w-6 rounded-full bg-primary/20 group-hover:bg-primary/30 flex items-center justify-center transition-colors duration-200">
                                    <Plus className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-200" />
                                  </div>
                                  <span className="font-medium text-sm sm:text-base">Add Stakeholder</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
                                <DialogHeader className="space-y-2 sm:space-y-3">
                                  <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                                    Add Stakeholder
                                  </DialogTitle>
                                  <DialogDescription className="text-sm">
                                    Enter stakeholder details for this corporate account
                                  </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-6 py-4">
                                  {/* Basic Information */}
                                  <div className="space-y-4">
                                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                      <User className="h-4 w-4 text-primary" />
                                      Basic Information
                                    </h4>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      <div>
                                        <Label className="text-sm font-medium">First Name *</Label>
                                        <Input
                                          placeholder="First Name"
                                          value={stakeholderForm.firstName}
                                          onChange={(e) => setStakeholderForm(prev => ({ ...prev, firstName: e.target.value }))}
                                          className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-11 mt-1"
                                        />
                                      </div>

                                      <div>
                                        <Label className="text-sm font-medium">Last Name *</Label>
                                        <Input
                                          placeholder="Last Name"
                                          value={stakeholderForm.surname}
                                          onChange={(e) => setStakeholderForm(prev => ({ ...prev, surname: e.target.value }))}
                                          className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-11 mt-1"
                                        />
                                      </div>

                                      <div>
                                        <Label className="text-sm font-medium">Middle Name</Label>
                                        <Input
                                          placeholder="Middle Name (Optional)"
                                          value={stakeholderForm.middleName}
                                          onChange={(e) => setStakeholderForm(prev => ({ ...prev, middleName: e.target.value }))}
                                          className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-11 mt-1"
                                        />
                                      </div>

                                      <div>
                                        <Label className="text-sm font-medium">Gender *</Label>
                                        <Select value={stakeholderForm.gender} onValueChange={(value) => setStakeholderForm(prev => ({ ...prev, gender: value }))}>
                                          <SelectTrigger className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-11 mt-1">
                                            <SelectValue placeholder="Select gender" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>

                                      <div>
                                        <Label className="text-sm font-medium">Date of Birth *</Label>
                                        <Input
                                          type="date"
                                          placeholder="Select date of birth"
                                          value={stakeholderForm.dateOfBirth}
                                          onChange={(e) => setStakeholderForm(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                                          className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-11 mt-1"
                                        />
                                      </div>

                                      <div>
                                        <Label className="text-sm font-medium">National ID *</Label>
                                        <Input
                                          placeholder="Enter National ID"
                                          value={stakeholderForm.nationalId}
                                          onChange={(e) => setStakeholderForm(prev => ({ ...prev, nationalId: e.target.value }))}
                                          className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-11 mt-1"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Contact Information */}
                                  <div className="space-y-4">
                                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                      <Phone className="h-4 w-4 text-primary" />
                                      Contact Information
                                    </h4>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      <div>
                                        <Label className="text-sm font-medium">Mobile Number 1 *</Label>
                                        <Input
                                          placeholder="Enter Mobile Number"
                                          value={stakeholderForm.mobileNumber1}
                                          onChange={(e) => setStakeholderForm(prev => ({ ...prev, mobileNumber1: e.target.value }))}
                                          className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-11 mt-1"
                                        />
                                      </div>

                                      <div>
                                        <Label className="text-sm font-medium">Mobile Number 2</Label>
                                        <Input
                                          placeholder="Enter Mobile Number"
                                          value={stakeholderForm.mobileNumber2}
                                          onChange={(e) => setStakeholderForm(prev => ({ ...prev, mobileNumber2: e.target.value }))}
                                          className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-11 mt-1"
                                        />
                                      </div>

                                      <div>
                                        <Label className="text-sm font-medium">Phone Number *</Label>
                                        <Input
                                          placeholder="Enter Phone Number"
                                          value={stakeholderForm.phoneNumber}
                                          onChange={(e) => setStakeholderForm(prev => ({ ...prev, phoneNumber: e.target.value }))}
                                          className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-11 mt-1"
                                        />
                                      </div>

                                      <div>
                                        <Label className="text-sm font-medium">Email *</Label>
                                        <Input
                                          type="email"
                                          placeholder="Enter Email Address"
                                          value={stakeholderForm.email}
                                          onChange={(e) => setStakeholderForm(prev => ({ ...prev, email: e.target.value }))}
                                          className="transition-all duration-200 border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gradient-to-r from-background to-muted/20 h-11 mt-1"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowStakeholderDialog(false)}
                                    className="flex items-center gap-2 w-full sm:w-auto h-10 sm:h-11 px-4 sm:px-6"
                                  >
                                    <X className="h-4 w-4" />
                                    Cancel
                                  </Button>
                                  <Button
                                    type="button"
                                    onClick={() => {
                                      if (stakeholderForm.firstName && stakeholderForm.surname && stakeholderForm.nationalId && stakeholderForm.mobileNumber1 && stakeholderForm.phoneNumber && stakeholderForm.email) {
                                        const currentStakeholders = form.getValues("stakeholders");
                                        const newStakeholder = {
                                          relationNo: `STH${currentStakeholders.length + 1}`,
                                          relationId: `REL${currentStakeholders.length + 1}`,
                                          ...stakeholderForm,
                                        };
                                        form.setValue("stakeholders", [...currentStakeholders, newStakeholder]);
                                        setShowStakeholderDialog(false);
                                        toast({
                                          title: "Stakeholder Added",
                                          description: `${stakeholderForm.firstName} ${stakeholderForm.surname} has been added successfully`,
                                        });
                                      } else {
                                        toast({
                                          title: "Validation Error",
                                          description: "Please fill in all required fields marked with *",
                                          variant: "destructive",
                                        });
                                      }
                                    }}
                                    className="flex items-center gap-2 bg-green-600 hover:bg-green-500 w-full sm:w-auto h-10 sm:h-11 px-4 sm:px-6"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                    Validate Stakeholder
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 5: Mandate / Signatory */}
                  {currentStep === 5 && (
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

                  {/* Step 6: Documents */}
                  {currentStep === 6 && (
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-card via-card to-muted/5">
                      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b border-border/50 pb-3 sm:pb-6 px-4 sm:px-6">
                        <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-base sm:text-lg font-semibold truncate">Add Documents</div>
                            <div className="text-xs sm:text-sm text-muted-foreground">Manage and upload required corporate account opening documents</div>
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
                            <h4 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Required Corporate Documents</h4>
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
                                  {/* Row 1: CERTIFICATE OF INCORPORATION */}
                                  <tr className="hover:bg-muted/30 transition-colors">
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <Checkbox className="h-3 w-3 sm:h-4 sm:w-4" />
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2 text-xs sm:text-sm font-medium">1</td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <div className="flex items-center gap-1 sm:gap-2">
                                        <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-primary/70 flex-shrink-0" />
                                        <span className="text-xs sm:text-sm font-medium truncate max-w-[120px] sm:max-w-none">CERTIFICATE OF INCORPORATION</span>
                                      </div>
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2 text-xs sm:text-sm">100</td>
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
                                      <Select defaultValue="Y">
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

                                  {/* Row 2: MEMORANDUM & ARTICLES OF ASSOCIATION */}
                                  <tr className="hover:bg-muted/30 transition-colors">
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <Checkbox className="h-3 w-3 sm:h-4 sm:w-4" />
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2 text-xs sm:text-sm font-medium">2</td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <div className="flex items-center gap-1 sm:gap-2">
                                        <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-primary/70 flex-shrink-0" />
                                        <span className="text-xs sm:text-sm font-medium truncate max-w-[120px] sm:max-w-none">MEMORANDUM & ARTICLES OF ASSOCIATION</span>
                                      </div>
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2 text-xs sm:text-sm">101</td>
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
                                      <Select defaultValue="Y">
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
                                      <Select defaultValue="Y">
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

                                  {/* Row 4: PROOF OF ADDRESS */}
                                  <tr className="hover:bg-muted/30 transition-colors">
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <Checkbox className="h-3 w-3 sm:h-4 sm:w-4" />
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2 text-xs sm:text-sm font-medium">4</td>
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
                                      <Select defaultValue="Y">
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

                                  {/* Row 5: COMPLETED APPLICATION FORM */}
                                  <tr className="hover:bg-muted/30 transition-colors">
                                    <td className="px-1 sm:px-2 md:px-4 py-2">
                                      <Checkbox className="h-3 w-3 sm:h-4 sm:w-4" />
                                    </td>
                                    <td className="px-1 sm:px-2 md:px-4 py-2 text-xs sm:text-sm font-medium">5</td>
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
                                      <Select defaultValue="Y">
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
                              <span>Showing 1-5 of 5 items</span>
                              <span className="font-medium">Total Records: 5</span>
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

                          <div className="overflow-x-auto border rounded-lg bg-card shadow-sm -mx-2 sm:mx-0 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                            <table className="w-full min-w-[600px]">
                              <thead className="bg-muted/50">
                                <tr>
                                  <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Code
                                  </th>
                                  <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Description
                                  </th>
                                  <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Wealth Value
                                  </th>
                                  <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                  {sourceOfWealthFields.map((field, index) => (
                                    <tr key={field.id} className="hover:bg-muted/30 transition-colors">
                                      <td className="px-2 sm:px-4 py-3 text-sm font-medium">
                                        {String(index + 1).padStart(3, '0')}
                                      </td>
                                      <td className="px-2 sm:px-4 py-3">
                                        <FormField
                                          control={form.control}
                                          name={`sourceOfWealth.${index}.code`}
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormControl>
                                                <Select
                                                  onValueChange={(value) => {
                                                    field.onChange(value);
                                                    // Auto-set description based on code
                                                    const descriptions = {
                                                      "001": "001 - SAVINGS",
                                                      "002": "002 - INHERITANCE",
                                                      "003": "003 - LAND AND BUILDING",
                                                      "004": "004 - SHARES",
                                                      "005": "005 - GIFTS",
                                                      "006": "006 - BUSINESS INTEREST"
                                                    };
                                                    form.setValue(`sourceOfWealth.${index}.description`, descriptions[value as keyof typeof descriptions] || "");
                                                  }}
                                                  value={field.value}
                                                >
                                                  <SelectTrigger className="w-full h-8 text-sm border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20">
                                                    <SelectValue placeholder="Select wealth source" />
                                                  </SelectTrigger>
                                                  <SelectContent>
                                                    <SelectItem value="001">001 - SAVINGS</SelectItem>
                                                    <SelectItem value="002">002 - INHERITANCE</SelectItem>
                                                    <SelectItem value="003">003 - LAND AND BUILDING</SelectItem>
                                                    <SelectItem value="004">004 - SHARES</SelectItem>
                                                    <SelectItem value="005">005 - GIFTS</SelectItem>
                                                    <SelectItem value="006">006 - BUSINESS INTEREST</SelectItem>
                                                  </SelectContent>
                                                </Select>
                                              </FormControl>
                                            </FormItem>
                                          )}
                                        />
                                      </td>
                                      <td className="px-2 sm:px-4 py-3">
                                        <FormField
                                          control={form.control}
                                          name={`sourceOfWealth.${index}.description`}
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormControl>
                                                <Input
                                                  placeholder="Description will auto-fill"
                                                  {...field}
                                                  readOnly
                                                  className="w-full h-8 text-sm border-2 border-border/50 bg-muted/50 text-muted-foreground cursor-not-allowed"
                                                />
                                              </FormControl>
                                            </FormItem>
                                          )}
                                        />
                                      </td>
                                      <td className="px-2 sm:px-4 py-3">
                                        <FormField
                                          control={form.control}
                                          name={`sourceOfWealth.${index}.wealthValue`}
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormControl>
                                                <Input
                                                  placeholder="Enter wealth value"
                                                  {...field}
                                                  className="w-full h-8 text-sm border-2 border-border/50 hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                                />
                                              </FormControl>
                                            </FormItem>
                                          )}
                                        />
                                      </td>
                                      <td className="px-2 sm:px-4 py-3">
                                        {sourceOfWealthFields.length > 1 && (
                                          <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeSourceOfWealth(index)}
                                            className="h-8 px-2 text-destructive hover:text-destructive border-destructive/30 hover:border-destructive/50"
                                          >
                                            <X className="h-3 w-3" />
                                          </Button>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                          </div>

                          {/* Add Source of Wealth Button */}
                          <div className="flex justify-center pt-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => appendSourceOfWealth({
                                code: "",
                                description: "",
                                wealthValue: "",
                              })}
                              className="flex items-center gap-3 bg-gradient-to-r from-primary/10 via-primary/8 to-primary/10 hover:from-primary/20 hover:via-primary/15 hover:to-primary/20 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 hover:shadow-lg group px-6 py-3"
                            >
                              <div className="h-6 w-6 rounded-full bg-primary/20 group-hover:bg-primary/30 flex items-center justify-center transition-colors duration-200">
                                <Plus className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-200" />
                              </div>
                              <span className="font-medium text-sm sm:text-base">Add Source of Wealth</span>
                            </Button>
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
                                  <FormLabel className="text-sm font-medium text-foreground/90">
                                    No of Withdrawal per Month
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
                                  <FormLabel className="text-sm font-medium text-foreground/90">
                                    Amt Withdrawals per Month
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
                                  <FormLabel className="text-sm font-medium text-foreground/90">
                                    No of Deposits per Month *
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
                                  <FormLabel className="text-sm font-medium text-foreground/90">
                                    Amount Deposits per Month
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

                          {/* Navigation */}
                          <div className="flex items-center justify-between pt-4 border-t border-border/50">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setCurrentStep(currentStep - 1)}
                              className="flex items-center gap-2"
                            >
                              Previous
                            </Button>
                            <span className="text-sm text-muted-foreground">Page 1</span>
                            <Button
                              type="button"
                              variant="outline"
                              disabled
                              className="flex items-center gap-2"
                            >
                              Next
                            </Button>
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
                            disabled={!isAMLStepComplete()}
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
              Please Confirm Your Corporate Details
            </DialogTitle>
            <DialogDescription className="text-sm">
              Please review the information below before submitting your corporate account creation request.
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
                      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">C - CORPORATE</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm">Registered Name</td>
                      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{form.getValues("registeredName")}</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm">Company Registration No</td>
                      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{form.getValues("companyRegistrationNo")}</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm">KRA Pin</td>
                      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{form.getValues("kraPin")}</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm">Country</td>
                      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{form.getValues("country")}</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm">Customer Segment</td>
                      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{form.getValues("customerSegment")}</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm">Sector</td>
                      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{form.getValues("sector")}</td>
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
                      <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">
                        {form.getValues("sourceOfWealth")?.length > 0
                          ? form.getValues("sourceOfWealth").map((wealth, index) =>
                              wealth.description ? `${wealth.description} (${wealth.wealthValue || 'No value'})` : 'Not specified'
                            ).join(', ')
                          : 'Not specified'
                        }
                      </td>
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

export default CorporateAccountCreation;