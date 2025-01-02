
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

  // useEffect(() => {
  //   const fetchReferralCode = async () => {
  //     try {
  //       const profileData = await getUserProfile();
  //       if (profileData?.data?.refCode) {
  //         const refCode = profileData.data.refCode;
  //         setRefCode(refCode);
  //         setInviteLink(`${window.location.origin}/invite-friends/${refCode}`); 
  //         await inviteFriends(refCode);
  //       } else {
  //         toast.error("Referral code not found.");
  //       }
  //     } catch (error) {
  //       toast.error(error.message || "Failed to fetch referral code.");
  //     }
  //   };

  //   fetchReferralCode();
  // }, []);


  useEffect(() => {
    const fetchReferralCode = async () => {
      try {
        const profileData = await getUserProfile();
        if (profileData?.data?.refCode) {
          const refCode = profileData.data.refCode;
          setRefCode(refCode);
          const staticBaseUrl = `http://3.91.179.101/sign-up/${refCode}`;
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
  

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
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
            <h5 onClick={() => handleCopy(refCode)} className="copied-color">
              Copy recommendation code
            </h5>
            <p>{inviteLink}</p>
            <h5 onClick={() => handleCopy(inviteLink)} className="copied-color">
              Copy the invitation link
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteFriendsPage;
