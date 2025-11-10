import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';

function Paywall() {
  const [isTrialExpired, setIsTrialExpired] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(null);

  useEffect(() => {
    checkTrialStatus();
    const interval = setInterval(checkTrialStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const checkTrialStatus = () => {
    const TRIAL_DAYS = 90;
    const trialStartDate = localStorage.getItem('collabhire_trial_start');
    
    if (!trialStartDate) {
      const now = new Date().getTime();
      localStorage.setItem('collabhire_trial_start', now.toString());
      setDaysRemaining(TRIAL_DAYS);
      setIsTrialExpired(false);
    } else {
      const startTime = parseInt(trialStartDate);
      const now = new Date().getTime();
      const daysPassed = Math.floor((now - startTime) / (1000 * 60 * 60 * 24));
      const remaining = TRIAL_DAYS - daysPassed;
      
      setDaysRemaining(remaining);
      setIsTrialExpired(remaining <= 0);
    }
  };

  const handleSubscribe = () => {
    window.open('https://buy.stripe.com/9B69AS0VHeeVfDo7Et7ss04', '_blank');
  };

  if (!isTrialExpired) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock size={32} className="text-red-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your Free Trial Has Ended
        </h2>
        
        <p className="text-gray-600 mb-6">
          You've been using CollabHire for 3 months! To continue accessing your AI recruitment assistant, please subscribe.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="text-3xl font-bold text-gray-900 mb-1">$9.99 AUD</div>
          <div className="text-sm text-gray-500">per month</div>
          <ul className="mt-4 space-y-2 text-left text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span> Unlimited AI conversations
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span> All recruitment tools
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span> SkillPath career mobility
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span> Priority support
            </li>
          </ul>
        </div>

        <button
          onClick={handleSubscribe}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-3"
        >
          Subscribe Now
        </button>

        <p className="text-xs text-gray-500">
          Cancel anytime. No hidden fees.
        </p>
      </div>
    </div>
  );
}

export default Paywall;
