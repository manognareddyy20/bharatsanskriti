import React, { useState, useMemo } from 'react';
import { 
  X, Send, Landmark, Calendar, MapPin, CheckCircle, Clock, 
  Sparkles, CheckCircle2, CreditCard, Award, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { 
  getAllEnquiries, 
  getAllApplications, 
  makeProjectOffer, 
  acceptProjectOffer 
} from '../../services/templeWorkService';
import { getCurrentUser } from '../../services/authService';
import MockPaymentModal from './MockPaymentModal';

export default function EnquiryTrackerModal({ isOpen, onClose, onRefreshData }) {
  const currentUser = getCurrentUser();
  const isTempleAdmin = currentUser?.role === 'temple_admin';

  const [activeTab, setActiveTab] = useState('applications'); // 'applications' | 'enquiries'
  const [dataRevision, setDataRevision] = useState(0);

  // Offer modal state
  const [offerModalApp, setOfferModalApp] = useState(null);
  const [offerAmount, setOfferAmount] = useState('');
  const [offerNotes, setOfferNotes] = useState('');

  // Payment modal state
  const [paymentModalApp, setPaymentModalApp] = useState(null);

  const enquiries = useMemo(() => {
    return getAllEnquiries();
  }, [dataRevision, isOpen]);

  const applications = useMemo(() => {
    return getAllApplications();
  }, [dataRevision, isOpen]);

  const displayedApplications = useMemo(() => {
    if (isTempleAdmin || !currentUser) return applications;
    const userApps = applications.filter(a => a.artisanId === currentUser.id || a.artisanName === currentUser.name);
    return userApps.length > 0 ? userApps : applications;
  }, [applications, currentUser, isTempleAdmin]);

  if (!isOpen) return null;

  const handleMakeOfferSubmit = (e) => {
    e.preventDefault();
    if (!offerModalApp) return;

    try {
      makeProjectOffer({
        applicationId: offerModalApp.id,
        finalOfferAmount: Number(offerAmount) || offerModalApp.proposedQuote,
        offerNotes
      });
      setOfferModalApp(null);
      setDataRevision(prev => prev + 1);
      if (onRefreshData) onRefreshData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAcceptOffer = (appId) => {
    try {
      acceptProjectOffer({ applicationId: appId });
      setDataRevision(prev => prev + 1);
      if (onRefreshData) onRefreshData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card enquiry-tracker-modal-card" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close Tracker"
        >
          <X size={20} />
        </button>

        <div className="modal-header-standard">
          <div className="modal-badge">
            <Send size={14} />
            <span>{isTempleAdmin ? 'Temple Administration Portal' : 'Artisan Project Hub'}</span>
          </div>
          <h2 className="modal-title">
            {isTempleAdmin ? 'Project Applicants & Offers Tracker' : 'My Applications & Received Offers'}
          </h2>
          <p className="modal-subtitle">
            {isTempleAdmin 
              ? 'Review applicant proposals, select master artisans, issue formal offer letters, and deposit escrow funds.' 
              : 'Track submitted proposals, review received temple offer letters, and manage project commissions.'}
          </p>
        </div>

        {/* Tab Selection */}
        <div className="tracker-subnav-pills">
          <button 
            type="button" 
            className={`tracker-pill ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            <span>{isTempleAdmin ? `Project Applicants & Offers (${displayedApplications.length})` : `My Applications & Offers (${displayedApplications.length})`}</span>
          </button>
          <button 
            type="button" 
            className={`tracker-pill ${activeTab === 'enquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('enquiries')}
          >
            <span>Direct Consultations ({enquiries.length})</span>
          </button>
        </div>

        <div className="enquiries-tracker-body">
          {/* TAB 1: APPLICATIONS & OFFERS */}
          {activeTab === 'applications' && (
            <div>
              {displayedApplications.length === 0 ? (
                <div className="empty-archive-card">
                  <Send size={40} className="empty-icon" />
                  <h4>{isTempleAdmin ? 'No Project Applications Received Yet' : 'No Submitted Applications Found'}</h4>
                  <p>{isTempleAdmin ? 'When artisans submit quotes for your posted projects, they will appear here for your review.' : 'Browse TempleWork projects and submit quotes to start commissioning.'}</p>
                </div>
              ) : (
                <div className="enquiries-timeline-list">
                  {displayedApplications.map((app) => {
                    const status = app.status || 'APPLICATION_SUBMITTED';

                    return (
                      <div key={app.id} className="enquiry-timeline-card application-card-expanded">
                        <div className="enquiry-card-top">
                          <div className="enquiry-artisan-meta">
                            <strong className="enq-artisan-name">{app.artisanName}</strong>
                            <span className="enq-craft-tag">{app.artisanCraft}</span>
                          </div>

                          <div className="status-lifecycle-badge-wrap">
                            {status === 'APPLICATION_SUBMITTED' && (
                              <span className="status-pill state-submitted">
                                <Clock size={12} /> Application Received
                              </span>
                            )}
                            {status === 'OFFER_MADE' && (
                              <span className="status-pill state-offered">
                                <Sparkles size={12} /> Offer Letter Sent
                              </span>
                            )}
                            {status === 'OFFER_ACCEPTED' && (
                              <span className="status-pill state-accepted">
                                <CheckCircle size={12} /> Offer Accepted
                              </span>
                            )}
                            {status === 'PROJECT_CONFIRMED' && (
                              <span className="status-pill state-confirmed">
                                <ShieldCheck size={12} /> Project Active & Escrow Paid
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="enquiry-project-row">
                          <span className="enq-label">Project:</span>
                          <span className="enq-project-title">{app.projectTitle} ({app.templeName})</span>
                        </div>

                        <div className="app-quotes-grid">
                          <div className="q-item">
                            <span className="q-lbl">Artisan Proposed Quote:</span>
                            <span className="q-val highlight">₹{Number(app.proposedQuote || 0).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="q-item">
                            <span className="q-lbl">Platform Fee (10% to Us):</span>
                            <span className="q-val fee-lbl">₹{Math.round(Number(app.proposedQuote || 0) * 0.10).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="q-item">
                            <span className="q-lbl">Net Artisan Payout (90%):</span>
                            <span className="q-val net-lbl">₹{Math.round(Number(app.proposedQuote || 0) * 0.90).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="q-item">
                            <span className="q-lbl">Proposed Timeline:</span>
                            <span className="q-val">{app.timeline}</span>
                          </div>
                          {app.offeredAmount && (
                            <div className="q-item">
                              <span className="q-lbl">Temple Confirmed Offer:</span>
                              <span className="q-val offer-highlight">₹{Number(app.offeredAmount).toLocaleString('en-IN')}</span>
                            </div>
                          )}
                        </div>

                        {app.proposalNote && (
                          <div className="enquiry-message-preview">
                            <p><strong>Technical Proposal:</strong> “{app.proposalNote}”</p>
                          </div>
                        )}

                        {/* LIFECYCLE ACTIONS TAILORED BY ROLE */}
                        <div className="app-lifecycle-actions-bar">
                          {isTempleAdmin ? (
                            /* TEMPLE ADMIN LIFECYCLE CONTROLS */
                            <>
                              {status === 'APPLICATION_SUBMITTED' && (
                                <button 
                                  type="button" 
                                  className="btn-lifecycle-action btn-make-offer"
                                  onClick={() => {
                                    setOfferModalApp(app);
                                    setOfferAmount(app.proposedQuote);
                                  }}
                                >
                                  <Sparkles size={14} />
                                  <span>Select Artisan & Make Formal Offer</span>
                                </button>
                              )}

                              {status === 'OFFER_MADE' && (
                                <span className="info-pending-txt">Offer Letter Issued — Awaiting Artisan Acceptance...</span>
                              )}

                              {status === 'OFFER_ACCEPTED' && (
                                <button 
                                  type="button" 
                                  className="btn-lifecycle-action btn-deposit-escrow"
                                  onClick={() => setPaymentModalApp(app)}
                                >
                                  <CreditCard size={14} />
                                  <span>Deposit Escrow Payment & Confirm Project</span>
                                </button>
                              )}

                              {status === 'PROJECT_CONFIRMED' && (
                                <div className="confirmed-escrow-badge">
                                  <ShieldCheck size={16} />
                                  <span>Escrow Deposited — Project Confirmed ({app.paymentMethod})</span>
                                </div>
                              )}
                            </>
                          ) : (
                            /* USER / ARTISAN LIFECYCLE CONTROLS */
                            <>
                              {status === 'APPLICATION_SUBMITTED' && (
                                <span className="info-pending-txt">Application Submitted — Pending Temple Review</span>
                              )}

                              {status === 'OFFER_MADE' && (
                                <button 
                                  type="button" 
                                  className="btn-lifecycle-action btn-accept-offer"
                                  onClick={() => handleAcceptOffer(app.id)}
                                >
                                  <CheckCircle size={14} />
                                  <span>Accept Temple Offer (₹{Number(app.offeredAmount || app.proposedQuote).toLocaleString('en-IN')})</span>
                                </button>
                              )}

                              {status === 'OFFER_ACCEPTED' && (
                                <span className="info-pending-txt">Offer Accepted! Awaiting Temple Escrow Payment...</span>
                              )}

                              {status === 'PROJECT_CONFIRMED' && (
                                <div className="confirmed-escrow-badge">
                                  <ShieldCheck size={16} />
                                  <span>Project Formally Confirmed — Work In Progress</span>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DIRECT ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div>
              {enquiries.length === 0 ? (
                <div className="empty-archive-card">
                  <Send size={40} className="empty-icon" />
                  <h4>No Direct Enquiries Sent Yet</h4>
                  <p>Explore master artisan profiles and send project consultations to initiate direct collaboration.</p>
                </div>
              ) : (
                <div className="enquiries-timeline-list">
                  {enquiries.map((enq) => (
                    <div key={enq.id} className="enquiry-timeline-card">
                      <div className="enquiry-card-top">
                        <div className="enquiry-artisan-meta">
                          <strong className="enq-artisan-name">{enq.artisanName}</strong>
                          <span className="enq-craft-tag">{enq.artisanCraft}</span>
                        </div>

                        <span className="enquiry-status-badge">
                          <Clock size={12} />
                          <span>{enq.status || 'ENQUIRY SENT'}</span>
                        </span>
                      </div>

                      <div className="enquiry-project-row">
                        <span className="enq-label">Project:</span>
                        <span className="enq-project-title">{enq.projectTitle}</span>
                      </div>

                      <div className="enquiry-temple-row">
                        <Landmark size={13} />
                        <span>Sent on behalf of: <strong>{enq.templeName}</strong></span>
                      </div>

                      {enq.message && (
                        <div className="enquiry-message-preview">
                          <p>“{enq.message}”</p>
                        </div>
                      )}

                      <div className="enquiry-date-row">
                        <Calendar size={12} />
                        <span>Sent: {new Date(enq.sentAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="modal-actions-bar">
          <button type="button" className="btn-primary-modal" onClick={onClose}>
            Done
          </button>
        </div>
      </div>

      {/* MAKE OFFER MODAL DIALOG */}
      {offerModalApp && (
        <div className="modal-overlay sub-modal-overlay" onClick={() => setOfferModalApp(null)}>
          <div className="modal-card make-offer-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setOfferModalApp(null)}>
              <X size={18} />
            </button>
            <h3 className="modal-title">Make Formal Offer to {offerModalApp.artisanName}</h3>
            <p className="modal-subtitle">
              Project: <strong>{offerModalApp.projectTitle}</strong>
            </p>

            <form onSubmit={handleMakeOfferSubmit} className="create-project-form">
              <div className="form-group">
                <label className="form-label">Agreed Final Offer Amount (₹)</label>
                <div className="budget-input-wrapper">
                  <span className="rupee-symbol">₹</span>
                  <input 
                    type="number"
                    className="form-input budget-num-input"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* 10% Platform Fee & 90% Net Payout Breakdown */}
              <div className="platform-commission-breakdown">
                <div className="comm-row">
                  <span className="comm-lbl">Agreed Offer Amount:</span>
                  <span className="comm-val bold">₹{Number(offerAmount || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="comm-row platform-share">
                  <span className="comm-lbl">✦ Platform Fee (10% to Us):</span>
                  <span className="comm-val fee">₹{Math.round(Number(offerAmount || 0) * 0.10).toLocaleString('en-IN')}</span>
                </div>
                <div className="comm-row artisan-share">
                  <span className="comm-lbl">✓ Net Artisan Payout (90%):</span>
                  <span className="comm-val net">₹{Math.round(Number(offerAmount || 0) * 0.90).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Terms / Note to Artisan (Optional)</label>
                <textarea 
                  className="form-textarea"
                  rows={3}
                  placeholder="e.g. Temple trust approves full materials procurement and 30% advance upon escrow deposit..."
                  value={offerNotes}
                  onChange={(e) => setOfferNotes(e.target.value)}
                />
              </div>

              <div className="modal-actions-bar">
                <button type="button" className="btn-secondary-modal" onClick={() => setOfferModalApp(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary-modal">
                  <Sparkles size={15} />
                  <span>Send Offer (₹{Number(offerAmount).toLocaleString('en-IN')})</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MOCK PAYMENT MODAL */}
      {paymentModalApp && (
        <MockPaymentModal 
          isOpen={Boolean(paymentModalApp)}
          onClose={() => setPaymentModalApp(null)}
          application={paymentModalApp}
          onPaymentCompleted={() => {
            setDataRevision(prev => prev + 1);
            if (onRefreshData) onRefreshData();
          }}
        />
      )}
    </div>
  );
}

