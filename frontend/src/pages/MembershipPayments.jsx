import { Check, CreditCard, Download, Calendar } from 'lucide-react';
import { Navigation } from '../components/Navigation';

export function MembershipPayments({ onNavigate }) {
  const plans = [
    {
      name: 'Basic',
      price: 29,
      period: 'month',
      discount: null,
      features: [
        'Access to gym equipment',
        'Locker facilities',
        'Crowd monitoring',
        'Mobile app access',
      ],
      popular: false,
    },
    {
      name: 'Premium',
      price: 79,
      period: 'month',
      discount: null,
      features: [
        'Everything in Basic',
        'Unlimited class bookings',
        'Priority slot booking',
        '2 personal training sessions/month',
        'Nutrition consultation',
      ],
      popular: true,
    },
    {
      name: 'Annual Premium',
      price: 799,
      period: 'year',
      discount: '15% off',
      monthlyEquivalent: 66.58,
      features: [
        'Everything in Premium',
        '12 personal training sessions/year',
        'Free guest passes (4/year)',
        'Exclusive workshops',
        'Premium locker',
      ],
      popular: false,
    },
  ];

  const paymentHistory = [
    { id: 1, date: 'Dec 15, 2025', amount: 79, plan: 'Premium', status: 'paid', invoice: 'INV-2025-12' },
    { id: 2, date: 'Nov 15, 2025', amount: 79, plan: 'Premium', status: 'paid', invoice: 'INV-2025-11' },
    { id: 3, date: 'Oct 15, 2025', amount: 79, plan: 'Premium', status: 'paid', invoice: 'INV-2025-10' },
    { id: 4, date: 'Sep 15, 2025', amount: 79, plan: 'Premium', status: 'paid', invoice: 'INV-2025-09' },
  ];

  return (
    <div className="min-h-screen">
      <Navigation currentPage="membership" role="member" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Membership & Payments</h1>
          <p className="text-neutral-400">Manage your subscription and billing</p>
        </div>

        {/* Current Membership Status */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-8 mb-12 text-white">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-green-100 text-sm mb-2">Current Plan</p>
              <h2 className="text-3xl font-bold mb-1">Premium Membership</h2>
              <p className="text-green-100">Active until December 31, 2026</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="text-sm font-medium">Next Billing</p>
              <p className="text-lg font-bold">Jan 15, 2026</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-green-100 text-sm mb-1">Monthly Cost</p>
              <p className="text-2xl font-bold">$79</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-green-100 text-sm mb-1">Sessions Remaining</p>
              <p className="text-2xl font-bold">2 / 2</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-green-100 text-sm mb-1">Member Since</p>
              <p className="text-2xl font-bold">Jan 2024</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-all">
              Upgrade Plan
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/30 transition-all">
              Update Payment Method
            </button>
          </div>
        </div>

        {/* Membership Plans */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Available Plans</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-xl p-6 border transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/5 border-green-500 shadow-lg shadow-green-500/20'
                    : 'bg-neutral-800/50 border-neutral-700 hover:border-neutral-600'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {plan.discount && (
                  <div className="absolute -top-3 right-4">
                    <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {plan.discount}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <span className="text-neutral-400">/ {plan.period}</span>
                  </div>
                  {plan.monthlyEquivalent && (
                    <p className="text-green-400 text-sm mt-1">
                      ${plan.monthlyEquivalent.toFixed(2)} / month
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-green-400 mt-0.5" />
                      <span className="text-neutral-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-black hover:shadow-lg hover:shadow-green-500/50'
                      : 'bg-neutral-700 text-white hover:bg-neutral-600'
                  }`}
                >
                  {plan.popular ? 'Current Plan' : 'Select Plan'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Payment History</h2>
            <button className="text-green-400 hover:text-green-300 text-sm font-medium">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="text-left py-3 px-4 text-neutral-400 text-sm">Date</th>
                  <th className="text-left py-3 px-4 text-neutral-400 text-sm">Plan</th>
                  <th className="text-left py-3 px-4 text-neutral-400 text-sm">Amount</th>
                  <th className="text-left py-3 px-4 text-neutral-400 text-sm">Status</th>
                  <th className="text-left py-3 px-4 text-neutral-400 text-sm">Invoice</th>
                  <th className="text-right py-3 px-4 text-neutral-400 text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr key={payment.id} className="border-b border-neutral-700/50 hover:bg-neutral-700/30">
                    <td className="py-4 px-4 flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-neutral-400" />
                      <span className="text-white">{payment.date}</span>
                    </td>
                    <td className="py-4 px-4 text-neutral-300">{payment.plan}</td>
                    <td className="py-4 px-4 text-white font-semibold">${payment.amount}</td>
                    <td className="py-4 px-4">
                      <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">
                        {payment.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-neutral-400">{payment.invoice}</td>
                    <td className="py-4 px-4 text-right">
                      <button className="text-green-400 hover:text-green-300">
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Method */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Payment Method</h3>
              <button className="text-green-400 hover:text-green-300 text-sm">Update</button>
            </div>

            <div className="bg-gradient-to-r from-neutral-700 to-neutral-800 rounded-lg p-4 border border-neutral-600">
              <div className="flex items-center justify-between mb-3">
                <CreditCard className="w-8 h-8 text-green-400" />
                <span className="text-white font-medium">VISA</span>
              </div>
              <p className="text-white text-lg font-mono">•••• •••• •••• 4242</p>
              <p className="text-neutral-400 text-sm">Expires 12/2027</p>
            </div>
          </div>

          <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Billing Info</h3>
            <p className="text-white">alex.johnson@email.com</p>
            <p className="text-white">123 Fitness Street, Gym City, GC 12345</p>
          </div>
        </div>
      </div>
    </div>
  );
}
