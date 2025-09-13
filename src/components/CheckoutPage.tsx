import { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, ShoppingCart, FileText, BarChart3 } from 'lucide-react';
import { toast } from "sonner@2.0.3";
import PageHeader from "./PageHeader";
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { CartItem } from '../App';

interface CheckoutPageProps {
  cartItems: CartItem[];
  onRemoveFromCart: (itemId: number, itemType: string) => void;
  onClearCart: () => void;
  onNavigate: (page: string) => void;
}

interface AdditionalService {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'benchmark' | 'oecd' | 'ic-agreement';
}

export default function CheckoutPage({ cartItems, onRemoveFromCart, onClearCart, onNavigate }: CheckoutPageProps) {
  const [contactInfo, setContactInfo] = useState({
    email: 'john.doe@company.com'
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '4242 4242 4242 4242',
    expiryDate: '12/28',
    cvv: '123',
    cardholderName: 'John Doe'
  });
  const [billingAddress, setBillingAddress] = useState({
    country: 'United States',
    postalCode: '10001'
  });

  // Mock additional services
  const additionalServices: AdditionalService[] = [
    {
      id: 'benchmark-report',
      name: 'Detailed Comparables Report',
      description: 'Comprehensive benchmarking data',
      price: 2000,
      category: 'benchmark'
    },
    {
      id: 'oecd-report',
      name: 'OECD Transfer Pricing Report',
      description: 'Tax filing documentation',
      price: 6000,
      category: 'oecd'
    },
    {
      id: 'ic-manufacturing',
      name: 'Inter-Company Agreement',
      description: 'Manufacturing Services (SG → CN)',
      price: 4000,
      category: 'ic-agreement'
    },
    {
      id: 'ic-management',
      name: 'Inter-Company Agreement',
      description: 'Management Services (US → SG)',
      price: 4000,
      category: 'ic-agreement'
    },
    {
      id: 'ic-it',
      name: 'Inter-Company Agreement',
      description: 'IT Services (SG → IN)',
      price: 4000,
      category: 'ic-agreement'
    }
  ];

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    const price = item.type === 'analysis' ? 2000 : 6000;
    return total + price;
  }, 0);
  const gstRate = 0.09;
  const gst = subtotal * gstRate;
  const total = subtotal + gst;

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'agreement':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'analysis':
        return <BarChart3 className="w-5 h-5 text-green-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Page Header with Back Arrow */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center space-x-4">
            {/* Back Arrow */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('cart')}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            {/* Title with Icon */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 border border-blue-200">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  <span className="text-blue-600">Secure</span> Checkout
                </h1>
                <p className="text-sm text-gray-600 mt-1">Complete your purchase securely</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
          {/* Left Column - Forms (2/3 width) */}
          <div className="lg:col-span-2 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)] pr-2 scrollbar-thin scrollbar-thumb-gray-300">
            {/* Contact Information - Reduced Size */}
            <Card className="shadow-sm border-gray-200/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-gray-900">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-1.5 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="shadow-sm border-gray-200/60">
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg font-semibold text-gray-900">Payment Method</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-2 space-y-4">
                <div>
                  <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">Card Number</Label>
                  <div className="relative mt-1.5">
                    <Input
                      id="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
                      className="bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 pr-16"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Badge className="bg-blue-600 text-white text-xs px-2 py-1">VISA</Badge>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate" className="text-sm font-medium text-gray-700">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo(prev => ({ ...prev, expiryDate: e.target.value }))}
                      className="mt-1.5 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-sm font-medium text-gray-700">CVV</Label>
                    <Input
                      id="cvv"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo(prev => ({ ...prev, cvv: e.target.value }))}
                      className="mt-1.5 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cardholderName" className="text-sm font-medium text-gray-700">Cardholder Name</Label>
                  <Input
                    id="cardholderName"
                    value={paymentInfo.cardholderName}
                    onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardholderName: e.target.value }))}
                    className="mt-1.5 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Billing Address */}
            <Card className="shadow-sm border-gray-200/60">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-gray-900">Billing Address</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country" className="text-sm font-medium text-gray-700">Country</Label>
                    <Input
                      id="country"
                      value={billingAddress.country}
                      onChange={(e) => setBillingAddress(prev => ({ ...prev, country: e.target.value }))}
                      className="mt-1.5 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="text-sm font-medium text-gray-700">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={billingAddress.postalCode}
                      onChange={(e) => setBillingAddress(prev => ({ ...prev, postalCode: e.target.value }))}
                      className="mt-1.5 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Services Available - Now on same page */}
            <Card className="shadow-sm border-gray-200/60">
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm">+</div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    <span className="text-blue-600">Additional</span> Services Available
                  </CardTitle>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Enhance your <span className="text-blue-600 font-medium">Transfer Pricing</span> analysis with optional professional services
                </p>
              </CardHeader>
              <CardContent className="pt-2 space-y-4">
                {/* Benchmark Analysis */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 text-sm">Benchmark Analysis</h4>
                  
                  <div className="flex justify-between items-start p-3 border border-gray-200 rounded-lg hover:border-teal-300 transition-colors">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900 text-sm">Detailed Comparables Report</h5>
                      <p className="text-xs text-gray-600">Comprehensive benchmarking data</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="font-semibold text-teal-600 text-sm">USD 2,000</div>
                      <Button variant="outline" size="sm" className="mt-1 text-xs border-teal-600 text-teal-600 hover:bg-teal-50">
                        Add to Cart
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between items-start p-3 border border-gray-200 rounded-lg hover:border-teal-300 transition-colors">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900 text-sm">OECD Transfer Pricing Report</h5>
                      <p className="text-xs text-gray-600">Tax filing documentation</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="font-semibold text-teal-600 text-sm">USD 6,000</div>
                      <Button variant="outline" size="sm" className="mt-1 text-xs border-teal-600 text-teal-600 hover:bg-teal-50">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>

                {/* IC Agreement Services */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 text-sm">IC Agreement Services</h4>
                  
                  {additionalServices.filter(s => s.category === 'ic-agreement').slice(0, 2).map((service) => (
                    <div key={service.id} className="flex justify-between items-start p-3 border border-gray-200 rounded-lg hover:border-teal-300 transition-colors">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900 text-sm">{service.name}</h5>
                        <p className="text-xs text-gray-600">{service.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="font-semibold text-teal-600 text-sm">USD {service.price.toLocaleString()}</div>
                        <Button variant="outline" size="sm" className="mt-1 text-xs border-teal-600 text-teal-600 hover:bg-teal-50">
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contact for More */}
                <div className="text-center py-4 border-t border-gray-100">
                  <Button variant="outline" className="text-teal-600 border-teal-600 hover:bg-teal-50 text-sm">
                    Contact Us for Custom Solutions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary (1/3 width) */}
          <div className="lg:col-span-1">
            <Card className="shadow-sm border-gray-200/60 sticky top-6 max-h-[calc(100vh-120px)] overflow-y-auto">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-gray-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="pt-2 space-y-4">
                {/* Cart Items */}
                {cartItems.map((item, index) => {
                  const price = item.type === 'analysis' ? 2000 : 6000;
                  return (
                    <div key={index} className="flex justify-between items-start space-y-3">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="flex-shrink-0 mt-1">
                          {getItemIcon(item.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="font-semibold text-teal-600">USD {price.toLocaleString()}</div>
                      </div>
                    </div>
                  );
                })}

                <Separator className="my-4" />

                {/* Pricing Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">USD {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">GST (9%)</span>
                    <span className="font-medium">USD {Math.round(gst).toLocaleString()}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-teal-600">USD {Math.round(total).toLocaleString()}</span>
                  </div>
                </div>

                {/* Payment Button */}
                <Button 
                  onClick={() => {
                    // Handle final payment
                    toast.success("Payment completed successfully! Thank you for your purchase.", {
                      description: "Your order has been processed and you'll receive a confirmation email shortly.",
                      duration: 4000,
                    });
                    onClearCart();
                    onNavigate('cart');
                  }}
                  className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Complete Payment - USD {Math.round(total).toLocaleString()}
                </Button>

                {/* Payment Methods */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500 mb-3">Accepted payment methods</p>
                  <div className="flex justify-center space-x-2">
                    <Badge className="bg-blue-600 text-white text-xs">Visa</Badge>
                    <Badge className="bg-red-600 text-white text-xs">MC</Badge>
                    <Badge className="bg-blue-500 text-white text-xs">Amex</Badge>
                    <Badge className="bg-blue-700 text-white text-xs">PayPal</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}