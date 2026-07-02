import React, { useState, useEffect } from 'react';
import { Percent, Sparkles, Save, ShieldAlert } from 'lucide-react';
import { useModal } from '../../context/ModalContext';

const ManageTax = () => {
  const [taxRate, setTaxRate] = useState(5);
  const [inputRate, setInputRate] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showPopup } = useModal();

  const fetchTaxRate = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/tax');
      if (res.ok) {
        const data = await res.json();
        setTaxRate(data.rate);
        setInputRate(data.rate.toString());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaxRate();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const rateValue = parseFloat(inputRate);
    
    if (isNaN(rateValue) || rateValue < 0 || rateValue > 100) {
      showPopup({
        title: 'Validation Error',
        message: 'Please enter a valid GST percentage rate between 0 and 100.',
        type: 'error'
      });
      return;
    }

    try {
      setSaving(true);
      const res = await fetch('/api/tax', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rate: rateValue })
      });

      if (res.ok) {
        setTaxRate(rateValue);
        showPopup({
          title: 'GST Rate Saved',
          message: `The global greenhouse GST rate is now set to ${rateValue}%.`,
          type: 'success'
        });
      } else {
        showPopup({
          title: 'Save Failed',
          message: 'Failed to update the GST configuration rate.',
          type: 'error'
        });
      }
    } catch (err) {
      console.error(err);
      showPopup({
        title: 'Error',
        message: 'An unexpected connection error occurred.',
        type: 'error'
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-base-200/50 p-6 rounded-3xl border border-base-300/40 glass-card">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold font-heading text-base-content flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" /> GST Configuration Panel
          </h1>
          <p className="text-base-content/70 text-sm">Review and update the global GST parameters applied to customer orders.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main settings form */}
          <div className="lg:col-span-2 rounded-[28px] border border-base-300/40 bg-base-200/50 p-6 sm:p-8 glass-card space-y-6">
            <h3 className="text-xl font-bold text-base-content font-heading flex items-center gap-2">
              <Percent className="h-5 w-5 text-primary" /> Global Sales GST Rate
            </h3>
            
            <p className="text-sm text-base-content/75 leading-relaxed">
              Define the percentage value of Goods and Services Tax (GST) to charge during checkout. This configuration operates dynamically across all active transactions, invoice calculations, and admin backend totals.
            </p>

            <form onSubmit={handleSave} className="space-y-6 max-w-md pt-2">
              <div className="form-control w-full space-y-2">
                <label className="text-sm font-semibold text-base-content/85 ml-1">GST Percentage (%)</label>
                <div className="relative">
                  <Percent className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-base-content/40" />
                  <input 
                    type="number" 
                    step="0.01"
                    placeholder="e.g. 5"
                    className="input input-bordered w-full pl-12 pr-4 rounded-xl glass-input text-sm h-11 mt-1"
                    value={inputRate}
                    onChange={(e) => setInputRate(e.target.value)}
                    disabled={saving}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button 
                  type="submit" 
                  disabled={saving}
                  className="btn btn-primary h-11 px-6 rounded-xl btn-premium text-sm font-semibold shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4.5 h-4.5" /> 
                  {saving ? 'Saving...' : 'Save Configuration'}
                </button>
              </div>
            </form>
          </div>

          {/* Info/Warning Panel */}
          <div className="rounded-[28px] border border-base-300/40 bg-base-200/50 p-6 sm:p-8 glass-card space-y-4 h-fit">
            <h4 className="font-bold text-base-content font-heading text-lg flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-warning" /> Administrative Alert
            </h4>
            <div className="space-y-3.5 text-sm text-base-content/80 leading-relaxed">
              <p>
                <strong>Live Syncing:</strong> Modifying the GST rate percentage updates calculations immediately for all current customer checkouts.
              </p>
              <p>
                <strong>Historical Orders:</strong> Order records that have already been finalized and placed will preserve their original invoice rates. Changes do not alter completed transactions retroactively.
              </p>
              <p>
                <strong>Recommended Rates:</strong> Verify local GST tax compliance standards before submitting changes (typical Indian nursery rates range between 5% and 18%).
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default ManageTax;
