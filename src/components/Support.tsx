import { Share } from '@capacitor/share';
import { useEffect, useState } from 'react';

export function Support() {
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    async function detectSharing() {
      const canShare = (await Share.canShare()).value;
      setCanShare(canShare);
    }

    detectSharing();
  }, [setCanShare]);

  async function handleShare() {
    await Share.share({
      dialogTitle: 'Share Poker Grid',
      text: 'Check out Poker Grid on Google Play!',
      title: 'Poker Grid',
      url: 'https://play.google.com/store/apps/details?id=com.haulin.pokergrid',
    });
  }

  return (
    <div className="container instructions appear">
      <h1>Support Poker Grid</h1>
      <h2 className="section-title">Join the community on Discord</h2>
      <p>
        Hang out with the authors and other users, give feedback, share high scores, tips, and
        strategies.
      </p>
      <a className="button" href="https://discord.gg/HaCDb4Dpdj" rel="noreferrer" target="_blank">
        Join Discord
      </a>
      {canShare && (
        <>
          <h2 className="section-title">Share a Google Play link with your friends</h2>
          <p>
            Use your phone&apos;s share functionality to send Poker Grid link to the Google Play
            store so your friends can install the game in one click.
          </p>
          <button onClick={handleShare}>Share a link for Poker Grid</button>
        </>
      )}
      <h2 className="section-title">Rate us</h2>
      <p>
        Like the game? Give us a public rating on Google Play so other people know it&apos;s worth
        installing.
      </p>
      <a
        className="button"
        href="https://play.google.com/store/apps/details?id=com.haulin.pokergrid"
        rel="noreferrer"
        target="_blank"
      >
        Rate on Google Play
      </a>
      <h2 className="section-title">Credits</h2>
      <ul>
        <li>haulin - development, game design</li>
        <li>JakeDaPhunk - testing</li>
        <li>game-icons.net - some of the game icons</li>
      </ul>
    </div>
  );
}
