import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "react-toastify";
import { getUserProfile } from "../../Service/getUserProfile";
import { inviteFriends } from "../../Service/inviteFriend.Service";

const InviteFriendsPage = () => {
  const [refCode, setRefCode] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState({
    refCode: false,
    inviteLink: false,
  });

  useEffect(() => {
    const fetchReferralCode = async () => {
      try {
        const profileData = await getUserProfile();
        if (profileData?.data?.refCode) {
          const refCode = profileData.data.refCode;
          setRefCode(refCode);
          // const staticBaseUrl = `http://3.91.179.101/sign-up/${refCode}`;
          const staticBaseUrl = `https://add-and-earn-web.vercel.app/sign-up/${refCode}`;
          setInviteLink(staticBaseUrl);
          await inviteFriends(refCode);
        } else {
          toast.error("Referral code not found.");
        }
      } catch (error) {
        toast.error(error.message || "Failed to fetch referral code.");
      }
    };

    fetchReferralCode();
  }, []);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setShowTooltip((prev) => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setShowTooltip((prev) => ({ ...prev, [type]: false }));
    }, 4000);
  };

  return (
    <div className="mobile-profile-container">
      {/* Header */}
      <header className="mobile-profile-header">
        <button
          className="back-profile-button"
          onClick={() => navigate("/profile")}
        >
          ⬅ Back
        </button>
        <h2>Invite Friends</h2>
      </header>

      {/* Content */}
      <div className="mobile-profile-content">
        <div className="invite-profile-content">
          <p className="invite-text-upper">Your best friend</p>
          <p className="invite-text-lower">invites you to join the ABC</p>

          {inviteLink && (
            <div className="qr-profile-container">
              <QRCodeCanvas value={inviteLink} size={150} />
            </div>
          )}

          <div className="referral-profile-info">
            <p>
              Referral code: <strong>{refCode}</strong>
            </p>
            <div className="copy-button-container">
              <button
                onClick={() => handleCopy(refCode, "refCode")}
                className="copy-button"
              >
                Copy Recommendation Code
              </button>
              {showTooltip.refCode && <span className="tooltip">Copied!</span>}
            </div>
            <p>{inviteLink}</p>
            <div className="copy-button-container">
              <button
                onClick={() => handleCopy(inviteLink, "inviteLink")}
                className="copy-button"
              >
                Copy Invitation Link
              </button>
              {showTooltip.inviteLink && (
                <span className="tooltip">Copied!</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteFriendsPage;
