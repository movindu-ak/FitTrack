import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dumbbell, CreditCard, Lock, CheckCircle } from 'lucide-react';
import { Input } from '../components/ui/Input';

export const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan, userData } = location.state || {};

  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    amount: plan?.price || ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (!plan) {
      navigate('/signup');
    }
  }, [plan, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return;
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
      if (formattedValue.length > 5) return;
    }

    // Limit CVV to 3 digits
    if (name === 'cvv' && value.length > 3) return;

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    if (!formData.cardHolder || formData.cardHolder.length < 3) {
      newErrors.cardHolder = 'Please enter card holder name';
    }

    if (!formData.expiryDate || formData.expiryDate.length !== 5) {
      newErrors.expiryDate = 'Please enter expiry date (MM/YY)';
    }

    if (!formData.cvv || formData.cvv.length !== 3) {
      newErrors.cvv = 'Please enter 3-digit CVV';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }, 2000);
  };

  if (!plan) return null;

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="bg-green-500 rounded-full p-4">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Payment Successful!</h2>
          <p className="text-neutral-400 mb-2">Your {plan.name} membership has been activated</p>
          <p className="text-neutral-500 text-sm">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900/95 to-black z-10" />
        <img
          src="https://images.unsplash.com/photo-1761971975769-97e598bf526b"
          alt="Gym background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-black/40 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-2 rounded-lg">
              <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              FitTrack
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Complete Your Payment
          </h1>
          <p className="text-neutral-400">Secure payment for {plan.name} membership</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="bg-neutral-900/80 backdrop-blur-lg border border-neutral-800 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="w-5 h-5 text-green-400" />
              <h2 className="text-xl font-semibold text-white">Payment Details</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Card Number"
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                error={errors.cardNumber}
                required
              />

              <Input
                label="Card Holder Name"
                type="text"
                name="cardHolder"
                value={formData.cardHolder}
                onChange={handleChange}
                placeholder="John Doe"
                error={errors.cardHolder}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date"
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  error={errors.expiryDate}
                  required
                />

                <Input
                  label="CVV"
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  error={errors.cvv}
                  required
                />
              </div>

              <Input
                label="Amount"
                type="text"
                name="amount"
                value={`₹${formData.amount}`}
                readOnly
                disabled
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-black px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 hover:shadow-lg hover:shadow-green-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                {loading ? 'Processing...' : `Pay ₹${formData.amount}`}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-4 text-neutral-500 text-xs">
              <Lock className="w-4 h-4" />
              <span>Secure 256-bit SSL encrypted payment</span>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-neutral-900/80 backdrop-blur-lg border border-neutral-800 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="bg-neutral-800/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">{plan.name} Plan</h3>
                <p className="text-neutral-400 text-sm mb-3">{plan.duration}</p>
                <ul className="space-y-2">
                  {plan.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-neutral-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-neutral-800 pt-4 space-y-3">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span>₹{plan.price}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Tax (0%)</span>
                <span>₹0</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-white pt-3 border-t border-neutral-800">
                <span>Total</span>
                <span>₹{plan.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
