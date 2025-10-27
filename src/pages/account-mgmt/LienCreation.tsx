import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Save, X } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";

const LienCreation = () => {
  const [lienDate, setLienDate] = useState<Date>();
  const [expiryDate, setExpiryDate] = useState<Date>();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader>
            <SidebarTrigger />
            <div>
              <h1 className="text-xl font-semibold">Lien Creation</h1>
              <p className="text-sm text-muted-foreground">
                Create a new lien on customer account
              </p>
            </div>
          </AppHeader>

          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
              {/* Welcome Section
              <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">Welcome to Lien Creation</h2>
                      <p className="text-muted-foreground mb-4">
                        Create and manage account liens efficiently. A lien is a legal claim or restriction placed on an account 
                        that prevents the customer from accessing a specified amount until certain conditions are met.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="flex items-start gap-2">
                          <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                          </div>
                          <div>
                            <p className="font-semibold text-sm">Enter Account Details</p>
                            <p className="text-xs text-muted-foreground">Specify the account number</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
                          </div>
                          <div>
                            <p className="font-semibold text-sm">Define Lien Terms</p>
                            <p className="text-xs text-muted-foreground">Set amount, type, and dates</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 dark:text-blue-400 font-bold">3</span>
                          </div>
                          <div>
                            <p className="font-semibold text-sm">Submit Request</p>
                            <p className="text-xs text-muted-foreground">Review and create the lien</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card> */}

              <Card className="border-0 shadow-lg">
                {/* <CardHeader className="border-b bg-gradient-to-r from-primary/10 to-primary/5">
                  <CardTitle className="text-lg">Lien Information</CardTitle>
                </CardHeader> */}
                <CardContent className="p-6">
                  <form className="space-y-6">
                    {/* Account Information Section */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Account Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="accountNumber">Account Number *</Label>
                          <Input
                            id="accountNumber"
                            placeholder="Enter account number"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="accountName">Account Name</Label>
                          <Input
                            id="accountName"
                            placeholder="Auto-populated"
                            disabled
                            className="bg-muted"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Lien Details Section */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Lien Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* <div className="space-y-2">
                          <Label htmlFor="lienType">Lien Type *</Label>
                          <Select>
                            <SelectTrigger id="lienType">
                              <SelectValue placeholder="Select lien type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="legal">Legal Lien</SelectItem>
                              <SelectItem value="collateral">Collateral Lien</SelectItem>
                              <SelectItem value="deposit">Deposit Lien</SelectItem>
                              <SelectItem value="court">Court Order Lien</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div> */}

                        <div className="space-y-2">
                          <Label htmlFor="lienAmount">Lien Amount *</Label>
                          <Input
                            id="lienAmount"
                            type="number"
                            placeholder="0.00"
                            step="0.01"
                            required
                          />
                        </div>
{/* 
                        <div className="space-y-2">
                          <Label htmlFor="currency">Currency *</Label>
                          <Select>
                            <SelectTrigger id="currency">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ghs">GHS - Ghana Cedis</SelectItem>
                              <SelectItem value="usd">USD - US Dollar</SelectItem>
                              <SelectItem value="eur">EUR - Euro</SelectItem>
                              <SelectItem value="gbp">GBP - British Pound</SelectItem>
                            </SelectContent>
                          </Select>
                        </div> */}

                        <div className="space-y-2">
                          <Label>Effecttive Date *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !lienDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {lienDate ? (
                                  format(lienDate, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={lienDate}
                                onSelect={setLienDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="space-y-2">
                          <Label>Expiry Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !expiryDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {expiryDate ? (
                                  format(expiryDate, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={expiryDate}
                                onSelect={setExpiryDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="space-y-2">
                          <Label>Next Renewal Date Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !expiryDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {expiryDate ? (
                                  format(expiryDate, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={expiryDate}
                                onSelect={setExpiryDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>

                    {/* Remarks Section */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Additional Information
                      </h3>
                      <div className="space-y-2">
                        <Label htmlFor="remarks">Remarks/Notes</Label>
                        <Textarea
                          id="remarks"
                          placeholder="Enter any additional remarks or notes"
                          rows={4}
                          className="resize-none"
                        />
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t">
                      <Button variant="outline" type="button">
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-primary">
                        <Save className="mr-2 h-4 w-4" />
                        Create Lien
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LienCreation;
