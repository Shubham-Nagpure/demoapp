import { useState } from 'react';
import { ArrowLeft, Trash2, FileText, BarChart3, CreditCard, Lock, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { CartItem } from '../App';

interface CartPageProps {
  cartItems: CartItem[];
  onRemoveFromCart: (itemId: number, itemType: string) => void;
  onClearCart: () => void;
  onNavigate: (page: string) => void;
}

type CartStep = 'cart' | 'checkout' | 'services';

interface AdditionalService {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'benchmark' | 'oecd' | 'ic-agreement';
}

export default function CartPage({ cartItems, onRemoveFromCart, onClearCart, onNavigate }: CartPageProps) {
  const [currentStep, setCurrentStep] = useState<CartStep>('cart');
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
  const subtotal = cartItems.length > 0 ? 4000 : 0; // Base price for first item
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

  const renderCartStep = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => onNavigate('dashboard')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Shopping Cart</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Start exploring our <span className="text-blue-600 font-medium">Transfer Pricing</span> tools
            </p>
            <Button onClick={() => onNavigate('plan')}>
              Explore Plan Module
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            {cartItems.map((item, index) => (
              <Card key={`${item.id}-${item.type}`} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getItemIcon(item.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        {item.description}
                      </p>
                      <div className="text-lg font-medium text-teal-600">
                        USD 4,000
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => onRemoveFromCart(item.id, item.type)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Remove
                  </Button>
                </div>
              </Card>
            ))}

            <Separator />

            {/* Total Section */}
            <div className="flex justify-between items-center">
              <div className="text-xl font-semibold text-gray-900">
                Total:
              </div>
              <div className="text-2xl font-bold text-teal-600">
                USD {total.toLocaleString()}
              </div>
            </div>

            {/* Proceed Button */}
            <Button 
              onClick={() => setCurrentStep('checkout')}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 text-lg"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const renderCheckoutStep = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep('cart')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <CreditCard className="w-5 h-5 text-teal-600" />
                <h3 className="text-lg font-medium text-gray-900">Payment Method</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative mt-1">
                    <Input
                      id="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Badge className="bg-blue-600 text-white text-xs">VISA</Badge>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo(prev => ({ ...prev, expiryDate: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo(prev => ({ ...prev, cvv: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cardholderName">Cardholder Name</Label>
                  <Input
                    id="cardholderName"
                    value={paymentInfo.cardholderName}
                    onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardholderName: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>
            </Card>

            {/* Billing Address */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Address</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={billingAddress.country}
                    onChange={(e) => setBillingAddress(prev => ({ ...prev, country: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={billingAddress.postalCode}
                    onChange={(e) => setBillingAddress(prev => ({ ...prev, postalCode: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <Card className="p-6 sticky top-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
              
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="font-medium">USD 4,000</div>
                  </div>
                </div>
              ))}

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>USD {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (9%)</span>
                  <span>USD {Math.round(gst)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>USD {Math.round(total).toLocaleString()}</span>
                </div>
              </div>

              <Button 
                onClick={() => setCurrentStep('services')}
                className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Lock className="w-4 h-4 mr-2" />
                Pay USD {Math.round(total).toLocaleString()}
              </Button>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 mb-2">Accepted payment methods</p>
                <div className="flex justify-center space-x-2">
                  <Badge className="bg-blue-600 text-white">Visa</Badge>
                  <Badge className="bg-red-600 text-white">MC</Badge>
                  <Badge className="bg-blue-500 text-white">Amex</Badge>
                  <Badge className="bg-blue-700 text-white">PayPal</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  const renderServicesStep = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep('checkout')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <h1 className="text-2xl font-semibold text-gray-900">Additional Services</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Services */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-teal-600 mb-4">
              <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm">→</div>
              <h2 className="text-lg font-medium">Other Reports Available</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Enhance your transfer pricing analysis with additional professional services
            </p>

            {/* Benchmark Analysis */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Benchmark Analysis</h3>
              <Card className="p-4 mb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Detailed Comparables Report</h4>
                    <p className="text-sm text-gray-600">Comprehensive benchmarking data</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="font-medium">USD 2,000</div>
                    <Button variant="outline" size="sm" className="mt-2">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-4 mb-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">OECD Transfer Pricing Report</h4>
                    <p className="text-sm text-gray-600">Tax filing documentation</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="font-medium">USD 6,000</div>
                    <Button variant="outline" size="sm" className="mt-2">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* IC Agreement Services */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">IC Agreement Services</h3>
              {additionalServices.filter(s => s.category === 'ic-agreement').map((service) => (
                <Card key={service.id} className="p-4 mb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{service.name}</h4>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="font-medium">USD {service.price.toLocaleString()}</div>
                      <Button variant="outline" size="sm" className="mt-2">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Additional Services */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Additional Services</h3>
              <div className="text-center py-8">
                <Button variant="outline" className="text-teal-600 border-teal-600">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary (same as checkout) */}
          <div>
            <Card className="p-6 sticky top-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
              
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="font-medium">USD 4,000</div>
                  </div>
                </div>
              ))}

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>USD {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (9%)</span>
                  <span>USD {Math.round(gst)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>USD {Math.round(total).toLocaleString()}</span>
                </div>
              </div>

              <Button 
                onClick={() => {
                  // Handle final payment
                  alert('Payment completed successfully!');
                  onClearCart();
                  onNavigate('dashboard');
                }}
                className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Lock className="w-4 h-4 mr-2" />
                Pay USD {Math.round(total).toLocaleString()}
              </Button>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 mb-2">Accepted payment methods</p>
                <div className="flex justify-center space-x-2">
                  <Badge className="bg-blue-600 text-white">Visa</Badge>
                  <Badge className="bg-red-600 text-white">MC</Badge>
                  <Badge className="bg-blue-500 text-white">Amex</Badge>
                  <Badge className="bg-blue-700 text-white">PayPal</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  // Render based on current step
  switch (currentStep) {
    case 'cart':
      return renderCartStep();
    case 'checkout':
      return renderCheckoutStep();
    case 'services':
      return renderServicesStep();
    default:
      return renderCartStep();
  }
}