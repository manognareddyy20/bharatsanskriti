import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle, Landmark, CreditCard, Lock, Sparkles } from 'lucide-react';
import { confirmMockPayment } from '../../services/templeWorkService';

export default function MockPaymentModal({ isOpen, onClose, application, onPaymentCompleted }) {
  const [paymentMethod, setPaymentMethod] = useState('Temple Trust Escrow UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isOpen || !application) return null;

  const finalAmount = application.offeredAmount || application.proposedQuote || 50000;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      try {
        const confirmedApp = confirmMockPayment({
          applicationId: application.id,
          paymentMethod,
          transactionRef: `ESCROW-MOCK-${Math.floor(100000 + Math.random() * 900000)}`
        });
        setIsProcessing(false);
        setPaymentSuccess(true);
        if (onPaymentCompleted) onPaymentCompleted(confirmedApp);
      } catch (err) {
        setIsProcessing(false);
        alert(err.message || 'Error executing mock payment');
      }
    }, 800);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card mock-payment-modal-card" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close Payment Modal"
        >
          <X size={20} />
        </button>

        <div className="modal-header-standard">
          <div className="modal-badge">
            <Lock size={14} />
            <span>Sacred Heritage Escrow Protocol</span>
          </div>
          <h2 className="modal-title">Deposit Project Escrow Payment</h2>
          <p className="modal-subtitle">
            Confirm mutually agreed project funds into simulated secure escrow to finalize commission with <strong>{application.artisanName}</strong>.
          </p>
        </div>

        {paymentSuccess ? (
          <div className="mock-payment-success-box">
            <CheckCircle size={48} className="payment-success-icon" />
            <h3>Project Formally Confirmed!</h3>
            <p className="status-note">
              Status updated to <strong>PROJECT CONFIRMED</strong>. Escrow deposit of <strong>₹{finalAmount.toLocaleString('en-IN')}</strong> has been locked into sacred heritage trust account.
            </p>
            <div className="tx-ref-badge">
              <span>Transaction Ref: {application.transactionRef || 'ESCROW-MOCK-9988'}</span>
            </div>
            <button type="button" className="btn-primary-modal" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <div className="mock-payment-body">
            <div className="payment-summary-card">
              <div className="pay-summary-row">
                <span className="pay-lbl">Project:</span>
                <span className="pay-val">{application.projectTitle}</span>
              </div>
              <div className="pay-summary-row">
                <span className="pay-lbl">Temple Trust:</span>
                <span className="pay-val">{application.templeName}</span>
              </div>
              <div className="pay-summary-row">
                <span className="pay-lbl">Commissioned Artisan:</span>
                <span className="pay-val"><strong>{application.artisanName}</strong> ({application.artisanCraft})</span>
              </div>
              <div className="pay-summary-row big-total">
                <span className="pay-lbl">Total Escrow Amount:</span>
                <span className="pay-val total-amount">₹{finalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="pay-summary-row comm-split">
                <span className="pay-lbl">✦ Platform Fee (10% to Us):</span>
                <span className="pay-val fee">₹{Math.round(finalAmount * 0.10).toLocaleString('en-IN')}</span>
              </div>
              <div className="pay-summary-row comm-split">
                <span className="pay-lbl">✓ Net Artisan Payout (90%):</span>
                <span className="pay-val net">₹{Math.round(finalAmount * 0.90).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Select Payment Method (Mock Simulation)</label>
              <select 
                className="form-input"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="Temple Trust Escrow UPI">Temple Trust Escrow UPI (BHIM/GPay)</option>
                <option value="Devaswom Board Direct Transfer">Devaswom Board Direct NetBanking</option>
                <option value="Sacred Heritage Multi-sig Wallet">Sacred Heritage Escrow Guarantee</option>
              </select>
            </div>

            <div className="escrow-security-note">
              <ShieldCheck size={16} className="shield-icon" />
              <span>Funds are safely held in escrow and disbursed based on mutual milestone sign-offs.</span>
            </div>

            <div className="modal-actions-bar">
              <button type="button" className="btn-secondary-modal" onClick={onClose} disabled={isProcessing}>
                Cancel
              </button>
              <button 
                type="button" 
                className="btn-primary-modal btn-confirm-payment" 
                onClick={handlePay}
                disabled={isProcessing}
              >
                <CreditCard size={16} />
                <span>{isProcessing ? 'Processing Escrow Deposit...' : `Confirm & Deposit ₹${finalAmount.toLocaleString('en-IN')}`}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
