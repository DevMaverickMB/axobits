import React, { useState, useEffect } from 'react';
import { X, Calendar, ArrowRight, Loader2, Check, ChevronDown } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const DemoModal: React.FC = () => {
  const { isModalOpen, closeModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      const timer = setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const fname = formData.get('fname') as string;
    const lname = formData.get('lname') as string;
    const email = formData.get('email') as string;
    const company = formData.get('company') as string;
    const usecase = formData.get('usecase') as string;

    // Simulate server request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Construct Mailto Link
      const subject = encodeURIComponent(`Conversation request from ${company}`);
      const body = encodeURIComponent(
        `Hello AXOBITS Team,\n\nI would like to request a conversation.\n\nDetails:\nName: ${fname} ${lname}\nEmail: ${email}\nCompany: ${company}\nInterest: ${usecase}\n\nPlease contact me to schedule a time.\n\nBest,\n${fname}`
      );
      
      // Trigger Email Client
      window.location.href = `mailto:hello@axobits.com?subject=${subject}&body=${body}`;
    }, 1500);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div className="absolute inset-0 modal-overlay" onClick={closeModal}></div>
      
      {/* Modal Content */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-[#121214] border border-white/10 w-full max-w-lg rounded-3xl p-8 relative shadow-2xl animate-scale-in">
          
          <button onClick={closeModal} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-500/10 text-brand-400 mb-4">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Request a conversation</h3>
            <p className="text-gray-400 text-sm">Tell us what you’re building and what “done” looks like.</p>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">First Name</label>
                  <input type="text" name="fname" required className="w-full px-4 py-2.5 rounded-lg form-input text-sm focus:ring-1 focus:ring-brand-500" placeholder="Jane" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Last Name</label>
                  <input type="text" name="lname" required className="w-full px-4 py-2.5 rounded-lg form-input text-sm focus:ring-1 focus:ring-brand-500" placeholder="Doe" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Work Email</label>
                <input type="email" name="email" required className="w-full px-4 py-2.5 rounded-lg form-input text-sm focus:ring-1 focus:ring-brand-500" placeholder="jane@company.com" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Company Name</label>
                <input type="text" name="company" required className="w-full px-4 py-2.5 rounded-lg form-input text-sm focus:ring-1 focus:ring-brand-500" placeholder="Acme Inc." />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Use Case</label>
                <div className="relative">
                  <select name="usecase" className="w-full px-4 py-2.5 rounded-lg form-input text-sm focus:ring-1 focus:ring-brand-500 appearance-none cursor-pointer bg-[#121214] border border-white/10 text-white">
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Product Engineering">Product engineering</option>
                    <option value="SaaS Development">SaaS development</option>
                    <option value="Integrations">Integrations</option>
                    <option value="Security & Compliance">Security & compliance</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Request conversation</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
              
              <p className="text-[10px] text-gray-500 text-center mt-4">
                By clicking “Request conversation” you agree to our Privacy Policy.
              </p>
            </form>
          ) : (
            <div className="text-center py-10 animate-fade-in">
              <div className="w-16 h-16 bg-brand-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-400">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-2">Request Sent!</h4>
              <p className="text-gray-400 text-sm mb-6">Thank you. We've prepared an email for you to send to our team.</p>
              <button onClick={closeModal} className="text-brand-400 hover:text-brand-300 text-sm font-medium">Close window</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default DemoModal;
